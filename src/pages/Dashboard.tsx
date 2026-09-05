import React, { useState } from 'react';
import { KpiStrip } from '../components/dashboard/KpiStrip';
import { DashboardGrid } from '../components/dashboard/DashboardGrid';
import { RiskMap } from '../components/gis/RiskMap';
import { AiRiskCard } from '../components/ai/AiRiskCard';
import { AlertPanel } from '../components/alerts/AlertPanel';
import { EnvironmentalPanel } from '../components/environment/EnvironmentalPanel';
import { InfrastructureHealth } from '../components/infrastructure/InfrastructureHealth';

import { initialHazardLayers, mockHazards } from '../data/hazards';
import { mockSensors } from '../data/sensors';
import { mockAlerts } from '../data/alerts';
import { mockAiRiskAssessment } from '../data/risk';
import { mockEnvironmentalMetrics } from '../data/environment';
import { mockInfrastructureStatus } from '../data/infrastructure';

import type { HazardCategory, HazardIncident } from '../types/hazard';

export const Dashboard: React.FC = () => {
  // State for mock data (enables interactive toggles & easy future replacement with real APIs)
  const [layers, setLayers] = useState(initialHazardLayers);
  const [hazards] = useState(mockHazards);
  const [sensors] = useState(mockSensors);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [aiRisk] = useState(mockAiRiskAssessment);
  const [environment] = useState(mockEnvironmentalMetrics);
  const [infrastructure] = useState(mockInfrastructureStatus);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleLayer = (id: HazardCategory) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, active: !layer.active } : layer
      )
    );
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
    showNotification(`Alert ${id} acknowledged by Commander on duty.`);
  };

  const handleAcknowledgeAllAlerts = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
    showNotification('All active emergency alerts marked acknowledged.');
  };

  const handleDispatchAlert = (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    showNotification(
      `Dispatched Rapid Response Unit for: ${alert?.title || id}`
    );
  };

  const handleSelectHazard = (hazard: HazardIncident) => {
    showNotification(`Focused hazard vector: ${hazard.name} (${hazard.sector})`);
  };

  return (
    <div className="space-y-4 max-w-[1920px] mx-auto">
      {/* Interactive System Notification Pill */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 px-3.5 py-2 rounded-lg bg-[#0F1929] border border-radar-cyan/50 text-xs font-mono text-radar-cyan shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-radar-cyan animate-ping"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Compact KPI Strip (Active Hazards: 06, Active Alerts: 03, At-Risk Area: 24.6 km², Online Sensors: 1,201, AI Risk Score: 82%, System Health: 96.4%) */}
      <section aria-label="System Key Performance Indicators">
        <KpiStrip
          data={{
            activeHazards: 6,
            activeAlerts: alerts.filter((a) => !a.acknowledged).length || 3,
            atRiskAreaKm2: 24.6,
            onlineSensors: 1201,
            aiRiskScore: 82,
            systemHealth: 96.4,
          }}
        />
      </section>

      {/* 2. Main Command Center Composition Grid */}
      <section aria-label="Disaster Intelligence Canvas">
        <DashboardGrid
          gisSlot={
            <RiskMap
              layers={layers}
              onToggleLayer={handleToggleLayer}
              hazards={hazards}
              sensors={sensors}
              onSelectHazard={handleSelectHazard}
            />
          }
          aiSlot={<AiRiskCard data={aiRisk} />}
          alertsSlot={
            <AlertPanel
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onAcknowledgeAll={handleAcknowledgeAllAlerts}
              onDispatch={handleDispatchAlert}
            />
          }
          environmentSlot={<EnvironmentalPanel metrics={environment} />}
          infrastructureSlot={<InfrastructureHealth status={infrastructure} />}
        />
      </section>
    </div>
  );
};
