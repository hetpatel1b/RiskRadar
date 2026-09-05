import React, { useState, useEffect } from 'react';
import {
  Clock,
  Wifi,
  AlertTriangle,
  Globe2,
  RefreshCw
} from 'lucide-react';

interface TopHeaderProps {
  lastUpdated?: string;
  onManualRefresh?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  lastUpdated = '08:48:10 UTC',
  onManualRefresh,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      );
      setDateString(
        now.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }).toUpperCase()
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 shrink-0 bg-[#090D15]/95 border-b border-[#172234] px-5 flex items-center justify-between z-20 backdrop-blur-md select-none">
      {/* Left: Operational Monitoring Context & Identity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F1624] border border-radar-cyan/30 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-radar-cyan animate-pulse"></span>
            <span className="font-semibold text-radar-cyan tracking-wider">LIVE SYSTEM</span>
            <span className="text-radar-muted">|</span>
            <span className="text-radar-text font-mono text-[11px]">ACTIVE SURVEILLANCE</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-radar-secondary border-l border-[#1C273C] pl-4">
          <Globe2 className="w-3.5 h-3.5 text-radar-cyan" />
          <span className="font-mono text-[11px] tracking-wide text-radar-text">
            NATIONAL DISASTER INTELLIGENCE PLATFORM
          </span>
          <span className="text-radar-muted">•</span>
          <span className="text-[11px] font-mono text-radar-muted">
            SECTOR 04 BASIN COMMAND
          </span>
        </div>
      </div>

      {/* Center: Real-time Operational Threat Level Pill */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#121927] border border-[#1E293B]">
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <AlertTriangle className="w-3.5 h-3.5 text-semantic-warning" />
          <span className="text-radar-muted uppercase text-[10px] tracking-wider">THREAT LEVEL:</span>
          <span className="font-semibold text-semantic-warning tracking-wide">ORANGE (ELEVATED)</span>
        </div>
        <span className="text-radar-muted text-xs">•</span>
        <span className="text-[11px] font-mono text-radar-secondary">3 Active Priority Alerts</span>
      </div>

      {/* Right: Timestamp & Sync Controls */}
      <div className="flex items-center gap-4">
        {/* Telemetry Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D121D] border border-[#1A2538] text-xs font-mono">
          <Wifi className="w-3.5 h-3.5 text-semantic-safe" />
          <span className="text-[11px] text-radar-secondary">TELEMETRY NOMINAL</span>
        </div>

        {/* Live Clock & Last Updated */}
        <div className="flex items-center gap-2.5 text-right">
          <Clock className="w-3.5 h-3.5 text-radar-cyan/80 hidden sm:block" />
          <div>
            <div className="text-xs font-mono font-medium text-white tracking-wider">
              {timeString || '08:49:15 UTC'}
            </div>
            <div className="text-[10px] font-mono text-radar-muted flex items-center justify-end gap-1">
              <span>{dateString || '05 SEP 2026'}</span>
              <span>•</span>
              <span className="text-radar-secondary">Sync {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Manual Refresh button */}
        <button
          onClick={onManualRefresh}
          title="Force Synchronize Command Cache"
          className="p-1.5 rounded-md bg-[#101726] hover:bg-[#162238] border border-[#1A263B] text-radar-muted hover:text-radar-cyan transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
