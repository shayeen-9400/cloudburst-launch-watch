import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-card/80 backdrop-blur-sm shadow-card border-border/50">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="p-4 rounded-full bg-destructive/20 w-20 h-20 mx-auto mb-4 animate-glow-pulse">
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              404
            </h1>
            <h2 className="text-xl font-semibold text-foreground mb-2">Mission Not Found</h2>
            <p className="text-muted-foreground">
              The requested coordinates are outside our monitored space.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full border-border hover:border-primary hover:shadow-glow-primary transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Previous Location
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Mission Control
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              🛰️ CDLP Mission Control - Error Code: 404
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
