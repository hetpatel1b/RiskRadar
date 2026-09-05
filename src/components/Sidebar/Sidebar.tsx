import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  BrainCircuit,
  AlertTriangle,
  Activity,
  Network,
  BarChart3,
  Settings,
  Shield,
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  alertCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  alertCount = 3,
}) => {
  const commandItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-map', label: 'Live Map', icon: MapPin },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: BrainCircuit },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: alertCount },
    { id: 'sensors', label: 'Sensors', icon: Activity },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="rr-sidebar" aria-label="RiskRadar Strategic Navigation">
      {/* Top Brand Identity */}
      <div className="rr-sidebar-top">
        <div className="rr-sidebar-brand-mark">
          <Shield size={15} strokeWidth={2.2} />
        </div>
        <div className="rr-sidebar-brand-text">
          <span className="rr-brand-title">RiskRadar</span>
          <span className="rr-brand-subtitle">NATIONAL RESILIENCE</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="rr-sidebar-nav">
        <div className="rr-nav-group">
          <span className="rr-nav-group-title">COMMAND CENTER</span>
          {commandItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`rr-nav-button ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(item.id)}
              >
                <Icon size={14} className="rr-nav-btn-icon" />
                <span className="rr-nav-btn-label">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="rr-nav-btn-badge font-mono">
                    {item.badge < 10 ? `0${item.badge}` : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="rr-sidebar-divider" />

        <div className="rr-nav-group">
          <span className="rr-nav-group-title">SYSTEM</span>
          <button
            type="button"
            className={`rr-nav-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => onSelectTab('settings')}
          >
            <Settings size={14} className="rr-nav-btn-icon" />
            <span className="rr-nav-btn-label">Settings</span>
          </button>
        </div>
      </div>

      {/* Bottom Operational Desk */}
      <div className="rr-sidebar-bottom">
        <div className="rr-desk-indicator">
          <span className="rr-desk-dot" />
          <div className="rr-desk-meta">
            <span className="rr-desk-title">NDMA Operations Desk</span>
            <span className="rr-desk-subtitle">National Controller Tier-1</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
