import React from 'react';
import type { SensorNode } from '../../types/sensor';
import { Radio } from 'lucide-react';

interface SensorMarkerProps {
  sensor: SensorNode;
  isSelected: boolean;
  onClick: () => void;
  xPercent: number;
  yPercent: number;
}

export const SensorMarker: React.FC<SensorMarkerProps> = ({
  sensor,
  isSelected,
  onClick,
  xPercent,
  yPercent,
}) => {
  const isCritical = sensor.currentReading.isCritical;
  const isWarning = sensor.currentReading.isWarning;

  const colorClass = isCritical
    ? 'text-semantic-critical border-semantic-critical bg-semantic-critical/20'
    : isWarning
    ? 'text-semantic-warning border-semantic-warning bg-semantic-warning/20'
    : 'text-radar-cyan border-radar-cyan bg-radar-cyan/20';

  const pulseClass = isCritical
    ? 'bg-semantic-critical/40'
    : isWarning
    ? 'bg-semantic-warning/40'
    : 'bg-radar-cyan/30';

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group select-none transition-transform duration-150 hover:scale-110 z-10"
      style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
      onClick={onClick}
    >
      {/* Outer subtle radar wave ring */}
      <div
        className={`absolute -inset-1.5 rounded-full ${pulseClass} ${
          isSelected ? 'ring-2 ring-radar-cyan animate-ping opacity-60' : 'opacity-40 group-hover:opacity-80'
        }`}
      />

      {/* Center Marker Pin */}
      <div
        className={`relative w-6 h-6 rounded-full border flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${colorClass} ${
          isSelected ? 'scale-125 shadow-[0_0_12px_rgba(0,229,255,0.8)] border-white' : ''
        }`}
      >
        <Radio className="w-3 h-3" />
      </div>

      {/* Mini Node Label Badge on hover or select */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -bottom-5 px-1.5 py-0.2 rounded bg-[#090D15]/90 border border-[#1A2538] whitespace-nowrap text-[9px] font-mono tracking-tight text-white pointer-events-none transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {sensor.id} : {sensor.currentReading.value}{sensor.currentReading.unit}
      </div>
    </div>
  );
};
