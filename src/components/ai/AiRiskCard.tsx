import React, { useState } from 'react';
import type { AiRiskAssessment } from '../../types/risk';
import {
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface AiRiskCardProps {
  data: AiRiskAssessment;
}

export const AiRiskCard: React.FC<AiRiskCardProps> = ({ data }) => {
  const [showFactors, setShowFactors] = useState(false);

  return (
    <div className="command-panel rounded-2xl border border-[#172234] p-4 flex flex-col justify-between shadow-xl relative overflow-hidden select-none">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-semantic-warning/[0.04] rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-radar-cyan/10 border border-radar-cyan/30 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-radar-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  AI Risk Assessment
                </h3>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/20">
                  {data.modelName.split(' ')[0]}
                </span>
              </div>
              <p className="text-[10px] font-mono text-radar-muted">
                Confidence: {data.confidenceScore}% • {data.lastCalculated}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-semantic-warning/15 text-semantic-warning border border-semantic-warning/30 font-bold">
            LEVEL 4 — {data.riskLevel}
          </span>
        </div>

        {/* Primary Score & Impact Metrics */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {/* Main Risk Score */}
          <div className="p-2.5 rounded-xl bg-[#090E17] border border-[#172338] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-radar-muted">
              Risk Score
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-mono font-extrabold text-semantic-warning">
                {data.overallRiskScore}%
              </span>
            </div>
            <div className="w-full bg-[#151E2E] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-semantic-warning h-full rounded-full"
                style={{ width: `${data.overallRiskScore}%` }}
              />
            </div>
          </div>

          {/* Expected Affected Area */}
          <div className="p-2.5 rounded-xl bg-[#090E17] border border-[#172338] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-radar-muted">
              At-Risk Area
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-mono font-extrabold text-radar-cyan">
                {data.expectedAffectedAreaKm2}
              </span>
              <span className="text-[10px] font-mono text-radar-muted">km²</span>
            </div>
            <span className="text-[9px] font-mono text-radar-muted">Sector 04/07</span>
          </div>

          {/* Est. Population Impact */}
          <div className="p-2.5 rounded-xl bg-[#090E17] border border-[#172338] flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-radar-muted">
              Pop. Exposed
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-mono font-extrabold text-white">
                {data.estimatedPopulationImpact.toLocaleString()}
              </span>
            </div>
            <span className="text-[9px] font-mono text-semantic-warning">Evac Readiness</span>
          </div>
        </div>

        {/* Hazard Probabilities Breakdown */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-radar-secondary">
            <span>PREDICTIVE HAZARD PROBABILITY</span>
            <span>MODEL WEIGHT</span>
          </div>

          {data.hazardProbabilities.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-radar-text truncate pr-2">{item.hazard}</span>
                <span
                  className={`font-bold ${
                    item.probability >= 80
                      ? 'text-semantic-critical'
                      : item.probability >= 60
                      ? 'text-semantic-warning'
                      : 'text-radar-cyan'
                  }`}
                >
                  {item.probability}%
                </span>
              </div>
              <div className="w-full bg-[#121A2A] rounded-full h-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.probability >= 80
                      ? 'bg-semantic-critical'
                      : item.probability >= 60
                      ? 'bg-semantic-warning'
                      : 'bg-radar-cyan'
                  }`}
                  style={{ width: `${item.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explainable Contributing Factors Accordion / Drawer */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.06]">
        <button
          onClick={() => setShowFactors(!showFactors)}
          className="w-full flex items-center justify-between text-[11px] font-mono text-radar-cyan hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-radar-cyan" />
            Explainable AI Contributing Factors ({data.contributingFactors.length})
          </span>
          {showFactors ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showFactors && (
          <div className="mt-2 space-y-1.5 animate-in fade-in duration-200">
            {data.contributingFactors.map((factor, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-[#080C14] border border-[#162134] text-[10px] font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{factor.factor}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${
                      factor.impact === 'critical'
                        ? 'bg-semantic-critical/20 text-semantic-critical'
                        : 'bg-semantic-warning/20 text-semantic-warning'
                    }`}
                  >
                    Weight {factor.weight}%
                  </span>
                </div>
                <p className="text-radar-muted mt-0.5 leading-tight">{factor.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
