import type { EnvironmentalMetric } from '../types/environment';

export const mockEnvironmentalMetrics: EnvironmentalMetric[] = [
  {
    id: 'env-water',
    name: 'Basin River Crest',
    category: 'water_level',
    value: 4.82,
    unit: 'm',
    status: 'critical',
    statusText: 'CRITICAL CREST (+0.62m over flood line)',
    threshold: { warning: 3.8, critical: 4.2 },
    trend: 'rising',
    change24h: '+1.42m in 6h',
    sparkline: [2.8, 3.1, 3.4, 3.8, 4.2, 4.6, 4.82],
    stationId: 'ST-HYD-04',
    stationName: 'North River Basin Sluice Alpha'
  },
  {
    id: 'env-rain',
    name: '3-Hour Precipitation',
    category: 'rainfall',
    value: 112.4,
    unit: 'mm',
    status: 'warning',
    statusText: 'TORRENTIAL INTENSITY',
    threshold: { warning: 75, critical: 120 },
    trend: 'rising',
    change24h: '+54.2mm in 3h',
    sparkline: [12, 28, 45, 68, 88, 102, 112.4],
    stationId: 'ST-PLV-02',
    stationName: 'Highland Ridge Catchment 2'
  },
  {
    id: 'env-aqi',
    name: 'Air Quality Index',
    category: 'air_quality',
    value: 142,
    unit: 'AQI',
    status: 'warning',
    statusText: 'UNHEALTHY FOR SENSITIVE GROUPS',
    threshold: { warning: 100, critical: 200 },
    trend: 'stable',
    change24h: '+18 AQI vs yesterday',
    sparkline: [85, 95, 110, 130, 145, 140, 142],
    stationId: 'ST-AQI-05',
    stationName: 'Industrial Corridor Air Station'
  },
  {
    id: 'env-humidity',
    name: 'Relative Humidity',
    category: 'humidity',
    value: 89,
    unit: '%',
    status: 'watch',
    statusText: 'ATMOSPHERIC SATURATION',
    threshold: { warning: 85, critical: 95 },
    trend: 'rising',
    change24h: '+12% in 12h',
    sparkline: [65, 70, 75, 80, 84, 87, 89],
    stationId: 'ST-ATM-04',
    stationName: 'Valley Micro-Climate Tower'
  },
  {
    id: 'env-temp',
    name: 'Ambient Temperature',
    category: 'temperature',
    value: 34.2,
    unit: '°C',
    status: 'safe',
    statusText: 'WITHIN NOMINAL RANGE',
    threshold: { warning: 38, critical: 44 },
    trend: 'stable',
    change24h: '-0.8°C vs peak',
    sparkline: [31.5, 32.8, 34.0, 35.1, 35.0, 34.6, 34.2],
    stationId: 'ST-THM-01',
    stationName: 'Central District Urban Node'
  }
];
