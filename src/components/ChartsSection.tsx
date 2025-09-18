import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPie, Cell, Pie } from 'recharts';

const ChartsSection = () => {
  // Mock chart data
  const intensityData = [
    { time: '00:00', mild: 5, moderate: 3, severe: 1 },
    { time: '06:00', mild: 8, moderate: 5, severe: 2 },
    { time: '12:00', mild: 12, moderate: 8, severe: 4 },
    { time: '18:00', mild: 15, moderate: 12, severe: 6 },
    { time: '24:00', mild: 10, moderate: 7, severe: 3 },
  ];

  const distributionData = [
    { name: 'Mild', value: 60, color: 'hsl(var(--success))' },
    { name: 'Moderate', value: 30, color: 'hsl(var(--warning))' },
    { name: 'Severe', value: 10, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart - Intensity Over Time */}
      <Card className="bg-card/50 border-border/30 shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary animate-glow-pulse" />
            Intensity Timeline
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Cloudburst activity over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={intensityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Line 
                  type="monotone" 
                  dataKey="mild" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="moderate" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="severe" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Mild</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-glow-pulse"></div>
              <span className="text-xs text-muted-foreground">Severe</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart - Distribution */}
      <Card className="bg-card/50 border-border/30 shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <PieChart className="w-5 h-5 text-secondary animate-glow-pulse" />
            Intensity Distribution
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Current percentage breakdown of alert levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          
          {/* Distribution Stats */}
          <div className="space-y-3 mt-4">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      item.name === 'Severe' ? 'animate-glow-pulse' : ''
                    }`}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.value}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;