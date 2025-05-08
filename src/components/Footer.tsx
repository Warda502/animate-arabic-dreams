
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-hw-blue">HW-Key Tool</h3>
            <p className="text-gray-600 mb-4">
              The Professional Unlocking and Flashing Tool for Smart Phones, specializing in Xiaomi/Vivo/Oppo/Realme/Alcatel/Infinix/etc. devices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-hw-blue">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-hw-blue transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-gray-600 hover:text-hw-blue transition-colors">Features</Link></li>
              <li><Link to="/server-status" className="text-gray-600 hover:text-hw-blue transition-colors">Server Status</Link></li>
              <li><Link to="/resellers" className="text-gray-600 hover:text-hw-blue transition-colors">Resellers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-hw-blue">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-hw-blue transition-colors">Download Software</a></li>
              <li><a href="#" className="text-gray-600 hover:text-hw-blue transition-colors">User Manual</a></li>
              <li><a href="#" className="text-gray-600 hover:text-hw-blue transition-colors">Supported Models</a></li>
              <li><a href="#" className="text-gray-600 hover:text-hw-blue transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-hw-blue">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">info@hwkey.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+90 538 551 0232</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span className="text-gray-600">@renastech</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} HW-Key Tool. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
