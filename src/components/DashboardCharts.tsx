import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { chartData } from '@/data/mockData';

export function RepairTypesChart() {
  return (
    <div className="card-embossed p-5">
      <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-1">Repair Types</h3>
      <p className="font-handwritten text-sm text-muted-foreground/60 mb-4">mostly screens, as expected</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData.repairTypes}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              dataKey="value"
              strokeWidth={2}
              stroke="hsl(var(--card))"
            >
              {chartData.repairTypes.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        {chartData.repairTypes.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.fill }} />
            <span className="font-heading text-xs text-muted-foreground">{entry.name} ({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyTrendsChart() {
  return (
    <div className="card-embossed p-5">
      <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-1">Daily Trends</h3>
      <p className="font-handwritten text-sm text-muted-foreground/60 mb-4">last 7 days</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.dailyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontFamily: 'var(--font-heading)', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontFamily: 'var(--font-heading)', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip contentStyle={{ fontFamily: 'var(--font-heading)', fontSize: '13px', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="repairs" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--primary))' }} name="Incoming" />
            <Line type="monotone" dataKey="completed" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--success))' }} name="Completed" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TechPerformanceChart() {
  return (
    <div className="card-embossed p-5">
      <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-1">Technician Performance</h3>
      <p className="font-handwritten text-sm text-muted-foreground/60 mb-4">completed this week</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData.techPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontFamily: 'var(--font-heading)', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontFamily: 'var(--font-heading)', fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip contentStyle={{ fontFamily: 'var(--font-heading)', fontSize: '13px', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
            <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
