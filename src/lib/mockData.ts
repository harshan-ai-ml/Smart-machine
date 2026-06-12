import { Machine, Alert, SensorReading } from '@/types/machine';

export const mockMachines: Machine[] = [
  {
    id: 'M001',
    name: 'CNC Mill #1',
    type: 'CNC Machine',
    status: 'operational',
    temperature: 68.5,
    vibration: 2.3,
    rpm: 3200,
    powerConsumption: 15.8,
    pressure: 95.2,
    lastUpdated: new Date(),
    location: 'Production Floor A'
  },
  {
    id: 'M002',
    name: 'Hydraulic Press #2',
    type: 'Hydraulic Press',
    status: 'warning',
    temperature: 82.1,
    vibration: 4.7,
    rpm: 0,
    powerConsumption: 22.4,
    pressure: 145.8,
    lastUpdated: new Date(),
    location: 'Production Floor A'
  },
  {
    id: 'M003',
    name: 'Conveyor Belt #1',
    type: 'Conveyor System',
    status: 'operational',
    temperature: 45.2,
    vibration: 1.8,
    rpm: 850,
    powerConsumption: 8.3,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Assembly Line 1'
  },
  {
    id: 'M004',
    name: 'Injection Molder #3',
    type: 'Injection Molding',
    status: 'critical',
    temperature: 195.4,
    vibration: 6.2,
    rpm: 1200,
    powerConsumption: 45.7,
    pressure: 210.5,
    lastUpdated: new Date(),
    location: 'Production Floor B'
  },
  {
    id: 'M005',
    name: 'Lathe Machine #4',
    type: 'Lathe',
    status: 'operational',
    temperature: 55.8,
    vibration: 2.1,
    rpm: 2400,
    powerConsumption: 12.1,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Machining Center'
  },
  {
    id: 'M006',
    name: 'Compressor Unit #1',
    type: 'Air Compressor',
    status: 'operational',
    temperature: 72.3,
    vibration: 3.2,
    rpm: 1800,
    powerConsumption: 28.5,
    pressure: 125.0,
    lastUpdated: new Date(),
    location: 'Utility Room'
  },
  {
    id: 'M007',
    name: 'Welding Robot #1',
    type: 'Robotic Welder',
    status: 'operational',
    temperature: 78.4,
    vibration: 2.8,
    rpm: 0,
    powerConsumption: 32.1,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Assembly Line 2'
  },
  {
    id: 'M008',
    name: 'Grinding Machine #2',
    type: 'Surface Grinder',
    status: 'warning',
    temperature: 88.7,
    vibration: 4.5,
    rpm: 2800,
    powerConsumption: 18.9,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Machining Center'
  },
  {
    id: 'M009',
    name: 'Paint Booth System',
    type: 'Automated Paint Line',
    status: 'operational',
    temperature: 42.3,
    vibration: 1.2,
    rpm: 0,
    powerConsumption: 25.4,
    pressure: 85.3,
    lastUpdated: new Date(),
    location: 'Finishing Area'
  },
  {
    id: 'M010',
    name: 'Packaging Line #3',
    type: 'Packaging System',
    status: 'critical',
    temperature: 102.8,
    vibration: 7.1,
    rpm: 1500,
    powerConsumption: 38.2,
    pressure: 110.7,
    lastUpdated: new Date(),
    location: 'Packaging Zone'
  },
  {
    id: 'M011',
    name: 'Quality Control Scanner',
    type: 'Vision Inspection',
    status: 'operational',
    temperature: 38.9,
    vibration: 0.8,
    rpm: 0,
    powerConsumption: 5.7,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Quality Lab'
  },
  {
    id: 'M012',
    name: 'Forklift Charging Station',
    type: 'Power Supply Unit',
    status: 'operational',
    temperature: 52.1,
    vibration: 1.5,
    rpm: 0,
    powerConsumption: 42.3,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Warehouse'
  },
  {
    id: 'M013',
    name: 'Drilling Station #5',
    type: 'Multi-Axis Drill',
    status: 'warning',
    temperature: 76.5,
    vibration: 4.2,
    rpm: 3500,
    powerConsumption: 16.8,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Production Floor A'
  },
  {
    id: 'M014',
    name: 'Cooling Tower #2',
    type: 'Industrial Chiller',
    status: 'operational',
    temperature: 28.4,
    vibration: 2.6,
    rpm: 1200,
    powerConsumption: 55.9,
    pressure: 95.8,
    lastUpdated: new Date(),
    location: 'Cooling Plant'
  },
  {
    id: 'M015',
    name: 'Assembly Robot #3',
    type: 'Robotic Arm',
    status: 'operational',
    temperature: 64.2,
    vibration: 2.0,
    rpm: 0,
    powerConsumption: 28.7,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Assembly Line 1'
  },
  {
    id: 'M016',
    name: 'Stamping Press #4',
    type: 'Mechanical Press',
    status: 'critical',
    temperature: 198.3,
    vibration: 6.8,
    rpm: 0,
    powerConsumption: 62.4,
    pressure: 225.6,
    lastUpdated: new Date(),
    location: 'Production Floor B'
  },
  {
    id: 'M017',
    name: 'Extrusion Machine #2',
    type: 'Plastic Extruder',
    status: 'warning',
    temperature: 185.7,
    vibration: 3.9,
    rpm: 950,
    powerConsumption: 48.1,
    pressure: 165.2,
    lastUpdated: new Date(),
    location: 'Plastics Department'
  },
  {
    id: 'M018',
    name: 'Material Handler #6',
    type: 'Automated Crane',
    status: 'operational',
    temperature: 48.6,
    vibration: 2.4,
    rpm: 0,
    powerConsumption: 19.3,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Warehouse'
  },
  {
    id: 'M019',
    name: 'Wire EDM Machine',
    type: 'EDM Cutter',
    status: 'operational',
    temperature: 59.8,
    vibration: 1.6,
    rpm: 0,
    powerConsumption: 21.5,
    pressure: 0,
    lastUpdated: new Date(),
    location: 'Precision Machining'
  },
  {
    id: 'M020',
    name: 'Vacuum Forming Unit',
    type: 'Thermoforming Machine',
    status: 'warning',
    temperature: 142.9,
    vibration: 3.7,
    rpm: 600,
    powerConsumption: 34.6,
    pressure: 88.4,
    lastUpdated: new Date(),
    location: 'Plastics Department'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'A001',
    machineId: 'M004',
    machineName: 'Injection Molder #3',
    parameter: 'Temperature',
    message: 'Temperature exceeded safe operating limit (195.4°C)',
    severity: 'critical',
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    id: 'A002',
    machineId: 'M004',
    machineName: 'Injection Molder #3',
    parameter: 'Vibration',
    message: 'Abnormal vibration detected (6.2 mm/s)',
    severity: 'critical',
    timestamp: new Date(Date.now() - 3 * 60000)
  },
  {
    id: 'A003',
    machineId: 'M002',
    machineName: 'Hydraulic Press #2',
    parameter: 'Temperature',
    message: 'Temperature approaching upper threshold (82.1°C)',
    severity: 'warning',
    timestamp: new Date(Date.now() - 12 * 60000)
  },
  {
    id: 'A004',
    machineId: 'M002',
    machineName: 'Hydraulic Press #2',
    parameter: 'Vibration',
    message: 'Elevated vibration levels detected (4.7 mm/s)',
    severity: 'warning',
    timestamp: new Date(Date.now() - 8 * 60000)
  }
];

export const generateHistoricalData = (baseValue: number, points: number = 20): SensorReading[] => {
  const data: SensorReading[] = [];
  const now = Date.now();
  
  for (let i = points - 1; i >= 0; i--) {
    const variance = (Math.random() - 0.5) * baseValue * 0.1;
    data.push({
      timestamp: new Date(now - i * 60000),
      value: Math.max(0, baseValue + variance)
    });
  }
  
  return data;
};
