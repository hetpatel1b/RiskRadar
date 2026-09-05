export type HazardCategory = 
  | 'flood' 
  | 'rainfall' 
  | 'landslide' 
  | 'temperature' 
  | 'air_pollution' 
  | 'wildfire';

export type HazardSeverity = 'critical' | 'warning' | 'watch' | 'safe';

export interface HazardIncident {
  id: string;
  category: HazardCategory;
  name: string;
  sector: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  severity: HazardSeverity;
  affectedAreaKm2: number;
  populationAtRisk: number;
  reportedAt: string;
  status: 'active' | 'escalating' | 'stabilizing' | 'contained';
  primaryMetric: {
    label: string;
    value: string;
    threshold: string;
  };
}

export interface HazardLayerConfig {
  id: HazardCategory;
  label: string;
  active: boolean;
  color: string;
  activeIncidentsCount: number;
}
