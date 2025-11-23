import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { generateActivity, Activity } from '../lib/data';
import { addDays, format } from 'date-fns';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (activity: Activity) => void;
  mode: 'template' | 'scratch';
}

export function CreateActivityModal({ isOpen, onClose, onCreate, mode }: CreateActivityModalProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [deadlineDate, setDeadlineDate] = useState(format(addDays(new Date(), 30), 'yyyy-MM-dd'));

  const handleCreate = () => {
    if (!title || !startDate || !deadlineDate) return;
    
    // Basic validation
    if (new Date(deadlineDate) <= new Date(startDate)) {
        alert('Deadline must be after start date');
        return;
    }

    const activity = generateActivity(
        title, 
        new Date(startDate), 
        new Date(deadlineDate),
        mode === 'template'
    );
    onCreate(activity);
    onClose();
    // Reset
    setTitle('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setDeadlineDate(format(addDays(new Date(), 30), 'yyyy-MM-dd'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'template' ? 'Use 80-Step Template' : 'Start from Scratch'}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === 'template' 
                ? 'We will generate a complete plan based on your timeline.' 
                : 'Create a blank canvas and add steps manually.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Training Name</Label>
            <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Q4 Leadership Summit"
                className="bg-slate-950 border-slate-700"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                    id="start-date" 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="bg-slate-950 border-slate-700"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="deadline-date">Project Deadline</Label>
                <Input 
                    id="deadline-date" 
                    type="date" 
                    value={deadlineDate} 
                    onChange={(e) => setDeadlineDate(e.target.value)} 
                    className="bg-slate-950 border-slate-700"
                />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">Cancel</Button>
          <Button onClick={handleCreate} disabled={!title} className="bg-blue-600 hover:bg-blue-700">
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
