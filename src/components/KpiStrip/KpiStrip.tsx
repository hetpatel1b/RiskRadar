import React from 'react';
import { KpiMetrics } from '../../types';
import './KpiStrip.css';

interface KpiStripProps {
  metrics: KpiMetrics;
}

export const KpiStrip: React.FC<KpiStripProps> = ({ metrics }) => {
  const items = [
    { label: 'Active Hazards', value: metrics.activeHazards, sub: 'Critical & Warning', type: 'critical' },
    { label: 'Active Alerts', value: metrics.activeAlerts, sub: '3 Operational Sectors', type: 'warning' },
    { label: 'At-Risk Area', value: metrics.atRiskArea, sub: 'Vadodara River Basin', type: 'default' },
    { label: 'Online Sensors', value: metrics.onlineSensors, sub: '96.2% Operational Rate', type: 'cyan' },
    { label: 'AI Risk Score', value: metrics.aiRiskScore, sub: 'Elevated Threat Cluster', type: 'critical' },
    { label: 'System Health', value: metrics.systemHealth, sub: 'Telemetry Pipeline Active', type: 'safe' },
  ];

  return (
    <section className="rr-situation-ribbon" aria-label="National Situation Ribbon">
      {items.map((item) => (
        <div key={item.label} className={`rr-ribbon-cell ${item.type}`}>
          <div className="rr-ribbon-label-row">
            <span className="rr-ribbon-label">{item.label}</span>
          </div>
          <div className="rr-ribbon-val-row">
            <span className="rr-ribbon-val font-mono">{item.value}</span>
            <span className="rr-ribbon-sub">{item.sub}</span>
          </div>
        </div>
      ))}
    </section>
  );
};
