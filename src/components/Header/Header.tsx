import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  lastSync?: string;
}

export const Header: React.FC<HeaderProps> = ({
  lastSync = '10:31:07 IST',
}) => {
  const [currentTime, setCurrentTime] = useState(lastSync);

  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset += 1;
      const baseSec = 7 + offset;
      const sec = baseSec % 60;
      const min = (31 + Math.floor(baseSec / 60)) % 60;
      const secStr = sec < 10 ? `0${sec}` : `${sec}`;
      const minStr = min < 10 ? `0${min}` : `${min}`;
      setCurrentTime(`10:${minStr}:${secStr} IST`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="rr-command-bridge" role="banner" aria-label="Command Bridge">
      {/* Ambient Atmospheric Background (Hardware-accelerated, non-interactive) */}
      <div className="rr-bridge-ambient" aria-hidden="true">
        <div className="rr-ambient-glow-cyan" />
        <div className="rr-ambient-glow-blue" />
        <div className="rr-ambient-scanline" />
      </div>

      {/* ZONE A: Brand Anchor & Institutional Identity */}
      <div className="rr-bridge-left">
        <div className="rr-bridge-brand-mark" aria-hidden="true">
          <Shield size={16} strokeWidth={2.4} />
        </div>
        <div className="rr-bridge-brand-text">
          <span className="rr-bridge-brand-name">RiskRadar</span>
          <span className="rr-bridge-brand-separator" aria-hidden="true">·</span>
          <span className="rr-bridge-brand-sub">National Resilience Intelligence</span>
        </div>
      </div>

      {/* ZONE B: Operational Heartbeat (Protected Center Zone) */}
      <div className="rr-bridge-center">
        <div className="rr-bridge-live-state" aria-live="polite">
          <span className="rr-live-pulse-dot" aria-hidden="true" />
          <span className="rr-live-state-label">LIVE OPERATIONS</span>
        </div>
      </div>

      {/* ZONE C: System Status & Synchronization Cluster */}
      <div className="rr-bridge-right">
        {/* Simulated Operational Data Badge */}
        <div className="rr-bridge-sim-badge" title="Operational Environment Indicator">
          <span className="rr-sim-dot" aria-hidden="true" />
          <span className="rr-sim-label">
            <span className="rr-sim-label-full">SIMULATED DATA</span>
            <span className="rr-sim-label-compact">SIMULATED</span>
          </span>
        </div>

        {/* Structural Low-Contrast Separator */}
        <span className="rr-bridge-divider" aria-hidden="true" />

        {/* Telemetry Clock (Tabular Mono eliminates jitter) */}
        <div className="rr-bridge-sync-cluster">
          <span className="rr-sync-caption">LAST SYNC</span>
          <span className="rr-sync-clock font-mono">{currentTime}</span>
        </div>

        {/* Structural Low-Contrast Separator */}
        <span className="rr-bridge-divider" aria-hidden="true" />

        {/* Primary Connected State Badge */}
        <div className="rr-bridge-conn-badge">
          <span className="rr-conn-dot" aria-hidden="true" />
          <span className="rr-conn-text">CONNECTED</span>
        </div>
      </div>
    </header>
  );
};
