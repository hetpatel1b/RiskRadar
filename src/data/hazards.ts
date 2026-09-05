import type { HazardIncident, HazardLayerConfig } from '../types/hazard';

export const initialHazardLayers: HazardLayerConfig[] = [
  { id: 'flood', label: 'Flood Inundation', active: true, color: '#00E5FF', activeIncidentsCount: 2 },
  { id: 'rainfall', label: 'Heavy Rainfall', active: true, color: '#38BDF8', activeIncidentsCount: 1 },
  { id: 'landslide', label: 'Landslide Hazard', active: true, color: '#F97316', activeIncidentsCount: 1 },
  { id: 'temperature', label: 'Extreme Temp', active: false, color: '#EF4444', activeIncidentsCount: 1 },
  { id: 'air_pollution', label: 'Air Pollution', active: false, color: '#EAB308', activeIncidentsCount: 1 },
  { id: 'wildfire', label: 'Forest Fire', active: false, color: '#DC2626', activeIncidentsCount: 0 },
];

export const mockHazards: HazardIncident[] = [
  {
    id: 'HZ-2026-081',
    category: 'flood',
    name: 'Basin River Cresting & Flash Flood',
    sector: 'Sector 04 - Northern Basin',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    severity: 'critical',
    affectedAreaKm2: 14.2,
    populationAtRisk: 18450,
    reportedAt: '12 min ago',
    status: 'escalating',
    primaryMetric: {
      label: 'River Level',
      value: '+4.82m',
      threshold: 'Crest +0.62m'
    }
  },
  {
    id: 'HZ-2026-082',
    category: 'landslide',
    name: 'Steep Slope Soil Liquefaction',
    sector: 'Sector 07 - Ridge Corridor',
    coordinates: { lat: 28.6450, lng: 77.1720 },
    severity: 'warning',
    affectedAreaKm2: 4.8,
    populationAtRisk: 3120,
    reportedAt: '24 min ago',
    status: 'active',
    primaryMetric: {
      label: 'Tilt Rate',
      value: '2.8°/hr',
      threshold: 'Alarm 2.0°'
    }
  },
  {
    id: 'HZ-2026-083',
    category: 'rainfall',
    name: 'Torrential Cloudburst Zone',
    sector: 'Sector 02 - Highland Catchment',
    coordinates: { lat: 28.5820, lng: 77.2410 },
    severity: 'warning',
    affectedAreaKm2: 5.6,
    populationAtRisk: 8600,
    reportedAt: '38 min ago',
    status: 'active',
    primaryMetric: {
      label: 'Precipitation',
      value: '112.4 mm/3h',
      threshold: 'Warn 90mm'
    }
  },
  {
    id: 'HZ-2026-084',
    category: 'flood',
    name: 'Low-Lying Drainage Backup',
    sector: 'Sector 09 - Southern Urban Delta',
    coordinates: { lat: 28.5240, lng: 77.1950 },
    severity: 'watch',
    affectedAreaKm2: 3.2,
    populationAtRisk: 4200,
    reportedAt: '1 hr ago',
    status: 'stabilizing',
    primaryMetric: {
      label: 'Retention Basin',
      value: '91% Full',
      threshold: 'Max 95%'
    }
  },
  {
    id: 'HZ-2026-085',
    category: 'air_pollution',
    name: 'Thermal Inversion Particulate Surge',
    sector: 'Sector 05 - Industrial Sub-district',
    coordinates: { lat: 28.6700, lng: 77.2600 },
    severity: 'warning',
    affectedAreaKm2: 6.4,
    populationAtRisk: 14900,
    reportedAt: '1.5 hrs ago',
    status: 'active',
    primaryMetric: {
      label: 'PM2.5 Conc.',
      value: '168 µg/m³',
      threshold: 'Safe 35'
    }
  },
  {
    id: 'HZ-2026-086',
    category: 'temperature',
    name: 'Localized Severe Thermal Anomaly',
    sector: 'Sector 08 - Eastern Flats',
    coordinates: { lat: 28.6010, lng: 77.3100 },
    severity: 'watch',
    affectedAreaKm2: 2.1,
    populationAtRisk: 2100,
    reportedAt: '2 hrs ago',
    status: 'stabilizing',
    primaryMetric: {
      label: 'Surface Temp',
      value: '38.4 °C',
      threshold: 'Normal 32°'
    }
  }
];
