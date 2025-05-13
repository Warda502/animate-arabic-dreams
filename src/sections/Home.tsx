import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Download, Zap, ShieldCheck, Smartphone, ChevronRight, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from '@/components/SectionHeader';
import AnimatedCard from '@/components/AnimatedCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [homeImageUrl, setHomeImageUrl] = useState("/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png");
  const [latestVersion, setLatestVersion] = useState<string>("");
  const [totalModels, setTotalModels] = useState<number>(0);
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [distributorsCount, setDistributorsCount] = useState<number>(0);
  
  useEffect(() => {
    setIsVisible(true);

    // Fetch home image from Supabase storage
    const fetchHomeImage = async () => {
      try {
        // Get home image from Supabase storage
        const { data: imageData } = await supabase.storage.from('website').getPublicUrl('img/home.png');
        
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
    
    // Fetch latest version info from update table
    const fetchUpdateInfo = async () => {
      try {
        const { data: updateData, error: updateError } = await supabase
          .from('update')
          .select('varizon, download_count')
          .order('release_at', { ascending: false })
          .limit(1);
          
        if (updateError) throw updateError;
        if (updateData && updateData.length > 0) {
          setLatestVersion(updateData[0].varizon);
          setDownloadCount(updateData[0].download_count || 0);
        }
      } catch (error) {
        console.error('Error fetching update info:', error);
      }
    };
    
    // Fetch stats from settings table
    const fetchStats = async () => {
      try {
        const { data: statsData, error: statsError } = await supabase
          .from('settings')
          .select('key, numeric_value')
          .in('key', ['total_models', 'distributors_count']);
          
        if (statsError) throw statsError;
        if (statsData && statsData.length > 0) {
          statsData.forEach(item => {
            if (item.key === 'total_models') {
              setTotalModels(item.numeric_value || 0);
            } else if (item.key === 'distributors_count') {
              setDistributorsCount(item.numeric_value || 0);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchHomeImage();
    fetchUpdateInfo();
    fetchStats();
  }, []);

  const downloadLatestVersion = () => {
    // Open new page or download file
    window.open("/whats-new", "_blank");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-pegasus-orange/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 left-10 w-40 h-40 bg-pegasus-orange/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-montserrat tracking-tight leading-tight">
                The Ultimate <span className="text-pegasus-orange bg-gradient-to-r from-pegasus-orange to-pegasus-orange-400 bg-clip-text text-transparent">Smartphone</span> Flashing Tool
              </h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Professional unlocking and flashing tool for smartphones, specializing in 
                Xiaomi, Vivo, Oppo, Realme, Alcatel, Infinix, and more.
              </motion.p>
              <motion.div 
                className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <Button 
                  className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white px-6 py-6 rounded-full text-lg w-full md:w-auto transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  onClick={downloadLatestVersion}
                >
                  <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                  <span className="relative">
                    Download Now {latestVersion && `- v${latestVersion}`}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-pegasus-orange text-pegasus-orange hover:bg-orange-900/20 dark:hover:bg-orange-900/20 px-6 py-6 rounded-full text-lg w-full md:w-auto transition-all duration-300 hover:-translate-y-1 hover:border-pegasus-orange-400 group flex items-center justify-center"
                  onClick={() => {
                    const supportedModelsSection = document.getElementById('supported-models');
                    if (supportedModelsSection) {
                      supportedModelsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span>Learn More</span> 
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div 
                  className="bg-gradient-to-br from-orange-700/30 to-orange-900/20 rounded-full h-64 w-64 md:h-96 md:w-96 mx-auto absolute"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.9, 0.7]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.div>
                <motion.img 
                  src={homeImageUrl} 
                  alt="Pegasus Tool Interface" 
                  className="relative z-10 max-w-full md:max-w-md mx-auto"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ 
                    maxHeight: '500px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 15px rgb(0 0 0 / 0.5))'
                  }}
                  onError={(e) => {
                    // Fallback to local image if Supabase image fails
                    const target = e.target as HTMLImageElement;
                    target.src = "/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png";
                  }}
                />
                <motion.div 
                  className="absolute -right-10 top-1/4 w-20 h-20 bg-orange-400/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute -left-5 bottom-1/4 w-32 h-32 bg-orange-300/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Numbers Are Talking (Previously Features Preview) */}
      <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Numbers Are Talking" 
            subtitle="Key statistics that demonstrate our tool's impact"
            highlightWord="Numbers"
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item}>
              <AnimatedCard variant="elegant" hoverEffect="lift" delay={0.1} className="p-8 border-t-4 border-pegasus-orange">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full mb-6 shadow-md">
                    <Smartphone className="h-8 w-8 text-pegasus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Total Models Supported</h3>
                  <p className="text-4xl font-bold text-pegasus-orange mb-2">{totalModels.toLocaleString()}</p>
                  <p className="text-gray-600 dark:text-gray-300">Compatible with devices from all major manufacturers</p>
                </div>
              </AnimatedCard>
            </motion.div>
            
            <motion.div variants={item}>
              <AnimatedCard variant="elegant" hoverEffect="lift" delay={0.2} className="p-8 border-t-4 border-pegasus-orange">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full mb-6 shadow-md">
                    <Download className="h-8 w-8 text-pegasus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Total Downloads</h3>
                  <p className="text-4xl font-bold text-pegasus-orange mb-2">{downloadCount.toLocaleString()}</p>
                  <p className="text-gray-600 dark:text-gray-300">Trusted by technicians worldwide</p>
                </div>
              </AnimatedCard>
            </motion.div>
            
            <motion.div variants={item}>
              <AnimatedCard variant="elegant" hoverEffect="lift" delay={0.3} className="p-8 border-t-4 border-pegasus-orange">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 rounded-full mb-6 shadow-md">
                    <ShieldCheck className="h-8 w-8 text-pegasus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Official Distributors</h3>
                  <p className="text-4xl font-bold text-pegasus-orange mb-2">{distributorsCount}</p>
                  <p className="text-gray-600 dark:text-gray-300">Authorized partners across the globe</p>
                </div>
              </AnimatedCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-gray-800 dark:to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/patterns/circles.svg')] opacity-5"></div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-40 w-72 h-72 bg-pegasus-orange/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>

        <div className="container mx-auto px-4 relative">
          <SectionHeader 
            title="Why Choose Pegasus Tool" 
            subtitle="The professional choice for device unlocking and repair services"
            highlightWord="Pegasus"
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item}>
              <AnimatedCard variant="gradient" hoverEffect="scale" className="p-6 border border-orange-200/30 dark:border-orange-700/10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700/30 dark:to-orange-600/20 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">User-Friendly Interface</h3>
                    <p className="text-gray-600 dark:text-gray-300">Intuitive design that makes complex operations simple, even for beginners. No specialized training required.</p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>

            <motion.div variants={item}>
              <AnimatedCard variant="gradient" hoverEffect="scale" className="p-6 border border-orange-200/30 dark:border-orange-700/10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700/30 dark:to-orange-600/20 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Regular Updates</h3>
                    <p className="text-gray-600 dark:text-gray-300">Frequent software updates ensure compatibility with the latest devices and security patches on the market.</p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>

            <motion.div variants={item}>
              <AnimatedCard variant="gradient" hoverEffect="scale" className="p-6 border border-orange-200/30 dark:border-orange-700/10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700/30 dark:to-orange-600/20 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Advanced Features</h3>
                    <p className="text-gray-600 dark:text-gray-300">Access to professional-grade tools typically only available to authorized service centers and manufacturer representatives.</p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>

            <motion.div variants={item}>
              <AnimatedCard variant="gradient" hoverEffect="scale" className="p-6 border border-orange-200/30 dark:border-orange-700/10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700/30 dark:to-orange-600/20 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="h-6 w-6 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Technical Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">Access to our dedicated support team who can help troubleshoot issues and guide you through complex procedures.</p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-2/3 mb-10 md:mb-0 text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to get started?</h2>
              <p className="text-lg text-orange-100 max-w-xl">
                Download HW-Key Tool now and unlock the full potential of your smartphone flashing and unlocking service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button 
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center group"
                onClick={downloadLatestVersion}
              >
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Download HW-Key Tool {latestVersion ? `v${latestVersion}` : ''}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
