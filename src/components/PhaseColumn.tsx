import React from 'react';
import { ActivityStep, StandardPhase } from '../lib/data';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface PhaseColumnProps {
  phase: StandardPhase;
  steps: ActivityStep[];
  onTaskClick: (step: ActivityStep) => void;
  onMoveTask: (step: ActivityStep, direction: 'left' | 'right') => void;
  onDeleteTask: (stepId: string) => void;
  onAddStep: (phaseId: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function PhaseColumn({ phase, steps, onTaskClick, onMoveTask, onDeleteTask, onAddStep, isFirst, isLast }: PhaseColumnProps) {
  return (
    <div className="flex h-full w-[300px] min-w-[300px] flex-col gap-3 rounded-xl bg-slate-900/40 border border-slate-800/60 p-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider truncate max-w-[200px]">
            {phase.title}
        </h3>
        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            {steps.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-2 h-full overflow-y-auto pb-10 pr-1 custom-scrollbar">
        {steps.sort((a, b) => a.order - b.order).map((step) => (
            <TaskCard 
                key={step.id} 
                step={step} 
                onTaskClick={onTaskClick}
                onMoveTask={onMoveTask}
                onDeleteTask={onDeleteTask}
                isFirstPhase={isFirst}
                isLastPhase={isLast}
            />
        ))}
        
        <Button 
            variant="ghost" 
            className="w-full justify-start text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-dashed border-slate-800 hover:border-slate-700 h-8"
            onClick={() => onAddStep(phase.id)}
        >
            <Plus className="h-3 w-3 mr-2" /> Add Step
        </Button>
      </div>
    </div>
  );
}
