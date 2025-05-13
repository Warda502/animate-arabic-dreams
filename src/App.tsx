import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation
} from 'react-router-dom';
import Index from './pages/Index';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Resellers from './pages/Resellers';
import NotFound from './pages/NotFound';
import ServerStatus from './pages/ServerStatus';
import PaymentMethods from './pages/PaymentMethods';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollTop } from "@/components/scroll-top"
import Home from './sections/Home';
import SupportedModels from './pages/SupportedModels';
import WhatsNew from './pages/WhatsNew';
import KnowledgeBase from './pages/KnowledgeBase';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import TermsOfService from './pages/TermsOfService';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resellers" element={<Resellers />} />
              <Route path="/server-status" element={<ServerStatus />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/home" element={<Home />} />
              <Route path="/supported-models" element={<SupportedModels />} />
              <Route path="/whats-new" element={<WhatsNew />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Layout>
          {showScrollTop && <ScrollTop />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/hwkey-logo.png"
                alt="HW-Key Tool"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" label="Home" />
                <NavLink to="/#features" label="Features" />
                <NavLink to="/#pricing" label="Pricing" />
                <NavLink to="/resellers" label="Resellers" />
                <NavLink to="/contact" label="Contact" />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <button
                className="bg-pegasus-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
              >
                Download Now
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'none'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLinkMobile to="/" label="Home" />
          <NavLinkMobile to="/#features" label="Features" />
          <NavLinkMobile to="/#pricing" label="Pricing" />
          <NavLinkMobile to="/resellers" label="Resellers" />
          <NavLinkMobile to="/contact" label="Contact" />
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="mt-3 px-2 space-y-1">
            <button className="bg-pegasus-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded block w-full text-left">
              Download Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } px-3 py-2 rounded-md text-sm font-medium`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

function NavLinkMobile({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${isActive
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } block px-3 py-2 rounded-md text-base font-medium`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

export default App;
