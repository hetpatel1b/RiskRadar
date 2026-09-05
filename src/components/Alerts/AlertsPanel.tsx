import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AlertItem } from '../../types';
import { normalizeIncidentId } from '../../data/risk';
import './AlertsPanel.css';

interface AlertsPanelProps {
  alerts: AlertItem[];
  selectedIncidentId?: string | null;
  onSelectIncident: (id: string | null) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  selectedIncidentId,
  onSelectIncident,
}) => {
  const normalizedSelectedId = normalizeIncidentId(selectedIncidentId);
  const criticalAlert = alerts.find((a) => a.severity === 'critical') || alerts[0];
  const criticalZoneId = criticalAlert ? normalizeIncidentId(criticalAlert.id) || 'hz-vadodara-flood' : 'hz-vadodara-flood';
  const isCriticalSelected = normalizedSelectedId === criticalZoneId;

  const secondaryAlerts = alerts.filter((a) => a.id !== criticalAlert?.id);

  return (
    <div className="rr-incidents-section" aria-label="Active Incidents Command Surface">
      {/* Section Header */}
      <div className="rr-incidents-section-header">
        <span className="rr-incidents-section-title">ACTIVE INCIDENTS</span>
        <span className="rr-incidents-badge font-mono">{alerts.length} Monitored</span>
      </div>

      {/* Primary Featured Critical Incident */}
      {criticalAlert && (
        <div
          className={`rr-critical-incident-box ${isCriticalSelected ? 'selected-active' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => onSelectIncident(criticalZoneId)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectIncident(criticalZoneId);
            }
          }}
          title={`Focus GIS on ${criticalAlert.location}`}
          aria-label={`Primary Critical Incident: ${criticalAlert.location}. Click to focus GIS.`}
        >
          <div className="rr-incident-top-row">
            <div className="rr-incident-tags">
              <span className="status-badge critical">CRITICAL</span>
              <span className="status-badge neutral">
                {criticalAlert.hazardType.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* FOCUS GIS Action Control */}
            <button
              type="button"
              className={`rr-focus-gis-action ${isCriticalSelected ? 'active-focused' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectIncident(criticalZoneId);
              }}
              title={`Focus GIS map on ${criticalAlert.location}`}
              aria-label={`Focus GIS map on ${criticalAlert.location} incident`}
            >
              <span>{isCriticalSelected ? 'FOCUSED' : 'FOCUS GIS'}</span>
              <ArrowRight size={10} className="rr-focus-arrow" />
            </button>
          </div>

          <div className="rr-incident-details">
            <div className="rr-incident-city-row">
              <span className="rr-incident-city">
                {criticalAlert.location}, {criticalAlert.state}
              </span>
              <span className="rr-incident-status-pill">
                <span className="rr-status-pulse-green" />
                <span>ACTIVE RESPONSE</span>
              </span>
            </div>

            <p className="rr-incident-text">
              Vishwamitri Corridor · Stage <strong>4.72m</strong> &gt; Danger <strong>4.50m</strong>. Immediate ward-level evacuation active.
            </p>
          </div>
        </div>
      )}

      {/* Secondary Watch Sectors */}
      <div className="rr-secondary-incidents-wrap">
        <div className="rr-secondary-heading-row">
          <span className="rr-secondary-heading">SECONDARY WATCH SECTORS</span>
          <span className="rr-secondary-meta font-mono">{secondaryAlerts.length} Sectors</span>
        </div>

        <div className="rr-secondary-rows" role="list" aria-label="Secondary watch sector rows">
          {secondaryAlerts.map((alert) => {
            const zoneId = normalizeIncidentId(alert.id) || alert.id;
            const isSelected = normalizedSelectedId === zoneId;

            return (
              <button
                key={alert.id}
                type="button"
                className={`rr-sec-incident-row ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectIncident(zoneId)}
                title={`Focus GIS on ${alert.location}`}
                aria-label={`Focus GIS on ${alert.location}, ${alert.hazardType.replace('_', ' ')}`}
                role="listitem"
              >
                <div className="rr-sec-left">
                  <span className={`status-dot ${alert.severity}`} />
                  <span className="rr-sec-city">{alert.location}</span>
                  <span className="rr-sec-hazard">· {alert.hazardType.replace('_', ' ')}</span>
                </div>
                <div className="rr-sec-right">
                  <span className={`status-badge ${alert.severity}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <ArrowRight size={9.5} className="rr-sec-arrow" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
