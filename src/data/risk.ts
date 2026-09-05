import { AiRiskAssessmentData } from '../types';

export interface IncidentAiAssessment {
  incidentId: string | null;
  score: number;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  severityLabel: string;
  hazardProbability: string;
  expectedAffectedArea: string;
  confidence: number;
  confidenceLabel: string;
  signals: Array<{
    label: string;
    trend: 'up' | 'down' | 'stable';
    intensity: 'critical' | 'elevated' | 'moderate';
  }>;
  trend: 'ESCALATING' | 'ELEVATED' | 'STABLE';
  summary: string;
}

export const INCIDENT_AI_ASSESSMENTS: Record<string, IncidentAiAssessment> = {
  national: {
    incidentId: null,
    score: 82,
    severity: 'HIGH',
    severityLabel: 'HIGH RISK',
    hazardProbability: '87%',
    expectedAffectedArea: '24.6 km²',
    confidence: 0.91,
    confidenceLabel: 'High confidence',
    signals: [
      { label: 'Heavy rainfall', trend: 'up', intensity: 'elevated' },
      { label: 'River stage', trend: 'up', intensity: 'critical' },
      { label: 'Soil saturation', trend: 'up', intensity: 'elevated' },
    ],
    trend: 'ESCALATING',
    summary: 'Heavy rainfall + rising river level + saturated soil are increasing flood probability in the Vadodara basin.',
  },
  'hz-vadodara-flood': {
    incidentId: 'hz-vadodara-flood',
    score: 82,
    severity: 'CRITICAL',
    severityLabel: 'CRITICAL RISK',
    hazardProbability: '87%',
    expectedAffectedArea: '24.6 km²',
    confidence: 0.91,
    confidenceLabel: 'High confidence',
    signals: [
      { label: 'Heavy rainfall', trend: 'up', intensity: 'elevated' },
      { label: 'River stage', trend: 'up', intensity: 'critical' },
      { label: 'Soil saturation', trend: 'up', intensity: 'elevated' },
    ],
    trend: 'ESCALATING',
    summary: 'Vishwamitri river stage at 4.72m exceeds danger mark (4.50m). Immediate ward-level response active.',
  },
  'hz-mumbai-rainfall': {
    incidentId: 'hz-mumbai-rainfall',
    score: 71,
    severity: 'HIGH',
    severityLabel: 'HIGH RISK',
    hazardProbability: '76%',
    expectedAffectedArea: '52.4 km²',
    confidence: 0.89,
    confidenceLabel: 'High confidence',
    signals: [
      { label: 'Precipitation rate', trend: 'up', intensity: 'critical' },
      { label: 'Tidal confluence', trend: 'up', intensity: 'elevated' },
      { label: 'Drainage inflow', trend: 'up', intensity: 'elevated' },
    ],
    trend: 'ELEVATED',
    summary: 'Intense precipitation band (48.4 mm/hr) converging with high tide coincidence forecasted at 14:20 IST.',
  },
  'hz-wayanad-landslide': {
    incidentId: 'hz-wayanad-landslide',
    score: 64,
    severity: 'ELEVATED',
    severityLabel: 'ELEVATED RISK',
    hazardProbability: '68%',
    expectedAffectedArea: '18.2 km²',
    confidence: 0.86,
    confidenceLabel: 'Moderate confidence',
    signals: [
      { label: 'Soil saturation', trend: 'up', intensity: 'critical' },
      { label: 'Inclinometer shear', trend: 'up', intensity: 'elevated' },
      { label: 'Runoff velocity', trend: 'up', intensity: 'moderate' },
    ],
    trend: 'ELEVATED',
    summary: 'Soil moisture saturation exceeds 86% across Western Ghats; inclinometers detect micro-shear slope displacement.',
  },
  'hz-uttarakhand-fire': {
    incidentId: 'hz-uttarakhand-fire',
    score: 56,
    severity: 'MODERATE',
    severityLabel: 'MODERATE RISK',
    hazardProbability: '58%',
    expectedAffectedArea: '31.5 km²',
    confidence: 0.84,
    confidenceLabel: 'Moderate confidence',
    signals: [
      { label: 'Thermal anomaly', trend: 'up', intensity: 'elevated' },
      { label: 'Ambient humidity', trend: 'down', intensity: 'critical' },
      { label: 'Canopy wind speed', trend: 'up', intensity: 'moderate' },
    ],
    trend: 'STABLE',
    summary: 'Thermal brightness temperature anomaly detected via MODIS/VIIRS pass in Garhwal sub-Himalayan canopy sector.',
  },
  'hz-delhi-pollution': {
    incidentId: 'hz-delhi-pollution',
    score: 78,
    severity: 'HIGH',
    severityLabel: 'HIGH RISK',
    hazardProbability: '82%',
    expectedAffectedArea: '68.0 km²',
    confidence: 0.93,
    confidenceLabel: 'High confidence',
    signals: [
      { label: 'PM2.5 density', trend: 'up', intensity: 'critical' },
      { label: 'Thermal inversion', trend: 'up', intensity: 'elevated' },
      { label: 'Wind stagnation', trend: 'down', intensity: 'elevated' },
    ],
    trend: 'ESCALATING',
    summary: 'Indo-Gangetic atmospheric inversion basin trapping PM2.5 particulates exceeding 310 µg/m³.',
  },
};

