import { Repair, InventoryItem, TechnicianProfile, ActivityLogEntry, DashboardMetrics } from '@/types/models';

const technicianNames = [ 'Ayub','Abdurahman','Abdiqani',  'Bilal', 'Kasir', 'Murad', 'Seifu'];

export const mockTechnicians: TechnicianProfile[] = technicianNames.map((name, i) => ({
  id: `tech-${i + 1}`,
  user_id: `user-${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(' ', '.')}@repairshop.com`,
  role: 'technician' as const,
  activeRepairs: Math.floor(Math.random() * 8) + 1,
}));

const stages = ['Intake', 'Diagnosis', 'Repair', 'Quality Check', 'Completed'] as const;
const devices = ['iPhone', 'Android', 'PC'] as const;
const issues = ['LCD', 'Motherboard'] as const;
const customerStatuses = ['Waiting', 'Drop-off'] as const;

function randomDate(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  d.setHours(Math.floor(Math.random() * 10) + 8);
  d.setMinutes(Math.floor(Math.random() * 60));
  return d.toISOString();
}

export const mockRepairs: Repair[] = Array.from({ length: 35 }, (_, i) => {
  const isLCD = Math.random() < 0.9;
  const stage = stages[Math.floor(Math.random() * stages.length)];
  const created = randomDate(14);
  return {
    id: `repair-${i + 1}`,
    device_type: devices[Math.floor(Math.random() * devices.length)],
    issue_type: isLCD ? 'LCD' : 'Motherboard',
    customer_name: ['Mohammed Farah', 'Natnael Kassa', 'Alazar Amare', 'Matias Tesema', 'Asma Iise', 'Juneydi Mohammed', 'Kayse Ousman', 'Ahmed Mohammed'][Math.floor(Math.random() * 8)],
    customer_phone: `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    customer_status: customerStatuses[Math.floor(Math.random() * 2)],
    technician_id: mockTechnicians[Math.floor(Math.random() * 5)].id,
    current_stage: stage,
    notes: stage === 'Diagnosis' ? 'Checking connector ribbon cable' : undefined,
    created_at: created,
    updated_at: new Date().toISOString(),
  };
});

export const mockInventory: InventoryItem[] = [
  { id: 'inv-1', part_name: 'iPhone 14 LCD', part_type: 'LCD', stock_level: 12, threshold: 5, shipment_status: 'Delivered', arrival_date: null },
  { id: 'inv-2', part_name: 'iPhone 15 LCD', part_type: 'LCD', stock_level: 3, threshold: 5, shipment_status: 'In Transit', arrival_date: '2026-03-01' },
  { id: 'inv-3', part_name: 'Samsung S24 LCD', part_type: 'LCD', stock_level: 8, threshold: 5, shipment_status: 'Delivered', arrival_date: null },
  { id: 'inv-4', part_name: 'iPhone 13 LCD', part_type: 'LCD', stock_level: 1, threshold: 5, shipment_status: 'Ordered', arrival_date: '2026-03-05' },
  { id: 'inv-5', part_name: 'Pixel 8 LCD', part_type: 'LCD', stock_level: 6, threshold: 5, shipment_status: 'Delivered', arrival_date: null },
  { id: 'inv-6', part_name: 'iPhone 14 Motherboard', part_type: 'Motherboard', stock_level: 2, threshold: 3, shipment_status: 'In Transit', arrival_date: '2026-03-02' },
  { id: 'inv-7', part_name: 'Samsung S23 Motherboard', part_type: 'Motherboard', stock_level: 4, threshold: 3, shipment_status: 'Delivered', arrival_date: null },
  { id: 'inv-8', part_name: 'PC ATX Motherboard', part_type: 'Motherboard', stock_level: 0, threshold: 2, shipment_status: 'Ordered', arrival_date: '2026-03-08' },
];

export const mockActivityLog: ActivityLogEntry[] = [
  { id: 'log-1', user_name: 'Abdurahman', action: 'moved', entity: 'Repair #12', details: 'from Diagnosis to Repair', created_at: new Date(Date.now() - 300000).toISOString() },
  { id: 'log-2', user_name: 'Abdiqani', action: 'completed', entity: 'Repair #8', details: 'LCD replacement — 18 min total', created_at: new Date(Date.now() - 900000).toISOString() },
  { id: 'log-3', user_name: 'Ayub', action: 'created', entity: 'Repair #35', details: 'iPhone 15, LCD issue, assigned to Abdurahman', created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: 'log-4', user_name: 'Kasir', action: 'flagged', entity: 'Inventory', details: 'iPhone 13 LCD stock critically low', created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'log-5', user_name: 'Murad', action: 'updated', entity: 'Repair #22', details: 'added diagnostic notes', created_at: new Date(Date.now() - 7200000).toISOString() },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalRepairsToday: 12,
  lcdToMotherboardRatio: '9:1',
  avgRepairTime: '24 min',
  pendingRepairs: 18,
  inventoryAlerts: 3,
  technicianWorkload: mockTechnicians.map(t => ({ name: t.name.split(' ')[0], active: t.activeRepairs })),
};

export const chartData = {
  repairTypes: [
    { name: 'LCD', value: 31, fill: 'hsl(174, 55%, 35%)' },
    { name: 'Motherboard', value: 4, fill: 'hsl(25, 85%, 65%)' },
  ],
  dailyTrends: Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      repairs: Math.floor(Math.random() * 8) + 6,
      completed: Math.floor(Math.random() * 6) + 4,
    };
  }),
  techPerformance: technicianNames.map(n => ({
    name: n.split(' ')[0],
    completed: Math.floor(Math.random() * 12) + 3,
    avgTime: Math.floor(Math.random() * 20) + 15,
  })),
};
