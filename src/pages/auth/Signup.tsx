
import React, { useState } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, EyeIcon, EyeOffIcon, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'student' | 'employee'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill out all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully');
      navigate('/auth/verification');
    }, 1500);
  };
  
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          <div className="flex flex-col space-y-2 text-center mb-4">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Sign up to start sharing rides with your community
            </p>
          </div>
          
          <div className="flex justify-center space-x-3 mb-2">
            <Button
              type="button"
              variant={accountType === 'student' ? 'default' : 'outline'}
              onClick={() => setAccountType('student')}
              className="relative px-4 py-2 h-auto"
            >
              Student
              {accountType === 'student' && (
                <Badge className="absolute -top-2 -right-2 text-[10px] px-1.5">
                  Selected
                </Badge>
              )}
            </Button>
            <Button
              type="button"
              variant={accountType === 'employee' ? 'default' : 'outline'}
              onClick={() => setAccountType('employee')}
              className="relative px-4 py-2 h-auto"
            >
              Employee
              {accountType === 'employee' && (
                <Badge className="absolute -top-2 -right-2 text-[10px] px-1.5">
                  Selected
                </Badge>
              )}
            </Button>
          </div>
          
          <BlurContainer className="p-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="glass-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {accountType === 'student' ? 'School Email' : 'Work Email'}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    accountType === 'student'
                      ? 'you@university.edu'
                      : 'you@company.com'
                  }
                  className="glass-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {accountType === 'student'
                    ? 'Must be a valid educational email'
                    : 'Must be a valid corporate email'}
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="glass-input pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" /> Create account
                  </div>
                )}
              </Button>
            </form>
          </BlurContainer>
          
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
