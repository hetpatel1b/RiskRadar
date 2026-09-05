import React, { useState } from 'react';
import type { EmergencyAlert } from '../../types/alert';
import { AlertItem } from './AlertItem';
import {
  ShieldAlert,
  CheckCheck
} from 'lucide-react';

interface AlertPanelProps {
  alerts: EmergencyAlert[];
  onAcknowledge: (id: string) => void;
  onAcknowledgeAll?: () => void;
  onDispatch?: (id: string) => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  onAcknowledge,
  onAcknowledgeAll,
  onDispatch,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'all') return true;
    return a.severity === filter;
  });

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;

  return (
    <div className="command-panel rounded-2xl border border-[#172234] p-4 flex flex-col justify-between shadow-xl select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-semantic-critical/10 border border-semantic-critical/30 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-semantic-critical" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Critical Emergency Alerts
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-semantic-critical/20 text-semantic-critical border border-semantic-critical/30 font-bold">
                  {alerts.length} ACTIVE
                </span>
              </div>
              <p className="text-[10px] font-mono text-radar-muted">
                Zero-Flashing Government Queue • SOP Automated
              </p>
            </div>
          </div>

          {/* Severity filter pills */}
          <div className="flex items-center gap-1 bg-[#090E17] p-0.5 rounded-md border border-[#172234]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                filter === 'all'
                  ? 'bg-[#182338] text-white font-bold'
                  : 'text-radar-muted hover:text-radar-secondary'
              }`}
            >
              ALL ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                filter === 'critical'
                  ? 'bg-semantic-critical/20 text-semantic-critical font-bold border border-semantic-critical/30'
                  : 'text-radar-muted hover:text-radar-secondary'
              }`}
            >
              CRIT ({criticalCount})
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                filter === 'warning'
                  ? 'bg-semantic-warning/20 text-semantic-warning font-bold border border-semantic-warning/30'
                  : 'text-radar-muted hover:text-radar-secondary'
              }`}
            >
              WARN ({warningCount})
            </button>
          </div>
        </div>

        {/* Alert Items List */}
        <div className="mt-3 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={onAcknowledge}
                onDispatch={onDispatch}
              />
            ))
          ) : (
            <div className="p-6 text-center rounded-xl bg-[#090E17] border border-[#172234]">
              <p className="text-xs font-mono text-radar-muted">
                No active alerts match the selected severity filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer batch actions */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
        <span className="text-radar-muted">
          DISPATCH PROTOCOL: SDU-DEFENSE-ECHO
        </span>
        {onAcknowledgeAll && (
          <button
            onClick={onAcknowledgeAll}
            className="text-radar-cyan hover:text-white flex items-center gap-1 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>ACKNOWLEDGE ALL</span>
          </button>
        )}
      </div>
    </div>
  );
};
