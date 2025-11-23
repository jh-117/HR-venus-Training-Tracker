import React from 'react';
import { ActivityStep, calculateReadiness } from '../lib/data';
import { Activity as ActivityIcon, Calendar, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

interface PulseCheckProps {
  steps: ActivityStep[];
}

export function PulseCheck({ steps }: PulseCheckProps) {
  const total = steps.length;
  const completed = steps.filter(t => t.status === 'completed').length;
  const readiness = calculateReadiness(steps);
  const highRiskCount = steps.filter(s => {
     // Custom logic to check risk inside the component if needed, 
     // but we likely want to use the pre-calculated or live data.
     // For now, simple check:
     if (s.status === 'completed') return false;
     const deadline = new Date(s.deadline);
     const today = new Date();
     return deadline < today;
  }).length;

  let statusColor = "text-amber-500";
  let barColor = "bg-amber-500";
  let statusText = "Preparing";

  if (readiness === 100) {
      statusColor = "text-blue-500";
      barColor = "bg-blue-500";
      statusText = "Ready";
  } else if (readiness > 75) {
      statusColor = "text-emerald-500";
      barColor = "bg-emerald-500";
      statusText = "On Track";
  } else if (highRiskCount > 0) {
      statusColor = "text-red-500";
      barColor = "bg-red-500";
      statusText = "At Risk";
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
      
      {/* Main Readiness Score */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 border-4", 
            readiness === 100 ? "border-blue-500" : 
            highRiskCount > 0 ? "border-red-500" : "border-amber-500"
        )}>
            <span className="text-lg font-bold text-white">{readiness}%</span>
        </div>
        <div>
            <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Readiness Score</h2>
            <div className={cn("text-xl font-semibold", statusColor)}>
                {statusText}
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 flex-1 border-l border-slate-800 pl-0 lg:pl-8">
        <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-xs">Completed</span>
            </div>
            <span className="text-lg font-mono text-slate-200">{completed}/{total}</span>
        </div>
        <div>
             <div className="flex items-center gap-2 text-slate-500 mb-1">
                <AlertTriangle className={cn("h-3 w-3", highRiskCount > 0 ? "text-red-500" : "")} />
                <span className="text-xs">Overdue</span>
            </div>
            <span className={cn("text-lg font-mono", highRiskCount > 0 ? "text-red-500" : "text-slate-200")}>
                {highRiskCount}
            </span>
        </div>
        <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Layers className="h-3 w-3" />
                <span className="text-xs">Total Weight</span>
            </div>
            <span className="text-lg font-mono text-slate-200">
                {steps.reduce((acc, s) => acc + s.riskWeight, 0)}
            </span>
        </div>
      </div>
    </div>
  );
}
