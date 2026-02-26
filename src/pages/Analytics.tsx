import { mockRepairs, chartData } from '@/data/mockData';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Lightbulb, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Analytics() {
  const lcdRepairs = mockRepairs.filter(r => r.issue_type === 'LCD').length;
  const mbRepairs = mockRepairs.filter(r => r.issue_type === 'Motherboard').length;
  const completedCount = mockRepairs.filter(r => r.current_stage === 'Completed').length;
  const diagnosisCount = mockRepairs.filter(r => r.current_stage === 'Diagnosis').length;

  const insights = [
    {
      icon: TrendingUp,
      title: 'Most Common Repair',
      body: `LCD replacements account for ${Math.round((lcdRepairs / mockRepairs.length) * 100)}% of all repairs. This is consistent with industry averages — screens are fragile, and your team handles them well.`,
      annotation: 'no surprises here',
    },
    {
      icon: Clock,
      title: 'Average Duration',
      body: `LCD repairs average ~20 minutes. Motherboard work takes closer to 2+ hours. Consider batching motherboard repairs for afternoon slots when fewer walk-ins arrive.`,
      annotation: 'batch motherboard work?',
    },
    {
      icon: AlertTriangle,
      title: 'Current Bottleneck',
      body: `${diagnosisCount} repairs are sitting in Diagnosis. This stage often stalls when technicians wait for parts. Cross-reference with inventory to see if stock shortages are causing delays.`,
      annotation: 'check inventory levels',
    },
    {
      icon: Lightbulb,
      title: 'Resource Suggestion',
      body: `With ${completedCount} completed and ${mockRepairs.length - completedCount} in progress, your team is at ~${Math.round((mockRepairs.length - completedCount) / 5)} repairs per technician. Consider redistributing if any tech exceeds 8 active tickets.`,
      annotation: 'balance the load',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-light text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Patterns, bottlenecks, and suggestions — in plain language</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.map((insight, i) => (
          <div key={i} className="card-embossed-hover p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <insight.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-heading text-base font-medium text-foreground">{insight.title}</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{insight.body}</p>
            <p className="font-handwritten text-sm text-muted-foreground/50 mt-3 italic">— {insight.annotation}</p>
          </div>
        ))}
      </div>

      {/* Repair Duration Distribution */}
      <div className="card-embossed p-5">
        <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-1">Technician Efficiency</h3>
        <p className="font-handwritten text-sm text-muted-foreground/60 mb-4">avg completion time in minutes</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.techPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontFamily: 'var(--font-heading)', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontFamily: 'var(--font-heading)', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ fontFamily: 'var(--font-heading)', fontSize: '13px', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="avgTime" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Avg Time (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
