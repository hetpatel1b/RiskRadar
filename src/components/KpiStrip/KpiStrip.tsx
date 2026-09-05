import React from 'react';
import { KpiMetrics } from '../../types';
import './KpiStrip.css';

interface KpiStripProps {
  metrics: KpiMetrics;
}

interface ParsedMetric {
  label: string;
  num: string;
  unit?: string;
  sub: string;
  tone: 'critical' | 'warning' | 'neutral' | 'cyan' | 'safe';
}

export const KpiStrip: React.FC<KpiStripProps> = ({ metrics }) => {
  const parseVal = (raw: string): { num: string; unit?: string } => {
    if (raw.includes('km²')) {
      return { num: raw.replace('km²', '').trim(), unit: 'km²' };
    }
    if (raw.endsWith('%')) {
      return { num: raw.replace('%', '').trim(), unit: '%' };
    }
    return { num: raw };
  };

  const items: ParsedMetric[] = [
    {
      label: 'ACTIVE HAZARDS',
      ...parseVal(metrics.activeHazards),
      sub: 'Critical & Warning',
      tone: 'critical',
    },
    {
      label: 'ACTIVE ALERTS',
      ...parseVal(metrics.activeAlerts),
      sub: '3 Operational Sectors',
      tone: 'warning',
    },
    {
      label: 'AT-RISK AREA',
      ...parseVal(metrics.atRiskArea),
      sub: 'Vadodara Basin',
      tone: 'neutral',
    },
    {
      label: 'ONLINE SENSORS',
      ...parseVal(metrics.onlineSensors),
      sub: '96.2% Reporting',
      tone: 'cyan',
    },
    {
      label: 'AI RISK SCORE',
      ...parseVal(metrics.aiRiskScore),
      sub: 'High-Risk Cluster',
      tone: 'critical',
    },
    {
      label: 'SYSTEM HEALTH',
      ...parseVal(metrics.systemHealth),
      sub: 'Nominal',
      tone: 'safe',
    },
  ];

  return (
    <div className="rr-situation-ribbon-wrapper">
      <section className="rr-situation-ribbon" role="region" aria-label="National Situation Awareness Ribbon">
        {/* Subtle top telemetry ambient illumination line */}
        <div className="rr-ribbon-telemetry-line" aria-hidden="true" />

        {items.map((item, idx) => (
          <div
            key={item.label}
            className={`rr-ribbon-cell tone-${item.tone}`}
            style={{ animationDelay: `${idx * 45}ms` }}
          >
            {/* 1. Label Row with tiny 4px operational signal dot */}
            <div className="rr-ribbon-label-row">
              <span className="rr-ribbon-label">{item.label}</span>
              <span className="rr-ribbon-signal-dot" aria-hidden="true" />
            </div>

            {/* 2. Primary Number & Unit Row (Strict tabular alignment) */}
            <div className="rr-ribbon-val-row">
              <span className="rr-ribbon-num font-mono">{item.num}</span>
              {item.unit && <span className="rr-ribbon-unit">{item.unit}</span>}
            </div>

            {/* 3. Supporting Operational Metadata */}
            <div className="rr-ribbon-sub-row">
              <span className="rr-ribbon-sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
