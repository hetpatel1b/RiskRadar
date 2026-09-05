import React from 'react';
import { Plus, Minus, RotateCcw, Crosshair, Maximize2, Minimize2 } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onLocateIncident: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onLocateIncident,
  onToggleFullscreen,
  isFullscreen = false,
}) => {
  return (
    <div className="rr-map-controls" role="toolbar" aria-label="GIS Map Controls">
      <button
        type="button"
        className="rr-map-control-btn"
        onClick={onZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <Plus size={14} />
      </button>

      <button
        type="button"
        className="rr-map-control-btn"
        onClick={onZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <Minus size={14} />
      </button>

      <button
        type="button"
        className="rr-map-control-btn"
        onClick={onLocateIncident}
        title="Focus Active Incident (Vadodara)"
        aria-label="Focus Active Incident"
      >
        <Crosshair size={14} />
      </button>

      <button
        type="button"
        className="rr-map-control-btn"
        onClick={onResetView}
        title="Reset India Overview"
        aria-label="Reset India Overview"
      >
        <RotateCcw size={13} />
      </button>

      {onToggleFullscreen && (
        <button
          type="button"
          className={`rr-map-control-btn ${isFullscreen ? 'active' : ''}`}
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen GIS'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen GIS'}
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>
      )}
    </div>
  );
};
