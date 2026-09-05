import React from 'react';
import {
  Radio,
  Router,
  Network,
  Cpu
} from 'lucide-react';

interface NetworkTopologyProps {
  sensorsCount: number;
  gatewaysCount: number;
  relayCount?: number;
  engineStatus: string;
}

export const NetworkTopology: React.FC<NetworkTopologyProps> = ({
  sensorsCount = 1201,
  gatewaysCount = 42,
  relayCount = 6,
  engineStatus = 'CONNECTED',
}) => {
  return (
    <div className="p-3 rounded-xl bg-[#080C14] border border-[#162236] select-none">
      <div className="flex items-center justify-between text-[10px] font-mono text-radar-muted mb-2">
        <span className="uppercase tracking-wider">END-TO-END TELEMETRY TOPOLOGY FLOW</span>
        <span className="text-semantic-safe flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-semantic-safe"></span>
          ENCRYPTED MESH ({relayCount} RELAYS)
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 items-center text-center">
        {/* Step 1: Sensors */}
        <div className="p-2 rounded-lg bg-[#0E1524] border border-[#1A2840] flex flex-col items-center">
          <div className="w-6 h-6 rounded-md bg-radar-cyan/10 border border-radar-cyan/30 flex items-center justify-center text-radar-cyan mb-1">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-white">{sensorsCount}</span>
          <span className="text-[9px] font-mono text-radar-muted">Sensors</span>
        </div>

        {/* Step 2: Gateways */}
        <div className="p-2 rounded-lg bg-[#0E1524] border border-[#1A2840] flex flex-col items-center relative">
          <div className="w-6 h-6 rounded-md bg-semantic-safe/10 border border-semantic-safe/30 flex items-center justify-center text-semantic-safe mb-1">
            <Router className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-white">{gatewaysCount} Active</span>
          <span className="text-[9px] font-mono text-radar-muted">Gateways</span>
        </div>

        {/* Step 3: Mesh & Sat Network */}
        <div className="p-2 rounded-lg bg-[#0E1524] border border-[#1A2840] flex flex-col items-center">
          <div className="w-6 h-6 rounded-md bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-1">
            <Network className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-white">915MHz Mesh</span>
          <span className="text-[9px] font-mono text-radar-muted">Uplink Hub</span>
        </div>

        {/* Step 4: RiskRadar Core Engine */}
        <div className="p-2 rounded-lg bg-[#0F1B2D] border border-radar-cyan/40 flex flex-col items-center">
          <div className="w-6 h-6 rounded-md bg-radar-cyan/20 border border-radar-cyan/50 flex items-center justify-center text-radar-cyan mb-1">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-radar-cyan">{engineStatus}</span>
          <span className="text-[9px] font-mono text-radar-muted">RiskRadar AI</span>
        </div>
      </div>

      <div className="mt-2 text-[9px] font-mono text-radar-muted text-center flex items-center justify-center gap-2">
        <span>LoRaWAN / RF Mesh</span>
        <span>→</span>
        <span>AES-256 Backhaul</span>
        <span>→</span>
        <span>Low-Earth Orbit Relays</span>
        <span>→</span>
        <span className="text-radar-cyan font-semibold">RiskRadar Neural Core</span>
      </div>
    </div>
  );
};
