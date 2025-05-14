
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PaymentMethod {
  id: number;
  name: string;
  icon_svg: string;
  description: string;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_methods')
          .select('*')
          .order('id');
        
        if (error) throw error;
        setPaymentMethods(data || []);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast({
          title: "Error",
          description: 'Failed to load payment methods',
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Accepted Payment Methods
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Flexible options available through our resellers
          </p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-10">We Accept</h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              </div>
            ) : paymentMethods.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
                  >
                    <div className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: method.icon_svg }} />
                    <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p>No payment methods found.</p>
              </div>
            )}
            
            <div className="text-center text-gray-600">
              <p className="mb-6">
                Availability of specific methods depends on the reseller. Please check with your chosen reseller for details.
              </p>
              <p>
                Our resellers provide various payment options to accommodate your preferences and location. Contact your regional reseller for specific payment instructions.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Payment Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Payment Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-hw-blue text-white flex items-center justify-center font-bold text-lg">1</div>
                <div className="h-20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Contact a Reseller</h3>
                <p className="text-gray-600">
                  Choose an official reseller from our list and contact them through their preferred communication channel.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-hw-blue text-white flex items-center justify-center font-bold text-lg">2</div>
                <div className="h-20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Payment</h3>
                <p className="text-gray-600">
                  Complete the payment using one of the available methods provided by your reseller.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-hw-blue text-white flex items-center justify-center font-bold text-lg">3</div>
                <div className="h-20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Activation</h3>
                <p className="text-gray-600">
                  After payment confirmation, you'll receive your license activation details from the reseller.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing Information</h2>
          
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-hw-blue">License Options</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1-Month License</h4>
                      <p className="text-gray-600 text-sm">Full feature access for 30 days</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Annual License</h4>
                      <p className="text-gray-600 text-sm">Full feature access for 1 year (best value)</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Credits System</h4>
                      <p className="text-gray-600 text-sm">Pay-per-use option for occasional users</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-hw-blue">Important Notes</h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Prices vary between resellers and regions</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Discounts available for bulk purchases</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Regular users may benefit from longer-term licenses</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Automatic updates included with valid licenses</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Contact a Reseller for Pricing
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentMethods;
