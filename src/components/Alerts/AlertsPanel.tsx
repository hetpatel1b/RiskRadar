import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AlertItem } from '../../types';
import './AlertsPanel.css';

interface AlertsPanelProps {
  alerts: AlertItem[];
  onSelectAlert: (alert: AlertItem) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  onSelectAlert,
}) => {
  const criticalAlert = alerts.find((a) => a.severity === 'critical') || alerts[0];
  const secondaryAlerts = alerts.filter((a) => a.id !== criticalAlert?.id);

  return (
    <div className="rr-incidents-section" aria-label="Active Incidents and Early Warnings">
      {/* Section Title */}
      <div className="rr-incidents-section-header">
        <span className="rr-incidents-section-title">ACTIVE INCIDENTS</span>
        <span className="rr-incidents-badge font-mono">{alerts.length} Monitored</span>
      </div>

      {/* Primary Critical Operational Incident */}
      {criticalAlert && (
        <div className="rr-critical-incident-box">
          <div className="rr-incident-top-row">
            <div className="rr-incident-tags">
              <span className="status-badge critical">CRITICAL</span>
              <span className="status-badge neutral">{criticalAlert.hazardType.replace('_', ' ')}</span>
            </div>
            <button
              type="button"
              className="rr-focus-gis-action"
              onClick={() => onSelectAlert(criticalAlert)}
              title="Focus GIS on incident coordinates"
            >
              <span>FOCUS GIS</span>
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="rr-incident-details">
            <div className="rr-incident-city">
              {criticalAlert.location}, {criticalAlert.state}
            </div>
            <p className="rr-incident-text">{criticalAlert.summary}</p>
          </div>
        </div>
      )}

      {/* Secondary Incidents List */}
      <div className="rr-secondary-incidents-wrap">
        <span className="rr-secondary-heading">SECONDARY WATCH SECTORS</span>
        <div className="rr-secondary-rows">
          {secondaryAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rr-sec-incident-row"
              onClick={() => onSelectAlert(alert)}
              role="button"
              tabIndex={0}
              title={`Focus map on ${alert.location}`}
            >
              <div className="rr-sec-left">
                <span className={`status-dot ${alert.severity}`} />
                <span className="rr-sec-city">{alert.location}</span>
                <span className="rr-sec-hazard">· {alert.hazardType.replace('_', ' ')}</span>
              </div>
              <span className={`status-badge ${alert.severity}`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
