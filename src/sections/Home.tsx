
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Smartphone, ShieldCheck, Download, Zap, BarChart3, CheckCircle2, ChevronRight } from "lucide-react";
import SectionHeader from '@/components/SectionHeader';
import AnimatedCard from '@/components/AnimatedCard';

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-gray-800/70 dark:to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white opacity-0 animate-fade-in-delay-1 font-montserrat tracking-tight leading-tight" 
                style={{ animationFillMode: 'forwards' }}
              >
                The Ultimate <span className="text-gradient">Smartphone</span> Flashing Tool
              </h1>
              <p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg opacity-0 animate-fade-in-delay-2" 
                style={{ animationFillMode: 'forwards' }}
              >
                Professional unlocking and flashing tool for smartphones, specializing in 
                Xiaomi, Vivo, Oppo, Realme, Alcatel, Infinix, and more.
              </p>
              <div 
                className="space-y-4 md:space-y-0 md:space-x-4 opacity-0 animate-fade-in-delay-3 flex flex-col md:flex-row" 
                style={{ animationFillMode: 'forwards' }}
              >
                <Button 
                  className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white px-6 py-6 rounded-full text-lg w-full md:w-auto transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={() => window.open("#download", "_self")}
                >
                  <Download className="mr-2 h-5 w-5" /> Download Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-pegasus-orange text-pegasus-orange hover:bg-orange-50 dark:hover:bg-orange-900/20 px-6 py-6 rounded-full text-lg w-full md:w-auto transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                  onClick={() => scrollToSection('supported-models')}
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div 
              className="md:w-1/2 opacity-0 animate-fade-in-delay-4" 
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800/30 dark:to-orange-900/20 rounded-full h-64 w-64 md:h-80 md:w-80 mx-auto shadow-xl opacity-70 animate-pulse-gentle"></div>
                <img 
                  src={homeImageUrl} 
                  alt="Pegasus Tool Interface" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] h-auto animate-float-slow hover-glow"
                  onError={(e) => {
                    // Fallback to local image if Supabase image fails
                    const target = e.target as HTMLImageElement;
                    target.src = "/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png";
                  }}
                />
                <div className="absolute -right-10 top-1/4 w-20 h-20 bg-orange-400/10 rounded-full blur-xl animate-pulse-gentle"></div>
                <div className="absolute -left-5 bottom-1/4 w-32 h-32 bg-orange-300/10 rounded-full blur-xl animate-pulse-gentle" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Key Features" 
            subtitle="Everything you need for smartphone flashing and unlocking"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            <AnimatedCard variant="elegant" hoverEffect="lift" delay={0.1} className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6 shadow-md">
                  <Smartphone className="h-8 w-8 text-pegasus-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Qualcomm & MediaTek Support</h3>
                <p className="text-gray-600 dark:text-gray-300">Comprehensive support for the most common mobile chipsets, ensuring broad compatibility with today's smartphone market.</p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard variant="elegant" hoverEffect="lift" delay={0.2} className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6 shadow-md">
                  <ShieldCheck className="h-8 w-8 text-pegasus-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Multi-Brand Compatibility</h3>
                <p className="text-gray-600 dark:text-gray-300">Service devices from numerous manufacturers including Xiaomi, Vivo, Oppo, Realme and more with our versatile tool.</p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard variant="elegant" hoverEffect="lift" delay={0.3} className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6 shadow-md">
                  <Zap className="h-8 w-8 text-pegasus-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Instant Flashing</h3>
                <p className="text-gray-600 dark:text-gray-300">Quickly install or update device firmware to fix software issues or resolve boot loop problems with our optimized flashing technology.</p>
              </div>
            </AnimatedCard>
          </div>
          
          <div className="mt-16 text-center opacity-0 animate-fade-in-delay-4" style={{ animationFillMode: 'forwards' }}>
            <Button 
              onClick={() => scrollToSection('supported-models')}
              className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center mx-auto"
            >
              Discover All Features <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-gray-800 dark:to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/patterns/circles.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <SectionHeader 
            title="Why Choose Pegasus Tool" 
            subtitle="The professional choice for device unlocking and repair services"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedCard variant="gradient" hoverEffect="scale" delay={0.1} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-orange-200 dark:bg-orange-700/30 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">User-Friendly Interface</h3>
                  <p className="text-gray-600 dark:text-gray-300">Intuitive design that makes complex operations simple, even for beginners. No specialized training required.</p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard variant="gradient" hoverEffect="scale" delay={0.2} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-orange-200 dark:bg-orange-700/30 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Regular Updates</h3>
                  <p className="text-gray-600 dark:text-gray-300">Frequent software updates ensure compatibility with the latest devices and security patches on the market.</p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard variant="gradient" hoverEffect="scale" delay={0.3} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-orange-200 dark:bg-orange-700/30 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Advanced Features</h3>
                  <p className="text-gray-600 dark:text-gray-300">Access to professional-grade tools typically only available to authorized service centers and manufacturer representatives.</p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard variant="gradient" hoverEffect="scale" delay={0.4} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-orange-200 dark:bg-orange-700/30 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Technical Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">Access to our dedicated support team who can help troubleshoot issues and guide you through complex procedures.</p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to get started?</h2>
              <p className="text-lg text-orange-100 max-w-xl">
                Download Pegasus Tool now and unlock the full potential of your smartphone flashing and unlocking service.
              </p>
            </div>
            <div className="animate-fade-in">
              <Button 
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center"
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
