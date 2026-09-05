import type { SensorNode } from '../types/sensor';

export const mockSensors: SensorNode[] = [
  {
    id: 'HYD-041',
    name: 'Basin River Stage Acoustic Radar',
    type: 'hydrological',
    gatewayId: 'GW-SEC4-ALPHA',
    sector: 'Sector 04',
    coordinates: { lat: 28.6145, lng: 77.2085 },
    status: 'online',
    batteryLevel: 94,
    signalRssi: -72,
    lastPing: '4s ago',
    currentReading: {
      label: 'Stage Height',
      value: 4.82,
      unit: 'm',
      isCritical: true
    }
  },
  {
    id: 'GEO-019',
    name: 'Ridge Tiltmeter & Pore Pressure',
    type: 'geotechnical',
    gatewayId: 'GW-SEC7-BRAVO',
    sector: 'Sector 07',
    coordinates: { lat: 28.6442, lng: 77.1735 },
    status: 'online',
    batteryLevel: 88,
    signalRssi: -81,
    lastPing: '9s ago',
    currentReading: {
      label: 'Displacement',
      value: 14.2,
      unit: 'mm/h',
      isWarning: true
    }
  },
  {
    id: 'PLV-082',
    name: 'Highland Optical Rain Gauge',
    type: 'pluviometer',
    gatewayId: 'GW-SEC2-CHARLIE',
    sector: 'Sector 02',
    coordinates: { lat: 28.5830, lng: 77.2405 },
    status: 'online',
    batteryLevel: 98,
    signalRssi: -65,
    lastPing: '2s ago',
    currentReading: {
      label: 'Precipitation Rate',
      value: 38.6,
      unit: 'mm/h',
      isWarning: true
    }
  },
  {
    id: 'AQI-034',
    name: 'Industrial Zone Laser Particulate Node',
    type: 'air_quality',
    gatewayId: 'GW-SEC5-DELTA',
    sector: 'Sector 05',
    coordinates: { lat: 28.6695, lng: 77.2590 },
    status: 'online',
    batteryLevel: 82,
    signalRssi: -79,
    lastPing: '15s ago',
    currentReading: {
      label: 'AQI Index',
      value: 142,
      unit: 'AQI',
      isWarning: true
    }
  },
  {
    id: 'ATM-108',
    name: 'Valley Micro-Meteorological Station',
    type: 'atmospheric',
    gatewayId: 'GW-SEC4-ALPHA',
    sector: 'Sector 04',
    coordinates: { lat: 28.5990, lng: 77.2150 },
    status: 'online',
    batteryLevel: 91,
    signalRssi: -69,
    lastPing: '6s ago',
    currentReading: {
      label: 'Humidity',
      value: 89,
      unit: '% RH',
      isWarning: false
    }
  },
  {
    id: 'THM-063',
    name: 'Urban Core Thermal Infrared Sensor',
    type: 'thermal',
    gatewayId: 'GW-SEC8-ECHO',
    sector: 'Sector 08',
    coordinates: { lat: 28.6015, lng: 77.3090 },
    status: 'online',
    batteryLevel: 76,
    signalRssi: -84,
    lastPing: '22s ago',
    currentReading: {
      label: 'Ambient Temp',
      value: 34.2,
      unit: '°C',
      isWarning: false
    }
  }
];

export const sensorNetworkSummary = {
  totalCount: 1248,
  onlineCount: 1201,
  degradedCount: 31,
  offlineCount: 16,
  operationalRate: 96.2,
};
