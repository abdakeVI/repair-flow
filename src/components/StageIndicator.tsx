import { cn } from '@/lib/utils';

const stages = ['Intake', 'Diagnosis', 'Repair', 'Quality Check', 'Completed'] as const;

const stageColors: Record<string, string> = {
  Intake: 'bg-info/15 text-info',
  Diagnosis: 'bg-warning/15 text-warning',
  Repair: 'bg-primary/15 text-primary',
  'Quality Check': 'bg-accent/15 text-accent-foreground',
  Completed: 'bg-success/15 text-success',
};

interface StageBadgeProps {
  stage: string;
  size?: 'sm' | 'md';
}

export function StageBadge({ stage, size = 'sm' }: StageBadgeProps) {
  return (
    <span className={cn('stage-badge', stageColors[stage] || 'bg-muted text-muted-foreground', size === 'md' && 'px-4 py-1.5 text-sm')}>
      {stage}
    </span>
  );
}

interface StageFlowProps {
  currentStage: string;
}

export function StageFlow({ currentStage }: StageFlowProps) {
  const currentIndex = stages.indexOf(currentStage as typeof stages[number]);

  return (
    <div className="flex items-center gap-1">
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center">
          <div
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all',
              i <= currentIndex ? 'bg-primary scale-100' : 'bg-border scale-75',
              i === currentIndex && 'ring-2 ring-primary/30'
            )}
            title={stage}
          />
          {i < stages.length - 1 && (
            <div className={cn('w-4 h-px mx-0.5', i < currentIndex ? 'bg-primary' : 'bg-border')} />
          )}
        </div>
      ))}
    </div>
  );
}
