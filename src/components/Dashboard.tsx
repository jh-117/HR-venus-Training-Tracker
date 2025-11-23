import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Folder,
  Plus,
  LayoutTemplate,
  PenTool,
  AlertTriangle,
  Siren,
} from "lucide-react";
import {
  Activity,
  ActivityStep,
  STANDARD_PHASES,
  getRiskLevel,
} from "../lib/data";
import { cn } from "../lib/utils";
import { differenceInDays, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Archive, Trash2, User, MoreVertical } from 'lucide-react';
import { UserProfile } from './UserProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

interface DashboardProps {
  activities: Activity[];
  onNewActivity: (mode: "template" | "scratch") => void;
  onSelectActivity: (activity: Activity) => void;
  onArchiveActivity?: (activityId: string, archived: boolean) => void;
  onDeleteActivity?: (activityId: string) => void;
}

function getMostCriticalTask(
  activities: Activity[],
): { task: ActivityStep; activityTitle: string } | null {
  let criticalTask: ActivityStep | null = null;
  let criticalActivityTitle = "";
  let highestScore = -1;

  activities.forEach((activity) => {
    activity.steps.forEach((step) => {
      if (step.status === "completed") return;

      // Calculate score based on:
      // 1. Overdue (High score)
      // 2. Due soon (Medium score)
      // 3. Risk Weight (Multiplier)

      const deadline = parseISO(step.deadline);
      const today = new Date();
      const daysUntil = differenceInDays(deadline, today);

      let score = 0;

      if (daysUntil < 0) {
        score = 1000 + Math.abs(daysUntil) * 10; // Overdue gets highest priority
      } else if (daysUntil <= 3) {
        score = 500 + (3 - daysUntil) * 10; // Due soon
      } else {
        score = 100 - daysUntil; // Far future gets low score
      }

      // Multiply by risk weight to prioritize important tasks
      score = score * step.riskWeight;

      if (score > highestScore) {
        highestScore = score;
        criticalTask = step;
        criticalActivityTitle = activity.title;
      }
    });
  });

  if (!criticalTask) return null;
  return {
    task: criticalTask,
    activityTitle: criticalActivityTitle,
  };
}

export function Dashboard({
  activities,
  onNewActivity,
  onSelectActivity,
}: DashboardProps) {
  const [isChoiceDialogOpen, setIsChoiceDialogOpen] =
    useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
const [showArchived, setShowArchived] = useState(false);
  const critical = getMostCriticalTask(activities);

  const handleCreateChoice = (mode: "template" | "scratch") => {
    setIsChoiceDialogOpen(false);
    onNewActivity(mode);
  };

  const handleArchiveActivity = async (activityId: string, archived: boolean) => {
  if (onArchiveActivity) {
    onArchiveActivity(activityId, archived);
  }
};

const handleDeleteActivity = async (activityId: string) => {
  if (!confirm('Are you sure you want to permanently delete this project? This cannot be undone.')) {
    return;
  }
  if (onDeleteActivity) {
    onDeleteActivity(activityId);
  }
};
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-4 backdrop-blur">
  <div className="flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
      <Folder className="h-5 w-5" />
    </div>
    <div>
      <h1 className="text-lg font-bold leading-none">HR Venus</h1>
      <p className="text-xs text-slate-400">Training Action Tracker</p>
    </div>
  </div>
  
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsProfileOpen(true)}
      className="text-slate-400 hover:text-white"
    >
      <User className="h-4 w-4 mr-2" />
      Profile
    </Button>
  </div>
