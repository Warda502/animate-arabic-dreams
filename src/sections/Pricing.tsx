
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import SectionHeader from '@/components/SectionHeader';
import PricingCard from '@/components/PricingCard';

interface PricingPlan {
  id: string;
  name_plan: string;
  price: string;
  features: string;
  perks: string | null;
}

const Pricing = () => {
  const { toast: toastNotify } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('pricing').select('*').order('price');
        if (error) throw error;
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
        toastNotify({
          title: "Error loading pricing plans",
          description: "Please try again later",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    fetchPricingPlans();
  }, []);

  // Function to parse features string into an array
  const parseFeatures = (featuresStr: string): string[] => {
    try {
      return featuresStr.split('\n').map(feature => feature.trim());
    } catch (e) {
      return [];
    }
  };

  // Function to parse perks string into an array
  const parsePerks = (perksStr: string | null): string[] => {
    if (!perksStr) return [];
    try {
      return perksStr.split('\n').map(perk => perk.trim());
    } catch (e) {
      return [];
    }
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

  const getPlanCardWidth = () => {
    const count = plans.length;
    if (count === 1) return 'md:max-w-md';
    if (count === 2) return 'md:max-w-3xl';
    return 'md:max-w-6xl';
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <SectionHeader
            title="Pricing Plans"
            subtitle="Choose the perfect plan for your smartphone unlocking and flashing needs"
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
            <div className={`flex justify-center items-center ${plans.length === 1 ? 'mt-10 mb-10' : ''}`}>
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(plans.length, 3)} gap-8 ${getPlanCardWidth()}`}>
                {plans.map((plan, index) => {
                  const features = parseFeatures(plan.features);
                  const perks = parsePerks(plan.perks);
                  const planVariant = getPlanVariant(plan.name_plan);
                  const recommended = isRecommended(plan.name_plan);

                  return (
                    <PricingCard
                      key={plan.id}
                      id={plan.id}
                      name={plan.name_plan}
                      price={plan.price}
                      features={features}
                      perks={perks}
                      index={index}
                      recommended={recommended}
                      variant={planVariant}
                      onChoosePlan={() => handleChoosePlan(plan)}
                    />
                  );
                })}
              </div>
            </div>
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
