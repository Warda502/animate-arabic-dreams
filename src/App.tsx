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
import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";

// Custom loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-[60vh]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-pegasus-orange-300 rounded-full"></div>
      <div className="w-16 h-16 border-4 border-pegasus-orange border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to it
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Use smooth scroll behavior
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    
    // Check if we have a state with scrollTo from navbar navigation
    if (state && state.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure page is loaded
      return;
    }
    
    // Otherwise scroll to top with smooth behavior
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash, state]);

  return null;
};

// Page transition variants with improved animations
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0], // Improved easing
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96] // Different easing for exit
    }
  }
};

// Child animation variants for staggered animations
const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const MainContent = () => {
  const location = useLocation();
  const [backgroundVariant, setBackgroundVariant] = useState<"default" | "wave" | "stars" | "bubbles">("wave");
  
  // Change background variant based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / height;
      
      if (progress < 0.33) {
        setBackgroundVariant("wave");
      } else if (progress < 0.66) {
        setBackgroundVariant("stars");
      } else {
        setBackgroundVariant("bubbles");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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
          particleCount={20}
          interactive={true}
        >
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
  // Preload critical resources
  useEffect(() => {
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
    
    // Set requestIdleCallback for non-critical operations
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Add any deferred operations here
        console.log('Performance optimizations applied');
      });
    }
  }, []);

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
                    <AnimatedBackground variant="stars" particleCount={15} interactive={true}>
                      <WhatsNew />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/knowledge-base" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground variant="wave" particleCount={12} interactive={true}>
                      <KnowledgeBase />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/help-center" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground variant="bubbles" particleCount={15} interactive={true}>
                      <HelpCenter />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/faq" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground variant="stars" particleCount={10} interactive={true}>
                      <FAQ />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                <Route path="/terms-of-service" element={
                  <Suspense fallback={<PageLoader />}>
                    <AnimatedBackground variant="default" particleCount={8} interactive={true}>
                      <TermsOfService />
                    </AnimatedBackground>
                  </Suspense>
                } />
                
                {/* Page not found with animated background */}
                <Route path="*" element={
                  <AnimatedBackground variant="wave" particleCount={15} interactive={true}>
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
