import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 opacity-0 animate-fade-in-delay-1"
                style={{ animationFillMode: 'forwards' }}
              >
                HW-Key Tool
              </h1>
              <p 
                className="text-lg text-gray-600 mb-8 max-w-lg opacity-0 animate-fade-in-delay-2"
                style={{ animationFillMode: 'forwards' }}
              >
                The Professional Unlocking and Flashing Tool for Smart Phones, specializing in 
                Xiaomi/Vivo/Oppo/Realme/Alcatel/Infinix/etc. devices.
              </p>
              <div 
                className="space-x-4 opacity-0 animate-fade-in-delay-3"
                style={{ animationFillMode: 'forwards' }}
              >
                <Button className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-6 rounded-full text-lg">
                  Download Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-hw-blue text-hw-blue hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-blue-400 dark:border-blue-400 dark:hover:text-blue-300 px-8 py-6 rounded-full text-lg transition-colors"
                  onClick={() => scrollToSection('why-choose-pegasus')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div 
              className="md:w-1/2 opacity-0 animate-fade-in-delay-4"
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="relative">
                <div className="bg-blue-100 rounded-full h-80 w-80 mx-auto"></div>
                <img 
                  src="/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png" 
                  alt="HW-Key Tool Interface" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pegasus Tool */}
      <section id="why-choose-pegasus" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Pegasus Tool</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Fast & Efficient</h3>
              <p className="text-gray-600 text-center">
                Our tool is designed for speed and efficiency, letting you complete operations in minutes that would take hours with other solutions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Secure & Reliable</h3>
              <p className="text-gray-600 text-center">
                Security is our priority. We ensure your devices are handled safely with reliable processes that protect device integrity.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Multi-Brand Support</h3>
              <p className="text-gray-600 text-center">
                One tool for many devices. We support a wide range of manufacturers, making us your one-stop solution for all mobile servicing needs.
              </p>
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              Pegasus Tool has been developed by experienced professionals in the mobile repair industry, focusing on the real needs of service centers and phone repair shops.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-hw-blue">Our Key Features</h2>
          <p className="section-subtitle">Everything you need for smartphone flashing and unlocking</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualcomm & MediaTek Support</h3>
              <p className="text-gray-600">Comprehensive support for the most common mobile chipsets, ensuring broad compatibility.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Brand Compatibility</h3>
              <p className="text-gray-600">Service devices from numerous manufacturers including Xiaomi, Vivo, Oppo, and more.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md card-hover">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Firmware Flashing</h3>
              <p className="text-gray-600">Easily install or update device firmware to fix software issues or resolve boot loop problems.</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg"
              asChild
            >
              <Link to="/features">
                Discover All Features
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Software Screenshot */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-hw-blue">Powerful Software Interface</h2>
          <p className="section-subtitle">User-friendly design for efficient device management</p>
          
          <div className="mt-16 rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto transform hover:-translate-y-2 transition-transform duration-300">
            <img 
              src="/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png" 
              alt="HW-Key Tool Interface" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex justify-center mt-12">
            <div className="flex items-center p-6 bg-white rounded-full shadow-lg">
              <div className="flex-shrink-0 mr-4">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">HW-Key Tool v1.1.7</h3>
                <p className="text-gray-600">Latest version with enhanced features and bug fixes</p>
              </div>
              <Button 
                className="ml-8 bg-hw-blue hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resellers Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-hw-blue">Our Official Resellers</h2>
          <p className="section-subtitle">Authorized partners worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                WorldWide Distributor
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Halabtech</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Halabtech (Distributor)
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    server.halabtech.com
                  </p>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                Worldwide Reseller
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Leope-Gsm</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Leope-Gsm (Reseller)
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    leope-gsm.com
                  </p>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                Worldwide Reseller
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Martlobs GSM</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Martlobs GSM (Reseller)
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    martlobsgsm.com
                  </p>
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center mt-4 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg"
              asChild
            >
              <Link to="/resellers">
                View All Resellers
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg text-blue-100 max-w-xl">
                Download HW-Key Tool now and unlock the full potential of your smartphone flashing and unlocking service.
              </p>
            </div>
            <div>
              <Button 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg shadow-lg"
              >
                Download HW-Key Tool v1.1.7
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
