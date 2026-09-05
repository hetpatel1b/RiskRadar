import React from 'react';
import { MOCK_ENVIRONMENTAL } from '../../data/environment';
import './EnvironmentalPanel.css';

export const EnvironmentalPanel: React.FC = () => {
  const env = MOCK_ENVIRONMENTAL;

  const telemetryItems = [
    {
      label: 'Temperature',
      value: env.temperature.value,
      unit: env.temperature.unit,
      delta: '+0.3°',
      sparkline: 'M0,13 L8,11 L16,12 L24,8 L32,9 L40,5',
      color: 'default',
    },
    {
      label: 'Humidity',
      value: env.humidity.value,
      unit: env.humidity.unit,
      delta: '+4%',
      sparkline: 'M0,12 L8,10 L16,9 L24,6 L32,5 L40,3',
      color: 'default',
    },
    {
      label: 'Rainfall (1h)',
      value: env.rainfall.value,
      unit: env.rainfall.unit,
      delta: '+6.2mm',
      sparkline: 'M0,14 L8,12 L16,10 L24,5 L32,3 L40,1',
      color: 'warning',
    },
    {
      label: 'Air Quality',
      value: env.airQuality.value,
      unit: env.airQuality.unit,
      delta: 'Moderate',
      sparkline: 'M0,8 L8,8 L16,7 L24,8 L32,6 L40,7',
      color: 'default',
    },
    {
      label: 'Water Level',
      value: env.waterLevel.value,
      unit: env.waterLevel.unit,
      delta: '+0.18m',
      sparkline: 'M0,14 L8,12 L16,8 L24,6 L32,3 L40,1',
      color: 'critical',
    },
  ];

  return (
    <div className="rr-env-deck" aria-label="Environmental Telemetry Instrumentation">
      <div className="rr-env-deck-header">
        <span className="rr-env-deck-title">ENVIRONMENTAL TELEMETRY</span>
        <span className="rr-env-deck-node">Vishwamitri Hydrological 04 (Vadodara)</span>
      </div>

      <div className="rr-env-instrument-strip">
        {telemetryItems.map((item, idx) => (
          <div key={item.label} className={`rr-instrument-col ${idx === telemetryItems.length - 1 ? 'last' : ''}`}>
            <div className="rr-instrument-top">
              <span className="rr-instrument-label">{item.label}</span>
              <span className={`rr-instrument-delta font-mono ${item.color}`}>{item.delta}</span>
            </div>

            <div className="rr-instrument-bottom">
              <div className="rr-instrument-val-wrap">
                <span className="rr-instrument-val font-mono">{item.value}</span>
                <span className="rr-instrument-unit">{item.unit}</span>
              </div>

              <svg className="rr-instrument-spark" width="38" height="14" viewBox="0 0 40 16">
                <path
                  d={item.sparkline}
                  fill="none"
                  stroke={
                    item.color === 'critical'
                      ? 'var(--semantic-critical)'
                      : item.color === 'warning'
                      ? 'var(--semantic-warning)'
                      : 'var(--signal-cyan)'
                  }
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
