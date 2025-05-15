import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ScrollTop } from "./components/scroll-top";
import Home from "./sections/Home";
import SupportedModels from "./sections/SupportedModels";
import Resellers from "./sections/Resellers";
import PaymentMethods from "./sections/PaymentMethods";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";
import WhatsNew from "./pages/WhatsNew";
import KnowledgeBase from "./pages/KnowledgeBase";
import HelpCenter from "./pages/HelpCenter";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import { useEffect, useState, lazy, Suspense, useRef, useCallback } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";

// Custom loading component for lazy-loaded pages with improved animation
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-[60vh]">
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-16 h-16 border-4 border-pegasus-orange-300 rounded-full"></div>
      <motion.div 
        className="w-16 h-16 border-4 border-pegasus-orange border-t-transparent rounded-full absolute top-0 left-0 animate-spin"
        animate={{ boxShadow: ["0 0 5px rgba(249, 115, 22, 0.3)", "0 0 15px rgba(249, 115, 22, 0.6)", "0 0 5px rgba(249, 115, 22, 0.3)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-8 w-full text-center text-pegasus-orange font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  </div>
);

const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();
  const lastPathname = useRef(pathname);

  useEffect(() => {
    // Only scroll if the pathname has changed
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      
      // If there's a hash, scroll to it with enhanced animation
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Use enhanced smooth scroll behavior
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      
      // Check if we have a state with scrollTo from navbar navigation
      if (state && state.scrollTo) {
        setTimeout(() => {
          const element = document.getElementById(state.scrollTo);
          if (element) {
            // Add highlight effect to scrolled element
            element.classList.add("pulse-highlight");
            element.scrollIntoView({ behavior: "smooth" });
            
            // Remove highlight effect after animation completes
            setTimeout(() => {
              element.classList.remove("pulse-highlight");
            }, 1500);
          }
        }, 100);
        return;
      }
      
      // Otherwise scroll to top with enhanced smooth behavior
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash, state]);

  return null;
};

// Enhanced page transition variants with improved animations
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0], // Improved easing
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96] // Different easing for exit
    }
  }
};

// Enhanced child animation variants for staggered animations
const childVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(4px)" },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const MainContent = () => {
  const location = useLocation();
  const [backgroundVariant, setBackgroundVariant] = useState<"default" | "wave" | "stars" | "bubbles" | "cosmic" | "neon" | "matrix">("cosmic");
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  
  // Change background variant based on scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / height;
      
      // Update active section based on what's in view
      const sections = ["home", "supported-models", "pricing", "resellers", "payment-methods", "contact"]
        .map(id => ({ id, elem: document.getElementById(id) }))
        .filter(({ elem }) => elem !== null);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, elem } = sections[i];
        if (!elem) continue;
        
        const rect = elem.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
      
      // Change background variant based on scroll position
      if (progress < 0.2) {
        setBackgroundVariant("cosmic");
      } else if (progress < 0.4) {
        setBackgroundVariant("neon");
      } else if (progress < 0.6) {
        setBackgroundVariant("stars");
      } else if (progress < 0.8) {
        setBackgroundVariant("wave");
      } else {
        setBackgroundVariant("bubbles");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Get background colors based on active section
  const getBackgroundColors = useCallback(() => {
    switch (activeSection) {
      case "home":
        return ["bg-pegasus-orange", "bg-pegasus-orange-400", "bg-pegasus-orange-600"];
      case "supported-models":
        return ["bg-blue-500", "bg-blue-400", "bg-indigo-500"];
      case "pricing":
        return ["bg-green-500", "bg-green-400", "bg-emerald-600"];
      case "resellers":
        return ["bg-purple-500", "bg-violet-400", "bg-purple-700"];
      case "payment-methods":
        return ["bg-amber-500", "bg-yellow-400", "bg-orange-600"];
      case "contact":
        return ["bg-sky-500", "bg-cyan-400", "bg-blue-600"];
      default:
        return ["bg-pegasus-orange", "bg-pegasus-orange-400", "bg-pegasus-orange-600"];
    }
  }, [activeSection]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.main 
        key={location.pathname}
        className="flex-grow relative"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatedBackground 
          className="min-h-screen"
          variant={backgroundVariant}
          particleCount={25}
          interactive={true}
          intensity="high"
          colorMode="multi"
          colorPalette={getBackgroundColors()}
          speed="normal"
          parallax={true}
          glowEffect={true}
          pulse={true}
        >
          <motion.div 
            className="progress-bar fixed top-0 left-0 right-0 h-1 bg-pegasus-orange z-50 origin-left" 
            style={{ scaleX: scrollYProgress }}
          />
          
          <section id="home" className="gpu-accelerated">
            <motion.div variants={childVariants}>
              <Home />
            </motion.div>
          </section>
          <section id="supported-models" className="gpu-accelerated">
            <motion.div variants={childVariants}>
              <SupportedModels />
            </motion.div>
          </section>
          <section id="pricing" className="gpu-accelerated">
            <motion.div variants={childVariants}>
              <Pricing />
            </motion.div>
          </section>
          <section id="resellers" className="gpu-accelerated">
            <motion.div variants={childVariants}>
              <Resellers />
            </motion.div>
          </section>
          <section id="payment-methods" className="gpu-accelerated">
            <motion.div variants={childVariants}>
              <PaymentMethods />
            </motion.div>
          </section>
          <section id="contact" className="gpu-accelerated">
            <motion.div variants={childVariants}>
              <Contact />
            </motion.div>
          </section>
        </AnimatedBackground>
      </motion.main>
    </AnimatePresence>
  );
};

