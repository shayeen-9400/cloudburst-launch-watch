import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Satellite,
  MessageSquare,
  Menu,
  Bell,
  Settings
} from 'lucide-react';
import MapSection from './MapSection';
import ChartsSection from './ChartsSection';
import PredictionPanel from './PredictionPanel';
import ChatBot from './ChatBot';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Mock alert data
  const currentAlert = {
    level: 'severe',
    message: 'High cloudburst activity detected in Bay of Bengal. Launching not recommended.',
    timestamp: new Date().toLocaleTimeString()
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'severe': return 'destructive';
      case 'moderate': return 'warning';
      case 'mild': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/20 animate-glow-pulse">
                <Satellite className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CDLP Mission Control</h1>
                <p className="text-xs text-muted-foreground">Cloudburst Detection & Launch Prediction</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Live Status Indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse"></div>
                <span className="text-sm text-muted-foreground">LIVE</span>
              </div>
              
              {/* Alert Indicator */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-glow-pulse"></div>
              </Button>
              
              {/* Settings */}
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              
              {/* Menu */}
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Current Alert Banner */}
        <Card className="border-destructive/50 bg-gradient-alert shadow-glow-danger">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive-foreground mt-0.5 animate-glow-pulse" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="destructive" className="text-xs">ALERT</Badge>
                  <span className="text-xs text-destructive-foreground/70">{currentAlert.timestamp}</span>
                </div>
                <p className="text-destructive-foreground font-medium">{currentAlert.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <MapSection />

        {/* Charts Section */}
        <ChartsSection />

        {/* Prediction Panel */}
        <PredictionPanel />

        {/* System Status Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Satellite Network</span>
                <Badge variant="secondary" className="ml-auto text-xs">ONLINE</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Data Processing</span>
                <Badge variant="secondary" className="ml-auto text-xs">ACTIVE</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Coverage Area</span>
                <Badge variant="secondary" className="ml-auto text-xs">100%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary shadow-glow-primary animate-float z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      {/* Chat Bot */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Dashboard;