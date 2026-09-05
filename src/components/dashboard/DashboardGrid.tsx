import React from 'react';

interface DashboardGridProps {
  gisSlot: React.ReactNode;
  aiSlot: React.ReactNode;
  alertsSlot: React.ReactNode;
  environmentSlot: React.ReactNode;
  infrastructureSlot: React.ReactNode;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  gisSlot,
  aiSlot,
  alertsSlot,
  environmentSlot,
  infrastructureSlot,
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Command Center Upper Canvas: GIS Hero (~40% area) + AI & Alerts Intelligence Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 1. GIS Hero Map (Primary anchor: ~40% visual area, 7 cols on 1440px, 8 cols on 1920px) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-[500px] xl:min-h-[560px]">
          {gisSlot}
        </div>

        {/* 2 & 3. Intelligence & Action Column (AI Risk Assessment + Critical Alerts) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 justify-between">
          {/* 2. Compact AI Risk Assessment */}
          <div>
            {aiSlot}
          </div>

          {/* 3. Critical Emergency Alerts */}
          <div className="flex-1">
            {alertsSlot}
          </div>
        </div>
      </div>

      {/* Secondary Command Center Lower Canvas: Environmental Telemetry & Infrastructure Topology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 4. Real-time Environmental & Multi-sensor Stream Monitoring */}
        <div className="lg:col-span-7 xl:col-span-7">
          {environmentSlot}
        </div>

        {/* 5. Infrastructure Health & Network Topology */}
        <div className="lg:col-span-5 xl:col-span-5">
          {infrastructureSlot}
        </div>
      </div>
    </div>
  );
};
