export type HazardType = 
  | 'flood' 
  | 'heavy_rainfall' 
  | 'landslide' 
  | 'extreme_temperature' 
  | 'air_pollution' 
  | 'forest_fire';

export type HazardSeverity = 'safe' | 'watch' | 'warning' | 'critical';

export type SensorStatus = 'online' | 'warning' | 'critical' | 'offline';

export interface SensorData {
  id: string;
  code: string;
  name: string;
  location: string;
  state: string;
  lat: number;
  lng: number;
  type: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  waterLevel: number;
  battery: number;
  aqi?: number;
  status: SensorStatus;
  lastUpdate: string;
}

export interface HazardZone {
  id: string;
  type: HazardType;
  title: string;
  location: string;
  state: string;
  severity: HazardSeverity;
  coordinates: [number, number][]; // [lat, lng] polygon vertices
  center: [number, number]; // [lat, lng]
  areaKm2: number;
  riskScore: number;
  details: string;
}

export interface AlertItem {
  id: string;
  severity: HazardSeverity;
  hazardType: HazardType;
  location: string;
  state: string;
  timestamp: string;
  summary: string;
  lat: number;
  lng: number;
}

export interface KpiMetrics {
  activeHazards: string;
  activeAlerts: string;
  atRiskArea: string;
  onlineSensors: string;
  aiRiskScore: string;
  systemHealth: string;
}

export interface EnvironmentalTelemetry {
  temperature: { value: string; unit: string; trend: 'up' | 'down' | 'stable' };
  humidity: { value: string; unit: string; trend: 'up' | 'down' | 'stable' };
  rainfall: { value: string; unit: string; trend: 'up' | 'down' | 'stable' };
  airQuality: { value: string; unit: string; trend: 'up' | 'down' | 'stable' };
  waterLevel: { value: string; unit: string; trend: 'up' | 'down' | 'stable' };
}

export interface InfrastructureStats {
  totalDevices: number;
  online: number;
  offline: number;
  gatewayHealth: number;
  networkHealth: number;
}

export interface AiRiskAssessmentData {
  score: number;
  severity: 'ELEVATED' | 'HIGH' | 'CRITICAL';
  hazardProbability: string;
  expectedAffectedArea: string;
  keyDrivers: Array<{ label: string; impact: string }>;
}
