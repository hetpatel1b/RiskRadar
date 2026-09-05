import { AiRiskAssessmentData } from '../types';

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
