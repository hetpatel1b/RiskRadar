import type { HazardSeverity } from './hazard';

export interface EnvironmentalMetric {
  id: string;
  name: string;
  category: 'temperature' | 'humidity' | 'rainfall' | 'air_quality' | 'water_level';
  value: number;
  unit: string;
  status: HazardSeverity;
  statusText: string;
  threshold: {
    warning: number;
    critical: number;
  };
  trend: 'rising' | 'falling' | 'stable';
  change24h: string;
  sparkline: number[];
  stationId: string;
  stationName: string;
}
