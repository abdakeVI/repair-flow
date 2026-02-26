import { formatDistanceToNow } from 'date-fns';
import { mockActivityLog } from '@/data/mockData';
import { cn } from '@/lib/utils';

const actionColors: Record<string, string> = {
  moved: 'text-primary',
  completed: 'text-success',
  created: 'text-info',
  flagged: 'text-warning',
  updated: 'text-muted-foreground',
};

export default function ActivityFeed() {
  return (
    <div className="card-embossed p-5">
      <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivityLog.map((entry, i) => (
          <div key={entry.id} className="flex gap-3 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-relaxed">
                <span className="font-heading font-medium text-foreground">{entry.user_name}</span>{' '}
                <span className={cn('font-heading', actionColors[entry.action] || 'text-muted-foreground')}>{entry.action}</span>{' '}
                <span className="font-medium text-foreground">{entry.entity}</span>
                {entry.details && <span className="text-muted-foreground"> — {entry.details}</span>}
              </p>
              <p className="font-handwritten text-xs text-muted-foreground/60 mt-0.5">
                {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
