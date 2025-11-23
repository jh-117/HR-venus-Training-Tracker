import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TrackerBoard } from './components/TrackerBoard';
import { CreateActivityModal } from './components/CreateActivityModal';
import { Auth } from './components/Auth';
import { Activity } from './lib/data';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import { Button } from './components/ui/button';
import { LogOut } from 'lucide-react';

export default function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'template' | 'scratch'>('template');
  const [loading, setLoading] = useState(true);

  // Load activities from Supabase
  useEffect(() => {
    if (user) {
      loadActivities();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadActivities = async () => {
    try {
      // Fetch activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (activitiesError) throw activitiesError;

      // Fetch all steps
      const { data: stepsData, error: stepsError } = await supabase
        .from('activity_steps')
        .select('*')
        .order('order', { ascending: true });

      if (stepsError) throw stepsError;

      // Combine activities with their steps
      const activitiesWithSteps = activitiesData.map((activity: any) => ({
        id: activity.id,
        title: activity.title,
        startDate: activity.start_date,
        deadline: activity.deadline,
        createdAt: activity.created_at,
        archived: activity.archived || false, // Add this line
        steps: stepsData
          .filter((step: any) => step.activity_id === activity.id)
          .map((step: any) => ({
            id: step.id,
            activityId: step.activity_id,
            phaseId: step.phase_id,
            title: step.title,
            description: step.description,
            type: step.type,
            requiredLabel: step.required_label,
            options: step.options,
            checklistItems: step.checklist_items,
            riskWeight: step.risk_weight,
            requiredByDefault: step.required_by_default,
            order: step.order,
            deadline: step.deadline,
            status: step.status,
            value: step.value ? JSON.parse(step.value) : undefined,
            notes: step.notes,
          })),
      }));

      setActivities(activitiesWithSteps);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewActivity = (mode: 'template' | 'scratch') => {
    setCreateMode(mode);
    setIsCreateModalOpen(true);
  };

  const handleCreateActivity = async (newActivity: Activity) => {
    if (!user) return;

  const handleArchiveActivity = async (activityId: string, archived: boolean) => {
  try {
    const { error } = await supabase
      .from('activities')
      .update({ archived })
      .eq('id', activityId);

    if (error) throw error;

    await loadActivities();
  } catch (error) {
    console.error('Error archiving activity:', error);
    alert('Failed to archive activity');
  }
};

const handleDeleteActivity = async (activityId: string) => {
  try {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', activityId);

    if (error) throw error;

    await loadActivities();
  } catch (error) {
    console.error('Error deleting activity:', error);
    alert('Failed to delete activity');
  }
};


    
    try {
      // Insert activity
      const { data: activityData, error: activityError } = await supabase
        .from('activities')
        .insert({
          id: newActivity.id,
          title: newActivity.title,
          start_date: newActivity.startDate,
          deadline: newActivity.deadline,
          user_id: user.id,
        })
        .select()
        .single();

      if (activityError) throw activityError;

      // Insert steps
      const stepsToInsert = newActivity.steps.map((step) => ({
        id: step.id,
        activity_id: newActivity.id,
        phase_id: step.phaseId,
        title: step.title,
        description: step.description,
        type: step.type,
        required_label: step.requiredLabel,
        options: step.options,
        checklist_items: step.checklistItems,
        risk_weight: step.riskWeight,
        required_by_default: step.requiredByDefault,
        order: step.order,
        deadline: step.deadline,
        status: step.status,
        value: step.value ? JSON.stringify(step.value) : null,
        notes: step.notes,
      }));

      if (stepsToInsert.length > 0) {
        const { error: stepsError } = await supabase
          .from('activity_steps')
          .insert(stepsToInsert);

        if (stepsError) throw stepsError;
      }

      // Reload activities
      await loadActivities();
      
      // Open the newly created activity
      setCurrentActivity(newActivity);
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('Failed to create activity. Please try again.');
    }
  };

  const handleUpdateActivity = async (updated: Activity) => {
    try {
      // Update activity
      const { error: activityError } = await supabase
        .from('activities')
        .update({
          title: updated.title,
          start_date: updated.startDate,
          deadline: updated.deadline,
        })
        .eq('id', updated.id);

      if (activityError) throw activityError;

      // Delete all existing steps
      const { error: deleteError } = await supabase
        .from('activity_steps')
        .delete()
        .eq('activity_id', updated.id);

      if (deleteError) throw deleteError;

      // Insert updated steps
      const stepsToInsert = updated.steps.map((step) => ({
        id: step.id,
        activity_id: updated.id,
        phase_id: step.phaseId,
        title: step.title,
        description: step.description,
        type: step.type,
        required_label: step.requiredLabel,
        options: step.options,
        checklist_items: step.checklistItems,
        risk_weight: step.riskWeight,
        required_by_default: step.requiredByDefault,
        order: step.order,
        deadline: step.deadline,
        status: step.status,
        value: step.value ? JSON.stringify(step.value) : null,
        notes: step.notes,
      }));

      if (stepsToInsert.length > 0) {
        const { error: stepsError } = await supabase
          .from('activity_steps')
          .insert(stepsToInsert);

        if (stepsError) throw stepsError;
      }

      // Reload activities
      await loadActivities();
      setCurrentActivity(updated);
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Failed to update activity. Please try again.');
    }
  };

  // Show loading spinner while checking auth
  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <Auth />;
  }

  return (
    <div className="relative">
      {/* Logout button */}
      {!currentActivity && (
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-slate-400 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}

      {currentActivity ? (
        <TrackerBoard
          activity={currentActivity}
          onBack={() => setCurrentActivity(null)}
          onUpdateActivity={handleUpdateActivity}
        />
      ) : (
        <Dashboard
          activities={activities}
          onNewActivity={handleNewActivity}
          onSelectActivity={setCurrentActivity}
        />
      )}

      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateActivity}
        mode={createMode}
      />
    </div>
  );
}