import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { Shield } from 'lucide-react';
import { SensorData, HazardZone, HazardType } from '../../types';
import { normalizeIncidentId } from '../../data/risk';
import { HazardLayersControl } from './HazardLayersControl';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { IncidentDetailCard } from './IncidentDetailCard';
import { renderSensorPopupHtml } from './SensorPopup';
import './RiskMap.css';

interface RiskMapProps {
  sensors: SensorData[];
  hazardZones: HazardZone[];
  selectedIncidentId: string | null;
  onSelectIncident: (id: string | null) => void;
  selectedSensorId: string | null;
  onSelectSensor: (sensor: SensorData | null) => void;
  highlightedHazardType?: HazardType | null;
}

type MapInteractionState = 'OVERVIEW' | 'FOCUSING' | 'INCIDENT_SELECTED' | 'RETURNING';

// Section 01 & 10: Default camera view (National Operational Overview)
const DEFAULT_MAP_VIEW = {
  center: [22.0, 79.5] as [number, number],
  zoom: 4.8,
};

// Section 05: Incident-specific regional/local operational zoom levels
const INCIDENT_ZOOMS: Record<string, number> = {
  'hz-vadodara-flood': 11.0,
  'hz-mumbai-rainfall': 10.8,
  'hz-wayanad-landslide': 11.5,
  'hz-uttarakhand-fire': 10.6,
  'hz-delhi-pollution': 10.5,
};
const DEFAULT_INCIDENT_ZOOM = 11.0;

