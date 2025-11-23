import React from 'react';
import { ActivityStep } from '../lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ActivityStep | null;
  onSave: (taskId: string, value: string | number | boolean | string[]) => void;
}

export function InputModal({ isOpen, onClose, task, onSave }: InputModalProps) {
  const [value, setValue] = React.useState<any>('');

  React.useEffect(() => {
    if (task && isOpen) {
        // Reset or set to existing value
        if (task.type === 'boolean') {
            setValue(task.value === true);
        } else if (task.type === 'checklist') {
            setValue(Array.isArray(task.value) ? task.value : []);
        } else {
            setValue(task.value !== undefined ? task.value : '');
        }
    }
  }, [task, isOpen]);

  if (!task) return null;

  const handleSave = () => {
    onSave(task.id, value);
    onClose();
  };

  const toggleChecklistItem = (item: string) => {
    if (Array.isArray(value)) {
        if (value.includes(item)) {
            setValue(value.filter(i => i !== item));
        } else {
            setValue([...value, item]);
        }
    } else {
        setValue([item]);
    }
  };

  const renderInput = () => {
    switch (task.type) {
      case 'currency':
        return (
          <div className="space-y-2">
            <Label htmlFor="currency-input">{task.requiredLabel}</Label>
            <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">RM</span>
                <Input 
                    id="currency-input"
                    type="number" 
                    className="pl-10 bg-slate-950 border-slate-700"
                    value={value as string} 
                    onChange={(e) => setValue(e.target.value)} 
                    placeholder="0.00"
                />
            </div>
          </div>
        );
      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor="number-input">{task.requiredLabel}</Label>
            <Input 
                id="number-input"
                type="number" 
                className="bg-slate-950 border-slate-700"
                value={value as string} 
                onChange={(e) => setValue(e.target.value)} 
            />
          </div>
        );
      case 'date':
        return (
          <div className="space-y-2">
             <Label htmlFor="date-input">{task.requiredLabel}</Label>
             <Input 
                id="date-input"
                type="date" 
                className="bg-slate-950 border-slate-700"
                value={value as string} 
                onChange={(e) => setValue(e.target.value)} 
             />
          </div>
        );
      case 'boolean':
        return (
          <div className="flex items-center justify-between space-x-2 border border-slate-700 p-4 rounded-lg bg-slate-950">
            <Label htmlFor="bool-input" className="text-base">{task.requiredLabel}</Label>
            <Switch 
                id="bool-input"
                checked={value as boolean}
                onCheckedChange={(checked) => setValue(checked)}
            />
          </div>
        );
      case 'dropdown':
        return (
            <div className="space-y-2">
                <Label>{task.requiredLabel}</Label>
                <Select value={value as string} onValueChange={(val) => setValue(val)}>
                    <SelectTrigger className="bg-slate-950 border-slate-700">
                        <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                        {task.options?.map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
      case 'checklist':
        return (
            <div className="space-y-3">
                <Label className="mb-2 block">{task.requiredLabel}</Label>
                {task.checklistItems?.map(item => (
                    <div key={item} className="flex items-center space-x-2 border border-slate-800 p-3 rounded bg-slate-950/50">
                        <Checkbox 
                            id={`chk-${item}`} 
                            checked={Array.isArray(value) && value.includes(item)}
                            onCheckedChange={() => toggleChecklistItem(item)}
                            className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <Label htmlFor={`chk-${item}`} className="text-slate-300 font-normal cursor-pointer">{item}</Label>
                    </div>
                ))}
            </div>
        );
      case 'text':
      default:
        return (
           <div className="space-y-2">
             <Label htmlFor="text-input">{task.requiredLabel}</Label>
             <Input 
                id="text-input"
                type="text" 
                className="bg-slate-950 border-slate-700"
                value={value as string} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Enter details..."
             />
           </div>
        );
    }
  };

  const isSaveDisabled = () => {
      if (task.type === 'boolean') return false; // Can save false/true
      if (task.type === 'checklist') return false; // Can save partial list (or require all?)
      // For others, require value
      return !value;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {task.description || 'Complete this task by providing the required information below.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
            {renderInput()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSaveDisabled()}>
            Mark as Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
