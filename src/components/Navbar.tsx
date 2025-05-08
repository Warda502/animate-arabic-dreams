
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      let currentActive = 'home';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentActive = section.id;
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (sectionId: string) => activeSection === sectionId;

  const navLinks = [
    { name: "Home", sectionId: "home" },
    { name: "Features", sectionId: "features" },
    { name: "Server Status", sectionId: "server-status" },
    { name: "Resellers", sectionId: "resellers" },
    { name: "Payment Methods", sectionId: "payment-methods" },
    { name: "Contact", sectionId: "contact" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-white dark:bg-gray-900 py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-pegasus-orange">Pegasus Tool</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollToSection(link.sectionId)}
              className={`text-sm font-medium transition-colors hover:text-pegasus-orange relative
                ${isActive(link.sectionId) ? 'text-pegasus-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:bg-pegasus-orange after:origin-bottom-right after:transition-transform after:duration-300 
                hover:after:scale-x-100 hover:after:origin-bottom-left`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button 
            className="bg-pegasus-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full"
            onClick={() => scrollToSection('contact')}
          >
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6 dark:text-white"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg py-4 px-4 absolute w-full animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className={`text-sm font-medium p-2 rounded-md
                  ${isActive(link.sectionId) ? 'bg-orange-100 dark:bg-orange-900/30 text-pegasus-orange font-semibold' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              className="bg-pegasus-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full mt-2"
              onClick={() => {
                scrollToSection('contact');
                setIsMobileMenuOpen(false);
              }}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
