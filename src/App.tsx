
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import Features from "./sections/Features";
import Resellers from "./sections/Resellers";
import PaymentMethods from "./sections/PaymentMethods";
import ServerStatus from "./sections/ServerStatus";
import Contact from "./sections/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <section id="home">
                <Home />
              </section>
              <section id="features">
                <Features />
              </section>
              <section id="server-status">
                <ServerStatus />
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
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
