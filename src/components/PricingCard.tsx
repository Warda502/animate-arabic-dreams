
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

interface PricingPlanProps {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  perks?: string[];
  index: number;
  recommended?: boolean;
  onChoosePlan: () => void;
  variant?: 'primary' | 'secondary' | 'premium' | 'basic';
}

const PricingCard: React.FC<PricingPlanProps> = ({
  id,
  name,
  price,
  originalPrice,
  features,
  perks = [],
  index,
  recommended = false,
  onChoosePlan,
  variant = 'primary'
}) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'premium':
        return 'from-purple-500 to-indigo-600';
      case 'secondary':
        return 'from-blue-500 to-cyan-600';
      case 'basic':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-orange-500 to-amber-600';
    }
  };

  const getTextColorClass = () => {
    switch (variant) {
      case 'premium':
        return 'text-purple-600 dark:text-purple-400';
      case 'secondary':
        return 'text-blue-600 dark:text-blue-400';
      case 'basic':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-pegasus-orange';
    }
  };

  const handleContactSales = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast.info(`For more information about our ${name} plan, please contact our sales team.`);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500 relative transform hover:-translate-y-2 hover:shadow-pricing",
        recommended ? "shadow-xl border-pegasus-orange scale-105" : "shadow-md border-gray-200 dark:border-gray-700",
        "opacity-0"
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: 'fade-in 0.5s ease-out forwards'
      }}
    >
      {recommended && (
        <div className="absolute -right-12 top-7 bg-pegasus-orange text-white py-1 px-10 transform rotate-45 shadow-md text-sm font-semibold">
          Recommended
        </div>
      )}
      <div className={cn(`h-2 w-full bg-gradient-to-r ${getGradientClass()}`)}></div>
      <CardHeader className="pt-6">
        <CardTitle className={cn("text-2xl font-bold", getTextColorClass())}>
          {name}
        </CardTitle>
        <div className="mt-4 flex items-center">
          {originalPrice && (
            <span className="text-lg text-gray-400 dark:text-gray-500 font-normal line-through mr-2">${originalPrice}</span>
          )}
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">${price}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-1">PER MONTH</span>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <div className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5 flex items-center justify-center">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        {perks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className={cn("font-semibold mb-3", getTextColorClass())}>Extra Perks:</h4>
            <ul className="space-y-2">
              {perks.map((perk, i) => (
                <li key={i} className="flex items-start">
                  <div className="h-4 w-4 mr-2 shrink-0 mt-0.5 text-amber-500 flex items-center justify-center">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              className={cn(
                "w-full bg-gradient-to-r hover:opacity-90 transition-all duration-300 text-white shadow-md",
                getGradientClass()
              )}
            >
              Choose Plan <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              onClick={onChoosePlan}
              className="cursor-pointer"
            >
              Purchase Now
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleContactSales}
              className="cursor-pointer"
            >
              Contact Sales
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => window.location.href = '/faq'}
              className="cursor-pointer"
            >
              Read FAQ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
