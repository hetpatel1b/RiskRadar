import React from 'react';
import type { EmergencyAlert } from '../../types/alert';
import {
  Clock,
  MapPin,
  CheckCircle2,
  SendHorizontal,
  Radio
} from 'lucide-react';

interface AlertItemProps {
  alert: EmergencyAlert;
  onAcknowledge: (id: string) => void;
  onDispatch?: (id: string) => void;
}

export const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  onAcknowledge,
  onDispatch,
}) => {
  const isCritical = alert.severity === 'critical';
  const isWarning = alert.severity === 'warning';

  const severityBadgeClass = isCritical
    ? 'bg-semantic-critical/15 text-semantic-critical border-semantic-critical/40'
    : isWarning
    ? 'bg-semantic-warning/15 text-semantic-warning border-semantic-warning/40'
    : 'bg-semantic-watch/15 text-semantic-watch border-semantic-watch/40';

  const containerBorderClass = isCritical
    ? 'border-semantic-critical/30 bg-[#120D14]/70 hover:border-semantic-critical/50'
    : isWarning
    ? 'border-semantic-warning/30 bg-[#13110E]/70 hover:border-semantic-warning/50'
    : 'border-[#1C273C] bg-[#0A0F19]/70 hover:border-[#283854]';

  return (
    <div
      className={`p-3 rounded-xl border transition-all duration-150 select-none ${containerBorderClass}`}
    >
      {/* Top Row: Severity Tag, Hazard Category, Timestamp */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Steady semantic badge - NO FLASHING ANIMATION */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${severityBadgeClass}`}
          >
            {alert.severity}
          </span>
          <span className="text-[11px] font-mono text-radar-cyan font-semibold">
            {alert.hazardType}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono text-radar-muted">
          <Clock className="w-3 h-3 text-radar-muted" />
          <span>{alert.timestamp}</span>
        </div>
      </div>

      {/* Alert Title */}
      <h4 className="text-xs font-semibold text-white mt-1.5 leading-snug">
        {alert.title}
      </h4>

      {/* Location (Explicit requirement) */}
      <div className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-radar-secondary">
        <MapPin className="w-3 h-3 text-radar-cyan shrink-0" />
        <span className="truncate">{alert.location}</span>
      </div>

      {/* Impact summary */}
      <p className="text-[11px] text-radar-muted mt-1 leading-relaxed line-clamp-2">
        {alert.impactSummary}
      </p>

      {/* Bottom Action strip */}
      <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[10px] font-mono text-radar-muted">
          <Radio className="w-3 h-3 text-radar-muted" />
          <span>SRC: {alert.source}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAcknowledge(alert.id)}
            disabled={alert.acknowledged}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
              alert.acknowledged
                ? 'bg-white/[0.04] text-semantic-safe border border-semantic-safe/30 cursor-default'
                : 'bg-[#141C2B] hover:bg-[#1B273D] text-radar-text border border-[#22334F] hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>{alert.acknowledged ? 'ACKNOWLEDGED' : 'ACK'}</span>
          </button>

          <button
            onClick={() => onDispatch?.(alert.id)}
            className="px-2.5 py-1 rounded text-[10px] font-mono bg-radar-cyan/15 hover:bg-radar-cyan/25 text-radar-cyan border border-radar-cyan/40 hover:text-white transition-colors flex items-center gap-1 font-semibold"
          >
            <SendHorizontal className="w-3 h-3" />
            <span>DISPATCH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
