import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import {
  Layers,
  Plus,
  Minus,
  RotateCcw,
  Crosshair,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { SensorData, HazardZone, HazardType } from '../../types';
import { HAZARD_LAYER_CONFIG } from '../../data/mockData';
import './GisMap.css';

interface GisMapProps {
  sensors: SensorData[];
  hazardZones: HazardZone[];
  selectedSensorId: string | null;
  onSelectSensor: (sensor: SensorData | null) => void;
  focusedLocation?: { lat: number; lng: number } | null;
}

export const GisMap: React.FC<GisMapProps> = ({
  sensors,
  hazardZones,
  selectedSensorId,
  onSelectSensor,
  focusedLocation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const hazardsLayerRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());

  // Layer Visibility State for the 6 Hazard Types
  const [activeLayers, setActiveLayers] = useState<Record<HazardType, boolean>>({
    flood: true,
    heavy_rainfall: true,
    landslide: false,
    extreme_temperature: false,
    air_pollution: false,
    forest_fire: true,
  });

  const [layersMenuOpen, setLayersMenuOpen] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Centered on Gujarat
    const map = L.map(mapContainerRef.current, {
      center: [22.3, 72.5],
      zoom: 7.4,
      zoomControl: false,
      attributionControl: true,
      minZoom: 6,
      maxZoom: 16,
    });

    // Esri World Dark Gray Base - ultra clean, near-black, zero watermark, completely legal
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        attribution:
          '&copy; <a href="https://www.esri.com" target="_blank" rel="noreferrer">Esri</a>, DeLorme, HERE',
      }
    ).addTo(map);

    // Esri World Dark Gray Reference Layer (crisp geographic boundaries & city labels)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
      }
    ).addTo(map);

    const hazardsGroup = L.layerGroup().addTo(map);
    const markersGroup = L.layerGroup().addTo(map);

    hazardsLayerRef.current = hazardsGroup;
    markersLayerRef.current = markersGroup;
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Hazard Layer Polygons
  useEffect(() => {
    const group = hazardsLayerRef.current;
    if (!group) return;

    group.clearLayers();

    hazardZones.forEach((zone) => {
      if (!activeLayers[zone.type]) return;

      let color = '#ef4444';
      let fillColor = '#ef4444';
      let fillOpacity = 0.26;

      if (zone.type === 'heavy_rainfall') {
        color = '#f97316';
        fillColor = '#f97316';
        fillOpacity = 0.24;
      } else if (zone.type === 'forest_fire') {
        color = '#f59e0b';
        fillColor = '#f59e0b';
        fillOpacity = 0.26;
      }

      const polygon = L.polygon(zone.coordinates, {
        color: color,
        weight: 2,
        dashArray: zone.severity === 'critical' ? '4, 4' : undefined,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      });

      // Tooltip for hazard polygon
      polygon.bindTooltip(
        `<div style="font-size:11px; font-weight:600; color:#fff;">
          <strong>${zone.title}</strong><br/>
          <span style="color:${color}; text-transform:uppercase;">${zone.severity}</span> • ${zone.areaKm2} km²
        </div>`,
        { sticky: true, className: 'leaflet-tooltip-dark' }
      );

      polygon.addTo(group);
    });
  }, [hazardZones, activeLayers]);

  // Create sensor popup HTML
  const createPopupContent = useCallback((sensor: SensorData) => {
    const statusColor =
      sensor.status === 'online'
        ? 'var(--hazard-safe)'
        : sensor.status === 'critical'
        ? 'var(--hazard-critical)'
        : sensor.status === 'warning'
        ? 'var(--hazard-warning)'
        : '#64748b';

    return `
      <div class="rr-sensor-popup-card">
        <div class="rr-popup-header">
          <div class="rr-popup-sensor-code">
            <span>SENSOR: ${sensor.code}</span>
            <span class="status-pill ${sensor.status}">${sensor.status.toUpperCase()}</span>
          </div>
          <div class="rr-popup-location">${sensor.location} • ${sensor.name}</div>
        </div>
        <div class="rr-popup-grid tabular-nums">
          <div class="rr-popup-metric">
            <div class="rr-popup-metric-label">Temperature</div>
            <div class="rr-popup-metric-value">${sensor.temperature}°C</div>
          </div>
          <div class="rr-popup-metric">
            <div class="rr-popup-metric-label">Humidity</div>
            <div class="rr-popup-metric-value">${sensor.humidity}%</div>
          </div>
          <div class="rr-popup-metric">
            <div class="rr-popup-metric-label">Rainfall</div>
            <div class="rr-popup-metric-value">${sensor.rainfall} mm</div>
          </div>
          <div class="rr-popup-metric">
            <div class="rr-popup-metric-label">Water Level</div>
            <div class="rr-popup-metric-value">${sensor.waterLevel} m</div>
          </div>
          <div class="rr-popup-metric">
            <div class="rr-popup-metric-label">Battery</div>
            <div class="rr-popup-metric-value">${sensor.battery}%</div>
          </div>
          <div class="rr-popup-metric">
            <div class="rr-popup-metric-label">Status</div>
            <div class="rr-popup-metric-value" style="color: ${statusColor}; font-weight:700;">
              ${sensor.status.toUpperCase()}
            </div>
          </div>
        </div>
        <div class="rr-popup-footer">
          <span>Last Update: <strong>${sensor.lastUpdate}</strong></span>
          <span style="color: var(--accent-cyan); font-weight: 600;">TELEMETRY ACTIVE</span>
        </div>
      </div>
    `;
  }, []);

  // Update Sensor Markers
  useEffect(() => {
    const group = markersLayerRef.current;
    if (!group) return;

    group.clearLayers();
    markersMapRef.current.clear();

    sensors.forEach((sensor) => {
      const isSelected = sensor.id === selectedSensorId;

      const markerHtml = `
        <div class="rr-sensor-marker ${sensor.status} ${isSelected ? 'selected' : ''}">
          <div class="rr-marker-pulse ${sensor.status}"></div>
          <div class="rr-marker-core ${sensor.status}"></div>
          <div class="rr-marker-label tabular-nums">${sensor.location}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'rr-marker-container',
        html: markerHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([sensor.lat, sensor.lng], { icon: customIcon });

      marker.bindPopup(createPopupContent(sensor), {
        maxWidth: 290,
        className: 'rr-custom-leaflet-popup',
        autoPan: true,
        autoPanPaddingTopLeft: L.point(20, 80),
        autoPanPaddingBottomRight: L.point(20, 40),
      });

      marker.on('click', () => {
        onSelectSensor(sensor);
      });

      marker.addTo(group);
      markersMapRef.current.set(sensor.id, marker);

      // If this sensor is selected, open its popup
      if (isSelected) {
        setTimeout(() => {
          marker.openPopup();
        }, 100);
      }
    });
  }, [sensors, selectedSensorId, onSelectSensor, createPopupContent]);

  // Handle external focus (e.g. from alert click)
  useEffect(() => {
    if (focusedLocation && mapRef.current) {
      mapRef.current.flyTo([focusedLocation.lat, focusedLocation.lng], 10.5, {
        duration: 1.2,
      });
    }
  }, [focusedLocation]);

  // Controls Handlers
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleResetView = () => {
    mapRef.current?.flyTo([22.3, 72.5], 7.4, { duration: 1.0 });
  };
  const handleLocateCritical = () => {
    // Focus on primary active critical event (Vadodara)
    mapRef.current?.flyTo([22.3072, 73.1812], 10.5, { duration: 1.2 });
    const vadodaraMarker = markersMapRef.current.get('s-1');
    if (vadodaraMarker) {
      vadodaraMarker.openPopup();
    }
  };

  const toggleLayer = (type: HazardType) => {
    setActiveLayers((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const activeLayerCount = Object.values(activeLayers).filter(Boolean).length;

  return (
    <div className="rr-gis-container" aria-label="GIS Multi-Hazard Risk Map">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="rr-gis-map-canvas" />

      {/* Floating HUD Top */}
      <div className="rr-gis-hud-top">
        <div className="rr-gis-hud-badge">
          <ShieldAlert size={14} color="#ef4444" />
          <span>Primary Zone: <strong>Gujarat Inland & Coastal Belt</strong></span>
        </div>

        <div className="rr-map-controls-group">
          {/* Layer Control Dropdown Toggle */}
          <button
            type="button"
            className={`rr-layers-btn ${layersMenuOpen ? 'active' : ''}`}
            onClick={() => setLayersMenuOpen((prev) => !prev)}
            title="Toggle Hazard Layers"
          >
            <Layers size={15} />
            <span>Hazard Layers ({activeLayerCount}/6)</span>
            <ChevronDown size={13} />
          </button>

          {/* Map Navigation Buttons */}
          <button
            type="button"
            className="rr-map-btn"
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            className="rr-map-btn"
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            className="rr-map-btn"
            onClick={handleLocateCritical}
            title="Locate Active Incident (Vadodara)"
            aria-label="Locate Active Incident"
          >
            <Crosshair size={16} />
          </button>
          <button
            type="button"
            className="rr-map-btn"
            onClick={handleResetView}
            title="Reset Gujarat View"
            aria-label="Reset Gujarat View"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Layer Toggle Popover */}
      {layersMenuOpen && (
        <div className="rr-layers-popover">
          <div className="rr-layers-popover-title">
            <span>Hazard Overlays</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{activeLayerCount} Active</span>
          </div>

          {HAZARD_LAYER_CONFIG.map((layer) => (
            <label
              key={layer.type}
              className="rr-layer-toggle-row"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="rr-layer-info">
                <span
                  className="rr-layer-indicator"
                  style={{ backgroundColor: layer.color }}
                />
                <span>{layer.name}</span>
              </div>
              <input
                type="checkbox"
                className="rr-layer-checkbox"
                checked={activeLayers[layer.type]}
                onChange={() => toggleLayer(layer.type)}
              />
            </label>
          ))}
        </div>
      )}

      {/* Floating Bottom Legend HUD */}
      <div className="rr-gis-hud-bottom">
        <div className="rr-gis-legend-card">
          <span style={{ fontWeight: 600, color: '#f1f5f9' }}>Sensors:</span>
          <div className="rr-legend-item">
            <span className="rr-legend-dot" style={{ background: 'var(--hazard-safe)' }} />
            <span>Online</span>
          </div>
          <div className="rr-legend-item">
            <span className="rr-legend-dot" style={{ background: 'var(--hazard-warning)' }} />
            <span>Warning</span>
          </div>
          <div className="rr-legend-item">
            <span className="rr-legend-dot" style={{ background: 'var(--hazard-critical)' }} />
            <span>Critical</span>
          </div>
          <div className="rr-legend-item">
            <span className="rr-legend-dot" style={{ background: '#64748b' }} />
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
