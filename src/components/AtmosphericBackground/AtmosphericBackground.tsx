import React from 'react';
import './AtmosphericBackground.css';

// 16 Sparse, Disciplined Telemetry Particles with Asynchronous Parameters
const PARTICLES = [
  { id: 'p1', top: '14%', left: '8%', dur: '18s', delay: '0s', dx: '12px', dy: '-8px' },
  { id: 'p2', top: '22%', left: '26%', dur: '22s', delay: '3s', dx: '-10px', dy: '10px' },
  { id: 'p3', top: '38%', left: '12%', dur: '16s', delay: '7s', dx: '14px', dy: '-6px' },
  { id: 'p4', top: '48%', left: '32%', dur: '24s', delay: '2s', dx: '-8px', dy: '12px' },
  { id: 'p5', top: '68%', left: '18%', dur: '20s', delay: '5s', dx: '10px', dy: '-10px' },
  { id: 'p6', top: '82%', left: '28%', dur: '17s', delay: '9s', dx: '-12px', dy: '8px' },
  { id: 'p7', top: '16%', left: '55%', dur: '21s', delay: '4s', dx: '8px', dy: '-12px' },
  { id: 'p8', top: '28%', left: '72%', dur: '19s', delay: '1s', dx: '-14px', dy: '6px' },
  { id: 'p9', top: '42%', left: '60%', dur: '25s', delay: '8s', dx: '10px', dy: '10px' },
  { id: 'p10', top: '56%', left: '84%', dur: '18s', delay: '6s', dx: '-10px', dy: '-8px' },
  { id: 'p11', top: '74%', left: '68%', dur: '23s', delay: '11s', dx: '12px', dy: '8px' },
  { id: 'p12', top: '88%', left: '78%', dur: '20s', delay: '3.5s', dx: '-8px', dy: '-10px' },
  { id: 'p13', top: '10%', left: '92%', dur: '22s', delay: '7.5s', dx: '-12px', dy: '6px' },
  { id: 'p14', top: '64%', left: '94%', dur: '19s', delay: '10s', dx: '8px', dy: '-12px' },
  { id: 'p15', top: '90%', left: '46%', dur: '26s', delay: '12s', dx: '-10px', dy: '8px' },
  { id: 'p16', top: '6%', left: '38%', dur: '17s', delay: '4.5s', dx: '10px', dy: '10px' },
];

export const AtmosphericBackground: React.FC = () => {
  return (
    <div className="rr-atmospheric-field" aria-hidden="true">
      {/* Layer 1: Base Canvas & Subtle Radial Vignette */}
      <div className="rr-atmo-canvas-base" />

      {/* Layer 2: Multi-Zone Atmospheric Light Fields (Slow Asynchronous Drift) */}
      <div className="rr-atmo-zones-wrap">
        <div className="rr-atmo-zone-top-cyan" />
        <div className="rr-atmo-zone-mid-blue" />
        <div className="rr-atmo-zone-lower-slate" />
      </div>

      {/* Layer 3: Topographic Contour Elevation Field (Vector Organic Terrains) */}
      <div className="rr-atmo-contours">
        <svg
          className="rr-contour-svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="rr-contour-group-a">
            <path
              d="M-100,180 C320,120 540,310 820,240 C1100,170 1340,360 1620,290 C1820,240 1980,320 2050,300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-100,240 C280,180 500,380 780,310 C1060,240 1300,430 1580,360 C1780,310 1960,390 2050,370"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-100,300 C240,240 460,450 740,380 C1020,310 1260,500 1540,430 C1740,380 1940,460 2050,440"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-100,360 C200,300 420,520 700,450 C980,380 1220,570 1500,500 C1700,450 1920,530 2050,510"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>

          <g className="rr-contour-group-b">
            <path
              d="M-100,720 C260,650 480,840 760,780 C1040,720 1280,890 1560,820 C1760,770 1940,860 2050,830"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-100,780 C220,710 440,910 720,850 C1000,790 1240,960 1520,890 C1720,840 1920,930 2050,900"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-100,840 C180,770 400,980 680,920 C960,860 1200,1030 1480,960 C1680,910 1900,1000 2050,970"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>

          {/* Special Rare Scanning Horizon Contour Line */}
          <path
            className="rr-contour-scanning-trace"
            d="M-100,520 C340,460 620,620 900,560 C1180,500 1420,670 1700,610 C1880,570 1980,630 2050,620"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Layer 4: Geospatial Micro-Grid & Distant Coordinate Markings */}
      <div className="rr-atmo-grid-layer">
        <div className="rr-atmo-grid-lines" />
        
        {/* Subtle Distant Abstract Coordinate Ticks */}
        <div className="rr-atmo-coords top-right">
          <span>SYS.GRID // 22.3094° N</span>
          <span>LONG 73.1812° E</span>
        </div>
        <div className="rr-atmo-coords bottom-left">
          <span>DATUM // WGS84 GEO-REF</span>
          <span>EPSG:4326 ELEV:CALIB</span>
        </div>
      </div>

      {/* Layer 5: Sparse Micro Telemetry Data Particles */}
      <div className="rr-atmo-particles-layer">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="rr-atmo-particle"
            style={{
              top: p.top,
              left: p.left,
              animationDuration: p.dur,
              animationDelay: p.delay,
              // Custom CSS property shifts for GPU translation
              ['--dx' as any]: p.dx,
              ['--dy' as any]: p.dy,
            }}
          />
        ))}
      </div>

      {/* Layer 6: Subliminal Hairline Data Corridor Pulse */}
      <div className="rr-atmo-pulse-track">
        <div className="rr-atmo-pulse-beam" />
      </div>

      {/* Layer 7: Subliminal Distant Radar Atmosphere */}
      <div className="rr-atmo-radar-beacon">
        <div className="rr-atmo-radar-wave ring-1" />
        <div className="rr-atmo-radar-wave ring-2" />
      </div>
    </div>
  );
};
