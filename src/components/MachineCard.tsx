import { Machine } from '@/types/machine';
import { Card } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Thermometer, Gauge, Zap, Wind, Activity, Power, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MachineCardProps {
  machine: Machine;
  onStatusUpdate?: (machineId: string, newStatus: 'operational' | 'offline') => void;
}

export const MachineCard = ({ machine, onStatusUpdate }: MachineCardProps) => {
  const metrics = [
    { 
      icon: Thermometer, 
      label: 'Temperature', 
      value: machine.temperature, 
      unit: '°C',
      color: machine.temperature > 80 ? 'text-destructive' : 'text-chart-1'
    },
    { 
      icon: Activity, 
      label: 'Vibration', 
      value: machine.vibration, 
      unit: 'mm/s',
      color: machine.vibration > 5 ? 'text-destructive' : 'text-chart-2'
    },
    { 
      icon: Gauge, 
      label: 'RPM', 
      value: machine.rpm, 
      unit: '',
      color: 'text-chart-3'
    },
    { 
      icon: Zap, 
      label: 'Power', 
      value: machine.powerConsumption, 
      unit: 'kW',
      color: 'text-chart-4'
    },
    { 
      icon: Wind, 
      label: 'Pressure', 
      value: machine.pressure, 
      unit: 'PSI',
      color: machine.pressure > 200 ? 'text-destructive' : 'text-chart-5'
    },
  ];

  const handleAction = (e: React.MouseEvent, action: 'off' | 'adjust') => {
    e.preventDefault();
    e.stopPropagation();
    if (onStatusUpdate) {
      if (action === 'off') {
        onStatusUpdate(machine.id, 'offline');
      } else if (action === 'adjust') {
        onStatusUpdate(machine.id, 'operational');
      }
    }
  };

  return (
    <Link to={`/machine/${machine.id}`}>
      <Card className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{machine.name}</h3>
            <p className="text-sm text-muted-foreground">{machine.type}</p>
          </div>
          <StatusBadge status={machine.status} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-start gap-2">
              <metric.icon className={`w-4 h-4 mt-0.5 ${metric.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">{metric.label}</p>
                <p className={`text-sm font-semibold monospace-data ${metric.color}`}>
                  {metric.value.toFixed(1)}{metric.unit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {machine.status === 'critical' && (
          <div className="mb-3">
            <Button
              variant="destructive"
              size="sm"
              className="w-full gap-2"
              onClick={(e) => handleAction(e, 'off')}
            >
              <Power className="w-4 h-4" />
              Turn Off Machine
            </Button>
          </div>
        )}

        {machine.status === 'warning' && (
          <div className="mb-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
              onClick={(e) => handleAction(e, 'adjust')}
            >
              <Settings className="w-4 h-4" />
              Adjust Settings
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
          <span>{machine.location}</span>
          <span>Updated: {new Date(machine.lastUpdated).toLocaleTimeString()}</span>
        </div>
      </Card>
    </Link>
  );
};
