import React from 'react';
import { MOCK_AI_ASSESSMENT } from '../../data/risk';
import './AiRiskCard.css';

export const AiRiskCard: React.FC = () => {
  const assessment = MOCK_AI_ASSESSMENT;

  // Arc calculation for precision SVG gauge (semi-circle / 180 deg)
  const radius = 30;
  const strokeWidth = 3;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (assessment.score / 100) * circumference;

  return (
    <div className="rr-ai-section" aria-label="AI Risk Assessment">
      {/* Section Header */}
      <div className="rr-ai-section-header">
        <span className="rr-ai-section-title">AI RISK ASSESSMENT</span>
        <span className="status-badge critical">HIGH RISK</span>
      </div>

      {/* Primary Metric & Risk Meter */}
      <div className="rr-ai-primary-row">
        <div className="rr-ai-gauge-block">
          <svg className="rr-ai-arc-svg" width="76" height="44" viewBox="0 0 76 44">
            <path
              d="M 8 38 A 30 30 0 0 1 68 38"
              fill="none"
              stroke="var(--border-obsidian)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M 8 38 A 30 30 0 0 1 68 38"
              fill="none"
              stroke="var(--semantic-critical)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="rr-ai-gauge-val">
            <span className="rr-ai-main-num font-mono">{assessment.score}%</span>
          </div>
        </div>

        <div className="rr-ai-key-stats">
          <div className="rr-ai-sub-stat">
            <span className="rr-sub-stat-label">Hazard Probability</span>
            <span className="rr-sub-stat-val font-mono critical">{assessment.hazardProbability}</span>
          </div>
          <div className="rr-ai-sub-stat">
            <span className="rr-sub-stat-label">Affected Area</span>
            <span className="rr-sub-stat-val font-mono">{assessment.expectedAffectedArea}</span>
          </div>
        </div>
      </div>

      {/* Why This Risk */}
      <div className="rr-ai-drivers-block">
        <span className="rr-ai-drivers-label">WHY THIS RISK?</span>
        <div className="rr-ai-drivers-row">
          {assessment.keyDrivers.map((driver) => (
            <div key={driver.label} className="rr-driver-item">
              <span className="rr-driver-dot" />
              <span className="rr-driver-name">{driver.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
