import React from 'react';
import {
  Flame,
  BellRing,
  Map,
  Radio,
  BrainCircuit,
  ShieldCheck
} from 'lucide-react';

export interface KpiData {
  activeHazards: number;
  activeAlerts: number;
  atRiskAreaKm2: number;
  onlineSensors: number;
  aiRiskScore: number;
  systemHealth: number;
}

interface KpiStripProps {
  data?: Partial<KpiData>;
}

export const KpiStrip: React.FC<KpiStripProps> = ({ data }) => {
  const kpiValues: KpiData = {
    activeHazards: data?.activeHazards ?? 6,
    activeAlerts: data?.activeAlerts ?? 3,
    atRiskAreaKm2: data?.atRiskAreaKm2 ?? 24.6,
    onlineSensors: data?.onlineSensors ?? 1201,
    aiRiskScore: data?.aiRiskScore ?? 82,
    systemHealth: data?.systemHealth ?? 96.4,
  };

  const kpis = [
    {
      id: 'hazards',
      label: 'Active Hazards',
      value: String(kpiValues.activeHazards).padStart(2, '0'),
      unit: 'INCIDENTS',
      icon: Flame,
      color: 'text-semantic-warning',
      subtext: '4 Multi-hazard Categories',
      accentBorder: 'hover:border-semantic-warning/40',
      badge: 'MONITORED',
      badgeClass: 'bg-semantic-warning/10 text-semantic-warning border-semantic-warning/30',
    },
    {
      id: 'alerts',
      label: 'Active Alerts',
      value: String(kpiValues.activeAlerts).padStart(2, '0'),
      unit: 'PRIORITY',
      icon: BellRing,
      color: 'text-semantic-critical',
      subtext: '1 Critical • 2 Warning',
      accentBorder: 'hover:border-semantic-critical/40',
      badge: 'URGENT',
      badgeClass: 'bg-semantic-critical/15 text-semantic-critical border-semantic-critical/40',
    },
    {
      id: 'area',
      label: 'At-Risk Area',
      value: `${kpiValues.atRiskAreaKm2}`,
      unit: 'km²',
      icon: Map,
      color: 'text-radar-cyan',
      subtext: 'Sector 04, 07 & 02 Impact',
      accentBorder: 'hover:border-radar-cyan/40',
      badge: 'BUFFER ZONE',
      badgeClass: 'bg-radar-cyan/10 text-radar-cyan border-radar-cyan/25',
    },
    {
      id: 'sensors',
      label: 'Online Sensors',
      value: kpiValues.onlineSensors.toLocaleString(),
      unit: '/ 1,248 NODES',
      icon: Radio,
      color: 'text-semantic-safe',
      subtext: '96.2% Grid Availability',
      accentBorder: 'hover:border-semantic-safe/40',
      badge: '98.7% RSSI',
      badgeClass: 'bg-semantic-safe/10 text-semantic-safe border-semantic-safe/30',
    },
    {
      id: 'ai-score',
      label: 'AI Risk Score',
      value: `${kpiValues.aiRiskScore}%`,
      unit: 'CONFIDENCE 94.6%',
      icon: BrainCircuit,
      color: 'text-semantic-warning',
      subtext: 'Level 4 — High Risk Hazard',
      accentBorder: 'hover:border-semantic-warning/40',
      badge: 'ENSEMBLE v4.2',
      badgeClass: 'bg-semantic-warning/15 text-semantic-warning border-semantic-warning/30',
    },
    {
      id: 'health',
      label: 'System Health',
      value: `${kpiValues.systemHealth}%`,
      unit: 'TELEMETRY',
      icon: ShieldCheck,
      color: 'text-radar-cyan',
      subtext: '42 / 43 Gateways Active',
      accentBorder: 'hover:border-radar-cyan/40',
      badge: 'NOMINAL',
      badgeClass: 'bg-semantic-safe/10 text-semantic-safe border-semantic-safe/25',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 select-none">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`command-panel p-3.5 rounded-xl border border-[#172234] hover:bg-[#101726]/90 transition-all duration-200 group flex flex-col justify-between relative overflow-hidden ${kpi.accentBorder}`}
          >
            {/* Ambient subtle glow at top right */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none group-hover:bg-white/[0.03] transition-opacity"></div>

            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-radar-secondary font-medium">
                {kpi.label}
              </span>
              <div className="w-6 h-6 rounded-md bg-[#131B2B] border border-[#1E2C44] flex items-center justify-center shrink-0">
                <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
              </div>
            </div>

            {/* Center value - STATIC (NO ANIMATION as required) */}
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-2xl xl:text-[26px] font-mono font-bold tracking-tight text-white ${kpi.color}`}>
                {kpi.value}
              </span>
              <span className="text-[10px] font-mono text-radar-muted font-medium">
                {kpi.unit}
              </span>
            </div>

            {/* Bottom row: Subtext & Badge */}
            <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
              <span className="text-radar-muted truncate pr-1">
                {kpi.subtext}
              </span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-semibold border ${kpi.badgeClass} shrink-0`}>
                {kpi.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
