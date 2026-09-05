import React from 'react';
import {
  Flame,
  AlertCircle,
  Maximize2,
  Radio,
  Brain,
  ShieldCheck,
} from 'lucide-react';
import { KpiMetrics } from '../../types';
import './KpiStrip.css';

interface KpiStripProps {
  metrics: KpiMetrics;
}

export const KpiStrip: React.FC<KpiStripProps> = ({ metrics }) => {
  return (
    <section className="rr-kpi-strip" aria-label="System Situation Awareness Strip">
      {/* 1. Active Hazards */}
      <div className="rr-kpi-cell hazards">
        <div className="rr-kpi-top">
          <span className="rr-kpi-label">Active Hazards</span>
          <Flame className="rr-kpi-icon" color="#ef4444" />
        </div>
        <div className="rr-kpi-value-row">
          <span className="rr-kpi-value tabular-nums">{metrics.activeHazards}</span>
        </div>
        <span className="rr-kpi-subtext">Critical / Warning</span>
      </div>

      {/* 2. Active Alerts */}
      <div className="rr-kpi-cell alerts">
        <div className="rr-kpi-top">
          <span className="rr-kpi-label">Active Alerts</span>
          <AlertCircle className="rr-kpi-icon" color="#f97316" />
        </div>
        <div className="rr-kpi-value-row">
          <span className="rr-kpi-value tabular-nums">{metrics.activeAlerts}</span>
        </div>
        <span className="rr-kpi-subtext">3 Zones Triggered</span>
      </div>

      {/* 3. At-Risk Area */}
      <div className="rr-kpi-cell area">
        <div className="rr-kpi-top">
          <span className="rr-kpi-label">At-Risk Area</span>
          <Maximize2 className="rr-kpi-icon" color="#fb923c" />
        </div>
        <div className="rr-kpi-value-row">
          <span className="rr-kpi-value tabular-nums">{metrics.atRiskArea}</span>
        </div>
        <span className="rr-kpi-subtext">Vadodara Basin Primary</span>
      </div>

      {/* 4. Online Sensors */}
      <div className="rr-kpi-cell sensors">
        <div className="rr-kpi-top">
          <span className="rr-kpi-label">Online Sensors</span>
          <Radio className="rr-kpi-icon" color="#00f0ff" />
        </div>
        <div className="rr-kpi-value-row">
          <span className="rr-kpi-value tabular-nums">{metrics.onlineSensors}</span>
        </div>
        <span className="rr-kpi-subtext">96.2% Reporting Rate</span>
      </div>

      {/* 5. AI Risk Score */}
      <div className="rr-kpi-cell ai">
        <div className="rr-kpi-top">
          <span className="rr-kpi-label">AI Risk Score</span>
          <Brain className="rr-kpi-icon" color="#f43f5e" />
        </div>
        <div className="rr-kpi-value-row">
          <span className="rr-kpi-value tabular-nums">{metrics.aiRiskScore}</span>
        </div>
        <span className="rr-kpi-subtext">High Risk Cluster</span>
      </div>

      {/* 6. System Health */}
      <div className="rr-kpi-cell health">
        <div className="rr-kpi-top">
          <span className="rr-kpi-label">System Health</span>
          <ShieldCheck className="rr-kpi-icon" color="#10b981" />
        </div>
        <div className="rr-kpi-value-row">
          <span className="rr-kpi-value tabular-nums">{metrics.systemHealth}</span>
        </div>
        <span className="rr-kpi-subtext">Nominal Topology</span>
      </div>
    </section>
  );
};
