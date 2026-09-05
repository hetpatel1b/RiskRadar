import { HazardZone, HazardType } from '../types';

export interface HazardLayerMeta {
  type: HazardType;
  name: string;
  color: string;
  defaultActive: boolean;
}

export const HAZARD_LAYERS_CONFIG: HazardLayerMeta[] = [
  { type: 'flood', name: 'Flood Inundation', color: '#3B82F6', defaultActive: true },
  { type: 'heavy_rainfall', name: 'Heavy Rainfall', color: '#63D7E5', defaultActive: true },
  { type: 'landslide', name: 'Landslide Hazard', color: '#F59E0B', defaultActive: true },
  { type: 'extreme_temperature', name: 'Extreme Temperature', color: '#EF4444', defaultActive: false },
  { type: 'air_pollution', name: 'Air Pollution (AQI)', color: '#78716C', defaultActive: false },
  { type: 'forest_fire', name: 'Forest Fire Risk', color: '#F05D6B', defaultActive: true },
];

export const MOCK_HAZARD_ZONES: HazardZone[] = [
  {
    id: 'hz-vadodara-flood',
    type: 'flood',
    title: 'Vishwamitri River Inundation Corridor',
    location: 'Vadodara',
    state: 'Gujarat',
    severity: 'critical',
    center: [22.3072, 73.1812],
    // Geographic polygon along Vishwamitri river basin in Vadodara
    coordinates: [
      [22.365, 73.155],
      [22.345, 73.225],
      [22.315, 73.245],
      [22.270, 73.215],
      [22.260, 73.160],
      [22.290, 73.135],
      [22.335, 73.140],
    ],
    areaKm2: 24.6,
    riskScore: 82,
    details: 'River level at 4.72m exceeding severe warning threshold. Low-lying urban sectors inundated.',
  },
  {
    id: 'hz-mumbai-rainfall',
    type: 'heavy_rainfall',
    title: 'Konkan Coast Convective Rainfall Belt',
    location: 'Mumbai',
    state: 'Maharashtra',
    severity: 'warning',
    center: [19.076, 72.8777],
    // Polygon around Mumbai metropolitan coastal zone
    coordinates: [
      [19.280, 72.780],
      [19.295, 72.980],
      [19.120, 73.020],
      [18.900, 72.890],
      [18.910, 72.790],
      [19.100, 72.820],
    ],
    areaKm2: 52.4,
    riskScore: 71,
    details: 'Precipitation intensity 48.4 mm/hr. High tide coincidence forecasted at 14:20 IST.',
  },
  {
    id: 'hz-wayanad-landslide',
    type: 'landslide',
    title: 'Western Ghats Critical Slope Sector',
    location: 'Wayanad',
    state: 'Kerala',
    severity: 'watch',
    center: [11.6854, 76.132],
    // Polygon around Meppadi / Chooralmala foothill slopes
    coordinates: [
      [11.750, 76.080],
      [11.760, 76.190],
      [11.640, 76.220],
      [11.580, 76.120],
      [11.620, 76.050],
    ],
    areaKm2: 18.2,
    riskScore: 64,
    details: 'Soil moisture saturation exceeds 86%. Inclinometers detect micro-shear displacements.',
  },
  {
    id: 'hz-delhi-pollution',
    type: 'air_pollution',
    title: 'Indo-Gangetic Atmospheric Inversion Basin',
    location: 'Delhi NCR',
    state: 'Delhi',
    severity: 'warning',
    center: [28.7041, 77.1025],
    coordinates: [
      [28.880, 76.920],
      [28.890, 77.380],
      [28.480, 77.420],
      [28.420, 77.010],
    ],
    areaKm2: 68.0,
    riskScore: 78,
    details: 'Particulate PM2.5 concentrations exceeding 310 ug/m3 under stagnant wind conditions.',
  },
  {
    id: 'hz-uttarakhand-fire',
    type: 'forest_fire',
    title: 'Garhwal Sub-Himalayan Canopy Sector',
    location: 'Dehradun Foothills',
    state: 'Uttarakhand',
    severity: 'watch',
    center: [30.3165, 78.0322],
    coordinates: [
      [30.420, 77.920],
      [30.450, 78.180],
      [30.220, 78.220],
      [30.180, 77.980],
    ],
    areaKm2: 31.5,
    riskScore: 56,
    details: 'Thermal brightness temperature anomaly detected via MODIS/VIIRS pass.',
  },
  {
    id: 'hz-delhi-temp',
    type: 'extreme_temperature',
    title: 'Northern Plain Extreme Heat Anomaly',
    location: 'North & West Delhi',
    state: 'Delhi',
    severity: 'watch',
    center: [28.6139, 77.209],
    coordinates: [
      [28.750, 76.980],
      [28.780, 77.280],
      [28.520, 77.300],
      [28.480, 77.080],
    ],
    areaKm2: 44.0,
    riskScore: 59,
    details: 'Ambient surface temperature peaked at 43.8 °C with severe urban heat island effect.',
  },
];
