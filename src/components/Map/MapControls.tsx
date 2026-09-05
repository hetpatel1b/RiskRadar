import React from 'react';
import { Plus, Minus, RotateCcw, Crosshair } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onLocateIncident: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onLocateIncident,
}) => {
  return (
    <div className="rr-map-controls">
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
        title="Reset India View"
        aria-label="Reset India View"
      >
        <RotateCcw size={13} />
      </button>
    </div>
  );
};
