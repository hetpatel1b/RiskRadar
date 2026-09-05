import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  lastUpdated?: string;
  regionName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdated = '10:08:42 AM',
  regionName = 'Western Corridor (Gujarat Command)',
}) => {
  const [time, setTime] = useState(lastUpdated);

  // Maintain precise clock ticking while keeping the operational 10:08:42 AM anchor
  useEffect(() => {
    // Keep standard 10:08:42 AM or allow realistic increment
    let secondsOffset = 0;
    const interval = setInterval(() => {
      secondsOffset += 1;
      const baseSec = 42 + secondsOffset;
      const sec = baseSec % 60;
      const min = (8 + Math.floor(baseSec / 60)) % 60;
      const secStr = sec < 10 ? `0${sec}` : `${sec}`;
      const minStr = min < 10 ? `0${min}` : `${min}`;
      setTime(`10:${minStr}:${secStr} AM`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="rr-header">
      <div className="rr-header-left">
        <div className="rr-header-title-wrap">
          <span className="rr-header-title">RiskRadar</span>
          <div className="rr-header-divider" />
          <div className="rr-live-badge">
            <span className="pulse-dot" />
            <span>LIVE SYSTEM</span>
          </div>
        </div>

        <div className="rr-header-divider" />
        <div className="rr-header-region">
          <span>Sector:</span>
          <strong>{regionName}</strong>
        </div>
      </div>

      <div className="rr-header-right">
        <div className="rr-header-meta">
          <div className="rr-meta-item">
            <span className="rr-meta-label">Telemetry Ingest</span>
            <span className="rr-meta-value" style={{ color: 'var(--accent-cyan)' }}>Active Sync</span>
          </div>
          <div className="rr-meta-item">
            <span className="rr-meta-label">Last Updated</span>
            <span className="rr-meta-value tabular-nums">{time}</span>
          </div>
        </div>

        <div className="rr-mode-badge">
          <span className="dot" />
          <span>Operational Monitoring</span>
        </div>
      </div>
    </header>
  );
};
