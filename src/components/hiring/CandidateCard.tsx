import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Building2, Star, Calendar, Eye, CalendarPlus, X } from 'lucide-react';
import { format } from 'date-fns';

export type PipelineStage = 'new' | 'screening' | 'shortlisted' | 'interview_scheduled' | 'interview_completed' | 'offer_sent' | 'hired' | 'rejected';

export interface CandidateApp {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduation_year: number;
  role_applied: string;
  portfolio_url: string | null;
  message: string | null;
  status: string;
  pipeline_stage: PipelineStage;
  created_at: string;
  score?: number | null;
  interview_date?: string | null;
  interview_time?: string | null;
}

interface CandidateCardProps {
  app: CandidateApp;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (app: CandidateApp) => void;
  onSchedule: (app: CandidateApp) => void;
  onReject: (app: CandidateApp) => void;
  onDragStart: (e: React.DragEvent, app: CandidateApp) => void;
}

export const CandidateCard = ({ app, selected, onSelect, onView, onSchedule, onReject, onDragStart }: CandidateCardProps) => {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, app)}
      className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border-border bg-card"
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={selected}
            onCheckedChange={() => onSelect(app.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate text-foreground">{app.full_name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <GraduationCap className="h-3 w-3 shrink-0" />
              <span className="truncate">{app.degree} · {app.graduation_year}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3 shrink-0" />
              <span className="truncate">{app.college}</span>
            </div>
          </div>
        </div>

        {(app.score != null && app.score > 0) && (
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium text-foreground">Score: {app.score}</span>
          </div>
        )}

        {app.interview_date && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(app.interview_date), 'dd MMM')} {app.interview_time?.slice(0, 5)}</span>
          </div>
        )}

        <div className="flex gap-1 pt-1">
          <Button variant="outline" size="sm" className="h-7 text-xs flex-1" onClick={() => onView(app)}>
            <Eye className="h-3 w-3 mr-1" /> View
          </Button>
          {app.pipeline_stage !== 'rejected' && app.pipeline_stage !== 'hired' && (
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onSchedule(app)}>
              <CalendarPlus className="h-3 w-3" />
            </Button>
          )}
          {app.pipeline_stage !== 'rejected' && app.pipeline_stage !== 'hired' && (
            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => onReject(app)}>
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
