import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownloadClick = async () => {
    try {
      // Call the increment_counter function
      const { data, error } = await supabase.rpc('increment_counter');
      console.error('increment_counter', error);
      
      if (error) {
        console.error('Error incrementing download counter:', error);
        toast.error('Failed to process download request');
      } else {
        console.log('Download count increased to:', data);
        
        // Fetch the latest version download link
        const { data: updateData, error: updateError } = await supabase
          .from('update')
          .select('link')
          .order('release_at', { ascending: false })
          .limit(1);
        
        if (updateError) throw updateError;
        
        if (updateData && updateData.length > 0 && updateData[0].link) {
          // Open the download link in a new tab
          window.open(updateData[0].link, '_blank');
          toast.success('Download started');
        } else {
          toast.error('Download link not available');
          console.error('No download link available');
        }
      }
    } catch (error) {
      console.error('Error during download:', error);
      toast.error('Failed to process download request');
    }
  };

  const handleLearnMoreClick = () => {
    // Scroll to the "Why Choose Pegasus Tool" section
    const section = document.getElementById('why-choose-pegasus');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 opacity-0 animate-fade-in-delay-1"
                style={{ animationFillMode: 'forwards' }}
              >
                HW-Key Tool
              </h1>
              <p 
                className="text-lg text-gray-600 mb-8 max-w-lg opacity-0 animate-fade-in-delay-2"
                style={{ animationFillMode: 'forwards' }}
              >
                The Professional Unlocking and Flashing Tool for Smart Phones, specializing in 
                Xiaomi/Vivo/Oppo/Realme/Alcatel/Infinix/etc. devices.
              </p>
              <div 
                className="space-x-4 opacity-0 animate-fade-in-delay-3"
                style={{ animationFillMode: 'forwards' }}
              >
                <Button 
                  className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-6 rounded-full text-lg"
                  onClick={handleDownloadClick}
                >
                  Download Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-hw-blue text-hw-blue hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:text-blue-300 dark:text-blue-400 dark:border-blue-700 px-8 py-6 rounded-full text-lg transition-colors"
                  onClick={handleLearnMoreClick}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div 
              className="md:w-1/2 opacity-0 animate-fade-in-delay-4"
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="relative">
                <div className="bg-blue-100 rounded-full h-80 w-80 mx-auto"></div>
                <img 
                  src="/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png" 
                  alt="HW-Key Tool Interface" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resellers Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-hw-blue">Our Official Resellers</h2>
          <p className="section-subtitle">Authorized partners worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                WorldWide Distributor
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Halabtech</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Halabtech (Distributor)
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    server.halabtech.com
                  </p>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                Worldwide Reseller
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Leope-Gsm</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Leope-Gsm (Reseller)
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    leope-gsm.com
                  </p>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                Worldwide Reseller
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Martlobs GSM</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Martlobs GSM (Reseller)
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    martlobsgsm.com
                  </p>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg"
              asChild
            >
              <Link to="/resellers">
                View All Resellers
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
