import React, { useEffect, useState } from 'react';
import { INCIDENT_AI_ASSESSMENTS } from '../../data/risk';
import './AiRiskCard.css';

interface AiRiskCardProps {
  selectedIncidentId?: string | null;
}

export const AiRiskCard: React.FC<AiRiskCardProps> = ({ selectedIncidentId }) => {
  // Derive assessment data from single source of truth (Sections 50, 51, 52)
  const assessment =
    (selectedIncidentId && INCIDENT_AI_ASSESSMENTS[selectedIncidentId]) ||
    INCIDENT_AI_ASSESSMENTS.national;

  // Animation for radial score progress (0 → score on mount/change, Section 04)
  const [displayScore, setDisplayScore] = useState<number>(0);

  useEffect(() => {
    setDisplayScore(0);
    const timer = setTimeout(() => {
      setDisplayScore(assessment.score);
    }, 40);
    return () => clearTimeout(timer);
  }, [assessment.score]);

  // SVG circular ring calculation (compact radius = 24, viewBox 0 0 58 58)
  const radius = 24;
  const circumference = 2 * Math.PI * radius; // ~150.80
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const isCritical = assessment.severity === 'CRITICAL';
  const isHigh = assessment.severity === 'HIGH';
  const isElevated = assessment.severity === 'ELEVATED';

  const riskColor = isCritical
    ? '#F05D6B'
    : isHigh
    ? '#F05D6B'
    : isElevated
    ? '#F09A3E'
    : '#F59E0B';

  const sevBadgeClass = isCritical
    ? 'critical'
    : isHigh
    ? 'critical'
    : isElevated
    ? 'warning'
    : 'watch';

  return (
    <div className="rr-ai-section" aria-label="AI Risk Assessment Intelligence Panel">
      {/* 1. Header with Live Prediction Status */}
      <div className="rr-ai-section-header">
        <div className="rr-ai-title-wrap">
          <span className="rr-ai-section-title">AI RISK ASSESSMENT</span>
          <div className="rr-ai-engine-status">
            <span className="rr-ai-live-dot" />
            <span className="rr-ai-live-text font-mono">MODEL LIVE</span>
          </div>
        </div>
        <span className={`status-badge ${sevBadgeClass}`}>
          {assessment.severityLabel}
        </span>
      </div>

      {/* 2. Primary Risk Gauge & Radial Visualization */}
      <div className="rr-ai-radial-row">
        <div className="rr-ai-radial-block">
          <svg className="rr-ai-ring-svg" width="58" height="58" viewBox="0 0 58 58">
            {/* Background track */}
            <circle
              cx="29"
              cy="29"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3.5"
            />
            {/* Animated progress ring */}
            <circle
              className="rr-ai-progress-arc"
              cx="29"
              cy="29"
              r={radius}
              fill="none"
              stroke={riskColor}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 29 29)"
              style={{
                filter: `drop-shadow(0 0 3px ${riskColor}40)`,
              }}
            />
          </svg>
          <div className="rr-ai-ring-center">
            <span className="rr-ai-ring-val font-mono">{assessment.score}%</span>
            <span className="rr-ai-ring-label" style={{ color: riskColor }}>
              {assessment.severity}
            </span>
          </div>
        </div>

        {/* 3. Supporting Baseline-Aligned Metrics */}
        <div className="rr-ai-metrics-grid">
          <div className="rr-ai-metric-cell">
            <span className="rr-ai-metric-label">PROBABILITY</span>
            <span className="rr-ai-metric-value font-mono">{assessment.hazardProbability}</span>
            <span className="rr-ai-metric-context font-mono">↑ Elevated</span>
          </div>
          <div className="rr-ai-metric-cell">
            <span className="rr-ai-metric-label">AFFECTED AREA</span>
            <span className="rr-ai-metric-value font-mono">{assessment.expectedAffectedArea}</span>
            <span className="rr-ai-metric-context">Active basin</span>
          </div>
          <div className="rr-ai-metric-cell">
            <span className="rr-ai-metric-label">AI CONFIDENCE</span>
            <span className="rr-ai-metric-value font-mono">{assessment.confidence}</span>
            <span className="rr-ai-metric-context">{assessment.confidenceLabel}</span>
          </div>
        </div>
      </div>

      {/* 4. AI Signals with Staggered Processing Animation */}
      <div className="rr-ai-signals-block">
        <div className="rr-ai-signals-header">
          <span className="rr-ai-signals-title">AI SIGNALS</span>
          <div className="rr-ai-trend-indicator font-mono">
            <span>Trend:</span>
            <strong className={assessment.trend.toLowerCase()}>{assessment.trend} ↑</strong>
          </div>
        </div>

        <div className="rr-ai-signals-row">
          {assessment.signals.map((signal, idx) => (
            <div
              key={signal.label}
              className="rr-signal-item"
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              <span className={`rr-signal-dot ${signal.intensity}`} />
              <span className="rr-signal-label">{signal.label}</span>
              <span className="rr-signal-arrow font-mono">
                {signal.trend === 'up' ? '↑' : signal.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Concise AI Decision Explanation */}
      <div className="rr-ai-narrative-box">
        <p className="rr-ai-narrative-text">{assessment.summary}</p>
      </div>
    </div>
  );
};
