import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { AlertItem } from '../../types';
import './AlertsPanel.css';

interface AlertsPanelProps {
  alerts: AlertItem[];
  onSelectAlert?: (alert: AlertItem) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  onSelectAlert,
}) => {
  return (
    <div className="rr-alerts-panel" aria-label="Early-Warning Alerts Panel">
      <div className="rr-alerts-header">
        <div className="rr-alerts-title-wrap">
          <AlertTriangle size={15} color="#f97316" />
          <span className="rr-alerts-title">Active Early-Warnings</span>
        </div>
        <span className="rr-alerts-count tabular-nums">{alerts.length} Active Events</span>
      </div>

      <div className="rr-alerts-list">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rr-alert-item ${alert.severity}`}
            onClick={() => onSelectAlert?.(alert)}
            title="Click to focus on map"
          >
            <div className="rr-alert-top-row">
              <div className="rr-alert-badges">
                <span className={`status-pill ${alert.severity}`}>
                  {alert.severity.toUpperCase()}
                </span>
                <span className="status-pill cyan">
                  {alert.hazardType.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <span className="rr-alert-time tabular-nums">{alert.timestamp}</span>
            </div>

            <div className="rr-alert-location-row">
              <span className="rr-alert-location">{alert.location}</span>
              <ChevronRight size={13} color="var(--text-muted)" />
            </div>

            <p className="rr-alert-summary">{alert.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
