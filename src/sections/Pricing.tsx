
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import PricingCard from "@/components/PricingCard";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  perks?: string[];
  recommended?: boolean;
}

interface Offer {
  id: string;
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
          id: plan.id || '',
          name: plan.name_plan || '',
          description: plan.name_plan || '',
          price: plan.price || '0',
          features: plan.features ? plan.features.split(',').map((feature: string) => feature.trim()) : [],
          perks: plan.perks ? plan.perks.split(',').map((perk: string) => perk.trim()) : [],
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
          id: offersData[0].id || '',
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

  const handleChoosePlan = () => {
    toast.info("You need to contact sales to purchase this plan.");
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
          
          {offer && (
            <div className="mt-6">
              <span className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Special Offer: {offer.discount_percentage}% OFF on all plans
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                id={plan.id}
                name={plan.name}
                price={plan.price}
                features={plan.features}
                perks={plan.perks}
                index={index}
                recommended={plan.recommended}
                onChoosePlan={handleChoosePlan}
                variant={index === 0 ? 'basic' : index === 1 ? 'secondary' : 'premium'}
                discountPercentage={offer ? offer.discount_percentage : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
