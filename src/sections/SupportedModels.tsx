
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="pt-24 pb-16 py-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 opacity-0 animate-fade-in-delay-1" style={{
            animationFillMode: 'forwards'
          }}>
            Supported Models
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{
            animationFillMode: 'forwards'
          }}>
            Discover all the smartphone models supported by Pegasus Tool
          </p>
        </div>
      </section>

      {/* Brands Section with Dropdown */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Select a Brand</h2>
            
            {isLoading ? (
              <div className="w-full max-w-md h-10 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            ) : brands.length > 0 ? (
              <Select value={selectedBrand || undefined} onValueChange={handleBrandSelect}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      <div className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4 text-pegasus-orange" />
                        {brand}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-center py-6">
                <p className="text-lg text-gray-500 dark:text-gray-400">No brands available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Models Section */}
      {selectedBrand && (
        <section className="py-0">
          <div className="container mx-auto px-4">
            <Card className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
              <CardHeader className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-2xl font-bold">{selectedBrand} Models</CardTitle>
                <div className="relative w-full md:w-64 mt-4 md:mt-0">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search models..." 
                    className="pl-10" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                  />
                </div>
              </CardHeader>

              <CardContent className="p-4">
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
                        <TableRow>
                          <TableHead className="w-[250px]">Model</TableHead>
                          <TableHead>Security</TableHead>
                          <TableHead>Carrier</TableHead>
                          <TableHead>Operation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentModels.map(model => (
                          <TableRow key={model.id} className="hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors">
                            <TableCell className="font-medium">{model.model}</TableCell>
                            <TableCell>{model.security || "—"}</TableCell>
                            <TableCell>{model.carrier || "—"}</TableCell>
                            <TableCell>{model.operation || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredModels.length > 0 ? indexOfFirstModel + 1 : 0}-{Math.min(indexOfLastModel, filteredModels.length)} of {filteredModels.length} models
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => paginate(currentPage - 1)} 
                          disabled={currentPage === 1}
                          className="transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{currentPage} / {totalPages || 1}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => paginate(currentPage + 1)} 
                          disabled={currentPage === totalPages || totalPages === 0}
                          className="transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchQuery ? "No models found matching your search" : `No models found for ${selectedBrand}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default SupportedModels;
