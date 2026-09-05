import React from 'react';
import { MOCK_INFRASTRUCTURE } from '../../data/infrastructure';
import './InfrastructurePanel.css';

interface TopologyNode {
  name: string;
  sub: string;
  status: 'safe' | 'cyan';
  statusLabel: string;
}

const TOPOLOGY_STAGES: TopologyNode[] = [
  { name: 'SENSORS', sub: '1,201 Online', status: 'safe', statusLabel: 'ONLINE' },
  { name: 'GATEWAYS', sub: '38 Active', status: 'safe', statusLabel: 'ACTIVE' },
  { name: 'NETWORK', sub: 'LoRa / 4G / Sat', status: 'safe', statusLabel: 'HEALTHY' },
  { name: 'RISKRADAR', sub: 'Command Core', status: 'cyan', statusLabel: 'CONNECTED' },
];

export const InfrastructurePanel: React.FC = () => {
  const infra = MOCK_INFRASTRUCTURE;

  const metricItems = [
    {
      id: 'total',
      label: 'TOTAL DEVICES',
      val: infra.totalDevices.toLocaleString(),
      context: 'Registered fleet',
      variant: 'default',
    },
    {
      id: 'online',
      label: 'ONLINE',
      val: infra.online.toLocaleString(),
      context: '96.2% reporting',
      variant: 'safe',
    },
    {
      id: 'offline',
      label: 'OFFLINE',
      val: infra.offline.toString(),
      context: '3.8% unavailable',
      variant: 'muted',
    },
    {
      id: 'gateway',
      label: 'GATEWAY',
      val: `${infra.gatewayHealth}%`,
      context: 'Gateway health',
      variant: 'cyan',
    },
    {
      id: 'network',
      label: 'NETWORK',
      val: `${infra.networkHealth}%`,
      context: 'Network health',
      variant: 'safe',
    },
  ];

  return (
    <div className="rr-infra-instrument" aria-label="Command Infrastructure Health & Telemetry Topology">
      {/* 1. Header with Clean Baseline and Restrained State */}
      <div className="rr-infra-header">
        <span className="rr-infra-title">INFRASTRUCTURE HEALTH</span>
        <div className="rr-infra-status-wrap" title="Global Sensing & Telemetry Infrastructure Operational">
          <span className="rr-infra-status-dot safe" />
          <span className="rr-infra-status-text font-mono">NOMINAL</span>
        </div>
      </div>

      {/* 2. Unified 5-Metric Strip with Hairline Separators & Baseline Alignment */}
      <div className="rr-infra-metrics-deck" role="region" aria-label="Five Core Infrastructure Metrics">
        {metricItems.map((item, idx) => (
          <div
            key={item.id}
            className={`rr-infra-metric-unit ${idx === metricItems.length - 1 ? 'last' : ''}`}
            title={`${item.label}: ${item.val} (${item.context})`}
          >
            <span className="rr-metric-unit-label">{item.label}</span>
            <span className={`rr-metric-unit-val font-mono ${item.variant}`}>{item.val}</span>
            <span className="rr-metric-unit-sub">{item.context}</span>
          </div>
        ))}
      </div>

      {/* 3. Dedicated Horizontal Topology Strip (Slightly Recessed Instrument Surface) */}
      <div className="rr-infra-topology-flow" role="region" aria-label="Four-Stage Telemetry Topology Flow">
        {TOPOLOGY_STAGES.map((node, idx) => (
          <React.Fragment key={node.name}>
            <div className="rr-topo-cell">
              <div className="rr-topo-head">
                <span className={`rr-topo-dot ${node.status}`} />
                <span className="rr-topo-name">{node.name}</span>
              </div>
              <span className="rr-topo-sub font-mono">{node.sub}</span>
            </div>

            {idx < TOPOLOGY_STAGES.length - 1 && (
              <div className="rr-topo-link" aria-hidden="true">
                <div className="rr-topo-trace">
                  <span className={`rr-topo-flow-dot delay-${idx}`} />
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
