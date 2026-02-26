export interface Repair {
  id: string;
  device_type: 'iPhone' | 'Android' | 'PC';
  issue_type: 'LCD' | 'Motherboard';
  customer_name: string;
  customer_phone?: string;
  customer_status: 'Waiting' | 'Drop-off';
  technician_id: string;
  current_stage: 'Intake' | 'Diagnosis' | 'Repair' | 'Quality Check' | 'Completed';
  notes?: string;
  created_at: string;
  updated_at: string;
  diagnosed_at?: string;
  repair_started_at?: string;
  quality_check_at?: string;
  completed_at?: string;
}

export interface InventoryItem {
  id: string;
  part_name: string;
  part_type: 'LCD' | 'Motherboard';
  stock_level: number;
  threshold: number;
  shipment_status: 'Ordered' | 'In Transit' | 'Delivered';
  arrival_date: string | null;
}

export interface TechnicianProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: 'admin' | 'technician';
  activeRepairs: number;
}

export interface ActivityLogEntry {
  id: string;
  user_name: string;
  action: string;
  entity: string;
  details: string;
  created_at: string;
}

export interface DashboardMetrics {
  totalRepairsToday: number;
  lcdToMotherboardRatio: string;
  avgRepairTime: string;
  pendingRepairs: number;
  inventoryAlerts: number;
  technicianWorkload: { name: string; active: number }[];
}
