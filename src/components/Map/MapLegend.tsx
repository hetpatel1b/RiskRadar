import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="rr-map-legend" role="region" aria-label="GIS Cartographic Legend">
      <div className="rr-legend-group">
        <span className="rr-legend-group-title">Incidents:</span>
        <div className="rr-legend-item">
          <span className="rr-legend-dot critical" />
          <span>Critical</span>
        </div>
        <div className="rr-legend-item">
          <span className="rr-legend-dot warning" />
          <span>Warning</span>
        </div>
        <div className="rr-legend-item">
          <span className="rr-legend-dot watch" />
          <span>Watch</span>
        </div>
      </div>

      <span className="rr-legend-divider" aria-hidden="true" />

      <div className="rr-legend-group">
        <span className="rr-legend-group-title">Sensors:</span>
        <div className="rr-legend-item">
          <span className="rr-legend-dot safe" />
          <span>Online</span>
        </div>
        <div className="rr-legend-item">
          <span className="rr-legend-dot warning" />
          <span>Alert</span>
        </div>
        <div className="rr-legend-item">
          <span className="rr-legend-dot offline" />
          <span>Offline</span>
        </div>
      </div>
    </div>
  );
};
