
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

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
      if (window.scrollY > 0) {
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

  return (
    <header className={cn(
      "fixed w-full z-50 top-0 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-pegasus-orange">Pegasus Tool</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={cn(
                  "font-medium transition-colors hover:text-pegasus-orange",
                  isScrolled ? "text-gray-800 dark:text-gray-100" : "text-gray-800 dark:text-gray-100"
                )}
              >
                {item.title}
              </a>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button className="bg-pegasus-orange hover:bg-orange-600 text-white">
              Download Now
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900",
        isOpen ? "max-h-[500px] border-b border-gray-200 dark:border-gray-700" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="block py-2 text-gray-800 dark:text-gray-100 hover:text-pegasus-orange"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button className="w-full bg-pegasus-orange hover:bg-orange-600 text-white">
              Download Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
