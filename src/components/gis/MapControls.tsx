import React from 'react';
import {
  Plus,
  Minus,
  Maximize2,
  Compass,
  Crosshair,
  Grid,
  Scan
} from 'lucide-react';

interface MapControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  activeSector: string;
  onSelectSector: (sector: string) => void;
  mapMode: 'tactical' | 'satellite' | 'radar';
  onSelectMapMode: (mode: 'tactical' | 'satellite' | 'radar') => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  showGrid,
  onToggleGrid,
  activeSector,
  onSelectSector,
  mapMode,
  onSelectMapMode,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono select-none">
      {/* Sector quick selector */}
      <div className="flex items-center gap-1 bg-[#090E17]/90 p-1 rounded-md border border-[#172336]">
        <span className="text-[10px] text-radar-muted px-1.5 uppercase">SECTOR:</span>
        {['ALL', 'SEC-04', 'SEC-07', 'SEC-02'].map((sec) => (
          <button
            key={sec}
            onClick={() => onSelectSector(sec)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              activeSector === sec
                ? 'bg-radar-cyan/15 text-radar-cyan font-bold border border-radar-cyan/30'
                : 'text-radar-secondary hover:text-white'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Map Mode: Tactical / Radar / Satellite */}
      <div className="flex items-center gap-1 bg-[#090E17]/90 p-1 rounded-md border border-[#172336]">
        <button
          onClick={() => onSelectMapMode('tactical')}
          className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors ${
            mapMode === 'tactical'
              ? 'bg-[#152136] text-radar-cyan border border-radar-cyan/30'
              : 'text-radar-muted hover:text-radar-secondary'
          }`}
        >
          <Crosshair className="w-3 h-3" />
          <span>Tactical</span>
        </button>
        <button
          onClick={() => onSelectMapMode('radar')}
          className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors ${
            mapMode === 'radar'
              ? 'bg-[#152136] text-radar-cyan border border-radar-cyan/30'
              : 'text-radar-muted hover:text-radar-secondary'
          }`}
        >
          <Scan className="w-3 h-3" />
          <span>Radar</span>
        </button>
        <button
          onClick={() => onSelectMapMode('satellite')}
          className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors ${
            mapMode === 'satellite'
              ? 'bg-[#152136] text-radar-cyan border border-radar-cyan/30'
              : 'text-radar-muted hover:text-radar-secondary'
          }`}
        >
          <Compass className="w-3 h-3" />
          <span>Satellite</span>
        </button>
      </div>

      {/* Grid overlay toggle & Zoom controls */}
      <div className="flex items-center gap-1 bg-[#090E17]/90 p-1 rounded-md border border-[#172336]">
        <button
          onClick={onToggleGrid}
          title="Toggle Military MGRS Grid Overlay"
          className={`p-1 rounded text-[11px] transition-colors ${
            showGrid ? 'bg-radar-cyan/15 text-radar-cyan' : 'text-radar-muted hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-px bg-[#1C273C] mx-0.5" />
        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="p-1 rounded text-radar-secondary hover:text-white hover:bg-[#152136] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] text-radar-muted font-bold px-1">{zoom}x</span>
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="p-1 rounded text-radar-secondary hover:text-white hover:bg-[#152136] transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-px bg-[#1C273C] mx-0.5" />
        <button
          onClick={onResetView}
          title="Reset Center"
          className="p-1 rounded text-radar-secondary hover:text-white hover:bg-[#152136] transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
