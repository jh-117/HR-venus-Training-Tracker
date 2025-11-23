import React from "react";
import { ActivityStep, getRiskLevel } from "../lib/data";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CircleDashed,
  AlertTriangle,
  Trash2,
  Calendar,
  AlertCircle,
  ListTodo,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { format, parseISO } from "date-fns";

interface TaskCardProps {
  step: ActivityStep;
  onTaskClick: (step: ActivityStep) => void;
  onMoveTask: (
    step: ActivityStep,
    direction: "left" | "right",
  ) => void;
  onDeleteTask: (stepId: string) => void;
  isFirstPhase: boolean;
  isLastPhase: boolean;
}

export function TaskCard({
  step,
  onTaskClick,
  onMoveTask,
  onDeleteTask,
  isFirstPhase,
  isLastPhase,
}: TaskCardProps) {
  const isDone = step.status === "completed";
  const risk = getRiskLevel(step);

  const renderValue = () => {
    if (!isDone || step.value === undefined) return null;

    if (step.type === "boolean") {
      return step.value ? "Yes" : "No";
    }

    if (
      step.type === "checklist" &&
      Array.isArray(step.value)
    ) {
      const count = step.value.length;
      const total = step.checklistItems?.length || 0;
      return `${count}/${total} Checked`;
    }

    return step.value.toString();
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-lg border p-3 shadow-sm transition-all hover:shadow-md cursor-pointer",
        isDone
          ? "bg-slate-800/40 border-green-900/30"
          : "bg-slate-800 border-slate-700",
        risk === "high" && !isDone
          ? "border-red-500/50 bg-red-950/10"
          : "",
        risk === "medium" && !isDone
          ? "border-amber-500/50"
          : "",
      )}
      onClick={() => onTaskClick(step)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h4
          className={cn(
            "font-medium text-sm leading-tight",
            isDone
              ? "text-slate-500 line-through"
              : "text-slate-200",
          )}
        >
          {step.title}
        </h4>
        <div className="shrink-0">
          {isDone ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : risk === "high" ? (
            <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
          ) : risk === "medium" ? (
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          ) : step.type === "checklist" ? (
            <ListTodo className="h-4 w-4 text-blue-400" />
          ) : (
            <CircleDashed className="h-4 w-4 text-slate-600" />
          )}
        </div>
      </div>

      {/* Meta Data */}
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span
            className={cn(
              risk === "high" && !isDone
                ? "text-red-400 font-bold"
                : "",
            )}
          >
            {format(parseISO(step.deadline), "MMM d")}
          </span>
        </div>
        {isDone && (
          <span
            className="max-w-[100px] truncate text-green-500/80 font-mono font-medium"
            title={step.value?.toString()}
          >
            {renderValue()}
          </span>
        )}
      </div>

      {/* Hover Actions */}
      <div className="absolute -right-2 -top-2 hidden group-hover:flex gap-1">
        <Button
          variant="destructive"
          size="icon"
          className="h-7 w-7 rounded-full shadow-lg opacity-90 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(step.id);
          }}
          title="Delete this step"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Movement Actions (Bottom) */}
      <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 text-slate-500 hover:text-slate-200"
          disabled={isFirstPhase}
          onClick={(e) => {
            e.stopPropagation();
            onMoveTask(step, "left");
          }}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 text-slate-500 hover:text-slate-200"
          disabled={isLastPhase}
          onClick={(e) => {
            e.stopPropagation();
            onMoveTask(step, "right");
          }}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}