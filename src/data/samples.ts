import { SampleTestCase, QuizQuestion } from '../types';

export const SAMPLE_TEST_CASES: SampleTestCase[] = [
  {
    id: 'check-scam',
    badge: 'High Threat',
    title: 'Equipment Advance Check & Telegram Interview',
    company: 'Apex Cloud Innovations LLC',
    senderEmail: 'apexcloudhr-talent@gmail.com',
    platform: 'Telegram / Direct Message',
    preview: 'Offers $42/hr remote internship after a 15-minute Telegram text questionnaire. Instructs to deposit a $3,450 check to purchase a MacBook Pro from their designated vendor.',
    scamType: 'Fake Check & Overpayment Scheme',
    expectedVerdict: 'SCAM',
    fullContent: `Subject: URGENT: OFFICIAL INTERNSHIP APPOINTMENT & HOME OFFICE DISPATCH

Dear Applicant,

Following your outstanding performance in our online questionnaire screening on Telegram Messenger with our Talent Lead, Mr. Dave Miller, the Board of Directors of Apex Cloud Innovations LLC is pleased to offer you the position of Remote Software Engineering Intern at a rate of $42.00 per hour.

You will receive an official advance payment cashier's check in the amount of $3,450.00 via FedEx/e-check. Upon receiving the check, you are required to deposit it immediately into your personal checking account. Once the funds reflect, you must remit $2,850.00 via Zelle or Wire Transfer to our certified IT equipment vendor (vendor.apex-supplies@tech-logistics.us) to purchase your company-configured Apple MacBook Pro M3 and testing hardware.

You will keep the remaining $600.00 as your first week sign-on bonus. Please confirm receipt within 12 hours, otherwise this offer will be revoked and reallocated to the next waitlisted student.

To begin onboarding, reply with your:
1. Full Legal Name & Physical Address
2. Bank Name and Account Number (for direct payroll setup)
3. Clear front and back photograph of your Driver's License or Passport

Warm regards,
David Miller, Global VP of People & Operations
Apex Cloud Innovations LLC
Contact: t.me/ApexCloudRecruiter_Dave`
  },
  {
    id: 'domain-spoof',
    badge: 'Phishing',
    title: 'Spoofed Google Recruiter Phishing Portal',
    company: 'Google Inc.',
    senderEmail: 'talent-acquisitions@google-careers-portal.live',
    platform: 'Unsolicited LinkedIn InMail / Email',
    preview: 'Claims to be Google University Programs team offering a Fall AI Research Internship, but sends link to google-careers-portal.live requesting Google Account credentials.',
    scamType: 'Domain Typosquatting & Credential Theft',
    expectedVerdict: 'SCAM',
    fullContent: `From: talent-acquisitions@google-careers-portal.live
To: student@university.edu
Subject: Google 2026 Student Training & Engineering Program (STEP) - Direct Selection

Hi there,

Our university talent scouting bot flagged your GitHub profile and LinkedIn resume for our exclusive Fall 2026 AI Research & Engineering Internship cohort in Mountain View, CA (Remote or On-site, $58/hr).

Due to your high match score, the initial technical screen has been waived. You have been selected for pre-qualification.

Please complete your identity verification and sign your pre-offer confirmation document on our verified regional employee portal within 24 hours:
https://google-careers-portal.live/auth/step-internship-sign-in

Important: You must sign in using your existing institutional email and personal credentials to bind your single sign-on access key. Failure to access within 24 hours will result in automatic disqualification.

Best,
Google Student Programs Group
1600 Amphitheatre Parkway, Mountain View, CA`
  },
  {
    id: 'training-fee',
    badge: 'Fee Extortion',
    title: 'Mandatory "Training Kit & Security Deposit" Fee',
    company: 'NextGen Digital Softworks',
    senderEmail: 'hr@nextgensoftworks.in',
    platform: 'WhatsApp Recruitment Message',
    preview: 'Congratulations on selection! To confirm your 3-month stipend internship, you must transfer a ₹4,500 refundable security deposit for development SDK credentials.',
    scamType: 'Pay-to-Work / Advance-Fee Scam',
    expectedVerdict: 'SCAM',
    fullContent: `Greetings from NextGen Digital Softworks!

Congratulations! You have been successfully shortlisted for our 3-Month Virtual Web Development Internship Program with an assured monthly performance stipend of ₹25,000 to ₹35,000.

To confirm your seat in the upcoming batch starting next Monday, all selected interns must pay a one-time refundable Security Deposit & Server Cloud Access Fee of ₹4,500 (Four Thousand Five Hundred Rupees only).

This amount will be 100% refunded along with your first month stipend upon submitting the mid-term capstone project. 

Payment UPI ID: nextgenrecruitment@upi
Kindly take a screenshot of your payment receipt and upload it to this WhatsApp number within 6 hours to receive your joining letter and company Slack invitation.

Note: Limited seats available. We do not entertain unpaid dropouts.`
  },
  {
    id: 'shadow-work',
    badge: 'Labor Theft',
    title: 'Unpaid 40-Hour "Assessment" Shadow Labor Trap',
    company: 'Stealth AI B2B Platform',
    senderEmail: 'founder@stealth-growth-ai.co',
    platform: 'AngelList / Wellfound Message',
    preview: 'No interview. Asks candidate to build a complete multi-tenant billing engine with Stripe webhook integrations as an "unpaid 5-day assessment test".',
    scamType: 'Free Labor & Intellectual Property Extraction',
    expectedVerdict: 'SUSPICIOUS',
    fullContent: `Hey,

Thanks for applying to our Junior Full Stack Intern role. We have over 900 applicants, so we don't do traditional coding interviews.

Instead, we evaluate real engineering output. Here is your take-home trial project:
1. Build a complete multi-tenant subscription billing microservice using NestJS, PostgreSQL, and Stripe Connect.
2. Implement webhook handlers for failed invoices, dispute webhooks, and metered usage billing.
3. Deploy it to AWS with Terraform scripts and grant admin access to our GitHub repo: github.com/stealth-growth-ai/prod-billing-core.

Deadline: 4 days from today. If we like your architecture and merge your PR into our staging environment, we will consider scheduling a 15-minute chat with our CEO about an unpaid 6-month trial internship.

All IP created becomes the proprietary property of Stealth AI.`
  },
  {
    id: 'legit-offer',
    badge: 'Legitimate',
    title: 'Authentic Enterprise Software Engineering Offer',
    company: 'Stripe, Inc.',
    senderEmail: 'university-recruiting@stripe.com',
    platform: 'Official Stripe Greenhouse ATS / Campus Fair',
    preview: 'Genuine formal offer letter featuring official corporate domain, transparent compensation, standard Form I-9 verification, and no upfront fee or equipment checks.',
    scamType: 'Legitimate Corporate Employment',
    expectedVerdict: 'SAFE',
    fullContent: `Stripe, Inc.
510 Townsend Street, San Francisco, CA 94103
Date: October 24, 2026

Dear Candidate,

We are thrilled to offer you a temporary position as a Software Engineering Intern with Stripe, Inc. ("Stripe"), reporting to our Payments Core infrastructure team.

Key terms of your internship:
- Term: 12 weeks, starting June 8, 2026 and concluding August 28, 2026.
- Compensation: You will receive an hourly wage of $62.50 per hour, payable bi-weekly in accordance with Stripe's standard payroll practices.
- Relocation / Housing: Stripe will provide a corporate housing subsidy of $2,000/month or company-coordinated housing near our South San Francisco campus.
- Equipment: A company-managed MacBook and security YubiKey will be directly provisioned and shipped to your designated address by Stripe IT Logistics at no cost to you.
- Verification: This offer is contingent upon successful completion of a standard background check administered by Checkr and submission of Form I-9 (Employment Eligibility Verification) via our secure Workday portal on or before your first day.

Stripe will never ask you to transfer funds, purchase your own hardware from non-standard retailers, or pay any registration fees.

To accept this offer, please review and e-sign through your personalized candidate portal at https://stripe.com/jobs/portal before Friday, November 14, 2026.

Sincerely,
Elena Vance
University Talent Programs Director
Stripe, Inc.`
  }
];