export const RiskMap: React.FC<RiskMapProps> = ({
  sensors,
  hazardZones,
  selectedIncidentId,
  onSelectIncident,
  selectedSensorId,
  onSelectSensor,
  highlightedHazardType,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Operational Layer Groups
  const hazardsLayerRef = useRef<L.LayerGroup | null>(null);
  const incidentsLayerRef = useRef<L.LayerGroup | null>(null);
  const sensorsLayerRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());

  // State Machine: OVERVIEW → FOCUSING → INCIDENT_SELECTED → RETURNING → OVERVIEW (Section 47)
  const [interactionState, setInteractionState] = useState<MapInteractionState>('OVERVIEW');
  const interactionStateRef = useRef<MapInteractionState>('OVERVIEW');
  interactionStateRef.current = interactionState;

  const normalizedSelectedId = normalizeIncidentId(selectedIncidentId);
  const selectedIncidentIdRef = useRef<string | null>(normalizedSelectedId);
  selectedIncidentIdRef.current = normalizedSelectedId;

  // Collision-Aware Card Positioning (Sections 15 & 16)
  const [cardPosition, setCardPosition] = useState<{ left: number; top: number }>({ left: 30, top: 70 });
  const [isClosingCard, setIsClosingCard] = useState<boolean>(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const focusTimeoutRef = useRef<number | null>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [tileError, setTileError] = useState<boolean>(false);

  // Active Hazard Layers State (All 6 core disaster categories preserved on incident close, Section 44)
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

  // ---------------------------------------------------------------------------
  // COLLISION-AWARE POSITIONING ENGINE (Sections 15 & 16)
  // ---------------------------------------------------------------------------
  const updateCardPosition = useCallback(() => {
    if (!mapRef.current || !frameRef.current || !selectedIncidentIdRef.current) return;

    const targetZone = hazardZones.find((z) => z.id === selectedIncidentIdRef.current);
    if (!targetZone) return;

    const map = mapRef.current;
    const container = frameRef.current;
    const containerRect = container.getBoundingClientRect();
    const markerPoint = map.latLngToContainerPoint(targetZone.center);

    const cardWidth = 292;
    const cardHeight = 224;
    const margin = 14;
    const topSafe = 52; // Clearance below the HUD bar
    const bottomSafe = 52; // Clearance above the bottom-left legend

    // Position to the right of marker by default
    let left = markerPoint.x + 32;
    let top = markerPoint.y - Math.round(cardHeight / 2);

    // If overflowing right, flip to left of marker
    if (left + cardWidth > containerRect.width - margin) {
      left = markerPoint.x - cardWidth - 32;
    }

    // Horizontal containment within map frame
    if (left < margin) {
      left = margin;
    } else if (left + cardWidth > containerRect.width - margin) {
      left = containerRect.width - cardWidth - margin;
    }

    // Vertical containment within map frame
    if (top < topSafe) {
      top = topSafe;
    } else if (top + cardHeight > containerRect.height - margin) {
      top = containerRect.height - cardHeight - margin;
    }

    // Avoid colliding with bottom-left cartographic legend (left ~360px, bottom ~52px)
    if (left < 360 && top + cardHeight > containerRect.height - bottomSafe) {
      top = containerRect.height - cardHeight - bottomSafe - 6;
    }

    setCardPosition({ left: Math.round(left), top: Math.round(top) });
  }, [hazardZones]);

  // ---------------------------------------------------------------------------
  // INCIDENT SELECTION & CLEARANCE (Single Source of Truth, Sections 28 & 29)
  // ---------------------------------------------------------------------------
  const selectIncident = useCallback(
    (rawId: string) => {
      if (!mapRef.current) return;
      const id = normalizeIncidentId(rawId) || rawId;
      const targetZone = hazardZones.find((z) => z.id === id);
      if (!targetZone) return;

      // Prevent duplicate transitions if already focused on same incident
      if (selectedIncidentIdRef.current === id && interactionStateRef.current === 'INCIDENT_SELECTED') {
        return;
      }

      // Cancel any pending return/focus timeout cleanly (Section 32)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
        focusTimeoutRef.current = null;
      }
      setIsClosingCard(false);

      setInteractionState('FOCUSING');
      onSelectIncident(id);

      const targetZoom = INCIDENT_ZOOMS[id] || DEFAULT_INCIDENT_ZOOM;

      // Section 04: Smooth GIS flyTo, duration ~0.95s (within 800-1200ms) with ease-out
      mapRef.current.flyTo(targetZone.center, targetZoom, {
        duration: 0.95,
        easeLinearity: 0.25,
      });

      // Synchronize card display after camera starts moving (Section 08, 40)
      focusTimeoutRef.current = window.setTimeout(() => {
        updateCardPosition();
        setInteractionState('INCIDENT_SELECTED');
        focusTimeoutRef.current = null;
      }, 300);
    },
    [hazardZones, onSelectIncident, updateCardPosition]
  );

  const clearIncidentSelection = useCallback(() => {
    if (!mapRef.current) return;

    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsClosingCard(true);
    setInteractionState('RETURNING');

    // Section 09, 10, 11: Smoothly fly back to DEFAULT_MAP_VIEW (National Multi-Hazard Theatre)
    mapRef.current.flyTo(DEFAULT_MAP_VIEW.center, DEFAULT_MAP_VIEW.zoom, {
      duration: 0.95,
      easeLinearity: 0.25,
    });

    // Card closes (200-240ms), selection clears, all markers restored
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsClosingCard(false);
      onSelectIncident(null);
      setInteractionState('OVERVIEW');
      closeTimeoutRef.current = null;
    }, 220);
  }, [onSelectIncident]);

  // ---------------------------------------------------------------------------
  // 1. INITIALIZE MAP (Sections 02, 03, 07: Starts at India Overview, Clean, No Popups)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Section 03 & 24: Starts cleanly at India Overview with NO auto-selection
    const map = L.map(mapContainerRef.current, {
      center: DEFAULT_MAP_VIEW.center,
      zoom: DEFAULT_MAP_VIEW.zoom,
      zoomControl: false,
      attributionControl: true,
      minZoom: 3.8,
      maxZoom: 16,
      zoomAnimation: true,
    });

    // Dark Gray Canvas Base Tile Layer (Esri)
    const baseTile = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        attribution:
          '&copy; <a href="https://www.esri.com" target="_blank" rel="noreferrer">Esri</a>, OpenStreetMap',
      }
    );

    baseTile.on('tileerror', () => {
      setTileError(true);
    });

    baseTile.addTo(map);

    // Subtle Reference Layer
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        opacity: 0.62,
      }
    ).addTo(map);

    // Operational Layers
    const hazardsGroup = L.layerGroup().addTo(map);
    const incidentsGroup = L.layerGroup().addTo(map);
    const sensorsGroup = L.layerGroup().addTo(map);

    hazardsLayerRef.current = hazardsGroup;
    incidentsLayerRef.current = incidentsGroup;
    sensorsLayerRef.current = sensorsGroup;
    mapRef.current = map;

    // Reposition card when user pans/zooms while focused
    map.on('move', () => {
      if (selectedIncidentIdRef.current) {
        updateCardPosition();
      }
    });

    // Section 25: Do NOT automatically deselect when clicking anywhere on the map.
    // User must explicitly click X, Map Reset, or press ESC.

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [updateCardPosition]);

  // Container Resize Observer
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.invalidateSize({ pan: false });
      if (selectedIncidentIdRef.current) {
        updateCardPosition();
      }
    });

    resizeObserver.observe(mapContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [updateCardPosition]);

  // Section 26: Escape Key clears incident selection and restores overview
  useEffect(() => {
    if (!selectedIncidentId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        clearIncidentSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIncidentId, clearIncidentSelection]);

  // React to external selectedIncidentId changes (e.g. FOCUS GIS from Active Incidents rail)
  useEffect(() => {
    const norm = normalizeIncidentId(selectedIncidentId);
    if (norm && norm !== selectedIncidentIdRef.current) {
      selectIncident(norm);
    } else if (!norm && selectedIncidentIdRef.current) {
      clearIncidentSelection();
    }
  }, [selectedIncidentId, selectIncident, clearIncidentSelection]);

  // ---------------------------------------------------------------------------
  // 2. RENDER HAZARD POLYGONS (Section 19: Only selected zone shown when focused)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const group = hazardsLayerRef.current;
    if (!group) return;

    group.clearLayers();

    const layerColorMap: Record<HazardType, string> = {
      flood: '#3B82F6',
      heavy_rainfall: '#63D7E5',
      landslide: '#F59E0B',
      extreme_temperature: '#EF4444',
      air_pollution: '#8B98A7',
      forest_fire: '#F05D6B',
    };

    hazardZones.forEach((zone) => {
      if (!activeLayers[zone.type]) return;

      const isSelected = zone.id === normalizedSelectedId;
      // Section 19: When an incident is selected, show ONLY that incident's affected zone
      if (normalizedSelectedId && !isSelected) return;
      const isHighlighted = highlightedHazardType === zone.type;
      const baseColor = layerColorMap[zone.type] || '#63D7E5';
      const isCritical = zone.severity === 'critical';

      // Section 13: Selected zone becomes slightly more visible with subtle dashed perimeter
      const polygon = L.polygon(zone.coordinates, {
        color: isSelected ? '#63D7E5' : isCritical ? '#63D7E5' : baseColor,
        weight: isSelected ? 2.4 : isHighlighted ? 2.0 : isCritical ? 1.6 : 1.1,
        dashArray: isSelected || isCritical ? '5, 5' : undefined,
        fillColor: baseColor,
        fillOpacity: isSelected ? 0.34 : isHighlighted ? 0.28 : isCritical ? 0.20 : 0.14,
        className: `rr-hazard-polygon ${isCritical ? 'critical-inundation' : ''} ${
          isSelected ? 'selected-hazard-zone' : ''
        }`,
      });

      polygon.bindTooltip(
        `<div style="font-family:var(--font-sans); font-size:11px; padding:3px 5px;">
          <div style="font-weight:700; color:#FFFFFF; letter-spacing:-0.01em;">${zone.title}</div>
          <div style="font-size:10px; color:${baseColor}; text-transform:uppercase; margin-top:2px; font-weight:600;">
            ${zone.severity} · ${zone.areaKm2} km² · ${zone.location}, ${zone.state}
          </div>
        </div>`,
        { sticky: true, className: 'leaflet-tooltip-dark' }
      );

      // Explicit click triggers Incident Focus Mode
      polygon.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        selectIncident(zone.id);
      });

      polygon.addTo(group);
    });
  }, [hazardZones, activeLayers, highlightedHazardType, selectedIncidentId, selectIncident]);

  // ---------------------------------------------------------------------------
  // 3. RENDER TACTICAL HAZARD DISASTER MARKERS (Sections 05, 06, 08, 12, 57, 58)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const group = incidentsLayerRef.current;
    if (!group) return;

    group.clearLayers();

    hazardZones.forEach((zone) => {
      if (!activeLayers[zone.type]) return;

      const isSelected = zone.id === normalizedSelectedId;
      const isCritical = zone.severity === 'critical';
      const isWarning = zone.severity === 'warning';
      const sevClass = isCritical ? 'critical' : isWarning ? 'warning' : 'watch';

      // Section 06 & 12: Normal (●) vs Selected (◉ target ring)
      const markerHtml = `
        <div class="rr-incident-beacon-wrap ${sevClass} ${isSelected ? 'selected' : ''}">
          ${isCritical && !isSelected ? '<div class="rr-incident-radar-pulse"></div>' : ''}
          ${isSelected ? '<div class="rr-incident-selected-pulse"></div>' : ''}
          <div class="rr-incident-marker-core">
            <div class="rr-incident-inner-dot"></div>
          </div>
          ${
            isSelected
              ? `<div class="rr-incident-tactical-label full">
                  <span class="rr-inc-badge-dot"></span>
                  <span class="rr-inc-city">${zone.location.toUpperCase()}</span>
                  <span class="rr-inc-badge">${zone.severity.toUpperCase()} · ${zone.type
                  .toUpperCase()
                  .replace('_', ' ')}</span>
                </div>`
              : isCritical
              ? `<div class="rr-incident-tactical-label compact">
                  <span class="rr-inc-badge-dot"></span>
                  <span class="rr-inc-city">${zone.location.toUpperCase()}</span>
                </div>`
              : ''
          }
        </div>
      `;

      const incidentIcon = L.divIcon({
        className: 'rr-incident-icon-container',
        html: markerHtml,
        iconSize: [120, 36],
        iconAnchor: [60, 18],
      });

      const marker = L.marker(zone.center, {
        icon: incidentIcon,
        zIndexOffset: isSelected ? 900 : 700,
      });

      // Section 08 & 58: Hover shows lightweight tooltip, NEVER full incident card
      marker.bindTooltip(
        `<div class="rr-marker-quick-tooltip">
          <span class="rr-qt-city">${zone.location}</span>
          <span class="rr-qt-type">· ${zone.type.replace('_', ' ')}</span>
          <span class="rr-qt-sev" style="color:${isCritical ? '#F05D6B' : isWarning ? '#F09A3E' : '#F59E0B'}">
            (${zone.severity.toUpperCase()})
          </span>
        </div>`,
        {
          direction: 'top',
          offset: [0, -12],
          className: 'leaflet-tooltip-dark',
          opacity: 0.96,
        }
      );

      // Section 09: Explicit click enters Incident Focus Mode
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        selectIncident(zone.id);
      });

      marker.addTo(group);
    });
  }, [hazardZones, activeLayers, normalizedSelectedId, selectIncident]);

  // ---------------------------------------------------------------------------
  // 4. RENDER DISTRIBUTED OPERATIONAL SENSOR NODES (Section 05: Ahmedabad, Surat, etc.)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const sensorsGroup = sensorsLayerRef.current;
    if (!sensorsGroup) return;

    sensorsGroup.clearLayers();
    markersMapRef.current.clear();

    sensors.forEach((sensor) => {
      const isSelected = sensor.id === selectedSensorId;

      const sensorHtml = `
        <div class="rr-sensor-node ${sensor.status} ${isSelected ? 'selected' : ''}">
          <div class="rr-sensor-core"></div>
          <div class="rr-sensor-tooltip font-mono">${sensor.location} · ${sensor.code}</div>
        </div>
      `;

      const sensorIcon = L.divIcon({
        className: 'rr-sensor-marker-container',
        html: sensorHtml,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([sensor.lat, sensor.lng], {
        icon: sensorIcon,
        zIndexOffset: isSelected ? 650 : 500,
      });

      // Hover shows clean lightweight telemetry tooltip
      marker.bindTooltip(
        `<div class="rr-marker-quick-tooltip">
          <span class="rr-qt-city">${sensor.location}</span>
          <span class="rr-qt-type">· ${sensor.name}</span>
        </div>`,
        {
          direction: 'top',
          offset: [0, -10],
          className: 'leaflet-tooltip-dark',
          opacity: 0.96,
        }
      );

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        // If clicking Vadodara sensor, focus Vadodara incident
        if (sensor.id === 's-1') {
          selectIncident('hz-vadodara-flood');
        } else {
          onSelectSensor(sensor);
        }
      });

      marker.addTo(sensorsGroup);
      markersMapRef.current.set(sensor.id, marker);
    });
  }, [sensors, selectedSensorId, onSelectSensor, selectIncident]);

  // ---------------------------------------------------------------------------
  // CONTROLS & NAVIGATION ACTIONS
  // ---------------------------------------------------------------------------
  const handleZoomIn = useCallback(() => mapRef.current?.zoomIn(), []);
  const handleZoomOut = useCallback(() => mapRef.current?.zoomOut(), []);

  // Section 28: Reset View clears selection & returns smoothly to Overview
  const handleResetIndia = useCallback(() => {
    clearIncidentSelection();
  }, [clearIncidentSelection]);

  // Locate Primary Incident (Vadodara)
  const handleLocateVadodara = useCallback(() => {
    selectIncident('hz-vadodara-flood');
  }, [selectIncident]);

  const handleToggleFullscreen = useCallback(() => {
    if (!frameRef.current) return;
    if (!document.fullscreenElement) {
      frameRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  const selectedZone = hazardZones.find((z) => z.id === normalizedSelectedId);

  return (
    <div
      ref={frameRef}
      className={`rr-riskmap-frame ${isFullscreen ? 'fullscreen' : ''}`}
      aria-label="National Multi-Hazard GIS Map"
    >
      {/* Real Interactive Map Canvas */}
      <div ref={mapContainerRef} className="rr-riskmap-canvas" />

      {/* Floating HUD Top Bar */}
      <div className="rr-map-hud-top">
        {/* Context Badge (Top-Left) */}
        <div className="rr-map-title-badge" role="status">
          <Shield size={12} className="rr-hud-shield-icon" aria-hidden="true" />
          <div className="rr-map-badge-text">
            <span>National Multi-Hazard Theatre</span>
            <span className="rr-map-badge-sub">
              {selectedZone
                ? `${selectedZone.location} · ${selectedZone.type.replace('_', ' ')} Focus`
                : 'National Operational View'}
            </span>
          </div>
        </div>

        {/* Action Controls (Top-Right) */}
        <div className="rr-map-hud-actions">
          <HazardLayersControl activeLayers={activeLayers} onToggleLayer={handleToggleLayer} />
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetIndia}
            onLocateIncident={handleLocateVadodara}
            onToggleFullscreen={handleToggleFullscreen}
            isFullscreen={isFullscreen}
          />
        </div>
      </div>

      {/* Floating Contextual Incident Detail Card (Section 14, 15, 16, 17, 18: ONLY on explicit selection) */}
      {selectedZone && (
        <IncidentDetailCard
          zone={selectedZone}
          onClose={clearIncidentSelection}
          position={cardPosition}
          isClosing={isClosingCard}
        />
      )}

      {/* Cartographic Dual Legend (Bottom-Left) */}
      <MapLegend />

      {/* Tile Error Fallback Notice */}
      {tileError && (
        <div className="rr-map-tile-fallback">
          <span>GIS Tile Service Degraded · Operating on Cached Telemetry</span>
        </div>
      )}
    </div>
  );
};
