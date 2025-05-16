
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SectionHeader from '@/components/SectionHeader';
import PricingCard from '@/components/PricingCard';

interface PricingPlan {
  id: string;
  name_plan: string;
  price: string;
  features: string;
  perks: string | null;
}

interface Offer {
  id: string;
  percentage: string | null;
  expiry_at: string | null;
  status: string | null;
}

const Pricing = () => {
  const { toast: toastNotify } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        // Fetch pricing plans
        const { data: plansData, error: plansError } = await supabase
          .from('pricing')
          .select('*')
          .order('price');
        
        if (plansError) throw plansError;
        
        // Fetch active offers
        const now = new Date().toISOString();
        const { data: offersData, error: offersError } = await supabase
          .from('offers')
          .select('*')
          .eq('status', 'Plans')
          .gt('expiry_at', now)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (offersError) throw offersError;
        
        // Set the active offer if available
        if (offersData && offersData.length > 0) {
          setActiveOffer(offersData[0]);
        }
        
        setPlans(plansData || []);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
        toastNotify({
          title: "Error",
          description: "Failed to fetch pricing information. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPricingPlans();
  }, [toastNotify]);

  // Function to parse features string into an array
  const parseFeatures = (featuresStr: string): string[] => {
    try {
      return featuresStr.split('\n').map(feature => feature.trim()).filter(Boolean);
    } catch (e) {
      return [];
    }
  };

  // Function to parse perks string into an array
  const parsePerks = (perksStr: string | null): string[] => {
    if (!perksStr) return [];
    try {
      return perksStr.split('\n').map(perk => perk.trim()).filter(Boolean);
    } catch (e) {
      return [];
    }
  };

  // Function to calculate discounted price
  const calculateDiscountedPrice = (originalPrice: string): { original: string; discounted: string | null } => {
    if (!activeOffer || !activeOffer.percentage) {
      return { original: originalPrice, discounted: null };
    }
    
    const price = parseFloat(originalPrice);
    const discountPercentage = parseFloat(activeOffer.percentage);
    
    if (isNaN(price) || isNaN(discountPercentage)) {
      return { original: originalPrice, discounted: null };
    }
    
    const discountAmount = price * (discountPercentage / 100);
    const discountedPrice = price - discountAmount;
    
    return {
      original: originalPrice,
      discounted: discountedPrice.toFixed(2)
    };
  };

  const handleChoosePlan = (plan: PricingPlan) => {
    toast(`You've selected the ${plan.name_plan} plan`, {
      description: "Contact sales for next steps.",
      action: {
        label: "Contact Sales",
        onClick: () => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  };

  // Function to determine the plan variant
  const getPlanVariant = (planName: string): 'primary' | 'secondary' | 'premium' | 'basic' => {
    const lowerPlanName = planName.toLowerCase();
    if (lowerPlanName.includes('premium')) return 'premium';
    if (lowerPlanName.includes('standard')) return 'secondary';
    if (lowerPlanName.includes('basic')) return 'basic';
    return 'primary';
  };

  // Function to determine if plan is recommended
  const isRecommended = (planName: string): boolean => {
    const lowerPlanName = planName.toLowerCase();
    return lowerPlanName.includes('recommended') || lowerPlanName.includes('premium');
  };

  return (
    <div className="pt-24 pb-16" id="pricing">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <SectionHeader
            title="Pricing Plans"
            subtitle="Choose the perfect plan for your smartphone unlocking and flashing needs"
            highlightWord="Plans"
          />
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="h-12 w-12 text-pegasus-orange animate-spin mb-4" />
              <p className="text-lg text-gray-500 dark:text-gray-400">Loading pricing plans...</p>
            </div>
          ) : plans.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {plans.map((plan, index) => {
                const features = parseFeatures(plan.features);
                const perks = parsePerks(plan.perks);
                const planVariant = getPlanVariant(plan.name_plan);
                const recommended = isRecommended(plan.name_plan);
                
                // Apply discount if offer is active
                const { original, discounted } = calculateDiscountedPrice(plan.price);

                return (
                  <PricingCard
                    key={plan.id}
                    id={plan.id}
                    name={plan.name_plan}
                    price={discounted || original}
                    originalPrice={discounted ? original : undefined}
                    features={features}
                    perks={perks}
                    index={index}
                    recommended={recommended}
                    variant={planVariant}
                    onChoosePlan={() => handleChoosePlan(plan)}
                  />
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-20 px-4 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">No pricing plans available at the moment</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Please check back later or contact us for custom pricing tailored to your needs.
              </p>
              <Button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white"
              >
                Contact Us
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
