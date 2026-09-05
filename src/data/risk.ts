import type { AiRiskAssessment } from '../types/risk';

export const mockAiRiskAssessment: AiRiskAssessment = {
  overallRiskScore: 82,
  riskLevel: 'HIGH',
  severityLevel: 'critical',
  expectedAffectedAreaKm2: 24.6,
  estimatedPopulationImpact: 42300,
  confidenceScore: 94.6,
  modelName: 'DeepHazards Multi-Modal Ensemble v4.2',
  lastCalculated: 'Just now (08:48:10 UTC)',
  hazardProbabilities: [
    { hazard: 'Flash Flood / Basin Inundation', probability: 88, severity: 'critical' },
    { hazard: 'Slope Liquefaction / Landslide', probability: 74, severity: 'warning' },
    { hazard: 'Torrential Precipitation Surge', probability: 68, severity: 'warning' },
    { hazard: 'Particulate Inversion (AQI)', probability: 42, severity: 'watch' },
  ],
  contributingFactors: [
    {
      factor: 'Soil Moisture Saturation',
      weight: 94,
      impact: 'critical',
      description: 'Pre-existing moisture index 94% leaves zero infiltration capacity.'
    },
    {
      factor: 'Cumulative 3h Precipitation',
      weight: 86,
      impact: 'critical',
      description: '112.4mm sustained downpour exceeds 10-year catchment return interval.'
    },
    {
      factor: 'River Discharge Differential',
      weight: 78,
      impact: 'elevating',
      description: 'Discharge volume +42% above safe baseline at Sluice Gate Alpha.'
    },
    {
      factor: 'Terrain Slope Steepness (>32°)',
      weight: 71,
      impact: 'elevating',
      description: 'Steep incline in Sector 7 accelerates kinetic runoff and instability.'
    }
  ]
};
