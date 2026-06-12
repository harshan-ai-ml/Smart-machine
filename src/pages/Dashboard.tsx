import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MachineCard } from '@/components/MachineCard';
import { AlertPanel } from '@/components/AlertPanel';
import { MaintenanceHistory } from '@/components/MaintenanceHistory';
import { mockMachines, mockAlerts } from '@/lib/mockData';
import { Machine, MachineStatus } from '@/types/machine';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Dashboard = () => {
  const [machines, setMachines] = useState<Machine[]>(mockMachines);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MachineStatus | null>(null);
  const { toast } = useToast();

  const handleStatusUpdate = async (machineId: string, newStatus: MachineStatus) => {
    try {
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to perform this action",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('machines')
        .update({ status: newStatus })
        .eq('id', machineId);

      if (error) {
        if (error.message.includes('policy')) {
          toast({
            title: "Permission Denied",
            description: "You don't have permission to update machines. Contact an administrator.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      // Update local state
      setMachines(prevMachines =>
        prevMachines.map(m =>
          m.id === machineId ? { ...m, status: newStatus } : m
        )
      );

      toast({
        title: "Status Updated",
        description: newStatus === 'offline' 
          ? "Machine has been turned off successfully" 
          : "Machine settings adjusted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update machine status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prevMachines =>
        prevMachines.map(machine => ({
          ...machine,
          temperature: Math.max(40, machine.temperature + (Math.random() - 0.5) * 2),
          vibration: Math.max(0, machine.vibration + (Math.random() - 0.5) * 0.5),
          rpm: Math.max(0, machine.rpm + (Math.random() - 0.5) * 50),
          powerConsumption: Math.max(0, machine.powerConsumption + (Math.random() - 0.5)),
          pressure: machine.pressure > 0 ? Math.max(0, machine.pressure + (Math.random() - 0.5) * 3) : 0,
          lastUpdated: new Date()
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: machines.length,
    operational: machines.filter(m => m.status === 'operational').length,
    warning: machines.filter(m => m.status === 'warning').length,
    critical: machines.filter(m => m.status === 'critical').length
  };

  // Filter machines based on search and status
  const filteredMachines = machines.filter(machine => {
    const matchesSearch = searchQuery === '' || 
      machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || machine.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusFilterClick = (status: MachineStatus | null) => {
    setStatusFilter(statusFilter === status ? null : status);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div 
            className="bg-card p-6 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
            onClick={() => setStatusFilter(null)}
          >
            <p className="text-sm text-muted-foreground mb-1">Total Machines</p>
            <p className="text-3xl font-bold monospace-data">{stats.total}</p>
          </div>
          <div 
            className={`bg-card p-6 rounded-lg border border-success/20 cursor-pointer hover:bg-accent transition-colors ${statusFilter === 'operational' ? 'ring-2 ring-success' : ''}`}
            onClick={() => handleStatusFilterClick('operational')}
          >
            <p className="text-sm text-muted-foreground mb-1">Operational</p>
            <p className="text-3xl font-bold monospace-data text-success">{stats.operational}</p>
          </div>
          <div 
            className={`bg-card p-6 rounded-lg border border-warning/20 cursor-pointer hover:bg-accent transition-colors ${statusFilter === 'warning' ? 'ring-2 ring-warning' : ''}`}
            onClick={() => handleStatusFilterClick('warning')}
          >
            <p className="text-sm text-muted-foreground mb-1">Warnings</p>
            <p className="text-3xl font-bold monospace-data text-warning">{stats.warning}</p>
          </div>
          <div 
            className={`bg-card p-6 rounded-lg border border-destructive/20 cursor-pointer hover:bg-accent transition-colors ${statusFilter === 'critical' ? 'ring-2 ring-destructive' : ''}`}
            onClick={() => handleStatusFilterClick('critical')}
          >
            <p className="text-sm text-muted-foreground mb-1">Critical</p>
            <p className="text-3xl font-bold monospace-data text-destructive">{stats.critical}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Machines Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Machines</h2>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search machines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMachines.map(machine => (
                <MachineCard 
                  key={machine.id} 
                  machine={machine}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
            {filteredMachines.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No machines found matching your search.
              </div>
            )}
          </div>

          {/* Alerts Sidebar */}
          <div>
            <AlertPanel alerts={mockAlerts} />
          </div>
        </div>

        {/* Maintenance History */}
        <div className="mt-8">
          <MaintenanceHistory />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
