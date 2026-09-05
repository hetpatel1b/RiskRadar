import React from 'react';
import { Server, ArrowRight } from 'lucide-react';
import { MOCK_INFRASTRUCTURE } from '../../data/mockData';
import './InfrastructurePanel.css';

export const InfrastructurePanel: React.FC = () => {
  const infra = MOCK_INFRASTRUCTURE;

  return (
    <div className="rr-infra-panel" aria-label="Infrastructure Health & Topology Panel">
      <div className="rr-infra-header">
        <div className="rr-infra-title-wrap">
          <Server size={15} color="var(--accent-cyan)" />
          <span className="rr-infra-title">Sensor & Network Infrastructure</span>
        </div>
        <span className="rr-infra-health-tag tabular-nums">96.4% Operational</span>
      </div>

      {/* 5 Hardware Metrics */}
      <div className="rr-infra-metrics-row tabular-nums">
        <div className="rr-infra-metric-box">
          <span className="rr-infra-metric-label">Total Devices</span>
          <span className="rr-infra-metric-value">{infra.totalDevices.toLocaleString()}</span>
        </div>
        <div className="rr-infra-metric-box">
          <span className="rr-infra-metric-label">Online</span>
          <span className="rr-infra-metric-value" style={{ color: 'var(--hazard-safe)' }}>
            {infra.online.toLocaleString()}
          </span>
        </div>
        <div className="rr-infra-metric-box">
          <span className="rr-infra-metric-label">Offline</span>
          <span className="rr-infra-metric-value" style={{ color: '#94a3b8' }}>
            {infra.offline}
          </span>
        </div>
        <div className="rr-infra-metric-box">
          <span className="rr-infra-metric-label">Gateway Health</span>
          <span className="rr-infra-metric-value" style={{ color: 'var(--accent-cyan)' }}>
            {infra.gatewayHealth}%
          </span>
        </div>
        <div className="rr-infra-metric-box">
          <span className="rr-infra-metric-label">Network Health</span>
          <span className="rr-infra-metric-value" style={{ color: 'var(--hazard-safe)' }}>
            {infra.networkHealth}%
          </span>
        </div>
      </div>

      {/* Visual Topology */}
      <div className="rr-topology-container">
        <span className="rr-topology-title">Telemetry Flow Topology</span>
        <div className="rr-topology-nodes-row">
          <div className="rr-topo-node">
            <span className="rr-topo-pip" />
            <span className="rr-topo-name">SENSORS</span>
          </div>

          <div className="rr-topo-arrow">
            <ArrowRight size={13} />
          </div>

          <div className="rr-topo-node">
            <span className="rr-topo-pip" />
            <span className="rr-topo-name">GATEWAYS</span>
          </div>

          <div className="rr-topo-arrow">
            <ArrowRight size={13} />
          </div>

          <div className="rr-topo-node">
            <span className="rr-topo-pip" />
            <span className="rr-topo-name">NETWORK</span>
          </div>

          <div className="rr-topo-arrow">
            <ArrowRight size={13} />
          </div>

          <div className="rr-topo-node" style={{ borderColor: 'var(--border-cyan)' }}>
            <span className="rr-topo-pip" style={{ background: 'var(--accent-cyan)', boxShadow: '0 0 5px var(--accent-cyan)' }} />
            <span className="rr-topo-name" style={{ color: 'var(--accent-cyan)' }}>RISKRADAR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
