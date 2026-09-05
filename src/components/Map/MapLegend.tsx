import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="rr-map-legend">
      <span className="rr-legend-label">Sensors:</span>
      <div className="rr-legend-item">
        <span className="status-dot safe" />
        <span>Online</span>
      </div>
      <div className="rr-legend-item">
        <span className="status-dot warning" />
        <span>Warning</span>
      </div>
      <div className="rr-legend-item">
        <span className="status-dot critical" />
        <span>Critical</span>
      </div>
      <div className="rr-legend-item">
        <span className="status-dot offline" />
        <span>Offline</span>
      </div>
    </div>
  );
};
