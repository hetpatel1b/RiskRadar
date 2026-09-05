import React from 'react';
import { MOCK_INFRASTRUCTURE } from '../../data/infrastructure';
import './InfrastructurePanel.css';

interface TopologyNode {
  name: string;
  count: string;
  status: 'safe' | 'cyan';
}

const TOPOLOGY_STAGES: TopologyNode[] = [
  { name: 'SENSORS', count: '1,201 Online', status: 'safe' },
  { name: 'GATEWAYS', count: '38 Active', status: 'safe' },
  { name: 'NETWORK', count: 'LoRa / 4G / Satellite', status: 'safe' },
  { name: 'RISKRADAR', count: 'Command Core', status: 'cyan' },
];

export const InfrastructurePanel: React.FC = () => {
  const infra = MOCK_INFRASTRUCTURE;

  return (
    <div className="rr-infra-instrument" aria-label="Infrastructure Health & Telemetry Topology">
      {/* 1. Header with Clean Baseline and Restrained State */}
      <div className="rr-infra-header">
        <span className="rr-infra-title">INFRASTRUCTURE HEALTH</span>
        <div className="rr-infra-status-wrap">
          <span className="status-dot safe" />
          <span className="rr-infra-status-text">NOMINAL</span>
        </div>
      </div>

      {/* 2. Integrated 5-Metric Strip with Subtle Vertical Hairline Separators */}
      <div className="rr-infra-metrics-deck">
        <div className="rr-infra-metric-unit">
          <span className="rr-metric-unit-label">TOTAL DEVICES</span>
          <span className="rr-metric-unit-val font-mono">{infra.totalDevices.toLocaleString()}</span>
        </div>

        <div className="rr-infra-metric-unit">
          <span className="rr-metric-unit-label">ONLINE</span>
          <span className="rr-metric-unit-val font-mono safe">{infra.online.toLocaleString()}</span>
        </div>

        <div className="rr-infra-metric-unit">
          <span className="rr-metric-unit-label">OFFLINE</span>
          <span className="rr-metric-unit-val font-mono muted">{infra.offline}</span>
        </div>

        <div className="rr-infra-metric-unit">
          <span className="rr-metric-unit-label">GATEWAY</span>
          <span className="rr-metric-unit-val font-mono blue">{infra.gatewayHealth}%</span>
        </div>

        <div className="rr-infra-metric-unit last">
          <span className="rr-metric-unit-label">NETWORK</span>
          <span className="rr-metric-unit-val font-mono safe">{infra.networkHealth}%</span>
        </div>
      </div>

      {/* 3. Subtle Internal Separator Line */}
      <div className="rr-infra-internal-divider" />

      {/* 4. Dedicated Horizontal Topology Strip (45-55px) */}
      <div className="rr-infra-topology-flow">
        {TOPOLOGY_STAGES.map((node, idx) => (
          <React.Fragment key={node.name}>
            <div className="rr-topo-cell">
              <div className="rr-topo-head">
                <span className={`status-dot ${node.status}`} />
                <span className="rr-topo-name">{node.name}</span>
              </div>
              <span className="rr-topo-sub font-mono">{node.count}</span>
            </div>

            {idx < TOPOLOGY_STAGES.length - 1 && (
              <div className="rr-topo-link" aria-hidden="true">
                <div className="rr-topo-trace">
                  <span className="rr-topo-flow-dot" />
                </div>
                <span className="rr-topo-pointer">→</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