export const SCAM_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Equipment & Check Scam',
    scenario: 'You applied on LinkedIn. Two hours later, someone messages you saying you are hired. They say: "We are mailing you a $2,800 cashier\'s check so you can purchase your company laptop from our registered tech vendor via Zelle." What should you do?',
    details: 'The company name looks real and has a verified badge on LinkedIn, but the recruiter is using Telegram.',
    options: [
      {
        text: 'Deposit the check, wait 24 hours until the bank shows funds available, then send the money.',
        isCorrect: false,
        explanation: 'Banks are required by law to make funds available quickly, but fake checks can take 2 to 4 WEEKS to bounce! Once it bounces, the bank deducts the full $2,800 from YOUR account and may close it for fraud.'
      },
      {
        text: 'Block and report immediately. Legitimate companies never send checks for equipment purchases.',
        isCorrect: true,
        explanation: 'Correct! Real companies ship pre-configured laptops directly via IT logistics (e.g. Dell, Apple Enterprise, Jamf) or provide an internal corporate credit card. Never deposit a check from a stranger.'
      },
      {
        text: 'Ask if you can purchase the laptop on Amazon or Best Buy with the check instead.',
        isCorrect: false,
        explanation: 'The check itself is counterfeit. Attempting to deposit it will still bounce and trigger bank fraud investigation on your personal account.'
      }
    ]
  },
  {
    id: 2,
    category: 'Domain & Email Phishing',
    scenario: 'You get an email from "recruiting-team@microsoft-talent-hiring.info" offering an internship interview. The email has the official Microsoft logo and a professional email signature.',
    details: 'The sender signature says "Satya Nadella Executive Talent Office".',
    options: [
      {
        text: 'Reply with your resume since the official logo and signature are attached.',
        isCorrect: false,
        explanation: 'Anyone can copy-paste a corporate logo into an email. The domain ".info" and "microsoft-talent-hiring" are dead giveaways of domain typosquatting.'
      },
      {
        text: 'Inspect the domain. Real Microsoft recruiters only email from official "@microsoft.com" domains.',
        isCorrect: true,
        explanation: 'Spot on! Microsoft employees only email from @microsoft.com or through authenticated ATS platforms like microsoft.avature.net. Never trust hyphenated lookalikes like microsoft-talent-hiring.info.'
      },
      {
        text: 'Click the link to check if their website has an SSL lock icon.',
        isCorrect: false,
        explanation: 'Free SSL certificates (Let\'s Encrypt) are automatically generated for fraudulent phishing websites. An SSL padlock only means encryption in transit, NOT company legitimacy.'
      }
    ]
  },
  {
    id: 3,
    category: 'Interview Protocol',
    scenario: 'A recruiter invites you to do your internship interview on Telegram via text chat. They say their video server is currently undergoing maintenance.',
    details: 'They ask 10 multiple-choice questions in chat and 10 minutes later say "Congratulations, you scored 98% and are hired!"',
    options: [
      {
        text: 'Accept with gratitude because remote jobs frequently use modern chat apps.',
        isCorrect: false,
        explanation: 'No reputable company hires interns through anonymous text questionnaires on Telegram without video verification or verified corporate email.'
      },
      {
        text: 'Refuse text interview. Demand a verified video call on Google Meet/Teams or through campus career services.',
        isCorrect: true,
        explanation: 'Exactly right. Telegram offers anonymity for fraudsters to avoid being tracked or identified. Insist on corporate email correspondence and video interviews.'
      },
      {
        text: 'Send your driver\'s license to verify your identity first.',
        isCorrect: false,
        explanation: 'This feeds directly into identity theft. Scammers use stolen student IDs to open fraudulent credit cards and bank accounts.'
      }
    ]
  },
  {
    id: 4,
    category: 'Training & Onboarding Fees',
    scenario: 'An internship provider congratulates you on selection but says: "You must pay a refundable ₹3,000 / $150 onboarding registration and server maintenance fee."',
    details: 'They promise the entire fee will be returned in your first stipend payment.',
    options: [
      {
        text: 'Pay the fee because it is refundable and ₹3,000 / $150 is a small investment for experience.',
        isCorrect: false,
        explanation: 'The "refundable deposit" is the core trick of advance-fee fraud. Once paid, the recruiter disappears or demands another "tax clearance fee".'
      },
      {
        text: 'Walk away immediately. Legitimate internships pay YOU, you never pay THEM.',
        isCorrect: true,
        explanation: 'Golden Rule of Internships: Money should only flow ONE WAY—from the employer to the student. Any demand for upfront payment is an outright scam.'
      },
      {
        text: 'Ask for a 50% discount on the registration fee.',
        isCorrect: false,
        explanation: 'Scammers will happily accept whatever amount you can pay. Never negotiate with fraudsters.'
      }
    ]
  }
];

