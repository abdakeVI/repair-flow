import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  annotation?: string;
  variant?: 'default' | 'accent' | 'warning';
  className?: string;
}

export default function MetricCard({ label, value, icon: Icon, annotation, variant = 'default', className }: MetricCardProps) {
  return (
    <div className={cn('card-embossed-hover p-5 relative overflow-hidden group', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
          <p className={cn(
            'font-heading text-3xl font-light',
            variant === 'accent' && 'text-accent',
            variant === 'warning' && 'text-warning',
            variant === 'default' && 'text-foreground'
          )}>
            {value}
          </p>
        </div>
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          variant === 'accent' ? 'bg-accent/10' : variant === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
        )}>
          <Icon className={cn(
            'w-5 h-5',
            variant === 'accent' ? 'text-accent' : variant === 'warning' ? 'text-warning' : 'text-primary'
          )} />
        </div>
      </div>
      {annotation && (
        <p className="font-handwritten text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {annotation}
        </p>
      )}
    </div>
  );
}
