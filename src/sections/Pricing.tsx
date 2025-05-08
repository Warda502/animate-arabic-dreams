
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PricingPlan {
  id: string;
  name_plan: string;
  price: string;
  features: string;
  perks: string | null;
}

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing')
          .select('*')
          .order('price');
          
        if (error) throw error;
        
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  // Function to parse features string into an array
  const parseFeatures = (featuresStr: string): string[] => {
    try {
      return featuresStr.split(',').map(feature => feature.trim());
    } catch (e) {
      return [];
    }
  };

  // Function to parse perks string into an array
  const parsePerks = (perksStr: string | null): string[] => {
    if (!perksStr) return [];
    try {
      return perksStr.split(',').map(perk => perk.trim());
    } catch (e) {
      return [];
    }
  };

  // Function to get a card highlight color based on plan name
  const getPlanColor = (planName: string): string => {
    const lowerPlanName = planName.toLowerCase();
    if (lowerPlanName.includes('premium')) return 'from-purple-500 to-indigo-600';
    if (lowerPlanName.includes('standard')) return 'from-blue-500 to-cyan-600';
    if (lowerPlanName.includes('basic')) return 'from-green-500 to-emerald-600';
    return 'from-orange-500 to-amber-600'; // default
  };

  // Function to get a card highlight text color based on plan name
  const getPlanTextColor = (planName: string): string => {
    const lowerPlanName = planName.toLowerCase();
    if (lowerPlanName.includes('premium')) return 'text-purple-600 dark:text-purple-400';
    if (lowerPlanName.includes('standard')) return 'text-blue-600 dark:text-blue-400';
    if (lowerPlanName.includes('basic')) return 'text-green-600 dark:text-green-400';
    return 'text-pegasus-orange'; // default
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Pricing Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Choose the perfect plan for your smartphone unlocking and flashing needs
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="h-12 w-12 text-pegasus-orange animate-spin mb-4" />
              <p className="text-lg text-gray-500 dark:text-gray-400">Loading pricing plans...</p>
            </div>
          ) : plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const features = parseFeatures(plan.features);
                const perks = parsePerks(plan.perks);
                const planColor = getPlanColor(plan.name_plan);
                const textColor = getPlanTextColor(plan.name_plan);
                
                return (
                  <Card 
                    key={plan.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-xl relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${planColor}`}></div>
                    <CardHeader className="pt-6">
                      <CardTitle className={`text-2xl font-bold ${textColor}`}>
                        {plan.name_plan}
                      </CardTitle>
                      <p className="text-3xl font-bold mt-2">
                        {plan.price}
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/license</span>
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {perks.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Extra Perks:</h4>
                          <ul className="space-y-2">
                            {perks.map((perk, i) => (
                              <li key={i} className="flex items-start">
                                <Check className={`h-4 w-4 ${textColor} mr-2 shrink-0 mt-0.5`} />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full bg-gradient-to-r ${planColor} hover:opacity-90 transition-opacity text-white`}
                      >
                        Choose Plan
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400">No pricing plans available at the moment.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Please check back later or contact us for custom pricing.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long is a license valid?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our standard licenses are valid for one month from the activation date, while our premium licenses offer extended validity periods. Check the specific plan details for more information.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I use the tool on multiple computers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Each license is typically tied to a single hardware ID. If you need to use the tool on multiple computers, please consider our multi-device plans or contact our support team.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We offer a satisfaction guarantee. If you encounter any issues with our tool that we can't resolve, please contact our support team within 7 days of purchase to discuss refund options.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I get support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We provide technical support via email and our dedicated support portal. Premium plans include priority support with faster response times and direct access to our technical team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
            Choose your plan now and unlock the full potential of your smartphone repair business.
          </p>
          <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full text-lg shadow-lg">
            View All Plans
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