export const COMMON_SCAM_PATTERNS = [
  {
    id: 'fake-check',
    title: 'The Fake Check / Equipment Reversal Trap',
    frequency: 'Extremely Common (42% of reported scams)',
    victimImpact: 'Average loss: $1,500 - $3,500 + Bank account frozen',
    mechanics: 'The scammer sends a digital counterfeit check for home office supplies, telling the intern to deposit it and immediately wire money to a specific "certified vendor" via Zelle or crypto. Weeks later, the check bounces and the bank holds the student liable for the full amount.',
    tellTaleSign: 'Demanding use of peer-to-peer apps (Zelle, Cash App, Venmo) to pay for company hardware.',
    safeHandling: 'Never deposit a check from someone you haven\'t met in person. If you did, contact your bank\'s fraud division immediately before touching any funds.'
  },
  {
    id: 'pay-for-training',
    title: 'The "Refundable" Training / Registration Fee',
    frequency: 'Very High among College Freshmen & International Students',
    victimImpact: 'Loss of $100 - $600 + personal data harvesting',
    mechanics: 'Offers an internship with high promised stipends, but insists that the student pay for a "software license", "cloud VM provisioning", or "training certificate kit" before joining, promising full reimbursement later.',
    tellTaleSign: 'Urgent payment requests via UPI, PayPal Friends & Family, or Gift Cards.',
    safeHandling: 'Any requirement to pay to work is a violation of international labor standards and a guaranteed scam.'
  },
  {
    id: 'domain-impersonation',
    title: 'Typosquatted Domain Phishing',
    frequency: 'High Sophistication',
    victimImpact: 'Stolen login credentials, passwords, university email access',
    mechanics: 'Attackers register lookalike domains like "apple-jobs-portal.com" or "careers-meta-hr.site" mimicking legitimate corporate career sites to steal SSO credentials or personal data.',
    tellTaleSign: 'Odd domains, newly registered TLDs (.xyz, .live, .top), or free Gmail/Yahoo addresses claiming to be Fortune 500 recruiters.',
    safeHandling: 'Search for the job listing independently on the company\'s official website (e.g. www.apple.com/careers) rather than clicking links in unsolicited emails.'
  },
  {
    id: 'ghost-labor',
    title: 'Free Unpaid Product Labor (Shadow IP Theft)',
    frequency: 'Rising in Early-Stage Startups & Telegram Channels',
    victimImpact: '30-60 hours of unpaid engineering/design work stolen without hire',
    mechanics: 'A startup asks an intern to build a full production feature, Figma UI kit, or marketing campaign as an "assessment", then ghosts the applicant while shipping the code to production.',
    tellTaleSign: 'Take-home tests requiring more than 4-6 hours or asking to work directly on production codebases.',
    safeHandling: 'Reputable take-homes are scoped to 2-3 hours and use synthetic mock datasets or toy applications.'
  }
];
