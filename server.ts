import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Heuristic baseline detection when offline or fallback
function runHeuristicAnalysis(content: string, senderEmail?: string, companyName?: string, platform?: string) {
  const lower = (content + ' ' + (senderEmail || '') + ' ' + (platform || '')).toLowerCase();

  const redFlags: Array<{
    title: string;
    description: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    evidenceQuote?: string;
    category: 'FINANCIAL' | 'COMMUNICATION' | 'DOMAIN_IDENTITY' | 'CONTRACTUAL' | 'INTERVIEW_PROCESS';
  }> = [];

  const greenFlags: Array<{
    title: string;
    description: string;
  }> = [];

  let riskPoints = 10; // baseline

  // Financial red flags
  if (/fee|deposit|laptop fee|shipping cost|training charge|registration fee|zelle|cash app|venmo|western union|crypto|bitcoin|usdt|processing charge/i.test(lower)) {
    riskPoints += 45;
    redFlags.push({
      title: 'Upfront Payment or Deposit Demand',
      description: 'Legitimate employers and internship providers never require candidates to pay for training, onboarding kits, registration, or equipment shipping.',
      severity: 'CRITICAL',
      category: 'FINANCIAL',
      evidenceQuote: content.match(/(?:fee|deposit|training charge|registration fee|shipping cost|zelle|crypto|bitcoin)[^\.\n]*/i)?.[0] || 'Demands upfront payment'
    });
  }

  // Check scam
  if (/cashier'?s check|paper check|e-check|reimbursement check|vendor list|buy equipment from our vendor/i.test(lower)) {
    riskPoints += 40;
    redFlags.push({
      title: 'Fake Check / Equipment Overpayment Trap',
      description: 'The scammer promises to send a check for home office supplies from an unauthorized third-party vendor. The fake check will bounce weeks later, leaving you responsible for all transferred funds.',
      severity: 'CRITICAL',
      category: 'FINANCIAL',
      evidenceQuote: content.match(/(?:check|reimbursement|equipment|vendor)[^\.\n]*/i)?.[0] || 'Offers advance check to purchase equipment'
    });
  }

  // Telegram / WhatsApp / Signal interview
  if (/telegram|whatsapp|signal|wire app|text interview|no video|questionnaire only/i.test(lower)) {
    riskPoints += 30;
    redFlags.push({
      title: 'Off-Platform Anonymous Interview',
      description: 'Recruiters conducting interviews purely via chat apps (Telegram/WhatsApp) without authenticated corporate video platforms or in-person verification are high-risk imposters.',
      severity: 'HIGH',
      category: 'INTERVIEW_PROCESS',
      evidenceQuote: content.match(/(?:telegram|whatsapp|signal|text-only interview)[^\.\n]*/i)?.[0] || 'Interview conducted via encrypted personal messaging app'
    });
  }

  // Email domain check
  if (senderEmail) {
    const domainMatch = senderEmail.toLowerCase().match(/@([\w.-]+)/);
    const domain = domainMatch ? domainMatch[1] : '';
    if (['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'proton.me', 'icloud.com'].includes(domain)) {
      riskPoints += 25;
      redFlags.push({
        title: 'Free Generic Email Service Used for Corporate Recruitment',
        description: `Official enterprise recruiters from established companies (${companyName || 'claimed company'}) utilize verified corporate domain mailboxes, not generic public webmail (@${domain}).`,
        severity: 'HIGH',
        category: 'DOMAIN_IDENTITY',
        evidenceQuote: senderEmail
      });
    } else if (/(careers|jobs|recruitment|talent|hr)-[\w]+|[\w]+-(portal|verify|work)\./i.test(domain)) {
      riskPoints += 30;
      redFlags.push({
        title: 'Suspicious Lookalike / Typosquatted Domain',
        description: `The domain ${domain} exhibits typical domain mimicry patterns used in corporate credential theft.`,
        severity: 'CRITICAL',
        category: 'DOMAIN_IDENTITY',
        evidenceQuote: domain
      });
    }
  }

  // Urgent pressure tactics
  if (/within 24 hours|immediate acceptance|offer expires today|hurry|limited slots remaining|first come first serve/i.test(lower)) {
    riskPoints += 20;
    redFlags.push({
      title: 'High-Pressure Urgency Tactics',
      description: 'Artificial deadlines designed to panic applicants into signing contracts or transferring funds without consulting mentors, advisors, or career services.',
      severity: 'MEDIUM',
      category: 'COMMUNICATION',
      evidenceQuote: content.match(/(?:within \d+ hours|expires today|immediately|limited slots)[^\.\n]*/i)?.[0] || 'Immediate acceptance ultimatum'
    });
  }

  // Sensitive identity requests
  if (/ssn|social security|passport scan|bank account details|routing number|front and back of ID/i.test(lower) && !/background check agency|adp|workday/i.test(lower)) {
    riskPoints += 35;
    redFlags.push({
      title: 'Premature Sensitive PII / Banking Request',
      description: 'Demanding banking credentials, SSN, or government IDs before a formal contract signing and standard corporate HR portal provisioning is a hallmark of identity theft.',
      severity: 'CRITICAL',
      category: 'CONTRACTUAL',
      evidenceQuote: content.match(/(?:ssn|social security|bank account|passport)[^\.\n]*/i)?.[0] || 'Requests sensitive identification documents prematurely'
    });
  }

  // Green flags for balance
  if (/standard background check|w-4|i-9 form|workday\.com|greenhouse\.io|lever\.co|written offer letter|mentor assigned/i.test(lower)) {
    greenFlags.push({
      title: 'Standard Enterprise Onboarding References',
      description: 'Mentions standardized ATS platforms (Workday/Greenhouse) or legal compliance frameworks.'
    });
    riskPoints = Math.max(0, riskPoints - 15);
  }

  if (senderEmail && !['gmail.com', 'yahoo.com', 'hotmail.com'].some(d => senderEmail.toLowerCase().includes(d)) && !redFlags.some(r => r.category === 'DOMAIN_IDENTITY')) {
    greenFlags.push({
      title: 'Dedicated Domain Mailbox',
      description: 'Sent from a custom organizational domain rather than free disposable webmail.'
    });
    riskPoints = Math.max(0, riskPoints - 10);
  }

  const normalizedScore = Math.min(100, Math.max(5, riskPoints));
  let threatLevel: 'SAFE' | 'LOW' | 'SUSPICIOUS' | 'CRITICAL_SCAM' = 'LOW';
  if (normalizedScore >= 70) threatLevel = 'CRITICAL_SCAM';
  else if (normalizedScore >= 45) threatLevel = 'SUSPICIOUS';
  else if (normalizedScore >= 25) threatLevel = 'LOW';
  else threatLevel = 'SAFE';

  let verdict = '';
  let scamCategory = 'General Evaluation';
  if (threatLevel === 'CRITICAL_SCAM') {
    verdict = 'EXTREME CAUTION: This internship communication contains multiple critical indicators of fraudulent recruitment or financial extortion.';
    scamCategory = redFlags.some(r => r.title.includes('Payment') || r.title.includes('Check'))
      ? 'Advance-Fee / Equipment Reimbursement Scam'
      : 'Recruiter Domain Impersonation & Identity Theft';
  } else if (threatLevel === 'SUSPICIOUS') {
    verdict = 'SUSPICIOUS: Several irregular recruitment practices and potential red flags detected. Do NOT pay money or disclose banking details without further verification.';
    scamCategory = 'Unverified Employment Solicitation';
  } else if (threatLevel === 'LOW') {
    verdict = 'MODERATE / CAUTION: Minor deviations from traditional hiring protocol noted, but no active financial demands or critical phishing markers found.';
    scamCategory = 'Low Risk Opportunity';
  } else {
    verdict = 'APPEARS AUTHENTIC: Standard formal corporate hiring practices, no upfront monetary requests or suspicious routing detected.';
    scamCategory = 'Legitimate Employment Offer';
  }

  return {
    riskScore: normalizedScore,
    threatLevel,
    verdict,
    scamCategory,
    confidence: 88,
    redFlags,
    greenFlags,
    breakdown: {
      financialRisk: redFlags.some(r => r.category === 'FINANCIAL') ? 95 : 15,
      identityRisk: redFlags.some(r => r.title.includes('PII') || r.title.includes('Sensitive')) ? 90 : 20,
      domainReputationRisk: redFlags.some(r => r.category === 'DOMAIN_IDENTITY') ? 85 : 10,
      processRisk: redFlags.some(r => r.category === 'INTERVIEW_PROCESS') ? 80 : 15,
    },
    keyFindings: [
      redFlags.length > 0 ? `${redFlags.length} major vulnerability points identified` : 'Standard professional tone maintained',
      redFlags.some(r => r.category === 'FINANCIAL') ? 'Illegal monetary or equipment transaction requirements present' : 'No financial transaction requests detected',
      senderEmail ? `Email origin: ${senderEmail}` : 'Sender email not provided'
    ],
    immediateActionPlan: [
      {
        step: 1,
        title: 'Cease All Financial Transfers',
        action: 'Never send funds via Zelle, Cash App, wire, crypto, or check reimbursement to an employer under any pretext.',
        type: 'WARNING' as const
      },
      {
        step: 2,
        title: 'Cross-Verify on Official Career Portal',
        action: `Search the company's verified LinkedIn page or official website careers page (${companyName || 'Claimed Company'}) for the specific job requisition code.`,
        type: 'ACTION' as const
      },
      {
        step: 3,
        title: 'Report to University Career Services & Authorities',
        action: 'Notify your campus career center coordinator and file an IC3/FTC fraud inquiry if they requested personal banking information.',
        type: 'REPORT' as const
      }
    ],
    emailVerificationTemplate: {
      subject: `Verification Request: Internship Application for ${companyName || 'Candidate Inquiry'}`,
      body: `Dear Hiring Team,\n\nThank you for reaching out regarding the internship role. To complete my onboarding file with my university's career compliance office, could you please confirm your corporate office address, the formal job requisition ID on your official career portal, and schedule a brief 5-minute video call via Zoom or Google Meet with the hiring manager?\n\nLooking forward to speaking with you.\n\nBest regards,\n[Your Name]`,
      explanation: 'Send this polite verification inquiry. Legitimate corporate HR will readily comply, whereas scammers will deflect, become aggressive, or stop replying.'
    },
    domainAnalysis: {
      claimedDomain: companyName ? `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : undefined,
      actualDomain: senderEmail?.split('@')[1],
      isFreeProvider: senderEmail ? ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'proton.me'].includes(senderEmail.split('@')[1]?.toLowerCase()) : false,
      isLookalikeDomain: senderEmail ? /careers|portal|verify|jobs-|-talent/i.test(senderEmail.split('@')[1] || '') : false,
      domainNotes: senderEmail ? `Email address inspected: ${senderEmail}` : 'No domain provided for DNS validation.'
    },
    officialReportingLinks: [
      { name: 'FTC Fraud Reporting', url: 'https://reportfraud.ftc.gov/', purpose: 'Federal Trade Commission official scam registry' },
      { name: 'FBI Internet Crime Complaint Center (IC3)', url: 'https://www.ic3.gov/', purpose: 'Report online employment impersonation & check fraud' },
      { name: 'Better Business Bureau Scam Tracker', url: 'https://www.bbb.org/scamtracker', purpose: 'Check community reported employer complaints' }
    ],
    analyzedAt: new Date().toISOString()
  };
}

// POST /api/analyze - Main deep AI scam scanner
app.post('/api/analyze', async (req, res) => {
  try {
    const {
      type = 'offer_letter',
      content = '',
      senderEmail,
      companyName,
      jobTitle,
      compensation,
      platform,
      imageData
    } = req.body;

    if (!content && !imageData) {
      return res.status(400).json({ error: 'Please provide either text content or an image to analyze.' });
    }

    // If Gemini is available, use Gemini 3.8 Flash for deep cyber forensics
    if (ai) {
      try {
        const prompt = `You are InternShield AI, an expert cybersecurity and anti-fraud forensic investigator specializing in internship scams, fake employment schemes, recruiter impersonation, fake check/equipment overpayment traps, and student identity theft.

Analyze the following internship submission thoroughly.
Type: ${type}
Claimed Company: ${companyName || 'Not specified'}
Job Title: ${jobTitle || 'Not specified'}
Reported Compensation: ${compensation || 'Not specified'}
Recruiter Email / Contact: ${senderEmail || 'Not specified'}
Originating Platform: ${platform || 'Not specified'}

Raw Content / Document Text:
"""
${content || '(Analyze attached image document)'}
"""

Evaluate across these 5 dimensions:
1. FINANCIAL_EXPLOITATION: Are there demands for registration fees, training charges, equipment "insurance", or requests to cash a check and forward funds?
2. DOMAIN_AND_IDENTITY_SPOOFING: Is the recruiter using a free webmail (@gmail, @yahoo) or a lookalike domain (e.g. meta-careers-portal.live vs meta.com)?
3. INTERVIEW_PROTOCOL: Was there an off-platform text-only interview on Telegram, WhatsApp, Signal, or Microsoft Teams chat without video or technical review?
4. SENSITIVE_DATA_HARVESTING: Are they prematurely asking for SSN, bank account routing, passport scans before an official contract/workday portal?
5. URGENCY_PRESSURE: Are there artificial countdown ultimatums ("Must reply within 2 hours", "Limited slots")?

Respond ONLY in valid JSON matching this schema:
{
  "riskScore": number (0 to 100),
  "threatLevel": "SAFE" | "LOW" | "SUSPICIOUS" | "CRITICAL_SCAM",
  "verdict": string (1-2 sentences direct forensic verdict),
  "scamCategory": string (e.g. "Fake Check Equipment Scam", "Pay-for-Training Extortion", "Domain Spoofing / Impersonation", "Data Harvesting / Phishing", "Unpaid IP Shadow Work", or "Legitimate Enterprise Offer"),
  "confidence": number (between 70 and 99),
  "redFlags": [
    {
      "title": string,
      "description": string,
      "severity": "CRITICAL" | "HIGH" | "MEDIUM",
      "evidenceQuote": string,
      "category": "FINANCIAL" | "COMMUNICATION" | "DOMAIN_IDENTITY" | "CONTRACTUAL" | "INTERVIEW_PROCESS"
    }
  ],
  "greenFlags": [
    {
      "title": string,
      "description": string
    }
  ],
  "breakdown": {
    "financialRisk": number (0-100),
    "identityRisk": number (0-100),
    "domainReputationRisk": number (0-100),
    "processRisk": number (0-100)
  },
  "keyFindings": [string],
  "immediateActionPlan": [
    {
      "step": number,
      "title": string,
      "action": string,
      "type": "WARNING" | "ACTION" | "REPORT"
    }
  ],
  "emailVerificationTemplate": {
    "subject": string,
    "body": string,
    "explanation": string
  },
  "domainAnalysis": {
    "claimedDomain": string,
    "actualDomain": string,
    "isFreeProvider": boolean,
    "isLookalikeDomain": boolean,
    "domainNotes": string
  },
  "officialReportingLinks": [
    {
      "name": string,
      "url": string,
      "purpose": string
    }
  ]
}`;

        const parts: any[] = [];
        if (imageData) {
          const mimeTypeMatch = imageData.match(/^data:([^;]+);base64,/);
          const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';
          const cleanBase64 = imageData.replace(/^data:[^;]+;base64,/, '');
          parts.push({
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          });
        }
        parts.push({ text: prompt });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: parts.length === 1 ? parts[0].text : { parts },
          config: {
            responseMimeType: 'application/json',
            systemInstruction: 'You are InternShield, an unyielding cybersecurity AI that protects vulnerable students from internship scams, financial extortion, and identity theft. Deliver rigorous, evidence-based forensic analysis with zero sugarcoating when fraud is detected.',
          },
        });

        const textOutput = response.text || '';
        const parsed = JSON.parse(textOutput);
        parsed.analyzedAt = new Date().toISOString();
        return res.json(parsed);
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', geminiError?.message);
        const fallback = runHeuristicAnalysis(content, senderEmail, companyName, platform);
        return res.json(fallback);
      }
    } else {
      // Offline / Heuristic engine
      const heuristicResult = runHeuristicAnalysis(content, senderEmail, companyName, platform);
      return res.json(heuristicResult);
    }
  } catch (error: any) {
    console.error('Error analyzing internship offer:', error);
    res.status(500).json({ error: 'Failed to complete analysis. Please try again.' });
  }
});

// POST /api/quick-domain-check - Instant Domain & Company Radar
app.post('/api/quick-domain-check', async (req, res) => {
  try {
    const { domainOrEmail, companyName } = req.body;
    if (!domainOrEmail) {
      return res.status(400).json({ error: 'Domain or email is required.' });
    }

    const cleanInput = domainOrEmail.trim().toLowerCase();
    const domain = cleanInput.includes('@') ? cleanInput.split('@')[1] : cleanInput;

    const freeWebmailList = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'proton.me', 'aol.com', 'mail.com', 'zoho.com', 'icloud.com'];
    const isFreeWebmail = freeWebmailList.includes(domain);
    const hasSuspiciousSuffix = /-(careers|jobs|verify|portal|talent|recruit|work)\./i.test(domain) || /\.(site|xyz|online|live|space|top|shop|fun|click)$/i.test(domain);

    let score = 20; // safe baseline
    const warnings: string[] = [];

    if (isFreeWebmail) {
      score += 60;
      warnings.push(`Domain '@${domain}' is a free public webmail provider. Legitimate enterprise HR always uses corporate email domains.`);
    }

    if (hasSuspiciousSuffix) {
      score += 55;
      warnings.push(`Domain '${domain}' exhibits typical impersonation/typosquatting keywords or high-risk TLDs often registered by scammers.`);
    }

    if (companyName && !domain.includes(companyName.toLowerCase().replace(/[^a-z0-9]/g, '')) && !isFreeWebmail) {
      warnings.push(`Domain '${domain}' does not appear to match claimed company '${companyName}'. Verify if this is an authorized subsidiary or third-party staffing firm.`);
      score += 25;
    }

    return res.json({
      domain,
      riskScore: Math.min(100, score),
      isFreeWebmail,
      isSuspicious: score >= 50,
      warnings,
      recommendation: score >= 50
        ? 'High probability of domain spoofing. Do NOT reply or click links.'
        : 'Domain appears within standard parameters. Verify SSL certificate and official company careers URL before sharing personal data.'
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to inspect domain.' });
  }
});

// POST /api/chat-advisor - AI Scam Defense Counselor
app.post('/api/chat-advisor', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (ai) {
      try {
        const conversationContext = history
          .map((h: any) => `${h.role === 'user' ? 'Student' : 'InternShield Advisor'}: ${h.text}`)
          .join('\n');

        const prompt = `You are InternShield's Student Safety Advisor, a supportive yet vigilant expert on student employment safety, labor law, and fraud detection.
Student question: "${message}"

Previous conversation:
${conversationContext || 'First question.'}

Give clear, concise, actionable advice (under 180 words). Bold key safety rules. If it sounds like a scam (e.g. check deposits, equipment fees, Telegram interviews), be direct: "DO NOT PROCEED. This is a scam." Include one practical verification step they can take.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an internship fraud defense advisor for students. Be protective, authoritative, and direct.',
          },
        });

        return res.json({ reply: response.text });
      } catch (e: any) {
        console.warn('Chat advisor Gemini error:', e?.message);
      }
    }

    // Heuristic fallback response
    let reply = "Always remember the cardinal rule of internships: **A genuine company will never ask an intern to pay money, purchase software, or deposit a check on their behalf.** If they are asking for fees or conducting text-only interviews on Telegram, cut off communication immediately.";
    if (/check|deposit|cashier/i.test(message)) {
      reply = "**STOP: This is almost certainly a Fake Check Scam.** Scammers send fraudulent checks (paper or mobile e-checks) asking you to deposit them and send money to their 'equipment vendor' via Zelle or wire. The check will bounce after a few days, and your bank will hold you responsible for the entire lost amount. Never deposit checks from unfamiliar recruiters.";
    } else if (/telegram|whatsapp|text/i.test(message)) {
      reply = "**Warning:** Legitimate corporate recruiters do not conduct hiring exclusively through Telegram, WhatsApp, or text questionnaires without verified video calls or corporate email exchanges. Ask to meet over Microsoft Teams, Zoom, or Google Meet using their official @company.com email.";
    } else if (/ssn|social security|bank/i.test(message)) {
      reply = "**Never provide your SSN, passport, or direct deposit banking info on an application form.** That information is only collected *after* an offer is officially signed, and exclusively through secure corporate portals (like Workday, ADP, or Rippling), never via email or chat.";
    }

    return res.json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process inquiry.' });
  }
});

// Mount Vite middleware for dev or serve static files in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🛡️ InternShield server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
