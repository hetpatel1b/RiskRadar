import type { HazardSeverity } from './hazard';

export interface EmergencyAlert {
  id: string;
  hazardType: string;
  title: string;
  severity: HazardSeverity;
  location: string;
  sector: string;
  timestamp: string;
  impactSummary: string;
  recommendedAction: string;
  acknowledged: boolean;
  source: 'AI Early Warning' | 'Hydrology Station' | 'Telemetry Threshold' | 'Civil Defense Relay';
}
