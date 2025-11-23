import React, { useState } from "react";
import {
  Activity,
  STANDARD_PHASES,
  ActivityStep,
  TaskStatus,
} from "../lib/data";
import { PhaseColumn } from "./PhaseColumn";
import { InputModal } from "./InputModal";
import { ProjectSettingsModal } from "./ProjectSettingsModal";
import { PulseCheck } from "./PulseCheck";
import { Button } from "./ui/button";
import { ArrowLeft, Settings2, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addDays, format } from "date-fns";

import { EditProjectModal } from "./EditProjectModal";

interface TrackerBoardProps {
  activity: Activity;
  onBack: () => void;
  onUpdateActivity: (updatedActivity: Activity) => void;
}

export function TrackerBoard({
  activity,
  onBack,
  onUpdateActivity,
}: TrackerBoardProps) {
  const [selectedStep, setSelectedStep] =
    useState<ActivityStep | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStepOpen, setIsAddStepOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] =
    useState(false);
  const [addStepPhaseId, setAddStepPhaseId] = useState<
    string | null
  >(null);
  const [newStepTitle, setNewStepTitle] = useState("");

  const handleStepClick = (step: ActivityStep) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  // Handling updates from the InputModal
  const handleSaveStep = (
    stepId: string,
    value: string | number | boolean | string[],
  ) => {
    const updatedSteps = activity.steps.map((s) => {
      if (s.id === stepId) {
        return {
          ...s,
          value,
          status: "completed" as TaskStatus,
        };
      }
      return s;
    });
    onUpdateActivity({ ...activity, steps: updatedSteps });
  };

  const handleMoveStep = (
    step: ActivityStep,
    direction: "left" | "right",
  ) => {
    const currentPhaseIndex = STANDARD_PHASES.findIndex(
      (p) => p.id === step.phaseId,
    );
    if (currentPhaseIndex === -1) return;

    const newPhaseIndex =
      direction === "left"
        ? currentPhaseIndex - 1
        : currentPhaseIndex + 1;

    if (
      newPhaseIndex >= 0 &&
      newPhaseIndex < STANDARD_PHASES.length
    ) {
      const newPhaseId = STANDARD_PHASES[newPhaseIndex].id;
      const updatedSteps = activity.steps.map((s) => {
        if (s.id === step.id) {
          return { ...s, phaseId: newPhaseId };
        }
        return s;
      });
      onUpdateActivity({ ...activity, steps: updatedSteps });
    }
  };

  const handleDeleteStep = (stepId: string) => {
    if (
      confirm(
        "Are you sure you want to remove this step from the plan?",
      )
    ) {
      const updatedSteps = activity.steps.filter(
        (s) => s.id !== stepId,
      );
      onUpdateActivity({ ...activity, steps: updatedSteps });
    }
  };

  const handleAddStepClick = (phaseId: string) => {
    setAddStepPhaseId(phaseId);
    setNewStepTitle("");
    setIsAddStepOpen(true);
  };

  const confirmAddStep = () => {
    if (!addStepPhaseId || !newStepTitle) return;

    const newStep: ActivityStep = {
      id: crypto.randomUUID(),
      activityId: activity.id,
      phaseId: addStepPhaseId,
      title: newStepTitle,
      type: "text", // Default
      requiredLabel: "Completion Note",
      status: "not_started",
      riskWeight: 1,
      requiredByDefault: false,
      order:
        activity.steps.filter(
          (s) => s.phaseId === addStepPhaseId,
        ).length + 1,
      deadline: format(addDays(new Date(), 7), "yyyy-MM-dd"), // Default 1 week
    };

    onUpdateActivity({
      ...activity,
      steps: [...activity.steps, newStep],
    });
    setIsAddStepOpen(false);
  };

  const handleEditProject = (
    id: string,
    title: string,
    start: string,
    end: string,
  ) => {
    onUpdateActivity({
      ...activity,
      title,
      startDate: start,
      deadline: end,
    });
  };

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
      {/* Header Area */}
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 backdrop-blur">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">
                {activity.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Start: {activity.startDate}</span>
                <span>•</span>
                <span>End: {activity.deadline}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-400 border-slate-700 hover:bg-slate-800"
              onClick={() => setIsEditProjectOpen(true)}
            >
              <Settings2 className="h-4 w-4 mr-2" /> Settings
            </Button>
          </div>
        </div>
        <PulseCheck steps={activity.steps} />
      </header>

      {/* Main Board Area */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex h-full gap-4 min-w-max">
          {STANDARD_PHASES.map((phase, index) => (
            <PhaseColumn
              key={phase.id}
              phase={phase}
              steps={activity.steps.filter(
                (s) => s.phaseId === phase.id,
              )}
              onTaskClick={handleStepClick}
              onMoveTask={handleMoveStep}
              onDeleteTask={handleDeleteStep}
              onAddStep={handleAddStepClick}
              isFirst={index === 0}
              isLast={index === STANDARD_PHASES.length - 1}
            />
          ))}
        </div>
      </main>

      {/* Task Input Modal */}
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedStep} // Using the existing InputModal which expects 'Task' but ActivityStep is compatible enough or needs adjustment
        onSave={handleSaveStep}
      />

      <EditProjectModal
        isOpen={isEditProjectOpen}
        onClose={() => setIsEditProjectOpen(false)}
        activity={activity}
        onSave={handleEditProject}
      />

      {/* Simple Add Step Dialog */}
      <Dialog
        open={isAddStepOpen}
        onOpenChange={setIsAddStepOpen}
      >
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle>Add Custom Step</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter the details for the new step to add to this
              phase.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Step Title</Label>
              <Input
                value={newStepTitle}
                onChange={(e) =>
                  setNewStepTitle(e.target.value)
                }
                placeholder="e.g. Call Caterer"
                className="bg-slate-950 border-slate-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsAddStepOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAddStep}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Step
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}