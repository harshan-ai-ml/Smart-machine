import { Alert } from '@/types/machine';
import { Card } from '@/components/ui/card';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertPanelProps {
  alerts: Alert[];
}

export const AlertPanel = ({ alerts }: AlertPanelProps) => {
  const sortedAlerts = [...alerts].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {alerts.length} active
        </span>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {sortedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'critical'
                  ? 'bg-destructive/5 border-destructive'
                  : 'bg-warning/5 border-warning'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className={`w-5 h-5 mt-0.5 ${
                    alert.severity === 'critical' ? 'text-destructive' : 'text-warning'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{alert.machineName}</span>
                    <span className="text-xs text-muted-foreground">
                      {alert.parameter}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
