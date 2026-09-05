import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

interface DashboardShellProps {
  children: React.ReactNode;
  activeNav?: string;
  onSelectNav?: (id: string) => void;
  lastUpdated?: string;
  onRefresh?: () => void;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  activeNav = 'dashboard',
  onSelectNav,
  lastUpdated,
  onRefresh,
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-radar-bg text-radar-text select-none">
      {/* Expanded Left Sidebar (240px) */}
      <Sidebar activeItem={activeNav} onSelectItem={onSelectNav} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#070A0F]">
        {/* Compact Top System Header */}
        <TopHeader lastUpdated={lastUpdated} onManualRefresh={onRefresh} />

        {/* Command Center Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-5 space-y-4 bg-grid-pattern relative">
          {children}
        </main>
      </div>
    </div>
  );
};
