import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Activity } from '../lib/data';

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  onSave: (id: string, updates: Partial<Activity>) => void;
}

export function ProjectSettingsModal({ isOpen, onClose, activity, onSave }: ProjectSettingsModalProps) {
  const [title, setTitle] = useState(activity.title);
  const [startDate, setStartDate] = useState(activity.startDate);
  const [deadline, setDeadline] = useState(activity.deadline);

  useEffect(() => {
    if (isOpen) {
        setTitle(activity.title);
        setStartDate(activity.startDate);
        setDeadline(activity.deadline);
    }
  }, [isOpen, activity]);

  const handleSave = () => {
    if (new Date(deadline) <= new Date(startDate)) {
        alert('Deadline must be after start date');
        return;
    }
    
    onSave(activity.id, {
        title,
        startDate,
        deadline
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription className="text-slate-400">
            Update the project details and timeline.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Training Name</Label>
            <Input 
                id="edit-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="bg-slate-950 border-slate-700"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="edit-start-date">Start Date</Label>
                <Input 
                    id="edit-start-date" 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="bg-slate-950 border-slate-700"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="edit-deadline">Deadline</Label>
                <Input 
                    id="edit-deadline" 
                    type="date" 
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)} 
                    className="bg-slate-950 border-slate-700"
                />
            </div>
          </div>
          
          <div className="rounded-md bg-blue-900/20 p-3 text-xs text-blue-400">
            Note: Changing dates here will not automatically shift individual task deadlines. You may need to adjust specific tasks manually.
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
