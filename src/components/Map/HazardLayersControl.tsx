import React, { useState, useRef, useEffect } from 'react';
import { Layers, ChevronDown } from 'lucide-react';
import { HazardType } from '../../types';
import { HAZARD_LAYERS_CONFIG } from '../../data/hazards';

interface HazardLayersControlProps {
  activeLayers: Record<HazardType, boolean>;
  onToggleLayer: (type: HazardType) => void;
}

export const HazardLayersControl: React.FC<HazardLayersControlProps> = ({
  activeLayers,
  onToggleLayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCount = Object.values(activeLayers).filter(Boolean).length;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="rr-layers-control-wrap" ref={containerRef}>
      <button
        type="button"
        className={`rr-layers-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Hazard Layers"
      >
        <Layers size={13} className="rr-layers-icon" />
        <span className="rr-layers-label">Hazards</span>
        <span className="rr-layers-count font-mono">{activeCount}/6</span>
        <ChevronDown size={11} className={`rr-chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="rr-layers-dropdown">
          <div className="rr-layers-dropdown-header">
            <span className="rr-layers-dropdown-title">Hazard Layers</span>
            <span className="rr-layers-dropdown-meta font-mono">{activeCount} Active</span>
          </div>

          <div className="rr-layers-list">
            {HAZARD_LAYERS_CONFIG.map((layer) => {
              const isChecked = !!activeLayers[layer.type];
              return (
                <label key={layer.type} className="rr-layer-row">
                  <div className="rr-layer-info">
                    <span
                      className="rr-layer-color-pip"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="rr-layer-name">{layer.name}</span>
                  </div>
                  <input
                    type="checkbox"
                    className="rr-layer-checkbox"
                    checked={isChecked}
                    onChange={() => onToggleLayer(layer.type)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
