import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Activity } from 'lucide-react';

const MapSection = () => {
  // Mock cloudburst data
  const cloudburstData = [
    { id: 1, lat: 20.5937, lng: 78.9629, intensity: 'severe', region: 'Central India' },
    { id: 2, lat: 15.3173, lng: 75.7139, intensity: 'moderate', region: 'Karnataka' },
    { id: 3, lat: 28.7041, lng: 77.1025, intensity: 'mild', region: 'Delhi NCR' },
    { id: 4, lat: 19.0760, lng: 72.8777, intensity: 'severe', region: 'Mumbai' },
    { id: 5, lat: 13.0827, lng: 80.2707, intensity: 'moderate', region: 'Chennai' },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'severe': return 'bg-destructive';
      case 'moderate': return 'bg-warning';
      case 'mild': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'severe': return '🔴';
      case 'moderate': return '🟡';
      case 'mild': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <Card className="bg-card/50 border-border/30 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary animate-glow-pulse" />
              Live Cloudburst Detection Map
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Real-time satellite monitoring of India & Indian Ocean
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <div className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse mr-1"></div>
              LIVE
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div className="relative h-96 bg-gradient-to-b from-muted/50 to-muted/20 rounded-lg border border-border/30 overflow-hidden">
          {/* Simulated India Map Background */}
          <div className="absolute inset-0 bg-gradient-space opacity-50"></div>
          
          {/* Scan Line Effect */}
          <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
          
          {/* Map Legend */}
          <div className="absolute top-4 left-4 space-y-2 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/30">
            <h4 className="text-sm font-medium text-foreground">Intensity Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-muted-foreground">🟢 Mild</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">🟡 Moderate</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-destructive rounded-full animate-glow-pulse"></div>
                <span className="text-muted-foreground">🔴 Severe</span>
              </div>
            </div>
          </div>

          {/* Cloudburst Markers */}
          <div className="absolute inset-0">
            {cloudburstData.map((point) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${((point.lng - 68) / (97 - 68)) * 100}%`,
                  top: `${((35 - point.lat) / (35 - 6)) * 100}%`,
                }}
              >
                {/* Pulse Effect */}
                <div className={`w-8 h-8 ${getIntensityColor(point.intensity)} rounded-full animate-ping absolute inset-0 opacity-30`}></div>
                
                {/* Main Marker */}
                <div className={`w-4 h-4 ${getIntensityColor(point.intensity)} rounded-full border-2 border-background relative z-10 animate-glow-pulse`}>
                  <MapPin className="w-3 h-3 text-background absolute inset-0.5" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/30 rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-xs font-medium text-foreground">{point.region}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {getIntensityIcon(point.intensity)} {point.intensity} intensity
                  </p>
                </div>

                {/* Movement Arrow (for severe cases) */}
                {point.intensity === 'severe' && (
                  <div className="absolute -top-2 -right-2">
                    <Navigation className="w-3 h-3 text-destructive animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              Coverage: 100%
            </Badge>
            <Badge variant="outline" className="text-xs">
              Last Update: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {cloudburstData.length} active detection zones
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapSection;