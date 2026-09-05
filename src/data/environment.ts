import { EnvironmentalTelemetry } from '../types';

export const MOCK_ENVIRONMENTAL: EnvironmentalTelemetry = {
  temperature: { value: '32.4', unit: '°C', trend: 'up' },
  humidity: { value: '74', unit: '%', trend: 'up' },
  rainfall: { value: '18.6', unit: 'mm', trend: 'up' },
  airQuality: { value: '82', unit: 'AQI', trend: 'stable' },
  waterLevel: { value: '4.72', unit: 'm', trend: 'up' },
};
