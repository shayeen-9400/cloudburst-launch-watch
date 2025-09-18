import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Satellite,
  MapPin,
  Clock,
  Shield
} from 'lucide-react';

const PredictionPanel = () => {
  // Mock launch zone data
  const launchZones = [
    {
      id: 1,
      name: 'ISRO Sriharikota',
      location: 'Andhra Pradesh',
      status: 'unsafe',
      riskLevel: 'high',
      nextWindow: '6 hours',
      coordinates: '13.72°N, 80.23°E'
    },
    {
      id: 2,
      name: 'Thumba Equatorial',
      location: 'Kerala',
      status: 'safe',
      riskLevel: 'low',
      nextWindow: '2 hours',
      coordinates: '8.54°N, 76.87°E'
    },
    {
      id: 3,
      name: 'Wheeler Island',
      location: 'Odisha',
      status: 'caution',
      riskLevel: 'medium',
      nextWindow: '12 hours',
      coordinates: '20.71°N, 87.02°E'
    },
    {
      id: 4,
      name: 'Balasore Test Range',
      location: 'Odisha',
      status: 'safe',
      riskLevel: 'low',
      nextWindow: '4 hours',
      coordinates: '21.93°N, 87.48°E'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'unsafe': return <XCircle className="w-4 h-4 text-destructive animate-glow-pulse" />;
      case 'caution': return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'success';
      case 'unsafe': return 'destructive';
      case 'caution': return 'warning';
      default: return 'secondary';
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="bg-card/50 border-border/30 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary animate-glow-pulse" />
              Launch Prediction Panel
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Real-time launch safety assessment based on satellite and weather data
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse"></div>
            <span className="text-xs text-muted-foreground">Auto-updating</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Alert */}
        <div className="p-4 bg-gradient-alert rounded-lg border border-destructive/50 shadow-glow-danger">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive-foreground animate-glow-pulse mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive-foreground">Current Weather Alert</h4>
              <p className="text-sm text-destructive-foreground/90 mt-1">
                High cloudburst activity detected in Bay of Bengal. Launch operations not recommended 
                for eastern coastal facilities until weather conditions stabilize.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="destructive" className="text-xs">HIGH RISK</Badge>
                <span className="text-xs text-destructive-foreground/70">
                  Updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Launch Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {launchZones.map((zone) => (
            <Card 
              key={zone.id} 
              className={`bg-card/30 border ${
                zone.status === 'unsafe' ? 'border-destructive/50 shadow-glow-danger' :
                zone.status === 'safe' ? 'border-success/50' :
                'border-warning/50'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(zone.status)}
                    <h4 className="font-medium text-foreground">{zone.name}</h4>
                  </div>
                  <Badge variant={getStatusColor(zone.status) as any} className="text-xs">
                    {zone.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{zone.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Satellite className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{zone.coordinates}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Next window: {zone.nextWindow}</span>
                    </div>
                    <Badge variant={getRiskBadgeVariant(zone.riskLevel) as any} className="text-xs">
                      {zone.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-success/10 border-success/30">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">2</div>
              <div className="text-xs text-muted-foreground">Safe Zones</div>
            </CardContent>
          </Card>
          
          <Card className="bg-warning/10 border-warning/30">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">1</div>
              <div className="text-xs text-muted-foreground">Caution Zones</div>
            </CardContent>
          </Card>
          
          <Card className="bg-destructive/10 border-destructive/30">
            <CardContent className="p-4 text-center">
              <XCircle className="w-8 h-8 text-destructive mx-auto mb-2 animate-glow-pulse" />
              <div className="text-2xl font-bold text-destructive">1</div>
              <div className="text-xs text-muted-foreground">Restricted Zones</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border/30">
          <Shield className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> Predictions are based on real-time satellite and weather data analysis. 
              Launch decisions should also consider additional meteorological factors and safety protocols.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionPanel;