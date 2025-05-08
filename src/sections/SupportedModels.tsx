
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SupportedModel {
  id: string;
  brand: string;
  model: string;
  security: string | null;
  carrier: string | null;
  operation: string | null;
}

const SupportedModels = () => {
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
        const { data, error } = await supabase
          .from('supported_models')
          .select('brand')
          .order('brand')
          
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
      const { data, error } = await supabase
        .from('supported_models')
        .select('*')
        .eq('brand', brand)
        .order('model');
        
      if (error) throw error;
      
      setModels(data);
      setCurrentPage(1); // Reset to first page when changing brands
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching models:", error);
      setIsLoading(false);
    }
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
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
      <section className="bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Supported Models
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Discover all the smartphone models supported by Pegasus Tool
          </p>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Select a Brand</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton cards
              Array(8).fill(0).map((_, index) => (
                <Card key={`loading-${index}`} className="h-40 animate-pulse">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </CardContent>
                </Card>
              ))
            ) : brands.length > 0 ? (
              brands.map((brand) => (
                <Card 
                  key={brand}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedBrand === brand 
                      ? 'bg-orange-50 dark:bg-orange-900/30 border-orange-300 dark:border-orange-600' 
                      : 'hover:bg-orange-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">{brand}</CardTitle>
                    <Smartphone className={`h-6 w-6 ${selectedBrand === brand ? 'text-pegasus-orange' : 'text-gray-400'}`} />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedBrand === brand ? "Currently selected" : "Click to view models"}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-lg text-gray-500 dark:text-gray-400">No brands available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Models Section */}
      {selectedBrand && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{selectedBrand} Models</h3>
                <div className="relative w-64">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search models..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

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
                      {currentModels.map((model) => (
                        <TableRow key={model.id} className="hover:bg-orange-50 dark:hover:bg-orange-900/10">
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
                      Showing {indexOfFirstModel + 1}-{Math.min(indexOfLastModel, filteredModels.length)} of {filteredModels.length} models
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{currentPage} / {totalPages || 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">No models found for {selectedBrand}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SupportedModels;
