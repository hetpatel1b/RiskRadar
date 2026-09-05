import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { KpiStrip } from './components/KpiStrip/KpiStrip';
import { GisMap } from './components/Map/GisMap';
import { AiRiskCard } from './components/AiRiskCard/AiRiskCard';
import { EnvironmentalPanel } from './components/Environment/EnvironmentalPanel';
import { AlertsPanel } from './components/Alerts/AlertsPanel';
import { InfrastructurePanel } from './components/Infrastructure/InfrastructurePanel';
import {
  INITIAL_KPIS,
  MOCK_SENSORS,
  MOCK_HAZARD_ZONES,
  MOCK_ALERTS,
} from './data/mockData';
import { SensorData, AlertItem } from './types';
import './App.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [focusedLocation, setFocusedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Interaction Foundation: Clicking an alert focuses the map and highlights relevant sector
  const handleSelectAlert = (alert: AlertItem) => {
    setFocusedLocation({ lat: alert.lat, lng: alert.lng });
  };

  // Interaction Foundation: Selecting a sensor from map or sensor list
  const handleSelectSensor = (sensor: SensorData | null) => {
    setSelectedSensor(sensor);
  };

  return (
    <div className="rr-app">
      {/* 1. Expanded Left Navigation Sidebar (240px) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        alertCount={MOCK_ALERTS.length}
      />

      {/* Main Workspace Area */}
      <div className="rr-main-workspace">
        {/* 2. Compact Top System Header */}
        <Header
          lastUpdated="10:08:42 AM"
          regionName="Western Corridor (Gujarat Command)"
        />

        {/* 3. Compact Situation-Awareness KPI Strip */}
        <KpiStrip metrics={INITIAL_KPIS} />

        {/* 4. Desktop-First Content Layout */}
        <main className="rr-dashboard-content">
          {/* Primary GIS Hero Region (~40% total dashboard visual space) */}
          <section className="rr-content-hero-col">
            <GisMap
              sensors={MOCK_SENSORS}
              hazardZones={MOCK_HAZARD_ZONES}
              selectedSensorId={selectedSensor?.id || null}
              onSelectSensor={handleSelectSensor}
              focusedLocation={focusedLocation}
            />
          </section>

          {/* Operational Intelligence Column */}
          <section className="rr-content-side-col">
            {/* AI Risk Assessment Foundation */}
            <AiRiskCard />

            {/* Real-time Environmental Telemetry Foundation */}
            <EnvironmentalPanel />

            {/* Early-Warning Alerts Foundation */}
            <AlertsPanel
              alerts={MOCK_ALERTS}
              onSelectAlert={handleSelectAlert}
            />

            {/* Infrastructure Health & Topology Foundation */}
            <InfrastructurePanel />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
