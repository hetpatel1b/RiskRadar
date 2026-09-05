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
  severity: HazardSeverity;
  coordinates: [number, number][]; // [lat, lng] pairs
  areaKm2: number;
  riskScore: number;
  details: string;
}

export interface AlertItem {
  id: string;
  severity: HazardSeverity;
  hazardType: HazardType;
  location: string;
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

export interface InfrastructureStats {
  totalDevices: number;
  online: number;
  offline: number;
  gatewayHealth: number;
  networkHealth: number;
}
