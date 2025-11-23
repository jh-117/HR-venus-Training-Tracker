import { addDays, format, differenceInDays, isPast, isToday, differenceInMilliseconds } from 'date-fns';

// --- Types ---

export type TaskType = 'text' | 'currency' | 'date' | 'boolean' | 'dropdown' | 'number' | 'checklist';

export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'delayed';

export type RiskLevel = 'none' | 'low' | 'medium' | 'high';

export interface StandardPhase {
  id: string;
  title: string;
  order: number;
  objective: string;
}

export interface StandardStep {
  id: string;
  phaseId: string;
  title: string;
  description?: string; // Used for extra details or checklist items description
  type: TaskType;
  requiredLabel: string;
  options?: string[]; // For dropdowns
  checklistItems?: string[]; // For checklists
  riskWeight: number; // 1-5
  requiredByDefault: boolean;
  order: number;
}

export interface Activity {
  id: string;
  title: string;
  startDate: string; // ISO Date
  deadline: string; // ISO Date
  createdAt: string;
  steps: ActivityStep[];
}

export interface ActivityStep extends StandardStep {
  activityId: string;
  deadline: string; // ISO Date
  status: TaskStatus;
  value?: string | number | boolean | string[]; // string[] for checklist
  notes?: string;
}

// --- Standard Template Data ---

export const STANDARD_PHASES: StandardPhase[] = [
  { id: 'p1', title: 'Phase 1: Strategy & Readiness', objective: 'Establish the baseline and financial eligibility.', order: 1 },
  { id: 'p2', title: 'Phase 2: Vendor Selection', objective: 'Select and contract the training provider.', order: 2 },
  { id: 'p3', title: 'Phase 3: HRD Corp Grant', objective: 'Secure funding approval 24-hours prior to training.', order: 3 },
  { id: 'p4', title: 'Phase 4: Content Development', objective: 'Ensure material quality and language requirements.', order: 4 },
  { id: 'p5', title: 'Phase 5: Participants', objective: 'Manage invitations and attendance roster.', order: 5 },
  { id: 'p6', title: 'Phase 6: Logistics & Venue', objective: 'Operational setup for Physical or Virtual events.', order: 6 },
  { id: 'p7', title: 'Phase 7: Pre-Event Launch', objective: 'Final checks 48 hours before start.', order: 7 },
  { id: 'p8', title: 'Phase 8: Post-Training & Claims', objective: 'Close project and reclaim levy.', order: 8 },
];

