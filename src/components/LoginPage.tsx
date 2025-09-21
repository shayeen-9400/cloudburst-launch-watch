import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Satellite, Shield, Phone, Lock } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:8000/api';

  const handleSendOTP = async () => {
    if (phoneNumber.length >= 10) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone_number: phoneNumber }),
        });
        const data = await response.json();
        if (data.success) {
          setStep('otp');
        } else {
          setError(data.message || 'Failed to send OTP.');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone_number: phoneNumber, otp: otp }),
        });
        const data = await response.json();
        if (data.success) {
          console.log('Login successful! Token:', data.token);
          onLogin();
        } else {
          setError(data.detail || data.message || 'OTP verification failed.');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-60" />
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/20 animate-glow-pulse">
              <Satellite className="w-8 h-8 text-primary" />
            </div>
            <Shield className="w-6 h-6 text-secondary animate-float" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Cloudburst Detection System
          </h1>
          <p className="text-muted-foreground italic">
            "Stay safe with real-time cloudburst alerts."
          </p>
        </div>
        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-foreground">
              {isSignup ? 'Create Account' : 'Secure Login'}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {step === 'phone'
                ? 'Enter your phone number to receive OTP'
                : 'Enter the 6-digit verification code'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {step === 'phone' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 bg-input border-border focus:border-primary focus:shadow-glow-primary transition-all duration-300"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSendOTP}
                  className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                  disabled={phoneNumber.length < 10 || loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-foreground">Verification Code</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="pl-10 tracking-widest bg-input border-border focus:border-primary focus:shadow-glow-primary transition-all duration-300"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                  disabled={otp.length !== 6 || loading}
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep('phone')}
                  className="w-full border-border hover:border-primary hover:shadow-glow-primary transition-all duration-300"
                >
                  Back to Phone Number
                </Button>
              </div>
            )}
            <div className="pt-4 border-t border-border/30 space-y-3">
              <Button
                variant="ghost"
                onClick={() => setIsSignup(!isSignup)}
                className="w-full text-muted-foreground hover:text-primary transition-colors"
              >
                {isSignup ? 'Already have an account? Login' : 'New user? Create Account'}
              </Button>
              {!isSignup && (
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Forgot Password?
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Secured by military-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;