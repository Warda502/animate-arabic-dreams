import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MenuItem {
  title: string;
  href: string;
}

interface LatestUpdate {
  varizon: string;
  link: string | null;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [latestUpdate, setLatestUpdate] = useState<LatestUpdate | null>(null);
  
  // Menu items
  const menuItems: MenuItem[] = [
    { title: "Home", href: "#home" },
    { title: "Supported Models", href: "#supported-models" },
    { title: "Pricing", href: "#pricing" },
    { title: "Resellers", href: "#resellers" },
    { title: "What's New", href: "/whats-new" },
    { title: "Contact", href: "#contact" },
  ];

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fetch latest version
  useEffect(() => {
    const fetchLatestUpdate = async () => {
      try {
        const { data, error } = await supabase
          .from('update')
          .select('varizon, link')
          .order('release_at', { ascending: false })
          .limit(1);
        
        if (error) throw error;
        if (data && data.length > 0) {
          setLatestUpdate(data[0]);
        }
      } catch (error) {
        console.error('Error fetching latest update:', error);
      }
    };

    fetchLatestUpdate();
  }, []);

  // Modified to handle both scroll sections and regular page links
  const scrollToSection = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Regular links will be handled by React Router
  };

  const handleDownload = async () => {
    try {
      if (latestUpdate?.link) {
        // Call the increment_counter function
        const { data, error: counterError } = await supabase.rpc('increment_counter');
        
        if (counterError) {
          console.error('Error incrementing download counter:', counterError);
          toast.error('Failed to process download request');
        } else {
          console.log('Download count increased to:', data);
          
          // Open the download link
          window.location.href = latestUpdate.link;
          toast.success('Download started!');
        }
      } else {
        toast.info("Download link is not available at the moment. Please try again later.");
      }
    } catch (error) {
      console.error('Error during download:', error);
      // Still provide download link even if counting fails
      if (latestUpdate?.link) {
        window.location.href = latestUpdate.link;
      }
    }
  };

  return (
    <motion.header 
      className={cn(
        "fixed w-full z-50 top-0 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md py-3" 
          : "bg-transparent py-5"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.span 
              className={cn(
                "font-bold text-2xl transition-all duration-300",
                isScrolled ? "text-pegasus-orange" : "text-pegasus-orange"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Pegasus Tool
              <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-pegasus-orange"></span>
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                  if (!item.href.startsWith('#')) {
                    // Use regular navigation for non-hash links
                    window.location.href = item.href;
                  }
                }}
                className={cn(
                  "font-medium transition-all duration-200 relative py-2 px-1",
                  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pegasus-orange after:scale-x-0 after:origin-right after:transition-transform after:duration-300",
                  "hover:text-pegasus-orange hover:after:scale-x-100 hover:after:origin-left",
                  isScrolled ? "text-gray-700 dark:text-gray-200" : "text-gray-800 dark:text-gray-100"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.title}
              </motion.a>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleDownload}
                className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 overflow-hidden group relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20 z-0" 
                  initial={{ x: -100, opacity: 0 }}
                  whileHover={{ x: 300, opacity: 0.5 }}
                  transition={{ duration: 0.7 }}
                />
                <Download className="h-4 w-4 relative z-10" /> 
                <span className="relative z-10">
                  Download Now {latestUpdate && `- ${latestUpdate.varizon}`}
                </span>
              </Button>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "ml-2 transition-all duration-300",
                isOpen ? "bg-pegasus-orange text-white hover:bg-pegasus-orange-600" : ""
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                    if (!item.href.startsWith('#')) {
                      // Use regular navigation for non-hash links
                      window.location.href = item.href;
                    }
                  }}
                  className={cn(
                    "block py-3 text-gray-700 dark:text-gray-200 hover:text-pegasus-orange font-medium transition-all duration-200 border-b border-gray-100 dark:border-gray-800",
                    { 'border-b-0': index === menuItems.length - 1 }
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.title}
                </motion.a>
              ))}
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  onClick={() => {
                    handleDownload();
                    setIsOpen(false);
                  }}
                  className="w-full bg-pegasus-orange hover:bg-pegasus-orange-600 text-white py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" /> Download Now {latestUpdate && `- ${latestUpdate.varizon}`}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
