
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, Download } from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Menu items
  const menuItems: MenuItem[] = [
    { title: "Home", href: "#home" },
    { title: "Supported Models", href: "#supported-models" },
    { title: "Pricing", href: "#pricing" },
    { title: "Resellers", href: "#resellers" },
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

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed w-full z-50 top-0 transition-all duration-500",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={cn(
              "font-bold text-2xl transition-all duration-300",
              isScrolled ? "text-pegasus-orange" : "text-pegasus-orange"
            )}>
              Pegasus Tool
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={cn(
                  "font-medium transition-all duration-200 relative py-2 px-1",
                  "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pegasus-orange after:scale-x-0 after:origin-right after:transition-transform after:duration-300",
                  "hover:text-pegasus-orange hover:after:scale-x-100 hover:after:origin-left",
                  isScrolled ? "text-gray-700 dark:text-gray-200" : "text-gray-800 dark:text-gray-100"
                )}
              >
                {item.title}
              </a>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              onClick={() => window.open("#download", "_self")}
              className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download Now
            </Button>
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
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={cn(
                "block py-3 text-gray-700 dark:text-gray-200 hover:text-pegasus-orange font-medium transition-all duration-200 border-b border-gray-100 dark:border-gray-800",
                "animate-fade-in",
                { 'border-b-0': index === menuItems.length - 1 }
              )}
              style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
            >
              {item.title}
            </a>
          ))}
          <div className="pt-4">
            <Button 
              onClick={() => {
                window.open("#download", "_self");
                setIsOpen(false);
              }}
              className="w-full bg-pegasus-orange hover:bg-pegasus-orange-600 text-white py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <Download className="h-5 w-5" /> Download Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
