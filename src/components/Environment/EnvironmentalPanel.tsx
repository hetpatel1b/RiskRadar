import React from 'react';
import { MOCK_ENVIRONMENTAL } from '../../data/environment';
import './EnvironmentalPanel.css';

interface TelemetryItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: string;
  delta: string;
  statusType: 'safe' | 'warning' | 'critical' | 'watch';
  color: string;
  tooltip: string;
  linePath: string;
  areaPath: string;
  endY: number;
}

export const EnvironmentalPanel: React.FC = () => {
  const env = MOCK_ENVIRONMENTAL;

  const telemetryItems: TelemetryItem[] = [
    {
      id: 'temperature',
      label: 'TEMPERATURE',
      value: env.temperature.value,
      unit: env.temperature.unit,
      status: 'NORMAL',
      delta: '+0.3°C',
      statusType: 'safe',
      color: '#63D7E5',
      tooltip: 'Catchment Temperature: 32.4°C · Normal diurnal variation',
      linePath: 'M 0,14 C 14,14 22,11 34,12 C 46,13 54,8 64,6',
      areaPath: 'M 0,14 C 14,14 22,11 34,12 C 46,13 54,8 64,6 L 64,20 L 0,20 Z',
      endY: 6,
    },
    {
      id: 'humidity',
      label: 'HUMIDITY',
      value: env.humidity.value,
      unit: env.humidity.unit,
      status: 'ELEVATED',
      delta: '+4%',
      statusType: 'warning',
      color: '#63D7E5',
      tooltip: 'Relative Humidity: 74% · Saturated tropospheric boundary',
      linePath: 'M 0,13 C 14,13 22,10 34,9 C 46,8 54,6 64,5',
      areaPath: 'M 0,13 C 14,13 22,10 34,9 C 46,8 54,6 64,5 L 64,20 L 0,20 Z',
      endY: 5,
    },
    {
      id: 'rainfall',
      label: 'RAINFALL · 1H',
      value: env.rainfall.value,
      unit: env.rainfall.unit,
      status: 'RISING',
      delta: '+6.2 mm',
      statusType: 'warning',
      color: '#F09A3E',
      tooltip: 'Vishwamitri Gauge 1-Hour Rainfall: 18.6mm · Increasing intensity',
      linePath: 'M 0,16 C 16,15 28,13 40,8 C 50,4 56,3 64,2',
      areaPath: 'M 0,16 C 16,15 28,13 40,8 C 50,4 56,3 64,2 L 64,20 L 0,20 Z',
      endY: 2,
    },
    {
      id: 'airQuality',
      label: 'AIR QUALITY',
      value: env.airQuality.value,
      unit: env.airQuality.unit,
      status: 'MODERATE',
      delta: '',
      statusType: 'watch',
      color: '#8B98A7',
      tooltip: 'Urban Basin Air Quality: 82 AQI · Moderate Particulate Index',
      linePath: 'M 0,10 C 14,8 24,12 36,10 C 48,8 54,11 64,10',
      areaPath: 'M 0,10 C 14,8 24,12 36,10 C 48,8 54,11 64,10 L 64,20 L 0,20 Z',
      endY: 10,
    },
    {
      id: 'waterLevel',
      label: 'WATER LEVEL',
      value: env.waterLevel.value,
      unit: env.waterLevel.unit,
      status: 'RISING',
      delta: '+0.18 m',
      statusType: 'critical',
      color: '#F05D6B',
      tooltip: 'Vishwamitri River Stage: 4.72m · Exceeds Danger Mark 4.50m',
      linePath: 'M 0,17 C 14,16 26,11 38,7 C 48,3 56,2 64,2',
      areaPath: 'M 0,17 C 14,16 26,11 38,7 C 48,3 56,2 64,2 L 64,20 L 0,20 Z',
      endY: 2,
    },
  ];

  return (
    <div className="rr-env-deck" aria-label="Environmental Telemetry Instrumentation Panel">
      {/* 1. Header with Live Status and Clean Station Metadata */}
      <div className="rr-env-deck-header">
        <div className="rr-env-header-left">
          <span className="rr-env-deck-title">ENVIRONMENTAL TELEMETRY</span>
          <div className="rr-env-live-badge" title="Continuous Hydrological & Atmospheric Feeds Active">
            <span className="rr-env-live-dot" />
            <span className="rr-env-live-text font-mono">LIVE TELEMETRY</span>
          </div>
        </div>

        <div className="rr-env-header-meta">
          <span className="rr-env-station font-mono">Vishwamitri Hydrological 04</span>
          <span className="rr-env-meta-dot font-mono">·</span>
          <span className="rr-env-city">Vadodara</span>
        </div>
      </div>

      {/* 2. Unified 5-Metric Instrument Strip with Precise Hairline Dividers */}
      <div
        className="rr-env-instrument-strip"
        role="region"
        aria-label="Five Operational Environmental Telemetry Measurement Zones"
      >
        {telemetryItems.map((item, idx) => {
          const isLast = idx === telemetryItems.length - 1;
          const isWaterLevel = item.id === 'waterLevel';

          return (
            <div
              key={item.id}
              className={`rr-telemetry-zone ${isLast ? 'last' : ''} ${isWaterLevel ? 'priority-water' : ''}`}
              title={item.tooltip}
            >
              {/* Row 1: Uppercase Label */}
              <div className="rr-zone-label-row">
                <span className="rr-zone-label">{item.label}</span>
              </div>

              {/* Row 2: Status Pill & Contextual Delta */}
              <div className="rr-zone-status-row">
                <span className={`rr-zone-status-pill ${item.statusType}`}>
                  <span className={`rr-zone-status-dot ${item.statusType}`} />
                  <span className={`rr-zone-status-text ${item.statusType}`}>{item.status}</span>
                </span>
                {item.delta && (
                  <span className={`rr-zone-delta font-mono ${item.statusType}`}>
                    {item.delta}
                  </span>
                )}
              </div>

              {/* Row 3: Dominant Value + Secondary Unit (Consistent Baseline Alignment across all 5 cells) */}
              <div className="rr-zone-value-row">
                <span className="rr-zone-val font-mono">{item.value}</span>
                <span className="rr-zone-unit">{item.unit}</span>
              </div>

              {/* Row 4: Elegant Micro-Trend Sparkline */}
              <div className="rr-zone-sparkline-row">
                <svg
                  className="rr-zone-sparkline"
                  width="64"
                  height="18"
                  viewBox="0 0 64 20"
                  aria-label={`${item.label} micro-trend curve`}
                >
                  <defs>
                    <linearGradient id={`spark-grad-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={item.color} stopOpacity="0.24" />
                      <stop offset="100%" stopColor={item.color} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={item.areaPath} fill={`url(#spark-grad-${item.id})`} />
                  <path
                    d={item.linePath}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="rr-spark-line-anim"
                  />
                  <circle
                    cx="64"
                    cy={item.endY}
                    r="2"
                    fill={item.color}
                    className="rr-spark-endpoint"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
