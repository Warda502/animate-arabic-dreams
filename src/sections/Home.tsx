import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const Home = () => {
  const [countDataLoaded, setCountDataLoaded] = useState(false);
  const [modelCount, setModelCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [distributorCount, setDistributorCount] = useState(0);
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch model count
        const { data: modelData } = await supabase
          .from('settings')
          .select('numeric_value')
          .eq('key', 'total_models')
          .single();
          
        if (modelData) {
          setModelCount(modelData.numeric_value || 0);
        }
        
        // Fetch distributors count
        const { data: distributorData } = await supabase
          .from('settings')
          .select('numeric_value')
          .eq('key', 'distributors_count')
          .single();
          
        if (distributorData) {
          setDistributorCount(distributorData.numeric_value || 0);
        }
        
        // Fetch download count
        const { data: downloadData } = await supabase
          .from('update')
          .select('download_count')
          .order('release_at', { ascending: false })
          .limit(1);
          
        if (downloadData && downloadData.length > 0) {
          setDownloadCount(downloadData[0].download_count || 0);
        }
        
        // Fetch latest version
        const { data: versionData } = await supabase
          .from('update')
          .select('varizon')
          .order('release_at', { ascending: false })
          .limit(1);
          
        if (versionData && versionData.length > 0) {
          setLatestVersion(versionData[0].varizon);
        }
        
        setCountDataLoaded(true);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    
    fetchCounts();
  }, []);

  const scrollToWhyChoose = () => {
    const whyChooseSection = document.querySelector('.why-choose-section');
    if (whyChooseSection) {
      whyChooseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pegasus-orange to-orange-600 dark:from-pegasus-orange dark:to-amber-400">
                  Pegasus Tool
                </h1>
              </motion.div>

              <motion.p 
                className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The Professional Unlocking and Flashing Tool for Smart Phones, specializing in 
                Xiaomi/Vivo/Oppo/Realme/Alcatel/Infinix/etc. devices.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button className="bg-pegasus-orange hover:bg-orange-600 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Download Now {latestVersion && `- ${latestVersion}`}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-pegasus-orange text-pegasus-orange hover:text-white hover:bg-pegasus-orange hover:border-transparent px-8 py-6 rounded-full text-lg transition-all duration-300"
                  onClick={scrollToWhyChoose}
                >
                  Learn More
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pegasus-orange to-amber-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-tr from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-full p-8 shadow-2xl">
                  <img 
                    src="/app-screenshot.png" 
                    alt="Pegasus Tool Interface" 
                    className="w-full h-auto rounded-lg shadow-lg transform hover:rotate-2 hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ChevronDown className="w-10 h-10 text-pegasus-orange" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pegasus-orange">Our Numbers Are Talking</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We are trusted by users worldwide to deliver reliable unlocking and flashing solutions for their devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Supported Models */}
            <div className="bg-orange-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-pegasus-orange/20 dark:bg-pegasus-orange/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Supported Models</h3>
              {countDataLoaded ? (
                <div className="text-4xl font-bold text-pegasus-orange mb-4">
                  <AnimatedCounter from={0} to={modelCount} duration={2} />
                </div>
              ) : (
                <div className="text-4xl font-bold text-pegasus-orange mb-4 animate-pulse">
                  -
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300">Devices supported and growing</p>
            </div>

            {/* Downloads */}
            <div className="bg-orange-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-pegasus-orange/20 dark:bg-pegasus-orange/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Total Downloads</h3>
              {countDataLoaded ? (
                <div className="text-4xl font-bold text-pegasus-orange mb-4">
                  <AnimatedCounter from={0} to={downloadCount} duration={2} />
                </div>
              ) : (
                <div className="text-4xl font-bold text-pegasus-orange mb-4 animate-pulse">
                  -
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300">Trusted by users worldwide</p>
            </div>

            {/* Distributors */}
            <div className="bg-orange-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-pegasus-orange/20 dark:bg-pegasus-orange/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Official Distributors</h3>
              {countDataLoaded ? (
                <div className="text-4xl font-bold text-pegasus-orange mb-4">
                  <AnimatedCounter from={0} to={distributorCount} duration={2} />
                </div>
              ) : (
                <div className="text-4xl font-bold text-pegasus-orange mb-4 animate-pulse">
                  -
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300">Worldwide distribution network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pegasus Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 why-choose-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pegasus-orange">Why Choose Pegasus Tool</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our tool is designed to make unlocking and flashing smartphones easier than ever before.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
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

            <motion.div variants={itemVariants}>
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

            <motion.div variants={itemVariants}>
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

            <motion.div variants={itemVariants}>
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
                Download Pegasus Tool now and unlock the full potential of your smartphone flashing and unlocking service.
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
                onClick={() => window.open("#download", "_self")}
              >
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Download Pegasus Tool v1.1.7
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
