import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Activity } from '../lib/data';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  onSave: (id: string, title: string, start: string, end: string) => void;
}

export function EditProjectModal({ isOpen, onClose, activity, onSave }: EditProjectModalProps) {
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
      onSave(activity.id, title, startDate, deadline);
      onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
        <DialogHeader>
          <DialogTitle>Edit Project Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Project Name</Label>
            <Input 
                id="edit-title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="bg-slate-950 border-slate-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="edit-start">Start Date</Label>
                <Input 
                    id="edit-start" 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="bg-slate-950 border-slate-700"
                />
             </div>
             <div className="grid gap-2">
                <Label htmlFor="edit-end">Deadline</Label>
                <Input 
                    id="edit-end" 
                    type="date" 
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)} 
                    className="bg-slate-950 border-slate-700"
                />
             </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
