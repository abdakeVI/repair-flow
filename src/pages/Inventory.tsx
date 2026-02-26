import { mockInventory } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Package, AlertTriangle, Truck, Check } from 'lucide-react';

const shipmentIcons: Record<string, typeof Package> = {
  Ordered: Package,
  'In Transit': Truck,
  Delivered: Check,
};

const shipmentColors: Record<string, string> = {
  Ordered: 'text-info bg-info/10',
  'In Transit': 'text-warning bg-warning/10',
  Delivered: 'text-success bg-success/10',
};

export default function Inventory() {
  const lowStock = mockInventory.filter(i => i.stock_level <= i.threshold);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-light text-foreground">Inventory</h1>
        <p className="text-muted-foreground mt-1">Track parts, stock levels, and incoming shipments</p>
      </div>

      {/* Low Stock Alerts */}
      {lowStock.length > 0 && (
        <div className="card-embossed p-5 border-l-4 border-l-warning">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="font-heading text-sm font-medium text-foreground">Low Stock Alerts</h3>
            <span className="font-handwritten text-sm text-muted-foreground/60">needs attention</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((item) => (
              <span key={item.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-warning/10 rounded-lg font-heading text-xs text-warning">
                {item.part_name}
                <span className="font-medium">({item.stock_level})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockInventory.map((item, i) => {
          const isLow = item.stock_level <= item.threshold;
          const stockPercent = Math.min((item.stock_level / (item.threshold * 3)) * 100, 100);
          const ShipIcon = shipmentIcons[item.shipment_status] || Package;

          return (
            <div
              key={item.id}
              className="card-embossed-hover p-5 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-heading text-sm font-medium text-foreground">{item.part_name}</h4>
                  <span className="font-heading text-xs text-muted-foreground uppercase tracking-wider">{item.part_type}</span>
                </div>
                <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-heading text-[11px]', shipmentColors[item.shipment_status])}>
                  <ShipIcon className="w-3 h-3" />
                  {item.shipment_status}
                </span>
              </div>

              {/* Stock Level Bar */}
              <div className="mb-3">
                <div className="flex items-end justify-between mb-1">
                  <span className={cn('font-heading text-2xl font-light', isLow ? 'text-warning' : 'text-foreground')}>{item.stock_level}</span>
                  <span className="font-heading text-[11px] text-muted-foreground">threshold: {item.threshold}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', isLow ? 'bg-warning' : 'bg-primary')}
                    style={{ width: `${stockPercent}%` }}
                  />
                </div>
              </div>

              {item.arrival_date && (
                <p className="font-handwritten text-sm text-muted-foreground/60">
                  arriving {new Date(item.arrival_date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                </p>
              )}
              {!item.arrival_date && item.shipment_status === 'Delivered' && (
                <p className="font-handwritten text-sm text-success/60">in stock ✓</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
