import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MaintenanceLog {
  id: string;
  machine_id: string;
  machine_name: string;
  repair_type: string;
  description: string;
  technician_name: string;
  status: string;
  created_at: string;
  completed_at: string;
}

export const MaintenanceHistory = () => {
  const [logs, setLogs] = useState<MaintenanceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenanceLogs();
  }, []);

  const fetchMaintenanceLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('maintenance_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching maintenance logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in_progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Maintenance History</span>
          <Badge variant="outline" className="font-normal">
            {logs.length} Records
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading maintenance logs...
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No maintenance records found
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine</TableHead>
                  <TableHead>Repair Type</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.machine_name}</p>
                        <p className="text-sm text-muted-foreground">{log.machine_id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.repair_type}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {log.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{log.technician_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(log.status)}>
                        {log.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
