import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { Shield } from 'lucide-react';
import { SensorData, HazardZone, HazardType } from '../../types';
import { HazardLayersControl } from './HazardLayersControl';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { renderSensorPopupHtml } from './SensorPopup';
import './RiskMap.css';

interface RiskMapProps {
  sensors: SensorData[];
  hazardZones: HazardZone[];
  selectedSensorId: string | null;
  onSelectSensor: (sensor: SensorData | null) => void;
  focusedLocation?: { lat: number; lng: number } | null;
  highlightedHazardType?: HazardType | null;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  sensors,
  hazardZones,
  selectedSensorId,
  onSelectSensor,
  focusedLocation,
  highlightedHazardType,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const hazardsLayerRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());

  // India Initial View Coordinates (Clean Operational Framing)
  const INDIA_CENTER: [number, number] = [22.0, 79.5];
  const INDIA_ZOOM = 4.7;

  // Active Hazard Layers State
  const [activeLayers, setActiveLayers] = useState<Record<HazardType, boolean>>({
    flood: true,
    heavy_rainfall: true,
    landslide: true,
    extreme_temperature: false,
    air_pollution: false,
    forest_fire: true,
  });

  const handleToggleLayer = (type: HazardType) => {
    setActiveLayers((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: INDIA_CENTER,
      zoom: INDIA_ZOOM,
      zoomControl: false,
      attributionControl: true,
      minZoom: 4,
      maxZoom: 16,
    });

    // Dark Gray Canvas Base Tile
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        attribution:
          '&copy; <a href="https://www.esri.com" target="_blank" rel="noreferrer">Esri</a>, OpenStreetMap',
      }
    ).addTo(map);

    // Subtle Reference Layer (Lower opacity for calm geography)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        opacity: 0.65,
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

    const layerColorMap: Record<HazardType, string> = {
      flood: '#3B82F6',
      heavy_rainfall: '#63D7E5',
      landslide: '#F59E0B',
      extreme_temperature: '#EF4444',
      air_pollution: '#78716C',
      forest_fire: '#F05D6B',
    };

    hazardZones.forEach((zone) => {
      if (!activeLayers[zone.type]) return;

      const isHighlighted = highlightedHazardType === zone.type;
      const color = layerColorMap[zone.type] || '#63D7E5';
      const fillOpacity = isHighlighted ? 0.30 : 0.16;

      const polygon = L.polygon(zone.coordinates, {
        color: color,
        weight: isHighlighted ? 2 : 1.2,
        dashArray: zone.severity === 'critical' ? '4, 4' : undefined,
        fillColor: color,
        fillOpacity: fillOpacity,
      });

      polygon.bindTooltip(
        `<div style="font-family:var(--font-sans); font-size:11px; padding:2px;">
          <div style="font-weight:600; color:#F2F5F7;">${zone.title}</div>
          <div style="font-size:10px; color:${color}; text-transform:uppercase; margin-top:2px;">
            ${zone.severity} · ${zone.areaKm2} km² · ${zone.location}, ${zone.state}
          </div>
        </div>`,
        { sticky: true, className: 'leaflet-tooltip-dark' }
      );

      polygon.addTo(group);
    });
  }, [hazardZones, activeLayers, highlightedHazardType]);

  // Update Sensor Markers with Hover-Only Labels (except Vadodara Active Incident)
  useEffect(() => {
    const group = markersLayerRef.current;
    if (!group) return;

    group.clearLayers();
    markersMapRef.current.clear();

    sensors.forEach((sensor) => {
      const isSelected = sensor.id === selectedSensorId;
      const isIncident = sensor.id === 's-1'; // Vadodara active incident

      const markerHtml = `
        <div class="rr-map-node ${isSelected ? 'selected' : ''} ${isIncident ? 'incident' : ''}">
          <div class="rr-node-dot ${sensor.status}"></div>
          <div class="rr-node-tag font-mono">${sensor.location}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'rr-marker-container',
        html: markerHtml,
        iconSize: [46, 26],
        iconAnchor: [23, 5],
        popupAnchor: [0, -8],
      });

      const marker = L.marker([sensor.lat, sensor.lng], { icon: customIcon });

      marker.bindPopup(renderSensorPopupHtml(sensor), {
        maxWidth: 270,
        autoPan: true,
        autoPanPaddingTopLeft: L.point(15, 55),
        autoPanPaddingBottomRight: L.point(15, 35),
      });

      marker.on('click', () => {
        onSelectSensor(sensor);
      });

      marker.addTo(group);
      markersMapRef.current.set(sensor.id, marker);

      if (isSelected) {
        setTimeout(() => marker.openPopup(), 100);
      }
    });
  }, [sensors, selectedSensorId, onSelectSensor]);

  // Handle external focus (e.g. clicking FOCUS GIS action)
  useEffect(() => {
    if (focusedLocation && mapRef.current) {
      mapRef.current.flyTo([focusedLocation.lat, focusedLocation.lng], 9.5, {
        duration: 1.2,
      });
    }
  }, [focusedLocation]);

  // Navigation handlers
  const handleZoomIn = useCallback(() => mapRef.current?.zoomIn(), []);
  const handleZoomOut = useCallback(() => mapRef.current?.zoomOut(), []);
  const handleResetIndia = useCallback(() => {
    mapRef.current?.flyTo(INDIA_CENTER, INDIA_ZOOM, { duration: 1.0 });
  }, []);

  const handleLocateVadodara = useCallback(() => {
    mapRef.current?.flyTo([22.3072, 73.1812], 10.5, { duration: 1.2 });
    const vadodaraMarker = markersMapRef.current.get('s-1');
    if (vadodaraMarker) {
      setTimeout(() => vadodaraMarker.openPopup(), 600);
    }
  }, []);

  return (
    <div className="rr-riskmap-frame" aria-label="National Multi-Hazard GIS Map">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="rr-riskmap-canvas" />

      {/* Floating HUD Top */}
      <div className="rr-map-hud-top">
        <div className="rr-map-title-badge">
          <Shield size={13} className="rr-hud-shield-icon" />
          <span>National Multi-Hazard Theatre <strong>(India)</strong></span>
        </div>

        <div className="rr-map-hud-actions">
          <HazardLayersControl
            activeLayers={activeLayers}
            onToggleLayer={handleToggleLayer}
          />
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetIndia}
            onLocateIncident={handleLocateVadodara}
          />
        </div>
      </div>

      {/* Map Legend */}
      <MapLegend />
    </div>
  );
};
