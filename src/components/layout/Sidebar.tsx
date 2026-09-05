import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  BrainCircuit,
  Radio,
  Network,
  BarChart3,
  Settings,
  ShieldAlert,
  ChevronRight,
  Server
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live-map', label: 'Live Map', icon: MapPin, badge: 'GIS' },
  { id: 'ai-intelligence', label: 'AI Intelligence', icon: BrainCircuit, badge: 'v4.2' },
  { id: 'alerts', label: 'Alerts', icon: ShieldAlert, badge: '03', badgeColor: 'bg-semantic-critical/20 text-semantic-critical border border-semantic-critical/40' },
  { id: 'sensors', label: 'Sensors', icon: Radio, badge: '1.2k' },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeItem?: string;
  onSelectItem?: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'dashboard',
  onSelectItem,
}) => {
  return (
    <aside className="w-[240px] shrink-0 h-screen bg-[#090D15] border-r border-[#172234] flex flex-col justify-between select-none z-30">
      {/* Top Branding */}
      <div>
        <div className="h-16 px-4 flex items-center gap-3 border-b border-[#172234]/80 bg-[#070A0F]/60">
          <div className="w-9 h-9 rounded-lg bg-radar-cyan/10 border border-radar-cyan/40 flex items-center justify-center relative shadow-[0_0_12px_rgba(0,229,255,0.15)]">
            <Radio className="w-5 h-5 text-radar-cyan" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-semantic-critical border-2 border-[#090D15]"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tracking-wider text-[15px] font-sans">RiskRadar</span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-radar-cyan/10 text-radar-cyan font-mono font-semibold border border-radar-cyan/20">
                GOV-OPS
              </span>
            </div>
            <p className="text-[11px] text-radar-muted leading-none mt-0.5 tracking-tight">
              Disaster Command Center
            </p>
          </div>
        </div>

        {/* Operational Context Sub-banner */}
        <div className="px-3 pt-3 pb-1">
          <div className="px-2.5 py-2 rounded-md bg-[#0D131F] border border-[#1C273D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-semantic-safe animate-pulse"></div>
              <span className="text-[11px] font-mono text-radar-secondary tracking-wide">SEC-04 BASIN</span>
            </div>
            <span className="text-[10px] font-mono text-radar-cyan bg-radar-cyan/10 px-1.5 py-0.5 rounded border border-radar-cyan/20">
              DEFCON-ENV 3
            </span>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-4 pt-4 pb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-radar-muted/80 font-semibold">
            Command Navigation
          </span>
        </div>

        {/* Nav Items */}
        <nav className="px-2 py-1 space-y-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSelectItem?.(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-[#101827] text-white border border-radar-cyan/30 shadow-[inset_3px_0_0_0_#00E5FF]'
                    : 'text-radar-secondary hover:text-white hover:bg-[#0D1422] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-radar-cyan drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]'
                        : 'text-radar-muted group-hover:text-radar-secondary'
                    }`}
                  />
                  <span className={`${isActive ? 'font-semibold tracking-wide' : 'tracking-normal'}`}>
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-medium ${
                        item.badgeColor
                          ? item.badgeColor
                          : isActive
                          ? 'bg-radar-cyan/15 text-radar-cyan border border-radar-cyan/30'
                          : 'bg-[#151D2C] text-radar-muted border border-white/5'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-radar-cyan/80" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Infrastructure Telemetry Card */}
      <div className="p-3 border-t border-[#172234] bg-[#070A0F]/80">
        <div className="p-2.5 rounded-lg bg-[#0C111C] border border-[#1A2436] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-radar-cyan" />
              <span className="text-[11px] font-mono text-radar-text">Gov-Satcom Link</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-semantic-safe">
              <span className="w-1.5 h-1.5 rounded-full bg-semantic-safe"></span>
              99.8%
            </span>
          </div>

          <div className="w-full bg-[#162032] rounded-full h-1 overflow-hidden">
            <div className="bg-radar-cyan h-full rounded-full" style={{ width: '96.4%' }}></div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-radar-muted pt-0.5">
            <span>Core v2.4-GA</span>
            <span>ID: RR-GOV-981</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
