import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TrackerBoard } from './components/TrackerBoard';
import { CreateActivityModal } from './components/CreateActivityModal';
import { Activity } from './lib/data';

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'template' | 'scratch'>('template');

  const handleNewActivity = (mode: 'template' | 'scratch') => {
    setCreateMode(mode);
    setIsCreateModalOpen(true);
  };

  const handleCreateActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity]);
    setCurrentActivity(newActivity); // Auto-open
  };

  const handleUpdateActivity = (updated: Activity) => {
    setActivities(prev => prev.map(a => a.id === updated.id ? updated : a));
    setCurrentActivity(updated);
  };

  return (
    <>
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
    </>
  );
}
