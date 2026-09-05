import React, { useState } from 'react';
import type { EnvironmentalMetric } from '../../types/environment';
import { MetricChart } from './MetricChart';
import {
  Waves,
  CloudRain,
  Wind,
  Droplets,
  ThermometerSun,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface EnvironmentalPanelProps {
  metrics: EnvironmentalMetric[];
  selectedStationId?: string;
  onSelectStation?: (stationId: string) => void;
}

const getCategoryIcon = (cat: EnvironmentalMetric['category']) => {
  switch (cat) {
    case 'water_level':
      return Waves;
    case 'rainfall':
      return CloudRain;
    case 'air_quality':
      return Wind;
    case 'humidity':
      return Droplets;
    case 'temperature':
      return ThermometerSun;
  }
};

const getStatusColor = (status: EnvironmentalMetric['status']) => {
  switch (status) {
    case 'critical':
      return {
        text: 'text-semantic-critical',
        border: 'border-semantic-critical/40',
        bg: 'bg-semantic-critical/15',
        chart: '#EF4444',
      };
    case 'warning':
      return {
        text: 'text-semantic-warning',
        border: 'border-semantic-warning/40',
        bg: 'bg-semantic-warning/15',
        chart: '#F97316',
      };
    case 'watch':
      return {
        text: 'text-semantic-watch',
        border: 'border-semantic-watch/40',
        bg: 'bg-semantic-watch/15',
        chart: '#EAB308',
      };
    case 'safe':
    default:
      return {
        text: 'text-semantic-safe',
        border: 'border-semantic-safe/40',
        bg: 'bg-semantic-safe/15',
        chart: '#10B981',
      };
  }
};

export const EnvironmentalPanel: React.FC<EnvironmentalPanelProps> = ({
  metrics,
  onSelectStation,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'critical'>('all');

  const displayedMetrics =
    activeTab === 'critical'
      ? metrics.filter((m) => m.status === 'critical' || m.status === 'warning')
      : metrics;

  return (
    <div className="command-panel rounded-2xl border border-[#172234] p-4 flex flex-col justify-between shadow-xl select-none">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-radar-cyan/10 border border-radar-cyan/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-radar-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Real-Time Environmental & Sensor Monitoring
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/20">
                  5 TELEMETRY STREAMS
                </span>
              </div>
              <p className="text-[10px] font-mono text-radar-muted">
                Atmospheric, Hydrological & Micro-climate Grid
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#090E17] p-0.5 rounded-md border border-[#172234]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#152136] text-radar-cyan font-bold border border-radar-cyan/30'
                  : 'text-radar-muted hover:text-radar-secondary'
              }`}
            >
              ALL STREAMS (5)
            </button>
            <button
              onClick={() => setActiveTab('critical')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                activeTab === 'critical'
                  ? 'bg-semantic-warning/20 text-semantic-warning font-bold border border-semantic-warning/30'
                  : 'text-radar-muted hover:text-radar-secondary'
              }`}
            >
              ACTIVE ELEVATED (3)
            </button>
          </div>
        </div>

        {/* Five Metrics Grid */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {displayedMetrics.map((metric) => {
            const Icon = getCategoryIcon(metric.category);
            const statusStyle = getStatusColor(metric.status);

            return (
              <div
                key={metric.id}
                onClick={() => onSelectStation?.(metric.stationId)}
                className="p-3 rounded-xl bg-[#090E17] border border-[#172439] hover:border-radar-cyan/40 hover:bg-[#0E1524] transition-all duration-150 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.01] rounded-full blur-xl group-hover:bg-white/[0.03]" />

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#131B2B] border border-[#1E2B42] flex items-center justify-center">
                        <Icon className={`w-3.5 h-3.5 ${statusStyle.text}`} />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-radar-text uppercase tracking-tight truncate">
                        {metric.name}
                      </span>
                    </div>

                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                    >
                      {metric.status}
                    </span>
                  </div>

                  {/* Value & Change */}
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-mono font-extrabold ${statusStyle.text}`}>
                        {metric.value}
                      </span>
                      <span className="text-xs font-mono text-radar-muted">
                        {metric.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[10px] font-mono text-radar-muted">
                      {metric.trend === 'rising' ? (
                        <ArrowUp className="w-3 h-3 text-semantic-warning" />
                      ) : metric.trend === 'falling' ? (
                        <ArrowDown className="w-3 h-3 text-semantic-safe" />
                      ) : (
                        <Minus className="w-3 h-3 text-radar-muted" />
                      )}
                      <span>{metric.change24h}</span>
                    </div>
                  </div>

                  {/* Sparkline Visual */}
                  <div className="mt-2 h-9 flex items-center justify-between">
                    <MetricChart
                      data={metric.sparkline}
                      color={statusStyle.chart}
                      width={130}
                      height={34}
                    />
                    <div className="text-right text-[9px] font-mono text-radar-muted">
                      <div>TH: {metric.threshold.warning}{metric.unit}</div>
                      <div className="text-semantic-critical">CRIT: {metric.threshold.critical}{metric.unit}</div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Station info */}
                <div className="mt-2 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-radar-muted">
                  <span className="truncate pr-1">{metric.stationName}</span>
                  <span className="text-radar-cyan shrink-0 font-semibold">{metric.stationId}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-radar-muted">
        <span>SAMPLING FREQUENCY: 1 Hz (PRECISION ADCP & METEOROLOGICAL STREAM)</span>
        <span className="text-radar-secondary">CALIBRATION ISO-14001 VALIDATED</span>
      </div>
    </div>
  );
};
