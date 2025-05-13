
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import SupportedModels from "./sections/SupportedModels";
import Resellers from "./sections/Resellers";
import PaymentMethods from "./sections/PaymentMethods";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to it
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    
    // Otherwise scroll to top
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const MainContent = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.main 
        key={location.pathname}
        className="flex-grow"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <section id="home">
          <Home />
        </section>
        <section id="supported-models">
          <SupportedModels />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="resellers">
          <Resellers />
        </section>
        <section id="payment-methods">
          <PaymentMethods />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </motion.main>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollToTop />
            <MainContent />
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