// Create optimized QueryClient with improved settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes (renamed from cacheTime)
    },
  },
});

// App with performance optimizations
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Preload critical resources and initialize app
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Preconnect to important domains
    const preconnectLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload critical images
    const preloadImages = [
      // Add critical images here
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Set requestIdleCallback for non-critical operations
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Add any deferred operations here
        console.log('Performance optimizations applied');
      });
    }
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900">
        <motion.div 
          className="relative text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 border-4 border-pegasus-orange-300 border-t-pegasus-orange rounded-full animate-spin mx-auto mb-4"
            animate={{ boxShadow: ["0 0 5px rgba(249, 115, 22, 0.3)", "0 0 20px rgba(249, 115, 22, 0.6)", "0 0 5px rgba(249, 115, 22, 0.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
          <motion.h2 
            className="text-xl font-semibold text-pegasus-orange"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Pegasus Tool
          </motion.h2>
          <motion.p
            className="text-gray-400 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Loading amazing experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <ScrollToTop />
              <Routes>
                {/* Main page with all sections */}
                <Route path="/" element={<MainContent />} />
                
                {/* Individual pages with suspense for better loading experience */}
                <Route path="/whats-new" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground 
                      variant="stars" 
                      particleCount={20} 
                      interactive={true} 
                      intensity="high"
                      colorMode="multi"
                      colorPalette={["bg-pegasus-orange", "bg-amber-400", "bg-red-500"]}
                      glowEffect={true}
                    >
                      <WhatsNew />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/knowledge-base" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground 
                      variant="wave" 
                      particleCount={15} 
                      interactive={true}
                      intensity="medium"
                      colorMode="multi"
                      colorPalette={["bg-blue-500", "bg-indigo-400", "bg-cyan-500"]}
                    >
                      <KnowledgeBase />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/help-center" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground 
                      variant="bubbles" 
                      particleCount={18} 
                      interactive={true}
                      intensity="medium"
                      colorMode="multi"
                      colorPalette={["bg-green-500", "bg-emerald-400", "bg-teal-500"]}
                    >
                      <HelpCenter />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/faq" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground 
                      variant="cosmic" 
                      particleCount={12} 
                      interactive={true}
                      intensity="medium"
                      colorMode="multi"
                      colorPalette={["bg-violet-500", "bg-purple-400", "bg-fuchsia-500"]}
                      glowEffect={true}
                    >
                      <FAQ />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/terms-of-service" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground 
                      variant="neon" 
                      particleCount={10} 
                      interactive={true}
                      intensity="low"
                      colorMode="multi"
                      colorPalette={["bg-pegasus-orange", "bg-amber-400", "bg-red-500"]}
                    >
                      <TermsOfService />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                {/* Page not found with animated background */}
                <Route path="*" element={
                  <AnimatedBackground 
                    variant="matrix" 
                    particleCount={30} 
                    interactive={true} 
                    intensity="high"
                    colorMode="single"
                    color="bg-green-500"
                    glowEffect={true}
                  >
                    <NotFound />
                  </AnimatedBackground>
                } />
              </Routes>
              <Footer />
              <ScrollTop />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