</header>

      <main className="container mx-auto max-w-5xl p-8 space-y-10">
        {/* Flashlight / Critical Spotlight */}
        {critical && (
          <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 to-slate-900 p-8 shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)]">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <Siren className="h-5 w-5 animate-pulse" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Critical Action Required
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {critical.task.title}
                </h2>
                <p className="text-slate-400">
                  Project:{" "}
                  <span className="text-slate-200 font-medium">
                    {critical.activityTitle}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-6 bg-black/20 p-4 rounded-xl border border-white/5">
                <div>
                  <div className="text-xs text-slate-500 uppercase">
                    Deadline
                  </div>
                  <div className="text-lg font-mono font-bold text-red-400">
                    {critical.task.deadline}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">
                    Risk Impact
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-2 w-2 rounded-full",
                          i < critical.task.riskWeight
                            ? "bg-red-500"
                            : "bg-slate-800",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
                  onClick={() => {
                    const act = activities.find(
                      (a) => a.title === critical.activityTitle,
                    );
                    if (act) onSelectActivity(act);
                  }}
                >
                  Resolve Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {activities.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-800/80 transition-all hover:border-blue-500/50"
              onClick={() => handleCreateChoice("template")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">
                Use 80-Step Template
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Best for comprehensive training programs.
                Includes all 8 phases, HRD Corp workflows, and
                standard checklists.
              </p>
              <div className="mt-6 flex items-center text-blue-400 text-sm font-medium">
                Select this option &rarr;
              </div>
            </div>

            <div
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-800/80 transition-all hover:border-emerald-500/50"
              onClick={() => handleCreateChoice("scratch")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20">
                <PenTool className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">
                Start from Scratch
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Build your own workflow step-by-step. Good for
                simple workshops or non-standard events.
              </p>
              <div className="mt-6 flex items-center text-emerald-400 text-sm font-medium">
                Select this option &rarr;
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-200">
                Active Projects
              </h2>
              <Button
                onClick={() => setIsChoiceDialogOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700"
              >
                <Plus className="h-4 w-4 mr-2" /> New Project
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => {
                const completed = activity.steps.filter(
                  (s) => s.status === "completed",
                ).length;
                const total = Math.max(
                  activity.steps.length,
                  1,
                );
                const percent = Math.round(
                  (completed / total) * 100,
                );

                return (
                  <div
                    key={activity.id}
                    className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500/50 transition-all cursor-pointer shadow-sm"
                    onClick={() => onSelectActivity(activity)}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center">
                          <Folder className="h-5 w-5" />
                        </div>
                        <div className="text-right">
                          <span className="block text-2xl font-bold text-slate-200">
                            {percent}%
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                            Readiness
                          </span>
                        </div>
                      </div>
                      <h3 className="font-medium text-slate-200 text-lg mb-1 group-hover:text-blue-400 transition-colors">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                        <span>Start: {activity.startDate}</span>
                        <span>End: {activity.deadline}</span>
                      </div>
                    </div>

                    {/* Phase Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider">
                        <span>Phase Progress</span>
                        <span>8 Phases</span>
                      </div>
                      <div className="flex gap-1 h-2">
                        {STANDARD_PHASES.map((phase) => {
                          const phaseSteps =
                            activity.steps.filter(
                              (s) => s.phaseId === phase.id,
                            );
                          const isPhaseComplete =
                            phaseSteps.length > 0 &&
                            phaseSteps.every(
                              (s) => s.status === "completed",
                            );
                          const hasRisk = phaseSteps.some(
                            (s) => getRiskLevel(s) === "high",
                          );

                          return (
                            <div
                              key={phase.id}
                              className={cn(
                                "flex-1 rounded-full transition-colors",
                                isPhaseComplete
                                  ? "bg-emerald-500"
                                  : hasRisk
                                    ? "bg-red-500"
                                    : "bg-slate-800",
                              )}
                              title={`${phase.title}: ${isPhaseComplete ? "Complete" : "Pending"}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Choice Dialog for New Project */}
      <Dialog
        open={isChoiceDialogOpen}
        onOpenChange={setIsChoiceDialogOpen}
      >
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Create New Project
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Choose how you'd like to start your training
              project.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2 py-4">
            <div
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/50 p-6 hover:bg-slate-800/80 transition-all hover:border-blue-500/50"
              onClick={() => handleCreateChoice("template")}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20">
                <LayoutTemplate className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                Use 80-Step Template
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Comprehensive training program with all 8
                phases, HRD Corp workflows, and standard
                checklists.
              </p>
              <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                Select &rarr;
              </div>
            </div>

            <div
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/50 p-6 hover:bg-slate-800/80 transition-all hover:border-emerald-500/50"
              onClick={() => handleCreateChoice("scratch")}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20">
                <PenTool className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                Start from Scratch
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Build your own workflow step-by-step. Good for
                simple workshops or non-standard events.
              </p>
              <div className="mt-4 flex items-center text-emerald-400 text-sm font-medium">
                Select &rarr;
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}