export const STANDARD_STEPS: StandardStep[] = [
  // Phase 1
  { id: '1.01', phaseId: 'p1', title: 'Define Learning Objectives', type: 'text', requiredLabel: 'Main Objective', riskWeight: 5, requiredByDefault: true, order: 1 },
  { id: '1.02', phaseId: 'p1', title: 'Confirm Target Audience', type: 'dropdown', requiredLabel: 'Target Audience', options: ['Senior Mgt', 'Manager', 'Exec', 'Non-Exec'], riskWeight: 3, requiredByDefault: true, order: 2 },
  { id: '1.03', phaseId: 'p1', title: 'Check HRD Corp Levy Balance', type: 'currency', requiredLabel: 'Current RM Balance', riskWeight: 5, requiredByDefault: true, order: 3 },
  { id: '1.04', phaseId: 'p1', title: 'Select Training Scheme', type: 'dropdown', requiredLabel: 'Scheme', options: ['SBL-Khas', 'SBL', 'ALAT', 'ITS', 'Induction'], riskWeight: 3, requiredByDefault: true, order: 4 },
  { id: '1.05', phaseId: 'p1', title: 'Verify "HRD Claimable" Status', type: 'boolean', requiredLabel: 'Claimable?', riskWeight: 5, requiredByDefault: true, order: 5 },
  { id: '1.06', phaseId: 'p1', title: 'Draft Estimated Budget', type: 'currency', requiredLabel: 'Total Est. Cost (RM)', riskWeight: 4, requiredByDefault: true, order: 6 },
  { id: '1.07', phaseId: 'p1', title: 'Select Proposed Start Date', type: 'date', requiredLabel: 'Start Date', riskWeight: 3, requiredByDefault: true, order: 7 },
  { id: '1.08', phaseId: 'p1', title: 'Select Proposed End Date', type: 'date', requiredLabel: 'End Date', riskWeight: 3, requiredByDefault: true, order: 8 },
  { id: '1.09', phaseId: 'p1', title: 'Verify Budget Code', type: 'text', requiredLabel: 'Cost Center Code', riskWeight: 2, requiredByDefault: true, order: 9 },
  { id: '1.10', phaseId: 'p1', title: 'Secure Management Approval', type: 'date', requiredLabel: 'Approval Date', riskWeight: 5, requiredByDefault: true, order: 10 },

  // Phase 2
  { id: '2.01', phaseId: 'p2', title: 'Source Training Providers', type: 'number', requiredLabel: 'Vendors Contacted', riskWeight: 3, requiredByDefault: true, order: 1 },
  { id: '2.02', phaseId: 'p2', title: 'Request Quotations (RFQ)', type: 'date', requiredLabel: 'Date RFQ Sent', riskWeight: 3, requiredByDefault: true, order: 2 },
  { id: '2.03', phaseId: 'p2', title: 'Verify Trainer TTT Exemption', type: 'boolean', requiredLabel: 'Verified?', riskWeight: 4, requiredByDefault: true, order: 3 },
  { id: '2.04', phaseId: 'p2', title: 'Receive Proposals', type: 'number', requiredLabel: 'Quotes Received', riskWeight: 3, requiredByDefault: true, order: 4 },
  { id: '2.05', phaseId: 'p2', title: 'Select Final Vendor', type: 'text', requiredLabel: 'Vendor Name', riskWeight: 5, requiredByDefault: true, order: 5 },
  { id: '2.06', phaseId: 'p2', title: 'Negotiate Final Price', type: 'currency', requiredLabel: 'Final Fee (RM)', riskWeight: 4, requiredByDefault: true, order: 6 },
  { id: '2.07', phaseId: 'p2', title: 'Confirm Trainer Name', type: 'text', requiredLabel: 'Trainer Name', riskWeight: 2, requiredByDefault: true, order: 7 },
  { id: '2.08', phaseId: 'p2', title: 'Initiate Vendor Registration', type: 'dropdown', requiredLabel: 'Status', options: ['Started', 'In Progress', 'Complete'], riskWeight: 2, requiredByDefault: true, order: 8 },
  { id: '2.09', phaseId: 'p2', title: 'Generate Purchase Order (PO)', type: 'text', requiredLabel: 'PO Number', riskWeight: 5, requiredByDefault: true, order: 9 },
  { id: '2.10', phaseId: 'p2', title: 'Sign Letter of Acceptance', type: 'date', requiredLabel: 'Date Signed', riskWeight: 4, requiredByDefault: true, order: 10 },

  // Phase 3
  { id: '3.01', phaseId: 'p3', title: 'Collect Vendor Docs', type: 'checklist', requiredLabel: 'Documents', checklistItems: ['Quote Received', 'Schedule Received'], riskWeight: 4, requiredByDefault: true, order: 1 },
  { id: '3.02', phaseId: 'p3', title: 'Login to e-TRiS System', type: 'boolean', requiredLabel: 'Logged In', riskWeight: 1, requiredByDefault: true, order: 2 },
  { id: '3.03', phaseId: 'p3', title: 'Submit Grant Application', type: 'date', requiredLabel: 'Date Submitted', riskWeight: 5, requiredByDefault: true, order: 3 },
  { id: '3.04', phaseId: 'p3', title: 'Record Grant Ref Number', type: 'text', requiredLabel: 'Ref No', riskWeight: 5, requiredByDefault: true, order: 4 },
  { id: '3.05', phaseId: 'p3', title: 'Monitor Application Status', type: 'dropdown', requiredLabel: 'Status', options: ['Pending', 'Query', 'Approved'], riskWeight: 4, requiredByDefault: true, order: 5 },
  { id: '3.06', phaseId: 'p3', title: 'Resubmit Query Response', type: 'date', requiredLabel: 'Date Resubmitted', riskWeight: 3, requiredByDefault: false, order: 6 },
  { id: '3.07', phaseId: 'p3', title: 'Receive Grant Approval', type: 'date', requiredLabel: 'Date Received', riskWeight: 5, requiredByDefault: true, order: 7 },
  { id: '3.08', phaseId: 'p3', title: 'Download Approval Letter', type: 'boolean', requiredLabel: 'Saved Locally', riskWeight: 2, requiredByDefault: true, order: 8 },
  { id: '3.09', phaseId: 'p3', title: 'Send Approval to Vendor', type: 'date', requiredLabel: 'Date Sent', riskWeight: 3, requiredByDefault: true, order: 9 },
  { id: '3.10', phaseId: 'p3', title: 'Update Committed Budget', type: 'boolean', requiredLabel: 'Budget Deducted', riskWeight: 3, requiredByDefault: true, order: 10 },

  // Phase 4
  { id: '4.01', phaseId: 'p4', title: 'Schedule Content Briefing', type: 'date', requiredLabel: 'Meeting Date', riskWeight: 2, requiredByDefault: true, order: 1 },
  { id: '4.02', phaseId: 'p4', title: 'Receive Draft Slides', type: 'date', requiredLabel: 'Date Received', riskWeight: 3, requiredByDefault: true, order: 2 },
  { id: '4.03', phaseId: 'p4', title: 'Review Workbook/Handouts', type: 'dropdown', requiredLabel: 'Review Status', options: ['Reviewing', 'Changes Needed', 'Approved'], riskWeight: 3, requiredByDefault: true, order: 3 },
  { id: '4.04', phaseId: 'p4', title: 'Send Feedback to Vendor', type: 'text', requiredLabel: 'Summary Notes', riskWeight: 2, requiredByDefault: true, order: 4 },
  { id: '4.05', phaseId: 'p4', title: 'Approve Final Material', type: 'boolean', requiredLabel: 'Approved', riskWeight: 5, requiredByDefault: true, order: 5 },
  { id: '4.06', phaseId: 'p4', title: 'Set Training Language', type: 'dropdown', requiredLabel: 'Language', options: ['English', 'BM', 'Mandarin', 'Tamil'], riskWeight: 1, requiredByDefault: true, order: 6 },
  { id: '4.07', phaseId: 'p4', title: 'Create Pre-Assessment Link', type: 'text', requiredLabel: 'Pre-Test URL', riskWeight: 2, requiredByDefault: true, order: 7 },
  { id: '4.08', phaseId: 'p4', title: 'Create Post-Assessment Link', type: 'text', requiredLabel: 'Post-Test URL', riskWeight: 2, requiredByDefault: true, order: 8 },
  { id: '4.09', phaseId: 'p4', title: 'Design Participation Cert', type: 'boolean', requiredLabel: 'Design Ready', riskWeight: 2, requiredByDefault: true, order: 9 },
  { id: '4.10', phaseId: 'p4', title: 'Confirm Printing Quantity', type: 'number', requiredLabel: 'No. of Pax', riskWeight: 2, requiredByDefault: true, order: 10 },

  // Phase 5
  { id: '5.01', phaseId: 'p5', title: 'Create Invitee List', type: 'number', requiredLabel: 'Target Headcount', riskWeight: 3, requiredByDefault: true, order: 1 },
  { id: '5.02', phaseId: 'p5', title: 'Send Calendar Placeholders', type: 'date', requiredLabel: 'Date Sent', riskWeight: 2, requiredByDefault: true, order: 2 },
  { id: '5.03', phaseId: 'p5', title: 'Open Registration', type: 'date', requiredLabel: 'Date Opened', riskWeight: 3, requiredByDefault: true, order: 3 },
  { id: '5.04', phaseId: 'p5', title: 'Monitor RSVPs', type: 'number', requiredLabel: 'Yes Count', riskWeight: 3, requiredByDefault: true, order: 4 },
  { id: '5.05', phaseId: 'p5', title: 'Track Declines', type: 'number', requiredLabel: 'No Count', riskWeight: 1, requiredByDefault: true, order: 5 },
  { id: '5.06', phaseId: 'p5', title: 'Secure Manager Approvals', type: 'number', requiredLabel: '% Collected', riskWeight: 3, requiredByDefault: true, order: 6 },
  { id: '5.07', phaseId: 'p5', title: 'Collect Dietary Needs', type: 'text', requiredLabel: 'Summary', riskWeight: 2, requiredByDefault: true, order: 7 },
  { id: '5.08', phaseId: 'p5', title: 'Collect IC Numbers', type: 'boolean', requiredLabel: 'Data Complete', riskWeight: 4, requiredByDefault: true, order: 8 },
  { id: '5.09', phaseId: 'p5', title: 'Finalize Roster', type: 'number', requiredLabel: 'Confirmed Pax', riskWeight: 4, requiredByDefault: true, order: 9 },
  { id: '5.10', phaseId: 'p5', title: 'Send Roster to Vendor', type: 'date', requiredLabel: 'Date Sent', riskWeight: 3, requiredByDefault: true, order: 10 },

  // Phase 6
  { id: '6.01', phaseId: 'p6', title: 'Confirm Venue Booking', type: 'text', requiredLabel: 'Room/Location', riskWeight: 5, requiredByDefault: true, order: 1 },
  { id: '6.02', phaseId: 'p6', title: 'Generate Virtual Link', type: 'text', requiredLabel: 'Meeting URL', riskWeight: 5, requiredByDefault: false, order: 2 },
  { id: '6.03', phaseId: 'p6', title: 'Select Room Layout', type: 'dropdown', requiredLabel: 'Layout', options: ['Cluster', 'U-Shape', 'Classroom', 'Theater'], riskWeight: 2, requiredByDefault: true, order: 3 },
  { id: '6.04', phaseId: 'p6', title: 'Order Catering', type: 'text', requiredLabel: 'Menu', riskWeight: 3, requiredByDefault: true, order: 4 },
  { id: '6.05', phaseId: 'p6', title: 'Book Trainer Accommodation', type: 'text', requiredLabel: 'Hotel Name', riskWeight: 1, requiredByDefault: false, order: 5 },
  { id: '6.06', phaseId: 'p6', title: 'Confirm AV Setup', type: 'checklist', requiredLabel: 'AV Check', checklistItems: ['Projector', 'Audio', 'Clicker', 'HDMI'], riskWeight: 4, requiredByDefault: true, order: 6 },
  { id: '6.07', phaseId: 'p6', title: 'Check Wi-Fi Availability', type: 'text', requiredLabel: 'Password', riskWeight: 2, requiredByDefault: true, order: 7 },
  { id: '6.08', phaseId: 'p6', title: 'Prepare Training Aids', type: 'checklist', requiredLabel: 'Materials', checklistItems: ['Flipcharts', 'Markers', 'Sticky Notes'], riskWeight: 2, requiredByDefault: true, order: 8 },
  { id: '6.09', phaseId: 'p6', title: 'Print Attendance Form (T3)', type: 'boolean', requiredLabel: 'Printed', riskWeight: 5, requiredByDefault: true, order: 9 },
  { id: '6.10', phaseId: 'p6', title: 'Prepare Name Tags', type: 'boolean', requiredLabel: 'Printed', riskWeight: 1, requiredByDefault: true, order: 10 },

  // Phase 7
  { id: '7.01', phaseId: 'p7', title: 'Send Pre-Work', type: 'date', requiredLabel: 'Date Sent', riskWeight: 2, requiredByDefault: false, order: 1 },
  { id: '7.02', phaseId: 'p7', title: 'Send Logistics Email', type: 'date', requiredLabel: 'Date Sent', riskWeight: 3, requiredByDefault: true, order: 2 },
  { id: '7.03', phaseId: 'p7', title: 'Confirm Catering Headcount', type: 'number', requiredLabel: 'Final Pax', riskWeight: 3, requiredByDefault: true, order: 3 },
  { id: '7.04', phaseId: 'p7', title: 'Send 24hr Reminder', type: 'date', requiredLabel: 'Date Sent', riskWeight: 3, requiredByDefault: true, order: 4 },
  { id: '7.05', phaseId: 'p7', title: 'Trainer Arrival Check', type: 'boolean', requiredLabel: 'Confirmed', riskWeight: 5, requiredByDefault: true, order: 5 },
  { id: '7.06', phaseId: 'p7', title: 'Tech Run-Through', type: 'dropdown', requiredLabel: 'Result', options: ['Pass', 'Fail'], riskWeight: 4, requiredByDefault: true, order: 6 },
  { id: '7.07', phaseId: 'p7', title: 'Safety Briefing Prep', type: 'boolean', requiredLabel: 'Ready', riskWeight: 1, requiredByDefault: true, order: 7 },
  { id: '7.08', phaseId: 'p7', title: 'Check Form T3', type: 'boolean', requiredLabel: 'On Clipboard', riskWeight: 5, requiredByDefault: true, order: 8 },
  { id: '7.09', phaseId: 'p7', title: 'Event Day Monitor', type: 'dropdown', requiredLabel: 'Status', options: ['Not Started', 'In Progress', 'Done'], riskWeight: 3, requiredByDefault: true, order: 9 },
  { id: '7.10', phaseId: 'p7', title: 'Collect Signatures (T3)', type: 'boolean', requiredLabel: 'All Signed', riskWeight: 5, requiredByDefault: true, order: 10 },

  // Phase 8
  { id: '8.01', phaseId: 'p8', title: 'Collect Evaluation Forms', type: 'number', requiredLabel: 'Count', riskWeight: 3, requiredByDefault: true, order: 1 },
  { id: '8.02', phaseId: 'p8', title: 'Scan Signed T3 Form', type: 'boolean', requiredLabel: 'Scanned', riskWeight: 5, requiredByDefault: true, order: 2 },
  { id: '8.03', phaseId: 'p8', title: 'Receive Invoice', type: 'currency', requiredLabel: 'Amount (RM)', riskWeight: 4, requiredByDefault: true, order: 3 },
  { id: '8.04', phaseId: 'p8', title: 'Receive Form JD/14', type: 'boolean', requiredLabel: 'Received', riskWeight: 3, requiredByDefault: true, order: 4 },
  { id: '8.05', phaseId: 'p8', title: 'Sign Form JD/14', type: 'date', requiredLabel: 'Date Signed', riskWeight: 3, requiredByDefault: true, order: 5 },
  { id: '8.06', phaseId: 'p8', title: 'Submit Claim in e-TRiS', type: 'date', requiredLabel: 'Date Submitted', riskWeight: 5, requiredByDefault: true, order: 6 },
  { id: '8.07', phaseId: 'p8', title: 'Track Claim Status', type: 'dropdown', requiredLabel: 'Status', options: ['Submitted', 'Queried', 'Paid'], riskWeight: 4, requiredByDefault: true, order: 7 },
  { id: '8.08', phaseId: 'p8', title: 'Verify Levy Credit', type: 'boolean', requiredLabel: 'Credited', riskWeight: 5, requiredByDefault: true, order: 8 },
  { id: '8.09', phaseId: 'p8', title: 'Process Vendor Payment', type: 'date', requiredLabel: 'Date Paid', riskWeight: 4, requiredByDefault: true, order: 9 },
  { id: '8.10', phaseId: 'p8', title: 'Close Project / Archive', type: 'boolean', requiredLabel: 'Archived', riskWeight: 1, requiredByDefault: true, order: 10 },
];

