
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login successful!');
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
          <Card className="p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Reseller Login</h1>
              <p className="text-gray-600 mt-2">Access your reseller dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-hw-blue focus:ring-hw-blue border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <a href="#" className="text-sm font-medium text-hw-blue hover:text-blue-600">
                    Forgot password?
                  </a>
                </div>
                
                <Button type="submit" className="w-full bg-hw-blue hover:bg-blue-600 text-white py-2 rounded-full">
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have a reseller account? {" "}
                <a href="#" className="font-medium text-hw-blue hover:text-blue-600">
                  Apply now
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
