import React from 'react';
import type { SensorNode } from '../../types/sensor';
import {
  Radio,
  Battery,
  Wifi,
  Clock,
  X,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface SensorPopupProps {
  sensor: SensorNode;
  onClose: () => void;
}

export const SensorPopup: React.FC<SensorPopupProps> = ({ sensor, onClose }) => {
  const isWarning = sensor.currentReading.isWarning;
  const isCritical = sensor.currentReading.isCritical;

  return (
    <div className="absolute z-20 top-4 right-4 w-72 command-panel rounded-xl border border-radar-cyan/40 p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 select-none">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-white/[0.08] pb-2.5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-semantic-safe"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-radar-cyan font-bold">
              {sensor.id}
            </span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/[0.06] text-radar-muted">
              {sensor.sector}
            </span>
          </div>
          <h4 className="text-xs font-semibold text-white mt-1 leading-tight">
            {sensor.name}
          </h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-radar-muted hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Metric Highlight */}
      <div className="my-3 p-2.5 rounded-lg bg-[#080C14] border border-[#162238] flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-radar-muted">
            {sensor.currentReading.label}
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span
              className={`text-xl font-mono font-bold ${
                isCritical
                  ? 'text-semantic-critical'
                  : isWarning
                  ? 'text-semantic-warning'
                  : 'text-white'
              }`}
            >
              {sensor.currentReading.value}
            </span>
            <span className="text-xs font-mono text-radar-muted">
              {sensor.currentReading.unit}
            </span>
          </div>
        </div>

        <div>
          {isCritical ? (
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-semantic-critical/15 text-semantic-critical border border-semantic-critical/40 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              CRITICAL
            </span>
          ) : isWarning ? (
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-semantic-warning/15 text-semantic-warning border border-semantic-warning/40 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              WARNING
            </span>
          ) : (
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-semantic-safe/15 text-semantic-safe border border-semantic-safe/40 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              NOMINAL
            </span>
          )}
        </div>
      </div>

      {/* Device Telemetry Specs */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#101726] border border-white/[0.04]">
          <Battery className="w-3.5 h-3.5 text-semantic-safe" />
          <span className="text-radar-muted">Battery:</span>
          <span className="text-white font-semibold">{sensor.batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#101726] border border-white/[0.04]">
          <Wifi className="w-3.5 h-3.5 text-radar-cyan" />
          <span className="text-radar-muted">RSSI:</span>
          <span className="text-white font-semibold">{sensor.signalRssi} dBm</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#101726] border border-white/[0.04]">
          <Radio className="w-3.5 h-3.5 text-radar-secondary" />
          <span className="text-radar-muted">GW:</span>
          <span className="text-white truncate font-medium">{sensor.gatewayId.split('-')[1]}</span>
        </div>
        <div className="flex items-center gap-1.5 p-1.5 rounded bg-[#101726] border border-white/[0.04]">
          <Clock className="w-3.5 h-3.5 text-radar-muted" />
          <span className="text-radar-muted">Ping:</span>
          <span className="text-radar-secondary">{sensor.lastPing}</span>
        </div>
      </div>

      {/* GPS Coord Bar */}
      <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-radar-muted">
        <span>LAT: {sensor.coordinates.lat.toFixed(4)}° N</span>
        <span>LNG: {sensor.coordinates.lng.toFixed(4)}° E</span>
      </div>
    </div>
  );
};
