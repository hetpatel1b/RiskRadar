import { useState } from 'react';
import { DashboardShell } from './components/layout/DashboardShell';
import { Dashboard } from './pages/Dashboard';

export function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [lastSyncTime, setLastSyncTime] = useState('08:48:10 UTC');

  const handleNavSelect = (navId: string) => {
    setActiveNav(navId);
    if (navId !== 'dashboard') {
      // Prepared structurally: placeholder handling for uncreated sub-pages in Phase 1
      console.log(`Navigation to ${navId} prepared for subsequent development phase.`);
    }
  };

  const handleRefresh = () => {
    const now = new Date();
    const formatted = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    setLastSyncTime(formatted);
  };

  return (
    <DashboardShell
      activeNav={activeNav}
      onSelectNav={handleNavSelect}
      lastUpdated={lastSyncTime}
      onRefresh={handleRefresh}
    >
      <Dashboard />
    </DashboardShell>
  );
}

export default App;
