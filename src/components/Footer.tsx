
import React from "react";
import { Heart, Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About Section */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold mb-5 text-pegasus-orange font-montserrat border-b border-gray-800 pb-2">About Pegasus Tool</h3>
            <p className="text-gray-400 mb-4">
              The professional unlocking and flashing tool for smartphones, specializing in Xiaomi, Vivo, Oppo, Realme, and many other devices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pegasus-orange transition-colors duration-300 flex items-center justify-center text-gray-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pegasus-orange transition-colors duration-300 flex items-center justify-center text-gray-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pegasus-orange transition-colors duration-300 flex items-center justify-center text-gray-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pegasus-orange transition-colors duration-300 flex items-center justify-center text-gray-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold mb-5 text-pegasus-orange font-montserrat border-b border-gray-800 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-pegasus-orange rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#supported-models" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('supported-models');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-pegasus-orange rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  Supported Models
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-pegasus-orange rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#resellers" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('resellers');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-pegasus-orange rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  Resellers
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-pegasus-orange rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-5 text-pegasus-orange font-montserrat border-b border-gray-800 pb-2">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ExternalLink className="h-4 w-4 text-pegasus-orange-400 group-hover:text-pegasus-orange transition-colors duration-200" />
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ExternalLink className="h-4 w-4 text-pegasus-orange-400 group-hover:text-pegasus-orange transition-colors duration-200" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ExternalLink className="h-4 w-4 text-pegasus-orange-400 group-hover:text-pegasus-orange transition-colors duration-200" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ExternalLink className="h-4 w-4 text-pegasus-orange-400 group-hover:text-pegasus-orange transition-colors duration-200" />
                  Download
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ExternalLink className="h-4 w-4 text-pegasus-orange-400 group-hover:text-pegasus-orange transition-colors duration-200" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold mb-5 text-pegasus-orange font-montserrat border-b border-gray-800 pb-2">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-pegasus-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Dubai, UAE</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-pegasus-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400">General Inquiries:</p>
                  <a href="mailto:info@pegasus-tools.com" className="text-pegasus-orange hover:text-pegasus-orange-300 transition-colors duration-200">
                    info@pegasus-tools.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-pegasus-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400">Support:</p>
                  <a href="tel:+15551234567" className="text-pegasus-orange hover:text-pegasus-orange-300 transition-colors duration-200">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-pegasus-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400">Business Hours:</p>
                  <p className="text-white">Mon-Fri, 9AM-6PM (UTC)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center md:text-left">
            &copy; {currentYear} Pegasus Tool. All rights reserved.
          </p>
          <p className="text-gray-500 flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse-gentle" /> by Pegasus Team
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gray-400 hover:text-white border-gray-700 hover:border-pegasus-orange transition-colors duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
