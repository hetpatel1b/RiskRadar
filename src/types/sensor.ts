export type SensorType = 
  | 'hydrological' 
  | 'pluviometer' 
  | 'geotechnical' 
  | 'atmospheric' 
  | 'air_quality' 
  | 'thermal';

export type SensorStatus = 'online' | 'degraded' | 'offline' | 'calibrating';

export interface SensorNode {
  id: string;
  name: string;
  type: SensorType;
  gatewayId: string;
  sector: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: SensorStatus;
  batteryLevel: number; // percentage
  signalRssi: number; // dBm e.g. -78
  lastPing: string;
  currentReading: {
    label: string;
    value: number | string;
    unit: string;
    isWarning?: boolean;
    isCritical?: boolean;
  };
}
