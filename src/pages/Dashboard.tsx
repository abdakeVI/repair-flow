import MetricCard from '@/components/MetricCard';
import ActivityFeed from '@/components/ActivityFeed';
import { RepairTypesChart, DailyTrendsChart, TechPerformanceChart } from '@/components/DashboardCharts';
import { mockDashboardMetrics } from '@/data/mockData';
import { Wrench, Monitor, Clock, AlertTriangle, Package, Users } from 'lucide-react';

export default function Dashboard() {
  const m = mockDashboardMetrics;

  return (
    <div className="space-y-8">
      {/* 🔴🔴🔴 TEST - IF YOU SEE THIS RED BOX, REACT IS WORKING 🔴🔴🔴 */}

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-light text-foreground">
          Good morning<span className="text-gradient-teal">.</span>
        </h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          Here's what's happening in the shop today
          <span className="annotation">updated just now</span>
        </p>
      </div>
      {/* Temporary navigation - remove later */}
<div className="flex justify-end mb-4">
  <a 
    href="/portfolio"
    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors text-sm font-sans font-medium"
  >
    View My Portfolio →
  </a>
</div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="Repairs Today" value={m.totalRepairsToday} icon={Wrench} annotation="↑ 3 from yesterday" />
        <MetricCard label="LCD : Board" value={m.lcdToMotherboardRatio} icon={Monitor} annotation="consistent ratio" />
        <MetricCard label="Avg Time" value={m.avgRepairTime} icon={Clock} annotation="down 2 min this week" />
        <MetricCard label="Pending" value={m.pendingRepairs} icon={Wrench} variant="accent" annotation="6 in diagnosis" />
        <MetricCard label="Stock Alerts" value={m.inventoryAlerts} icon={Package} variant="warning" annotation="reorder soon" />
        <MetricCard label="Active Techs" value="5" icon={Users} annotation="all hands on deck" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="card-tactile p-6 relative">
          <RepairTypesChart />
          <span className="annotation-absolute">LCD repairs dominate</span>
        </div>
        
        <div className="card-tactile p-6 relative">
          <DailyTrendsChart />
          <span className="annotation-absolute">peak on Mondays</span>
        </div>
        
        <div className="card-tactile p-6 relative">
          <TechPerformanceChart />
          <span className="annotation-absolute">Sarah leads this week</span>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technician Workload */}
        <div className="card-tactile p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground">
              Technician Workload
            </h3>
            <span className="annotation">active now</span>
          </div>
          <div className="space-y-3">
            {m.technicianWorkload.map((tech) => (
              <div key={tech.name} className="flex items-center gap-3 group hover:bg-muted/20 p-2 -mx-2 rounded-lg transition-colors">
                <span className="font-heading text-sm w-16 text-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 group-hover:bg-accent"
                    style={{ width: `${Math.min(tech.active * 12, 100)}%` }}
                  />
                </div>
                <span className="font-heading text-xs text-muted-foreground w-8 text-right">
                  {tech.active}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground border-t border-border pt-2">
            <span className="annotation inline-block mr-1">💡</span> 2 techs available for new repairs
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card-tactile p-0 overflow-hidden">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}