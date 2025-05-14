
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SectionHeader from '@/components/SectionHeader';

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
          .select('*');
        
        if (error) throw error;
        setPaymentMethods(data || []);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.error('Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Fallback icons based on method name
  const getIconForMethod = (method: string) => {
    const methodLower = method.toLowerCase();
    
    if (methodLower.includes('card') || methodLower.includes('credit') || methodLower.includes('debit')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    } else if (methodLower.includes('paypal')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pegasus-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      );
    } else if (methodLower.includes('crypto') || methodLower.includes('bitcoin')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (methodLower.includes('bank') || methodLower.includes('transfer')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      );
    } else if (methodLower.includes('mobile') || methodLower.includes('apple') || methodLower.includes('google')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else {
      // Default icon
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Payment Methods" 
          subtitle="Multiple secure payment options for your convenience"
          highlightWord="Payment"
        />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 text-pegasus-orange animate-spin mb-4" />
            <p className="text-lg text-gray-500 dark:text-gray-400">Loading payment methods...</p>
          </div>
        ) : paymentMethods.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                variants={item}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="p-8 h-full border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-sm flex flex-col items-center text-center hover:border-pegasus-orange/40 dark:hover:border-pegasus-orange/40 transition-all duration-300">
                  <motion.div 
                    className="mb-6 p-4 rounded-full bg-orange-50 dark:bg-orange-900/20"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                  >
                    {method.image_url ? (
                      <img 
                        src={method.image_url} 
                        alt={method.method} 
                        className="h-16 w-16 object-contain"
                      />
                    ) : (
                      getIconForMethod(method.method)
                    )}
                  </motion.div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">{method.method}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{method.description || `Securely pay with ${method.method}.`}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow mt-10">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No payment methods available</h3>
            <p className="text-gray-500 dark:text-gray-400">Please check back later for available payment options</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
