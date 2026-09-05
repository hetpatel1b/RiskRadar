import React, { useState } from 'react';
import type { HazardCategory, HazardLayerConfig, HazardIncident } from '../../types/hazard';
import type { SensorNode } from '../../types/sensor';
import { HazardLayers } from './HazardLayers';
import { MapControls } from './MapControls';
import { SensorMarker } from './SensorMarker';
import { SensorPopup } from './SensorPopup';
import {
  Compass,
  Waves,
  Mountain,
  CloudRain,
  Wind,
  ThermometerSun,
  Crosshair
} from 'lucide-react';

interface RiskMapProps {
  layers: HazardLayerConfig[];
  onToggleLayer: (id: HazardCategory) => void;
  hazards: HazardIncident[];
  sensors: SensorNode[];
  onSelectHazard?: (hazard: HazardIncident) => void;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  layers,
  onToggleLayer,
  hazards,
  sensors,
  onSelectHazard,
}) => {
  const [zoom, setZoom] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const [activeSector, setActiveSector] = useState('ALL');
  const [mapMode, setMapMode] = useState<'tactical' | 'satellite' | 'radar'>('tactical');
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>('HYD-041');

  const selectedSensor = sensors.find((s) => s.id === selectedSensorId) || null;

  // Active layer filter
  const isLayerActive = (category: HazardCategory) => {
    return layers.find((l) => l.id === category)?.active ?? false;
  };

  // Sensor position mappings onto tactical view (relative %)
  const sensorPositions: Record<string, { x: number; y: number }> = {
    'HYD-041': { x: 38, y: 44 },
    'GEO-019': { x: 22, y: 28 },
    'PLV-082': { x: 62, y: 35 },
    'AQI-034': { x: 74, y: 58 },
    'ATM-108': { x: 45, y: 72 },
    'THM-063': { x: 80, y: 24 },
  };

  return (
    <div className="command-panel rounded-2xl border border-[#182438] flex flex-col h-full overflow-hidden shadow-2xl relative">
      {/* Top Header Strip: Title, Coordinates, and GIS Layer Switchers */}
      <div className="p-3.5 border-b border-[#172234] bg-[#090E17]/95 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-radar-cyan/10 border border-radar-cyan/40 flex items-center justify-center">
              <Crosshair className="w-4 h-4 text-radar-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Multi-Hazard GIS Radar Canvas
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-semantic-critical/20 text-semantic-critical border border-semantic-critical/30 font-semibold">
                  6 ACTIVE VECTORS
                </span>
              </div>
              <p className="text-[11px] font-mono text-radar-muted">
                GEO-DATUM: WGS84 • CENTER: 28°36'50"N 77°12'32"E • EPSG:4326
              </p>
            </div>
          </div>

          {/* Map Controls */}
          <MapControls
            zoom={zoom}
            onZoomIn={() => setZoom((prev) => Math.min(prev + 1, 5))}
            onZoomOut={() => setZoom((prev) => Math.max(prev - 1, 1))}
            onResetView={() => {
              setZoom(3);
              setActiveSector('ALL');
            }}
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            activeSector={activeSector}
            onSelectSector={setActiveSector}
            mapMode={mapMode}
            onSelectMapMode={setMapMode}
          />
        </div>

        {/* Hazard Layer Toggles */}
        <HazardLayers
          layers={layers}
          onToggleLayer={onToggleLayer}
          activeCount={layers.filter((l) => l.active).length}
        />
      </div>

      {/* Primary Map Viewport Canvas */}
      <div className="relative flex-1 min-h-[380px] lg:min-h-[440px] bg-[#05080E] overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
            showGrid ? 'opacity-100' : 'opacity-20'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 229, 255, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 229, 255, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: `${36 * (zoom / 2)}px ${36 * (zoom / 2)}px`,
          }}
        />

        {/* Tactical Coordinate Radar Concentric Range Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[320px] h-[320px] rounded-full border border-radar-cyan/20 flex items-center justify-center">
            <div className="w-[220px] h-[220px] rounded-full border border-radar-cyan/25 flex items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full border border-radar-cyan/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-radar-cyan/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Radar Sweep Animation Line */}
        {mapMode === 'radar' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div
              className="w-[500px] h-[500px] rounded-full relative animate-spin pointer-events-none"
              style={{
                animationDuration: '9s',
                background: 'conic-gradient(from 0deg, rgba(0, 229, 255, 0.18) 0deg, transparent 60deg, transparent 360deg)',
              }}
            />
          </div>
        )}

        {/* Topographic Contour Isobars (SVG Vector Simulation) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 150 Q 150 120 280 200 T 500 240 T 780 180 T 1100 290"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M 20 280 Q 220 240 420 340 T 750 310 T 990 400"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
          <path
            d="M 120 50 Q 300 90 550 60 T 900 120"
            fill="none"
            stroke="#17263E"
            strokeWidth="1.5"
          />
          <path
            d="M 250 380 Q 480 430 720 390 T 1150 440"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          {/* Simulated River Path through Sector 4 */}
          <path
            d="M 280 0 Q 340 160 380 240 T 420 380 T 480 600"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="3.5"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
        </svg>

        {/* Multi-Hazard Active Polygons / Heat Zones */}
        {/* 1. Flood Zone (Sector 04 Basin) */}
        {isLayerActive('flood') && (
          <div
            onClick={() => {
              const h = hazards.find((hz) => hz.category === 'flood');
              if (h) onSelectHazard?.(h);
            }}
            className="absolute left-[30%] top-[30%] w-[180px] h-[130px] rounded-[40px] bg-radar-cyan/15 border-2 border-radar-cyan/50 backdrop-blur-[1px] cursor-pointer transition-all duration-200 hover:bg-radar-cyan/25 flex flex-col items-center justify-center group"
          >
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#070D18]/90 border border-radar-cyan/50 text-[10px] font-mono text-radar-cyan font-bold">
              <Waves className="w-3 h-3 text-radar-cyan animate-pulse" />
              <span>FLOOD CREST +4.82m</span>
            </div>
            <span className="text-[9px] font-mono text-radar-text mt-1 group-hover:text-white">
              14.2 km² Buffer
            </span>
          </div>
        )}

        {/* 2. Heavy Rainfall Catchment Cell (Sector 02) */}
        {isLayerActive('rainfall') && (
          <div
            onClick={() => {
              const h = hazards.find((hz) => hz.category === 'rainfall');
              if (h) onSelectHazard?.(h);
            }}
            className="absolute left-[54%] top-[24%] w-[160px] h-[110px] rounded-[30px] bg-sky-500/15 border-2 border-sky-400/40 backdrop-blur-[1px] cursor-pointer transition-all hover:bg-sky-500/25 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#070D18]/90 border border-sky-400/40 text-[10px] font-mono text-sky-400 font-bold">
              <CloudRain className="w-3 h-3 text-sky-400" />
              <span>RAIN: 112.4mm/3h</span>
            </div>
            <span className="text-[9px] font-mono text-radar-text mt-0.5">Highland Cell</span>
          </div>
        )}

        {/* 3. Landslide Slope Warning (Sector 07 Ridge) */}
        {isLayerActive('landslide') && (
          <div
            onClick={() => {
              const h = hazards.find((hz) => hz.category === 'landslide');
              if (h) onSelectHazard?.(h);
            }}
            className="absolute left-[15%] top-[18%] w-[130px] h-[90px] rounded-[24px] bg-orange-500/15 border-2 border-orange-500/50 backdrop-blur-[1px] cursor-pointer transition-all hover:bg-orange-500/25 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#070D18]/90 border border-orange-500/40 text-[10px] font-mono text-orange-400 font-bold">
              <Mountain className="w-3 h-3 text-orange-400" />
              <span>SLOPE: 14.2mm/h</span>
            </div>
            <span className="text-[9px] font-mono text-radar-text mt-0.5">Ridge Liquefaction</span>
          </div>
        )}

        {/* 4. Air Quality Particulate Plume (Sector 05) */}
        {isLayerActive('air_pollution') && (
          <div
            onClick={() => {
              const h = hazards.find((hz) => hz.category === 'air_pollution');
              if (h) onSelectHazard?.(h);
            }}
            className="absolute left-[68%] top-[50%] w-[140px] h-[100px] rounded-[36px] bg-amber-500/15 border-2 border-amber-500/40 backdrop-blur-[1px] cursor-pointer transition-all hover:bg-amber-500/25 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#070D18]/90 border border-amber-500/40 text-[10px] font-mono text-amber-400 font-bold">
              <Wind className="w-3 h-3 text-amber-400" />
              <span>AQI: 142 PM2.5</span>
            </div>
            <span className="text-[9px] font-mono text-radar-text mt-0.5">Industrial Zone</span>
          </div>
        )}

        {/* 5. Extreme Temperature Zone */}
        {isLayerActive('temperature') && (
          <div className="absolute left-[75%] top-[16%] w-[110px] h-[80px] rounded-[24px] bg-rose-500/15 border border-rose-500/40 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#070D18]/90 text-[10px] font-mono text-rose-400 font-bold">
              <ThermometerSun className="w-3 h-3 text-rose-400" />
              <span>38.4 °C</span>
            </div>
            <span className="text-[9px] font-mono text-radar-muted">Urban Heat</span>
          </div>
        )}

        {/* Interactive Sensor Pins */}
        {sensors.map((sensor) => {
          const pos = sensorPositions[sensor.id] || { x: 50, y: 50 };
          return (
            <SensorMarker
              key={sensor.id}
              sensor={sensor}
              isSelected={sensor.id === selectedSensorId}
              onClick={() => setSelectedSensorId(sensor.id)}
              xPercent={pos.x}
              yPercent={pos.y}
            />
          );
        })}

        {/* Sensor Inspector Popup */}
        {selectedSensor && (
          <SensorPopup
            sensor={selectedSensor}
            onClose={() => setSelectedSensorId(null)}
          />
        )}

        {/* Sector Boundary Labels on Tactical Map */}
        <div className="absolute top-4 left-4 pointer-events-none space-y-1">
          <div className="px-2 py-1 rounded bg-[#0A0E18]/80 border border-white/[0.06] text-[10px] font-mono text-radar-muted">
            <span className="text-radar-cyan font-bold">SEC-07:</span> ESCARPMENT RIDGE
          </div>
          <div className="px-2 py-1 rounded bg-[#0A0E18]/80 border border-white/[0.06] text-[10px] font-mono text-radar-muted">
            <span className="text-radar-cyan font-bold">SEC-04:</span> BASIN LOWLANDS (CRITICAL)
          </div>
        </div>

        {/* Bottom Left HUD: Scale bar and Ready for Phase 2 Indicator */}
        <div className="absolute bottom-3 left-4 flex items-center gap-3 select-none pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090D16]/90 border border-[#18253A] text-[10px] font-mono text-radar-muted">
            <Compass className="w-3 h-3 text-radar-cyan" />
            <span>5.0 km</span>
            <div className="w-12 h-1 bg-[#1C2940] relative">
              <div className="w-1/2 h-full bg-radar-cyan"></div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B1220]/90 border border-radar-cyan/20 text-[10px] font-mono text-radar-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-radar-cyan"></span>
            <span>GIS ADAPTER READY (GEOJSON / TILES)</span>
          </div>
        </div>

        {/* Bottom Right HUD: Coordinates & Compass Rose */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2 select-none">
          <div className="px-2.5 py-1 rounded-md bg-[#090D16]/90 border border-[#18253A] text-[10px] font-mono text-radar-secondary flex items-center gap-2">
            <Crosshair className="w-3 h-3 text-radar-cyan" />
            <span>28.6139° N, 77.2090° E</span>
            <span className="text-radar-muted">|</span>
            <span className="text-white font-bold">ELEV: 216m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
