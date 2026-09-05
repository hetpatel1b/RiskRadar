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
  Radar,
  ShieldCheck,
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
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-map', label: 'Live Map', icon: MapPin },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: BrainCircuit },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: alertCount },
    { id: 'sensors', label: 'Sensors', icon: Activity },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="rr-sidebar" aria-label="RiskRadar Navigation">
      {/* Brand Header */}
      <div className="rr-sidebar-brand">
        <div className="rr-brand-icon">
          <Radar size={18} />
        </div>
        <div className="rr-brand-text">
          <span className="rr-brand-title">RiskRadar</span>
          <span className="rr-brand-subtitle">Emergency Command</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="rr-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`rr-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
              type="button"
            >
              <Icon className="rr-nav-icon" />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="rr-nav-badge alert tabular-nums">
                  {item.badge < 10 ? `0${item.badge}` : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Operator Status Footer */}
      <div className="rr-sidebar-footer">
        <div className="rr-operator-card">
          <div className="rr-operator-avatar">
            CMD
          </div>
          <div className="rr-operator-info">
            <span className="rr-operator-name">NDMA Gujarat Desk</span>
            <span className="rr-operator-role">
              <ShieldCheck size={11} color="#10b981" /> Tier-1 Controller
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
