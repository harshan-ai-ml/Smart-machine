export type MachineStatus = 'operational' | 'warning' | 'critical' | 'offline';

export interface SensorReading {
  timestamp: Date;
  value: number;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: MachineStatus;
  temperature: number;
  vibration: number;
  rpm: number;
  powerConsumption: number;
  pressure: number;
  lastUpdated: Date;
  location: string;
}

export interface Alert {
  id: string;
  machineId: string;
  machineName: string;
  parameter: string;
  message: string;
  severity: 'warning' | 'critical';
  timestamp: Date;
}
