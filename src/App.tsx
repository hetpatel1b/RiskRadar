import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { KpiStrip } from './components/KpiStrip/KpiStrip';
import { RiskMap } from './components/Map/RiskMap';
import { AiRiskCard } from './components/AiRiskCard/AiRiskCard';
import { AlertsPanel } from './components/Alerts/AlertsPanel';
import { EnvironmentalPanel } from './components/Environment/EnvironmentalPanel';
import { InfrastructurePanel } from './components/Infrastructure/InfrastructurePanel';
import { AtmosphericBackground } from './components/AtmosphericBackground/AtmosphericBackground';
import {
  MOCK_SENSORS,
  MOCK_HAZARD_ZONES,
  MOCK_ALERTS,
  INITIAL_KPIS,
  normalizeIncidentId,
} from './data';
import { SensorData, AlertItem, HazardType } from './types';
import './App.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [highlightedHazard, setHighlightedHazard] = useState<HazardType | null>(null);

  // Single Source of Truth for incident selection across GIS Map, Intelligence Rail, and AI Risk
  const handleSelectIncident = (id: string | null) => {
    setSelectedIncidentId(normalizeIncidentId(id));
  };

  return (
    <div className="rr-command-app">
      {/* Strategic Command Intelligence Field Background */}
      <AtmosphericBackground />

      {/* 1. Left Strategic Navigation (220px) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        alertCount={MOCK_ALERTS.length}
      />

      {/* Main Operational Command Console */}
      <div className="rr-command-main">
        {/* 2. Compact Command Header (54px) */}
        <Header lastSync="10:10:44 IST" />

        {/* 3. National Situation Ribbon (66px) */}
        <KpiStrip metrics={INITIAL_KPIS} />

        {/* 4. Strategic Operations Workspace */}
        <main className="rr-command-workspace">
          {/* Upper Operational Stage (GIS Dominant ~60%, Intelligence Rail ~40%) */}
          <div className="rr-upper-stage">
            {/* Real Interactive GIS Hero Surface */}
            <section className="rr-gis-stage" aria-label="National Multi-Hazard GIS Surface">
              <RiskMap
                sensors={MOCK_SENSORS}
                hazardZones={MOCK_HAZARD_ZONES}
                selectedIncidentId={selectedIncidentId}
                onSelectIncident={handleSelectIncident}
                selectedSensorId={selectedSensor?.id || null}
                onSelectSensor={setSelectedSensor}
                highlightedHazardType={highlightedHazard}
              />
            </section>

            {/* Continuous Strategic Intelligence Rail */}
            <aside className="rr-intel-rail" aria-label="Strategic Intelligence Rail">
              <AiRiskCard selectedIncidentId={selectedIncidentId} />
              <AlertsPanel
                alerts={MOCK_ALERTS}
                selectedIncidentId={selectedIncidentId}
                onSelectIncident={handleSelectIncident}
              />
            </aside>
          </div>

          {/* Lower Telemetry Deck (Environmental Instrumentation + Infrastructure Pipeline) */}
          <section className="rr-lower-telemetry-band" aria-label="Telemetry and Infrastructure Band">
            <EnvironmentalPanel />
            <InfrastructurePanel />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
