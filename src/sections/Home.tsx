
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Smartphone, ShieldCheck, Download } from "lucide-react";

const Home = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [homeImageUrl, setHomeImageUrl] = useState("/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png");
  
  useEffect(() => {
    setIsVisible(true);

    // Fetch home image from Supabase storage
    const fetchHomeImage = async () => {
      try {
        // Get home image from Supabase storage
        const {
          data: imageData
        } = await supabase.storage.from('website').getPublicUrl('img/home.png');
        
        if (imageData) {
          setHomeImageUrl(imageData.publicUrl);
        }
      } catch (error) {
        console.error('Error fetching home image:', error);
        toast({
          title: "Image Loading Error",
          description: "Could not load the home image. Using fallback image instead.",
          variant: "destructive",
        });
      }
    };
    
    fetchHomeImage();
  }, []);

  const handleLearnMore = () => {
    document.getElementById('supported-models')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscoverFeatures = () => {
    document.getElementById('supported-models')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white opacity-0 animate-fade-in-delay-1" 
                style={{ animationFillMode: 'forwards' }}
              >
                Pegasus Tool
              </h1>
              <p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg opacity-0 animate-fade-in-delay-2" 
                style={{ animationFillMode: 'forwards' }}
              >
                The Professional Unlocking and Flashing Tool for Smart Phones, specializing in 
                Xiaomi/Vivo/Oppo/Realme/Alcatel/Infinix/etc. devices.
              </p>
              <div 
                className="space-y-4 md:space-y-0 md:space-x-4 opacity-0 animate-fade-in-delay-3" 
                style={{ animationFillMode: 'forwards' }}
              >
                <Button 
                  className="bg-pegasus-orange hover:bg-orange-600 text-white px-6 py-6 rounded-full text-lg w-full md:w-auto transition-all duration-300 hover:-translate-y-1"
                  onClick={() => window.open("#download", "_self")}
                >
                  <Download className="mr-2 h-5 w-5" /> Download Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-pegasus-orange text-pegasus-orange hover:bg-orange-50 dark:hover:bg-orange-900/20 px-6 py-6 rounded-full text-lg w-full md:w-auto transition-all duration-300 hover:-translate-y-1"
                  onClick={handleLearnMore}
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div 
              className="md:w-1/2 opacity-0 animate-fade-in-delay-4" 
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full h-64 w-64 md:h-80 md:w-80 mx-auto"></div>
                <img 
                  src={homeImageUrl} 
                  alt="Pegasus Tool Interface" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[80%] h-auto animate-float"
                  onError={(e) => {
                    // Fallback to local image if Supabase image fails
                    const target = e.target as HTMLImageElement;
                    target.src = "/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-pegasus-orange">Our Key Features</h2>
          <p className="section-subtitle">Everything you need for smartphone flashing and unlocking</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                <Smartphone className="h-8 w-8 text-pegasus-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualcomm & MediaTek Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive support for the most common mobile chipsets, ensuring broad compatibility.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                <ShieldCheck className="h-8 w-8 text-pegasus-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Brand Compatibility</h3>
              <p className="text-gray-600 dark:text-gray-300">Service devices from numerous manufacturers including Xiaomi, Vivo, Oppo, and more.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                <Download className="h-8 w-8 text-pegasus-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Firmware Flashing</h3>
              <p className="text-gray-600 dark:text-gray-300">Easily install or update device firmware to fix software issues or resolve boot loop problems.</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              onClick={handleDiscoverFeatures}
              className="bg-pegasus-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 hover:-translate-y-1"
            >
              Discover All Features
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg text-orange-100 max-w-xl">
                Download Pegasus Tool now and unlock the full potential of your smartphone flashing and unlocking service.
              </p>
            </div>
            <div>
              <Button 
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => window.open("#download", "_self")}
              >
                <Download className="mr-2 h-5 w-5" /> Download Pegasus Tool v1.1.7
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
