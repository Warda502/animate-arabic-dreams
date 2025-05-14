
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface Offer {
  id: number;
  discount_percentage: number;
  is_active: boolean;
  expiry_date: string | null;
  valid: boolean;
}

const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pricing plans
        const { data: plansData, error: plansError } = await supabase
          .from('pricing')
          .select('*')
          .order('id');
        
        if (plansError) throw plansError;

        // Transform the data to match PricingPlan interface
        const formattedPlans: PricingPlan[] = plansData ? plansData.map((plan: any) => ({
          id: Number(plan.id) || 0,
          name: plan.name_plan,
          description: plan.name_plan,
          price: parseFloat(plan.price || '0'),
          features: plan.features ? plan.features.split(',').map((feature: string) => feature.trim()) : [],
          recommended: plan.name_plan.toLowerCase().includes('recommended')
        })) : [];
        
        // Fetch active offers
        const { data: offersData, error: offersError } = await supabase
          .from('offers')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (offersError) throw offersError;
        
        // Transform to match Offer interface
        const activeOffer = offersData && offersData.length > 0 ? {
          id: Number(offersData[0].id) || 0,
          discount_percentage: parseFloat(offersData[0].percentage || '0'),
          is_active: offersData[0].status === 'active',
          expiry_date: offersData[0].expiry_at,
          valid: true
        } : null;
        
        setPricingPlans(formattedPlans);
        setOffer(activeOffer);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: 'Failed to load pricing data',
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (originalPrice: number) => {
    if (!offer) return originalPrice;
    
    const discountAmount = (originalPrice * offer.discount_percentage) / 100;
    return originalPrice - discountAmount;
  };

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for your needs. All plans include access to our core features.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const originalPrice = plan.price;
              const discountedPrice = calculateDiscountedPrice(originalPrice);
              const hasDiscount = offer && discountedPrice < originalPrice;
              
              return (
                <div 
                  key={plan.id} 
                  className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 bg-white dark:bg-gray-800 ${
                    plan.recommended ? 'ring-2 ring-blue-500 scale-105 z-10' : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="bg-blue-500 text-white text-center py-2 font-semibold">
                      Recommended
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      {hasDiscount ? (
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">${discountedPrice.toFixed(2)}</span>
                          <span className="text-lg text-gray-500 line-through ml-2">${originalPrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-4 rounded-md ${
                        plan.recommended 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                      }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
