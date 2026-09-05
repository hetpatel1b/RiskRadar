import React from 'react';
import type { InfrastructureStatus } from '../../types/infrastructure';
import { NetworkTopology } from './NetworkTopology';
import {
  Server,
  Router,
  Wifi,
  Clock
} from 'lucide-react';

interface InfrastructureHealthProps {
  status: InfrastructureStatus;
}

export const InfrastructureHealth: React.FC<InfrastructureHealthProps> = ({ status }) => {
  return (
    <div className="command-panel rounded-2xl border border-[#172234] p-4 flex flex-col justify-between shadow-xl select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-radar-cyan/10 border border-radar-cyan/30 flex items-center justify-center">
              <Server className="w-4 h-4 text-radar-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Infrastructure & Network Health
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-semantic-safe/15 text-semantic-safe border border-semantic-safe/30 font-bold">
                  {status.overallHealthPercent}% ONLINE
                </span>
              </div>
              <p className="text-[10px] font-mono text-radar-muted">
                Mesh Telemetry, Relay Stations & Uplink Health
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-semantic-safe animate-pulse"></span>
            <span className="text-semantic-safe text-[11px] font-semibold">ALL GWS NOMINAL</span>
          </div>
        </div>

        {/* Counters Grid: Total Devices, Online, Offline, Degraded */}
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          {/* Total Devices */}
          <div className="p-2 rounded-xl bg-[#090E17] border border-[#172439]">
            <span className="text-[10px] font-mono uppercase text-radar-muted">Total Nodes</span>
            <div className="text-lg font-mono font-bold text-white mt-0.5">
              {status.totalDevices.toLocaleString()}
            </div>
            <span className="text-[9px] font-mono text-radar-secondary">Provisioned</span>
          </div>

          {/* Online Devices */}
          <div className="p-2 rounded-xl bg-[#090E17] border border-[#172439]">
            <span className="text-[10px] font-mono uppercase text-semantic-safe">Online</span>
            <div className="text-lg font-mono font-bold text-semantic-safe mt-0.5">
              {status.onlineDevices.toLocaleString()}
            </div>
            <span className="text-[9px] font-mono text-semantic-safe">96.2% Active</span>
          </div>

          {/* Offline Devices */}
          <div className="p-2 rounded-xl bg-[#090E17] border border-[#172439]">
            <span className="text-[10px] font-mono uppercase text-semantic-critical">Offline</span>
            <div className="text-lg font-mono font-bold text-semantic-critical mt-0.5">
              {status.offlineDevices}
            </div>
            <span className="text-[9px] font-mono text-radar-muted">No Ping &gt;1h</span>
          </div>

          {/* Degraded Devices */}
          <div className="p-2 rounded-xl bg-[#090E17] border border-[#172439]">
            <span className="text-[10px] font-mono uppercase text-semantic-warning">Degraded</span>
            <div className="text-lg font-mono font-bold text-semantic-warning mt-0.5">
              {status.degradedDevices}
            </div>
            <span className="text-[9px] font-mono text-radar-muted">Low Battery/RSSI</span>
          </div>
        </div>

        {/* Network & Gateway Telemetry */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {/* Gateway Health */}
          <div className="p-2.5 rounded-xl bg-[#0A101C] border border-[#182740]">
            <div className="flex items-center justify-between text-[10px] font-mono text-radar-muted">
              <span>GATEWAY UPTIME</span>
              <Router className="w-3.5 h-3.5 text-radar-cyan" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-mono font-bold text-white">
                {status.networkHealth.activeGatewaysCount}/{status.networkHealth.totalGatewaysCount}
              </span>
              <span className="text-[10px] font-mono text-semantic-safe">Active</span>
            </div>
            <div className="w-full bg-[#141F32] rounded-full h-1 mt-1.5 overflow-hidden">
              <div className="bg-semantic-safe h-full rounded-full" style={{ width: `${status.gatewayHealthPercent}%` }} />
            </div>
          </div>

          {/* Latency */}
          <div className="p-2.5 rounded-xl bg-[#0A101C] border border-[#182740]">
            <div className="flex items-center justify-between text-[10px] font-mono text-radar-muted">
              <span>MESH LATENCY</span>
              <Clock className="w-3.5 h-3.5 text-radar-cyan" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-mono font-bold text-radar-cyan">
                {status.networkHealth.latencyMs}
              </span>
              <span className="text-[10px] font-mono text-radar-muted">ms</span>
            </div>
            <div className="text-[9px] font-mono text-semantic-safe mt-1.5">
              Packet Loss: {status.networkHealth.packetLossPercent}%
            </div>
          </div>

          {/* Protocol & Uplink */}
          <div className="p-2.5 rounded-xl bg-[#0A101C] border border-[#182740]">
            <div className="flex items-center justify-between text-[10px] font-mono text-radar-muted">
              <span>BANDWIDTH</span>
              <Wifi className="w-3.5 h-3.5 text-radar-cyan" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-mono font-bold text-white">
                {status.networkHealth.bandwidthKbps}
              </span>
              <span className="text-[10px] font-mono text-radar-muted">kbps</span>
            </div>
            <div className="text-[9px] font-mono text-radar-muted mt-1.5 truncate">
              {status.networkHealth.protocol}
            </div>
          </div>
        </div>

        {/* Visual Topology Flow */}
        <div className="mt-3">
          <NetworkTopology
            sensorsCount={status.topology.sensorsCount}
            gatewaysCount={status.topology.gatewaysCount}
            relayCount={status.topology.relayNetworksCount}
            engineStatus={status.topology.commandCenterStatus}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-radar-muted">
        <span>RELAY BAND: 902–928 MHz FREQUENCY HOPPING SPREAD SPECTRUM</span>
        <span className="text-radar-cyan">SECURITY: FIPS 140-3 COMPLIANT</span>
      </div>
    </div>
  );
};