// --- Logic ---

export function generateActivity(title: string, startDate: Date, deadlineDate: Date, useTemplate: boolean = true): Activity {
  const activityId = crypto.randomUUID();
  
  let steps: ActivityStep[] = [];

  if (useTemplate) {
    // Calculate total duration
    const totalDuration = differenceInMilliseconds(deadlineDate, startDate);
    const numberOfPhases = STANDARD_PHASES.length;

    steps = STANDARD_STEPS.map(step => {
        // Find phase index (0-7)
        const phaseIndex = STANDARD_PHASES.findIndex(p => p.id === step.phaseId);
        
        // Calculate estimated deadline for this step
        // We distribute phases evenly across the duration
        // Phase 1 starts at 0%, ends at 12.5%
        // Phase 8 starts at 87.5%, ends at 100%
        
        // Simple linear distribution
        // Step progress = (Phase Index + (StepOrder / 10)) / TotalPhases
        const stepProgress = (phaseIndex + (step.order / 11)) / numberOfPhases;
        const offsetMs = totalDuration * stepProgress;
        const stepDeadline = new Date(startDate.getTime() + offsetMs);

        return {
            ...step,
            activityId,
            deadline: format(stepDeadline, 'yyyy-MM-dd'),
            status: 'not_started',
            value: undefined
        };
    });
  }

  return {
    id: activityId,
    title,
    startDate: format(startDate, 'yyyy-MM-dd'),
    deadline: format(deadlineDate, 'yyyy-MM-dd'),
    createdAt: new Date().toISOString(),
    steps
  };
}

export function calculateReadiness(steps: ActivityStep[]): number {
  if (steps.length === 0) return 0;
  const completedWeight = steps
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + s.riskWeight, 0);
  
  const totalWeight = steps.reduce((acc, s) => acc + s.riskWeight, 0);
  
  return totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100);
}

export function getRiskLevel(step: ActivityStep): RiskLevel {
  if (step.status === 'completed') return 'none';
  
  const deadline = new Date(step.deadline);
  const today = new Date();
  
  if (isPast(deadline) && !isToday(deadline)) return 'high'; // Overdue
  if (differenceInDays(deadline, today) <= 3) return 'medium'; // Warning
  
  return 'none';
}

export function getStatusColor(status: TaskStatus): string {
    switch(status) {
        case 'completed': return 'bg-green-500 text-white';
        case 'in_progress': return 'bg-blue-500 text-white';
        case 'blocked': return 'bg-red-500 text-white';
        case 'delayed': return 'bg-amber-500 text-white';
        default: return 'bg-slate-700 text-slate-300';
    }
}
