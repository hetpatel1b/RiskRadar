import React from 'react';
import { X } from 'lucide-react';
import { HazardZone } from '../../types';
import './RiskMap.css';

interface IncidentDetailCardProps {
  zone: HazardZone;
  onClose: () => void;
  position: { left: number; top: number };
  isClosing: boolean;
}

export const IncidentDetailCard: React.FC<IncidentDetailCardProps> = ({
  zone,
  onClose,
  position,
  isClosing,
}) => {
  const isCritical = zone.severity === 'critical';
  const isWarning = zone.severity === 'warning';

  const sevColor = isCritical ? '#F05D6B' : isWarning ? '#F09A3E' : '#F59E0B';
  const sevBg = isCritical
    ? 'rgba(240, 93, 107, 0.14)'
    : isWarning
    ? 'rgba(240, 154, 62, 0.14)'
    : 'rgba(245, 158, 11, 0.14)';
  const sevBorder = isCritical
    ? 'rgba(240, 93, 107, 0.35)'
    : isWarning
    ? 'rgba(240, 154, 62, 0.35)'
    : 'rgba(245, 158, 11, 0.35)';

  const hazardName = zone.type.replace('_', ' ').toUpperCase();

  return (
    <div
      className={`rr-incident-detail-card ${isClosing ? 'closing' : 'open'}`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`Operational incident details for ${zone.location}`}
    >
      {/* Top Header Row */}
      <div className="rr-inc-card-header">
        <div
          className="rr-inc-card-badge"
          style={{ color: sevColor, background: sevBg, borderColor: sevBorder }}
        >
          <span className="rr-inc-card-badge-dot" style={{ backgroundColor: sevColor }} />
          <span>
            {zone.severity.toUpperCase()} · {hazardName}
          </span>
        </div>

        <button
          type="button"
          className="rr-inc-card-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="Close incident focus and return to overview (Esc)"
          aria-label="Close incident card"
        >
          <X size={13} />
        </button>
      </div>

      {/* Incident Information */}
      <div className="rr-inc-card-body">
        <div className="rr-inc-card-location">
          {zone.location}, {zone.state}
        </div>
        <div className="rr-inc-card-corridor">{zone.title}</div>

        {/* Operational Metrics Matrix */}
        <div className="rr-inc-card-metrics">
          <div className="rr-inc-metric-box">
            <span className="rr-inc-metric-label">AFFECTED AREA</span>
            <span className="rr-inc-metric-val font-mono">{zone.areaKm2} km²</span>
          </div>
          <div className="rr-inc-metric-box">
            <span className="rr-inc-metric-label">RISK SCORE</span>
            <span className="rr-inc-metric-val font-mono" style={{ color: sevColor }}>
              {zone.riskScore}% {zone.riskScore >= 75 ? 'HIGH' : zone.riskScore >= 60 ? 'ELEVATED' : 'MODERATE'}
            </span>
          </div>
        </div>

        {/* Incident Narrative / Telemetry Threshold */}
        <div className="rr-inc-card-narrative" style={{ borderLeftColor: sevColor }}>
          {zone.details}
        </div>

        {/* Tactical Footer */}
        <div className="rr-inc-card-footer">
          <div className="rr-inc-footer-status">
            <span className="rr-pulse-dot-green" />
            <span>
              Status: <strong>ACTIVE RESPONSE</strong>
            </span>
          </div>
          <div className="rr-inc-footer-coords font-mono">
            {zone.center[0].toFixed(3)}°N, {zone.center[1].toFixed(3)}°E
          </div>
        </div>
      </div>
    </div>
  );
};
