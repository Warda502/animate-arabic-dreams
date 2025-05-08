
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Server Status", path: "/server-status" },
    { name: "Resellers", path: "/resellers" },
    { name: "Payment Methods", path: "/payment-methods" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-hw-blue">HW-Key Tool</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-hw-blue relative
                ${isActive(link.path) ? 'text-hw-blue font-semibold' : 'text-gray-600'}
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:bg-hw-blue after:origin-bottom-right after:transition-transform after:duration-300 
                hover:after:scale-x-100 hover:after:origin-bottom-left`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Button 
          className="hidden md:block bg-hw-blue hover:bg-blue-600 text-white px-6 py-2 rounded-full"
          asChild
        >
          <Link to="/login">
            Reseller Login
          </Link>
        </Button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute w-full animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium p-2 rounded-md
                  ${isActive(link.path) ? 'bg-hw-lightblue text-hw-blue font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="bg-hw-blue hover:bg-blue-600 text-white px-6 py-2 rounded-full mt-2"
              asChild
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to="/login">
                Reseller Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
