import type { HazardSeverity } from './hazard';

export interface ContributingFactor {
  factor: string;
  weight: number;
  impact: 'elevating' | 'moderating' | 'critical';
  description: string;
}

export interface HazardProbability {
  hazard: string;
  probability: number;
  severity: HazardSeverity;
}

export interface AiRiskAssessment {
  overallRiskScore: number;
  riskLevel: 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  severityLevel: HazardSeverity;
  expectedAffectedAreaKm2: number;
  estimatedPopulationImpact: number;
  confidenceScore: number;
  modelName: string;
  lastCalculated: string;
  hazardProbabilities: HazardProbability[];
  contributingFactors: ContributingFactor[];
}
