export type ThreatLevel = 'SAFE' | 'LOW' | 'SUSPICIOUS' | 'CRITICAL_SCAM';

export interface RedFlag {
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  evidenceQuote?: string;
  category: 'FINANCIAL' | 'COMMUNICATION' | 'DOMAIN_IDENTITY' | 'CONTRACTUAL' | 'INTERVIEW_PROCESS';
}

export interface GreenFlag {
  title: string;
  description: string;
}

export interface ActionPlanItem {
  step: number;
  title: string;
  action: string;
  type: 'WARNING' | 'ACTION' | 'REPORT';
}

export interface DomainAnalysis {
  claimedDomain?: string;
  actualDomain?: string;
  isFreeProvider: boolean;
  isLookalikeDomain: boolean;
  domainNotes: string;
}

export interface ReportingLink {
  name: string;
  url: string;
  purpose: string;
}

export interface ScamAnalysisResult {
  riskScore: number; // 0 to 100
  threatLevel: ThreatLevel;
  verdict: string;
  scamCategory: string;
  confidence: number;
  redFlags: RedFlag[];
  greenFlags: GreenFlag[];
  breakdown: {
    financialRisk: number;
    identityRisk: number;
    domainReputationRisk: number;
    processRisk: number;
  };
  keyFindings: string[];
  immediateActionPlan: ActionPlanItem[];
  emailVerificationTemplate?: {
    subject: string;
    body: string;
    explanation: string;
  };
  domainAnalysis?: DomainAnalysis;
  officialReportingLinks: ReportingLink[];
  analyzedAt: string;
}

export interface SampleTestCase {
  id: string;
  badge: string;
  title: string;
  company: string;
  senderEmail: string;
  platform: string;
  preview: string;
  fullContent: string;
  expectedVerdict: 'SCAM' | 'SAFE' | 'SUSPICIOUS';
  scamType: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  details: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: string;
}
