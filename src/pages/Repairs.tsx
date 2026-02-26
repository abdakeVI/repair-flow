import { useState, useMemo } from 'react';
import { mockRepairs, mockTechnicians } from '@/data/mockData';
import { StageBadge, StageFlow } from '@/components/StageIndicator';
import { formatDistanceToNow } from 'date-fns';
import { Search, Filter, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = ['All', 'Intake', 'Diagnosis', 'Repair', 'Quality Check', 'Completed'] as const;

export default function Repairs() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    return mockRepairs.filter((r) => {
      const matchesSearch = !search || r.customer_name.toLowerCase().includes(search.toLowerCase()) || r.device_type.toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === 'All' || r.current_stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [search, stageFilter]);

  const getTechName = (id: string) => mockTechnicians.find(t => t.id === id)?.name || 'Unassigned';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light text-foreground">Repairs</h1>
          <p className="text-muted-foreground mt-1">{mockRepairs.length} tickets across all stages</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-heading text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Stage Flow Visual */}
      <div className="card-embossed p-5">
        <div className="flex flex-wrap items-center gap-4">
          {stages.slice(1).map((stage) => {
            const count = mockRepairs.filter(r => r.current_stage === stage).length;
            return (
              <div key={stage} className="flex items-center gap-2">
                <StageBadge stage={stage} size="md" />
                <span className="font-heading text-lg font-light text-foreground">{count}</span>
              </div>
            );
          })}
        </div>
        <p className="font-handwritten text-sm text-muted-foreground/60 mt-3">avg LCD repair: ~20 min · avg motherboard: ~2 hours</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by customer or device..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg font-heading text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {stages.map((s) => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={cn(
                'px-3 py-1.5 rounded-lg font-heading text-xs transition-all',
                stageFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Repairs List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card-embossed p-12 text-center">
            <p className="font-handwritten text-xl text-muted-foreground">No repairs match your filters</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your search or stage filter</p>
          </div>
        ) : (
          filtered.map((repair, i) => (
            <div
              key={repair.id}
              className="card-embossed-hover p-4 flex flex-col sm:flex-row sm:items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading text-sm font-medium text-foreground">{repair.customer_name}</span>
                  <span className="font-heading text-xs text-muted-foreground">·</span>
                  <span className="font-heading text-xs text-muted-foreground">{repair.device_type}</span>
                  <span className="font-heading text-xs text-muted-foreground">·</span>
                  <span className="font-heading text-xs text-muted-foreground">{repair.issue_type}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <StageFlow currentStage={repair.current_stage} />
                  <span className="font-heading text-[11px] text-muted-foreground/50">{getTechName(repair.technician_id)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StageBadge stage={repair.current_stage} />
                <span className={cn(
                  'font-heading text-[11px] px-2 py-0.5 rounded-full',
                  repair.customer_status === 'Waiting' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                )}>
                  {repair.customer_status}
                </span>
                <span className="font-handwritten text-xs text-muted-foreground/50">
                  {formatDistanceToNow(new Date(repair.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
