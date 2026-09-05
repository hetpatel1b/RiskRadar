import type { EmergencyAlert } from '../types/alert';

export const mockAlerts: EmergencyAlert[] = [
  {
    id: 'ALT-01',
    hazardType: 'Flash Inundation Alert',
    title: 'Rapid River Basin Crest Warning',
    severity: 'critical',
    location: 'Sector 04 — North Basin Reach (Grid 4A)',
    sector: 'Sector 04',
    timestamp: '08:42:15 UTC (6m ago)',
    impactSummary: 'Water level reached +4.82m exceeding flood danger line. Inundation risk for 18,450 residents.',
    recommendedAction: 'Execute Standard Evacuation Protocol Echo-4; Activate automated flood barriers at Sluice 2.',
    acknowledged: false,
    source: 'Hydrology Station'
  },
  {
    id: 'ALT-02',
    hazardType: 'Geotechnical Slope Alert',
    title: 'High Landslide Displacement Probability',
    severity: 'warning',
    location: 'Sector 07 — Ridge Cut Corridor (Grid 7C)',
    sector: 'Sector 07',
    timestamp: '08:31:00 UTC (17m ago)',
    impactSummary: 'Pore pressure sensors indicate saturation rate at 94% with 14.2mm/h movement along escarpment.',
    recommendedAction: 'Restrict heavy vehicle transit along State Highway 14; Deploy geotechnical inspection squad.',
    acknowledged: false,
    source: 'AI Early Warning'
  },
  {
    id: 'ALT-03',
    hazardType: 'Atmospheric Inversion Alert',
    title: 'Hazardous Particulate Concentration Surge',
    severity: 'warning',
    location: 'Sector 05 — East Industrial Zone (Grid 5B)',
    sector: 'Sector 05',
    timestamp: '08:14:20 UTC (34m ago)',
    impactSummary: 'Laser scatter sensors recorded PM2.5 at 168 µg/m³ under persistent atmospheric capping.',
    recommendedAction: 'Issue Public Air Advisory Grade 3; Halt non-essential industrial combustion processes.',
    acknowledged: true,
    source: 'Telemetry Threshold'
  }
];
