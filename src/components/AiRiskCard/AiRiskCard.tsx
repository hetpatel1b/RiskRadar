import React from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { MOCK_AI_ASSESSMENT } from '../../data/mockData';
import './AiRiskCard.css';

export const AiRiskCard: React.FC = () => {
  const assessment = MOCK_AI_ASSESSMENT;

  return (
    <div className="rr-ai-card" aria-label="AI Risk Assessment Card">
      {/* Header */}
      <div className="rr-ai-header">
        <div className="rr-ai-title-wrap">
          <BrainCircuit size={15} color="var(--accent-cyan)" />
          <span className="rr-ai-title">AI Risk Assessment</span>
        </div>
        <div className="rr-ai-badge">
          <Sparkles size={11} />
          <span>Predictive Model</span>
        </div>
      </div>

      {/* Primary Score Row */}
      <div className="rr-ai-score-row">
        <div className="rr-ai-score-group">
          <span className="rr-ai-score-num tabular-nums">{assessment.score}%</span>
          <span className="rr-ai-score-level">{assessment.severity}</span>
        </div>
        <span className="status-pill critical">Escalated</span>
      </div>

      {/* Secondary Metrics */}
      <div className="rr-ai-metrics-grid tabular-nums">
        <div className="rr-ai-sub-metric">
          <span className="rr-ai-sub-label">Hazard Probability</span>
          <span className="rr-ai-sub-value" style={{ color: '#ef4444' }}>
            {assessment.hazardProbability}
          </span>
        </div>
        <div className="rr-ai-sub-metric">
          <span className="rr-ai-sub-label">Expected Affected Area</span>
          <span className="rr-ai-sub-value" style={{ color: '#fb923c' }}>
            {assessment.expectedAffectedArea}
          </span>
        </div>
      </div>

      {/* Key Drivers / Why This Risk */}
      <div className="rr-ai-drivers-section">
        <span className="rr-ai-drivers-title">Why This Risk?</span>
        <div className="rr-ai-drivers-list">
          {assessment.keyDrivers.map((driver) => (
            <div key={driver.label} className="rr-ai-driver-pill">
              <span className="rr-driver-pip" />
              <span>{driver.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
