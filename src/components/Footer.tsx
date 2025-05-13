import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="text-2xl font-bold text-white mb-2">
            HW-Key Tool
          </Link>
          <p className="text-sm text-gray-500">
            Professional Smartphone Unlocking and Flashing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">HW-Key Tool</h3>
            <ul className="space-y-2">
              <li><a href="/#features" className="hover:text-pegasus-orange transition-colors">Features</a></li>
              <li><a href="/#supported-models" className="hover:text-pegasus-orange transition-colors">Supported Models</a></li>
              <li><a href="/#pricing" className="hover:text-pegasus-orange transition-colors">Pricing</a></li>
              <li><a href="/whats-new" target="_blank" rel="noopener noreferrer" className="hover:text-pegasus-orange transition-colors">What's New</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/knowledge-base" target="_blank" rel="noopener noreferrer" className="hover:text-pegasus-orange transition-colors">Knowledge Base</a></li>
              <li><a href="/help-center" target="_blank" rel="noopener noreferrer" className="hover:text-pegasus-orange transition-colors">Help Center</a></li>
              <li><a href="/faq" target="_blank" rel="noopener noreferrer" className="hover:text-pegasus-orange transition-colors">FAQ</a></li>
              <li><a href="/#contact" className="hover:text-pegasus-orange transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/resellers" className="hover:text-pegasus-orange transition-colors">Resellers</a></li>
              <li><a href="/server-status" className="hover:text-pegasus-orange transition-colors">Server Status</a></li>
              <li><a href="/payment-methods" className="hover:text-pegasus-orange transition-colors">Payment Methods</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-pegasus-orange transition-colors">Terms of Service</a></li>
              <li><a href="/privacy-policy" className="hover:text-pegasus-orange transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HW-Key Tool. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#contact" className="flex items-center hover:text-pegasus-orange transition-colors">
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </a>
            <a href="#address" className="flex items-center hover:text-pegasus-orange transition-colors">
              <MapPin className="h-4 w-4 mr-2" />
              Address
            </a>
            <a href="#phone" className="flex items-center hover:text-pegasus-orange transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              Phone
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
