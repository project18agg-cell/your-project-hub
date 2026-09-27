import { useState } from 'react';
import { CandidateCard, CandidateApp, PipelineStage } from './CandidateCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Send, Download, ArrowRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export const PIPELINE_STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { key: 'screening', label: 'Screening', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { key: 'shortlisted', label: 'Shortlisted', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
  { key: 'interview_scheduled', label: 'Interview', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
  { key: 'interview_completed', label: 'Completed', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
  { key: 'offer_sent', label: 'Offer Sent', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
  { key: 'hired', label: 'Hired', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
];

interface KanbanBoardProps {
  apps: CandidateApp[];
  onStageChange: (id: string, stage: PipelineStage) => void;
  onBulkStageChange: (ids: string[], stage: PipelineStage) => void;
  onView: (app: CandidateApp) => void;
  onSchedule: (app: CandidateApp) => void;
  onReject: (app: CandidateApp) => void;
  onExport: (ids: string[]) => void;
}

export const KanbanBoard = ({ apps, onStageChange, onBulkStageChange, onView, onSchedule, onReject, onExport }: KanbanBoardProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [draggedApp, setDraggedApp] = useState<CandidateApp | null>(null);
  const [bulkAction, setBulkAction] = useState<string>('');

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleDragStart = (e: React.DragEvent, app: CandidateApp) => {
    setDraggedApp(app);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (draggedApp && draggedApp.pipeline_stage !== stage) {
      onStageChange(draggedApp.id, stage);
    }
    setDraggedApp(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const executeBulkAction = () => {
    const ids = Array.from(selected);
    if (ids.length === 0) { toast.error('Select candidates first'); return; }
    if (bulkAction === 'export') {
      onExport(ids);
    } else if (bulkAction && PIPELINE_STAGES.find(s => s.key === bulkAction)) {
      onBulkStageChange(ids, bulkAction as PipelineStage);
      setSelected(new Set());
    }
    setBulkAction('');
  };

  return (
    <div className="space-y-3">
      {selected.size > 0 && (
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
          <CheckSquare className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{selected.size} selected</span>
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-44 h-8 text-xs">
              <SelectValue placeholder="Bulk action..." />
            </SelectTrigger>
            <SelectContent>
              {PIPELINE_STAGES.map(s => (
                <SelectItem key={s.key} value={s.key} className="text-xs">
                  <ArrowRight className="h-3 w-3 inline mr-1" /> Move to {s.label}
                </SelectItem>
              ))}
              <SelectItem value="export" className="text-xs">
                <Download className="h-3 w-3 inline mr-1" /> Export list
              </SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 text-xs" onClick={executeBulkAction} disabled={!bulkAction}>
            Apply
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setSelected(new Set())}>
            Clear
          </Button>
        </div>
      )}

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4 min-w-max">
          {PIPELINE_STAGES.map(stage => {
            const stageApps = apps.filter(a => a.pipeline_stage === stage.key);
            return (
              <div
                key={stage.key}
                className="w-[260px] shrink-0 rounded-lg bg-muted/50 border border-border"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.key)}
              >
                <div className="p-3 border-b border-border">
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${stage.color} border-0`}>{stage.label}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{stageApps.length}</span>
                  </div>
                </div>
                <div className="p-2 space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto">
                  {stageApps.length === 0 ? (
                    <div className="text-center py-8 text-xs text-muted-foreground">No candidates</div>
                  ) : (
                    stageApps.map(app => (
                      <CandidateCard
                        key={app.id}
                        app={app}
                        selected={selected.has(app.id)}
                        onSelect={toggleSelect}
                        onView={onView}
                        onSchedule={onSchedule}
                        onReject={onReject}
                        onDragStart={handleDragStart}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
