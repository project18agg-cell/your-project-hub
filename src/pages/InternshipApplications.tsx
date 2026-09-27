import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanBoard, PIPELINE_STAGES } from '@/components/hiring/KanbanBoard';
import { CandidateCard, CandidateApp, PipelineStage } from '@/components/hiring/CandidateCard';
import { CandidateProfile } from '@/components/hiring/CandidateProfile';
import { InterviewScheduler } from '@/components/hiring/InterviewScheduler';
import { HiringFilters, FilterState } from '@/components/hiring/HiringFilters';
import { HiringAnalytics } from '@/components/hiring/HiringAnalytics';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const InternshipApplications = () => {
  const [apps, setApps] = useState<CandidateApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<CandidateApp | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [schedulerApp, setSchedulerApp] = useState<CandidateApp | null>(null);
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ search: '', college: '', graduationYear: '', minScore: '' });

  const fetchApps = async () => {
    setLoading(true);
    // Fetch apps with scores and interviews
    const { data, error } = await supabase
      .from('internship_applications' as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) { toast.error('Failed to load applications'); setLoading(false); return; }

    const appsList = (data as any[]) || [];

    // Fetch scores
    const { data: scoresData } = await supabase.from('candidate_scores' as any).select('application_id, total_score');
    const scoreMap: Record<string, number> = {};
    ((scoresData as any[]) || []).forEach((s: any) => { scoreMap[s.application_id] = s.total_score; });

    // Fetch latest interviews
    const { data: interviewsData } = await supabase
      .from('interview_schedules' as any)
      .select('application_id, interview_date, interview_time')
      .eq('status', 'scheduled')
      .order('interview_date', { ascending: true });

    const interviewMap: Record<string, { date: string; time: string }> = {};
    ((interviewsData as any[]) || []).forEach((i: any) => {
      if (!interviewMap[i.application_id]) {
        interviewMap[i.application_id] = { date: i.interview_date, time: i.interview_time };
      }
    });

    const enriched: CandidateApp[] = appsList.map(a => ({
      ...a,
      pipeline_stage: a.pipeline_stage || 'new',
      score: scoreMap[a.id] || null,
      interview_date: interviewMap[a.id]?.date || null,
      interview_time: interviewMap[a.id]?.time || null,
    }));

    setApps(enriched);
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, []);

  const handleStageChange = async (id: string, stage: PipelineStage) => {
    const { error } = await supabase.from('internship_applications' as any).update({ pipeline_stage: stage }).eq('id', id);
    if (error) { toast.error('Failed to update stage'); return; }
    setApps(prev => prev.map(a => a.id === id ? { ...a, pipeline_stage: stage } : a));
    toast.success(`Moved to ${PIPELINE_STAGES.find(s => s.key === stage)?.label}`);
  };

  const handleBulkStageChange = async (ids: string[], stage: PipelineStage) => {
    const promises = ids.map(id =>
      supabase.from('internship_applications' as any).update({ pipeline_stage: stage }).eq('id', id)
    );
    await Promise.all(promises);
    setApps(prev => prev.map(a => ids.includes(a.id) ? { ...a, pipeline_stage: stage } : a));
    toast.success(`${ids.length} candidates moved to ${PIPELINE_STAGES.find(s => s.key === stage)?.label}`);
  };

  const handleReject = async (app: CandidateApp) => {
    await handleStageChange(app.id, 'rejected');
  };

  const handleExport = (ids: string[]) => {
    const exportApps = apps.filter(a => ids.includes(a.id));
    const csv = [
      ['Name', 'Email', 'Phone', 'College', 'Degree', 'Year', 'Role', 'Stage', 'Score'].join(','),
      ...exportApps.map(a => [a.full_name, a.email, a.phone, a.college, a.degree, a.graduation_year, a.role_applied, a.pipeline_stage, a.score || ''].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'candidates.csv';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Exported!');
  };

  // Unique colleges & years for filters
  const colleges = useMemo(() => [...new Set(apps.map(a => a.college))].sort(), [apps]);
  const years = useMemo(() => [...new Set(apps.map(a => a.graduation_year))].sort(), [apps]);

  // Filtered apps
  const filteredApps = useMemo(() => {
    return apps.filter(a => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!a.full_name.toLowerCase().includes(q) && !a.email.toLowerCase().includes(q)) return false;
      }
      if (filters.college && a.college !== filters.college) return false;
      if (filters.graduationYear && a.graduation_year !== Number(filters.graduationYear)) return false;
      if (filters.minScore && (a.score || 0) < Number(filters.minScore)) return false;
      return true;
    });
  }, [apps, filters]);

  return (
    <div className="space-y-4">
      <PageHeader title="Hiring Pipeline" description={`${apps.length} total applications`} />

      <Tabs defaultValue="pipeline">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4 mt-4">
          <HiringFilters filters={filters} onFilterChange={setFilters} colleges={colleges} years={years} />

          {loading ? (
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[260px] shrink-0 space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <KanbanBoard
              apps={filteredApps}
              onStageChange={handleStageChange}
              onBulkStageChange={handleBulkStageChange}
              onView={(app) => { setSelectedApp(app); setProfileOpen(true); }}
              onSchedule={(app) => { setSchedulerApp(app); setSchedulerOpen(true); }}
              onReject={handleReject}
              onExport={handleExport}
            />
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <HiringAnalytics apps={apps} />
        </TabsContent>
      </Tabs>

      <CandidateProfile
        app={selectedApp}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onUpdate={fetchApps}
      />

      <InterviewScheduler
        app={schedulerApp}
        open={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
        onScheduled={fetchApps}
      />
    </div>
  );
};

export default InternshipApplications;
