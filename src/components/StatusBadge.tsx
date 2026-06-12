import { MachineStatus } from '@/types/machine';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: MachineStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    operational: {
      label: 'Operational',
      className: 'bg-success/10 text-success hover:bg-success/20 border-success/20'
    },
    warning: {
      label: 'Warning',
      className: 'bg-warning/10 text-warning hover:bg-warning/20 border-warning/20'
    },
    critical: {
      label: 'Critical',
      className: 'bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20'
    },
    offline: {
      label: 'Offline',
      className: 'bg-muted text-muted-foreground hover:bg-muted border-border'
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={`gap-1.5 ${config.className}`}>
      <Circle className="w-2 h-2 fill-current animate-pulse-slow" />
      {config.label}
    </Badge>
  );
};
