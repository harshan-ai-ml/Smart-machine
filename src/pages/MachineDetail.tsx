import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { StatusBadge } from '@/components/StatusBadge';
import { MetricChart } from '@/components/MetricChart';
import { mockMachines, generateHistoricalData } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const MachineDetail = () => {
  const { id } = useParams();
  const machine = mockMachines.find(m => m.id === id);
  const [configOpen, setConfigOpen] = useState(false);

  const [historicalData, setHistoricalData] = useState({
    temperature: generateHistoricalData(machine?.temperature || 65),
    vibration: generateHistoricalData(machine?.vibration || 2.5),
    rpm: generateHistoricalData(machine?.rpm || 2000),
    power: generateHistoricalData(machine?.powerConsumption || 15),
    pressure: generateHistoricalData(machine?.pressure || 100)
  });

  useEffect(() => {
    if (!machine) return;

    const interval = setInterval(() => {
      setHistoricalData(prev => ({
        temperature: [...prev.temperature.slice(1), {
          timestamp: new Date(),
          value: Math.max(40, machine.temperature + (Math.random() - 0.5) * 2)
        }],
        vibration: [...prev.vibration.slice(1), {
          timestamp: new Date(),
          value: Math.max(0, machine.vibration + (Math.random() - 0.5) * 0.5)
        }],
        rpm: [...prev.rpm.slice(1), {
          timestamp: new Date(),
          value: Math.max(0, machine.rpm + (Math.random() - 0.5) * 50)
        }],
        power: [...prev.power.slice(1), {
          timestamp: new Date(),
          value: Math.max(0, machine.powerConsumption + (Math.random() - 0.5))
        }],
        pressure: [...prev.pressure.slice(1), {
          timestamp: new Date(),
          value: machine.pressure > 0 ? Math.max(0, machine.pressure + (Math.random() - 0.5) * 3) : 0
        }]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [machine]);

  if (!machine) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Machine not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Machine Header */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{machine.name}</h1>
              <p className="text-muted-foreground mb-4">{machine.type}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{machine.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Last updated: {new Date(machine.lastUpdated).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <StatusBadge status={machine.status} />
              <Dialog open={configOpen} onOpenChange={setConfigOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Configure
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Machine Configuration</DialogTitle>
                    <DialogDescription>
                      Current sensor readings for {machine.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                        <p className="text-2xl font-bold text-chart-1">{machine.temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Vibration</p>
                        <p className="text-2xl font-bold text-chart-2">{machine.vibration.toFixed(1)} mm/s</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">RPM</p>
                        <p className="text-2xl font-bold text-chart-3">{machine.rpm.toFixed(0)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Power</p>
                        <p className="text-2xl font-bold text-chart-4">{machine.powerConsumption.toFixed(1)} kW</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pressure</p>
                        <p className="text-2xl font-bold text-chart-5">{machine.pressure.toFixed(1)} PSI</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Current Readings */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Temperature</p>
              <p className="text-2xl font-bold monospace-data text-chart-1">
                {machine.temperature.toFixed(1)}°C
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Vibration</p>
              <p className="text-2xl font-bold monospace-data text-chart-2">
                {machine.vibration.toFixed(1)} mm/s
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">RPM</p>
              <p className="text-2xl font-bold monospace-data text-chart-3">
                {machine.rpm.toFixed(0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Power</p>
              <p className="text-2xl font-bold monospace-data text-chart-4">
                {machine.powerConsumption.toFixed(1)} kW
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Pressure</p>
              <p className="text-2xl font-bold monospace-data text-chart-5">
                {machine.pressure.toFixed(1)} PSI
              </p>
            </div>
          </div>
        </Card>

        {/* Historical Charts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Historical Data (Last 20 minutes)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <MetricChart
              title="Temperature"
              data={historicalData.temperature}
              unit="°C"
              color="hsl(var(--chart-1))"
            />
            <MetricChart
              title="Vibration"
              data={historicalData.vibration}
              unit="mm/s"
              color="hsl(var(--chart-2))"
            />
            <MetricChart
              title="RPM"
              data={historicalData.rpm}
              unit=""
              color="hsl(var(--chart-3))"
            />
            <MetricChart
              title="Power Consumption"
              data={historicalData.power}
              unit="kW"
              color="hsl(var(--chart-4))"
            />
            {machine.pressure > 0 && (
              <MetricChart
                title="Pressure"
                data={historicalData.pressure}
                unit="PSI"
                color="hsl(var(--chart-5))"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MachineDetail;
