import { SensorReading } from '@/types/machine';
import { Card } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MetricChartProps {
  title: string;
  data: SensorReading[];
  unit: string;
  color: string;
}

export const MetricChart = ({ title, data, unit, color }: MetricChartProps) => {
  const chartData = data.map(d => ({
    time: d.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    value: d.value
  }));

  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            width={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value.toFixed(2)} ${unit}`, title]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#gradient-${color})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
