
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import BrandSelector from '@/components/BrandSelector';
import SectionHeader from '@/components/SectionHeader';
import AnimatedCard from '@/components/AnimatedCard';

interface SupportedModel {
  id: string;
  brand: string;
  model: string;
  security: string | null;
  carrier: string | null;
  operation: string | null;
}

const SupportedModels = () => {
  const { toast } = useToast();
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [models, setModels] = useState<SupportedModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const modelsPerPage = 6;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('supported_models').select('brand').order('brand');
        if (error) throw error;

        // Extract unique brands
        const uniqueBrands = Array.from(new Set(data.map(item => item.brand)));
        setBrands(uniqueBrands);

        // Select first brand by default if there are brands
        if (uniqueBrands.length > 0 && !selectedBrand) {
          setSelectedBrand(uniqueBrands[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast({
          title: "Error",
          description: "Failed to load brands. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetchModelsByBrand(selectedBrand);
    }
  }, [selectedBrand]);

  const fetchModelsByBrand = async (brand: string) => {
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from('supported_models').select('*').eq('brand', brand).order('model');
      if (error) throw error;
      setModels(data);
      setCurrentPage(1); // Reset to first page when changing brands
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching models:", error);
      toast({
        title: "Error",
        description: "Failed to load models. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSearchQuery(""); // Clear search when changing brands
  };

  const filteredModels = models.filter(model => 
    model.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (model.carrier && model.carrier.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (model.security && model.security.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (model.operation && model.operation.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
  
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <SectionHeader
            title="Supported Models"
            subtitle="Discover all the smartphone models supported by Pegasus Tool"
          />
        </div>
      </section>

      {/* Brands Section with Dropdown */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Select a Brand</h2>
            
            <BrandSelector 
              brands={brands} 
              selectedBrand={selectedBrand} 
              onBrandSelect={handleBrandSelect} 
              isLoading={isLoading} 
              className="opacity-0 animate-fade-in" 
            />
          </div>
        </div>
      </section>

      {/* Models Section */}
      {selectedBrand && (
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <AnimatedCard variant="elegant" delay={0.2} className="shadow-lg overflow-hidden border-orange-200 dark:border-orange-900/30">
              <CardHeader className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 p-6">
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
                  {selectedBrand} Models
                </CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search models..." 
                    className="pl-10 border-orange-200 dark:border-orange-900/30 focus:border-pegasus-orange focus:ring-pegasus-orange" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                  />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                ) : currentModels.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-orange-200 dark:border-orange-900/30">
                          <TableHead className="w-[250px] text-gray-800 dark:text-gray-200">Model</TableHead>
                          <TableHead className="text-gray-800 dark:text-gray-200">Security</TableHead>
                          <TableHead className="text-gray-800 dark:text-gray-200">Carrier</TableHead>
                          <TableHead className="text-gray-800 dark:text-gray-200">Operation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentModels.map((model, index) => (
                          <TableRow 
                            key={model.id} 
                            className="hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors border-orange-100 dark:border-orange-900/20"
                            style={{
                              opacity: 0,
                              animation: 'fade-in 0.3s ease-out forwards',
                              animationDelay: `${index * 0.05 + 0.1}s`
                            }}
                          >
                            <TableCell className="font-medium text-gray-800 dark:text-gray-200">{model.model}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{model.security || "—"}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{model.carrier || "—"}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{model.operation || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-8">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredModels.length > 0 ? indexOfFirstModel + 1 : 0}-{Math.min(indexOfLastModel, filteredModels.length)} of {filteredModels.length} models
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => paginate(currentPage - 1)} 
                          disabled={currentPage === 1}
                          className="transition-colors border-orange-200 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-pegasus-orange"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{currentPage} / {totalPages || 1}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => paginate(currentPage + 1)} 
                          disabled={currentPage === totalPages || totalPages === 0}
                          className="transition-colors border-orange-200 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-pegasus-orange"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 opacity-0 animate-fade-in" style={{animationFillMode: 'forwards'}}>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">
                      {searchQuery ? "No models found matching your search" : `No models found for ${selectedBrand}`}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Try adjusting your search or selecting a different brand
                    </p>
                  </div>
                )}
              </CardContent>
            </AnimatedCard>
          </div>
        </section>
      )}
    </div>
  );
};

export default SupportedModels;