export const NORMALIZE_INCIDENT_ID: Record<string, string> = {
  // Vadodara aliases
  vadodara: 'hz-vadodara-flood',
  'alt-vadodara-flood': 'hz-vadodara-flood',
  'hz-vadodara-flood': 'hz-vadodara-flood',

  // Mumbai aliases
  mumbai: 'hz-mumbai-rainfall',
  'alt-mumbai-rainfall': 'hz-mumbai-rainfall',
  'hz-mumbai-rainfall': 'hz-mumbai-rainfall',

  // Wayanad aliases
  wayanad: 'hz-wayanad-landslide',
  'alt-wayanad-landslide': 'hz-wayanad-landslide',
  'hz-wayanad-landslide': 'hz-wayanad-landslide',

  // Dehradun / Uttarakhand aliases
  dehradun: 'hz-uttarakhand-fire',
  uttarakhand: 'hz-uttarakhand-fire',
  'alt-uttarakhand-fire': 'hz-uttarakhand-fire',
  'hz-uttarakhand-fire': 'hz-uttarakhand-fire',

  // Delhi aliases
  delhi: 'hz-delhi-pollution',
  'alt-delhi-pollution': 'hz-delhi-pollution',
  'hz-delhi-pollution': 'hz-delhi-pollution',
};

export const normalizeIncidentId = (id: string | null | undefined): string | null => {
  if (!id) return null;
  const key = id.toLowerCase().trim();
  return NORMALIZE_INCIDENT_ID[key] || id;
};

// Aliases directly populated for instantaneous lookup without re-normalization
INCIDENT_AI_ASSESSMENTS['vadodara'] = INCIDENT_AI_ASSESSMENTS['hz-vadodara-flood'];
INCIDENT_AI_ASSESSMENTS['alt-vadodara-flood'] = INCIDENT_AI_ASSESSMENTS['hz-vadodara-flood'];
INCIDENT_AI_ASSESSMENTS['mumbai'] = INCIDENT_AI_ASSESSMENTS['hz-mumbai-rainfall'];
INCIDENT_AI_ASSESSMENTS['alt-mumbai-rainfall'] = INCIDENT_AI_ASSESSMENTS['hz-mumbai-rainfall'];
INCIDENT_AI_ASSESSMENTS['wayanad'] = INCIDENT_AI_ASSESSMENTS['hz-wayanad-landslide'];
INCIDENT_AI_ASSESSMENTS['alt-wayanad-landslide'] = INCIDENT_AI_ASSESSMENTS['hz-wayanad-landslide'];
INCIDENT_AI_ASSESSMENTS['dehradun'] = INCIDENT_AI_ASSESSMENTS['hz-uttarakhand-fire'];
INCIDENT_AI_ASSESSMENTS['uttarakhand'] = INCIDENT_AI_ASSESSMENTS['hz-uttarakhand-fire'];
INCIDENT_AI_ASSESSMENTS['alt-uttarakhand-fire'] = INCIDENT_AI_ASSESSMENTS['hz-uttarakhand-fire'];

export const MOCK_AI_ASSESSMENT: AiRiskAssessmentData = {
  score: 82,
  severity: 'HIGH',
  hazardProbability: '87%',
  expectedAffectedArea: '24.6 km²',
  keyDrivers: [
    { label: 'Heavy rainfall', impact: 'High (+32%)' },
    { label: 'River level', impact: 'Critical (+41%)' },
    { label: 'Soil saturation', impact: 'Elevated (+14%)' },
  ],
};
