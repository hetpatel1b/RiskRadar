import React from 'react';
import type { HazardCategory, HazardLayerConfig } from '../../types/hazard';
import {
  Waves,
  CloudRain,
  Mountain,
  ThermometerSun,
  Wind,
  Flame,
  Layers
} from 'lucide-react';

interface HazardLayersProps {
  layers: HazardLayerConfig[];
  onToggleLayer: (id: HazardCategory) => void;
  activeCount: number;
}

const getLayerIcon = (id: HazardCategory) => {
  switch (id) {
    case 'flood':
      return Waves;
    case 'rainfall':
      return CloudRain;
    case 'landslide':
      return Mountain;
    case 'temperature':
      return ThermometerSun;
    case 'air_pollution':
      return Wind;
    case 'wildfire':
      return Flame;
  }
};

export const HazardLayers: React.FC<HazardLayersProps> = ({
  layers,
  onToggleLayer,
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
      <div className="flex items-center gap-1 text-[11px] font-mono text-radar-muted uppercase tracking-wider pr-2 border-r border-[#1C273C] shrink-0">
        <Layers className="w-3.5 h-3.5 text-radar-cyan" />
        <span>HAZARD LAYERS</span>
      </div>

      {layers.map((layer) => {
        const Icon = getLayerIcon(layer.id);
        const isActive = layer.active;

        return (
          <button
            key={layer.id}
            onClick={() => onToggleLayer(layer.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 shrink-0 select-none ${
              isActive
                ? 'bg-[#131C2D] text-white border border-[#22334D] shadow-sm'
                : 'bg-[#0B1018]/80 text-radar-muted border border-white/[0.04] hover:text-radar-secondary hover:bg-[#0F1622]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: isActive ? layer.color : '#4A5568',
                boxShadow: isActive ? `0 0 6px ${layer.color}` : 'none'
              }}
            />
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-radar-muted'}`} />
            <span className="text-[11px] font-medium">{layer.label}</span>
            {layer.activeIncidentsCount > 0 && (
              <span
                className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                  isActive
                    ? 'bg-radar-cyan/20 text-radar-cyan border border-radar-cyan/30'
                    : 'bg-[#1C2538] text-radar-muted'
                }`}
              >
                {layer.activeIncidentsCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
