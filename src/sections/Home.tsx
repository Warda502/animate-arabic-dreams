import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
const Home = () => {
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
      }
    };
    fetchHomeImage();
  }, []);
  return <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white opacity-0 animate-fade-in-delay-1" style={{
              animationFillMode: 'forwards'
            }}>
                Pegasus Tool
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg opacity-0 animate-fade-in-delay-2" style={{
              animationFillMode: 'forwards'
            }}>
                The Professional Unlocking and Flashing Tool for Smart Phones, specializing in 
                Xiaomi/Vivo/Oppo/Realme/Alcatel/Infinix/etc. devices.
              </p>
              <div className="space-x-4 opacity-0 animate-fade-in-delay-3" style={{
              animationFillMode: 'forwards'
            }}>
                <Button className="bg-pegasus-orange hover:bg-orange-600 text-white px-8 py-6 rounded-full text-lg">
                  Download Now
                </Button>
                <Button variant="outline" className="border-pegasus-orange text-pegasus-orange hover:bg-orange-50 dark:hover:bg-orange-900/20 px-8 py-6 rounded-full text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 opacity-0 animate-fade-in-delay-4" style={{
            animationFillMode: 'forwards'
          }}>
              <div className="relative">
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full h-80 w-80 mx-auto"></div>
                <img src={homeImageUrl} alt="Pegasus Tool Interface" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[80%] h-auto animate-float" />
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualcomm & MediaTek Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Comprehensive support for the most common mobile chipsets, ensuring broad compatibility.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Brand Compatibility</h3>
              <p className="text-gray-600 dark:text-gray-300">Service devices from numerous manufacturers including Xiaomi, Vivo, Oppo, and more.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Firmware Flashing</h3>
              <p className="text-gray-600 dark:text-gray-300">Easily install or update device firmware to fix software issues or resolve boot loop problems.</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <a href="#features">
              <Button className="bg-pegasus-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg">
                Discover All Features
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Software Screenshot */}
      

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg text-orange-100 max-w-xl">
                Download Pegasus Tool now and unlock the full potential of your smartphone flashing and unlocking service.
              </p>
            </div>
            <div>
              <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg shadow-lg">
                Download Pegasus Tool v1.1.7
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;