
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface PricingCardProps {
  id: string;
  name: string;
  price: string;
  features: string[];
  perks: string[];
  index: number;
  recommended?: boolean;
  variant?: 'primary' | 'secondary' | 'premium' | 'basic';
  onChoosePlan: () => void;
}

const EnhancedPricingCard: React.FC<PricingCardProps> = ({
  id,
  name,
  price,
  features,
  perks,
  index,
  recommended = false,
  variant = 'primary',
  onChoosePlan
}) => {
  const bgColors = {
    primary: 'bg-white dark:bg-gray-800',
    secondary: 'bg-white dark:bg-gray-800',
    premium: 'bg-gradient-to-b from-white to-amber-50 dark:from-gray-800 dark:to-amber-950/30',
    basic: 'bg-white dark:bg-gray-800'
  };
  
  const borderColors = {
    primary: 'border-blue-200 dark:border-blue-800',
    secondary: 'border-orange-200 dark:border-orange-800/40',
    premium: 'border-amber-300 dark:border-amber-700',
    basic: 'border-gray-200 dark:border-gray-700'
  };

  const headingColors = {
    primary: 'text-blue-700 dark:text-blue-400',
    secondary: 'text-orange-600 dark:text-orange-400',
    premium: 'text-amber-600 dark:text-amber-500',
    basic: 'text-gray-700 dark:text-gray-400'
  };

  // Animation for the recommended badge
  const badgeAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 30, 
      delay: index * 0.1 + 0.2 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className={`relative h-full overflow-hidden border-2 ${borderColors[variant]} ${bgColors[variant]} shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        {recommended && (
          <motion.div 
            className="absolute top-0 right-0" 
            {...badgeAnimation}
          >
            <Badge 
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 text-xs rounded-bl-lg rounded-tr-none border-0 uppercase font-semibold"
            >
              Recommended
            </Badge>
          </motion.div>
        )}
        
        <CardHeader className={`pb-3 ${recommended ? 'pt-10' : 'pt-6'}`}>
          <CardTitle className={`text-2xl font-bold ${headingColors[variant]}`}>
            {name}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 mt-1 min-h-[40px]">
            {price === "0" ? "Free" : `$${price}`}
            {price !== "0" && (
              <span className="text-sm text-gray-500 dark:text-gray-500 ml-1">
                / month
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {features && features.length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Features:</p>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {perks && perks.length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Additional Perks:</p>
              <ul className="space-y-2">
                {perks.map((perk, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-4 pb-6">
          <Button
            onClick={onChoosePlan}
            className={`w-full ${
              variant === 'premium' 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : variant === 'secondary'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : variant === 'basic' 
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            size="lg"
          >
            Choose Plan
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedPricingCard;
