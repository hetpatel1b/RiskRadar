import React from 'react';
import {
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  Waves,
  TrendingUp,
  Minus,
} from 'lucide-react';
import { MOCK_ENVIRONMENTAL } from '../../data/mockData';
import './EnvironmentalPanel.css';

export const EnvironmentalPanel: React.FC = () => {
  const env = MOCK_ENVIRONMENTAL;

  const items = [
    {
      label: 'Temperature',
      value: env.temperature.value,
      unit: env.temperature.unit,
      trend: env.temperature.trend,
      icon: Thermometer,
      accentColor: '#f97316',
    },
    {
      label: 'Humidity',
      value: env.humidity.value,
      unit: env.humidity.unit,
      trend: env.humidity.trend,
      icon: Droplets,
      accentColor: '#00f0ff',
    },
    {
      label: 'Rainfall (1h)',
      value: env.rainfall.value,
      unit: env.rainfall.unit,
      trend: env.rainfall.trend,
      icon: CloudRain,
      accentColor: '#38bdf8',
    },
    {
      label: 'Air Quality',
      value: env.aqi.value,
      unit: env.aqi.unit,
      trend: env.aqi.trend,
      icon: Wind,
      accentColor: '#a855f7',
    },
    {
      label: 'Water Level',
      value: env.waterLevel.value,
      unit: env.waterLevel.unit,
      trend: env.waterLevel.trend,
      icon: Waves,
      accentColor: '#ef4444',
    },
  ];

  return (
    <div className="rr-env-panel" aria-label="Environmental Telemetry Panel">
      <div className="rr-env-header">
        <div className="rr-env-title-wrap">
          <Thermometer size={15} color="var(--accent-cyan)" />
          <span className="rr-env-title">Real-Time Environmental Telemetry</span>
        </div>
        <span className="rr-env-station">Station: Vadodara Vishwamitri Hub</span>
      </div>

      <div className="rr-env-grid tabular-nums">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rr-env-item">
              <div className="rr-env-item-header">
                <span className="rr-env-label">{item.label}</span>
                <span className="rr-env-trend">
                  {item.trend === 'up' ? (
                    <TrendingUp size={12} color="#ef4444" />
                  ) : (
                    <Minus size={12} color="var(--text-muted)" />
                  )}
                </span>
              </div>
              <div className="rr-env-value-wrap">
                <span className="rr-env-value">{item.value}</span>
                <span className="rr-env-unit">{item.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
