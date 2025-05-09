
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone } from "lucide-react";
import { cn } from '@/lib/utils';

interface BrandSelectorProps {
  brands: string[];
  selectedBrand: string | null;
  onBrandSelect: (brand: string) => void;
  className?: string;
  isLoading?: boolean;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({
  brands,
  selectedBrand,
  onBrandSelect,
  className,
  isLoading = false
}) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {isLoading ? (
        <div className="w-full h-10 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      ) : brands.length > 0 ? (
        <Select value={selectedBrand || undefined} onValueChange={onBrandSelect}>
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-900/30 focus:ring-pegasus-orange focus:border-pegasus-orange transition-all duration-300 shadow-sm hover:shadow">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-900/30 max-h-[400px]">
            {brands.map(brand => (
              <SelectItem 
                key={brand} 
                value={brand}
                className="hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer font-medium"
              >
                <div className="flex items-center">
                  <Smartphone className="mr-2 h-4 w-4 text-pegasus-orange" />
                  {brand}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="text-center py-4">
          <p className="text-lg text-gray-500 dark:text-gray-400">No brands available</p>
        </div>
      )}
    </div>
  );
};

export default BrandSelector;
