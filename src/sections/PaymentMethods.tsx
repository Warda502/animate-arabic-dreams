
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PaymentMethod {
  id: string;
  method: string;
  description: string | null;
  image_url: string | null;
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

  return <div className="pt-24 pb-20 bg-white dark:bg-gray-900 py-[86px]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-pegasus-orange">Payment Methods</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Multiple secure payment options for your convenience
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-6 border border-orange-200 dark:border-orange-900/30 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {method.image_url ? (
                    <img src={method.image_url} alt={method.method} className="h-12 w-auto" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2">{method.method}</h2>
                <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-16 max-w-4xl mx-auto">
          
        </div>
      </div>
    </div>;
};

export default PaymentMethods;
