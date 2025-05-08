
import React from 'react';
import { Card } from '@/components/ui/card';

const Resellers = () => {
  const resellers = [
    {
      id: 1,
      name: "Halabtech",
      type: "WorldWide Distributor",
      about: "Halabtech (Distributor)",
      website: "server.halabtech.com",
      telegram: "@htsupport",
      whatsapp: "Contact Us Page",
      email: "info@halabtech.com",
      phone: "",
      rating: 5
    },
    {
      id: 2,
      name: "Leope-Gsm",
      type: "Worldwide Reseller",
      about: "Leope-Gsm (Reseller)",
      website: "leope-gsm.com",
      telegram: "@GaalaGsm",
      whatsapp: "Click me",
      email: "gaalgsm@icloud.com",
      phone: "+584124056413",
      rating: 5
    },
    {
      id: 3,
      name: "Martlobs GSM",
      type: "Worldwide Reseller",
      about: "Martlobs GSM (Reseller)",
      website: "martlobsgsm.com",
      telegram: "",
      whatsapp: "+5194184352",
      email: "luismartinez06042001@gmail.com",
      phone: "+5194184352",
      rating: 5
    },
    {
      id: 4,
      name: "Seydaxsoft",
      type: "IRAQ Distributor",
      about: "Seydaxsoft (Distributor)",
      website: "kgunlocker.com",
      telegram: "",
      whatsapp: "+964750216403",
      email: "contactus@kgunlocker.com",
      phone: "+964750216403",
      rating: 5
    },
    {
      id: 5,
      name: "MMO-Server",
      type: "Worldwide Reseller",
      about: "MMO-Server (Reseller)",
      website: "mmo-server.com",
      telegram: "@MmoServerNews",
      whatsapp: "+249917244408",
      email: "mmo-server@hotmail.com",
      phone: "+249917244408",
      rating: 5
    },
    {
      id: 6,
      name: "Unlock724 Server",
      type: "ENES GSM",
      about: "Unlock724 Server (Reseller)",
      website: "unlock724.com",
      telegram: "+905519131313",
      whatsapp: "+905519131313",
      email: "masallahtay@gmail.com",
      phone: "+905519131313",
      rating: 5
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Official Resellers
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Connect with our authorized partners worldwide to purchase licenses and receive support
          </p>
        </div>
      </section>

      {/* Resellers Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resellers.map((reseller, index) => (
              <div 
                key={reseller.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden card-hover opacity-0 animate-fade-in-delay-1"
                style={{ animationFillMode: 'forwards', animationDelay: `${Math.min(index * 0.1, 0.5)}s` }}
              >
                <div className="bg-hw-blue text-white py-3 px-4 font-semibold">
                  {reseller.type}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{reseller.name}</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-600">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      About: {reseller.about}
                    </p>
                    
                    {reseller.website && (
                      <p className="flex items-center text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </span>
                        Web: {reseller.website}
                      </p>
                    )}
                    
                    {reseller.telegram && (
                      <p className="flex items-center text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.303l3.2 1.061 1.841 6.125a2.25 2.25 0 0 0 2.35 1.525c.563-.108 1.039-.45 1.324-.9l2.076-3.293c1.62 1.016 3.165 1.976 3.401 2.123a2.226 2.226 0 0 0 1.82.127c.626-.26 1.072-.757 1.213-1.359.165-.71.361-3.09.401-3.6.101-1.305.206-3.124.309-4.926.077-1.341.133-2.336.176-3.46.034-.88-.114-1.236-.28-1.469-.186-.261-.551-.456-1.026-.55a2.221 2.221 0 0 0-.419-.044Z" />
                          </svg>
                        </span>
                        Telegram: {reseller.telegram}
                      </p>
                    )}
                    
                    {reseller.whatsapp && (
                      <p className="flex items-center text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5m0 0a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1Z" />
                          </svg>
                        </span>
                        WhatsApp: {reseller.whatsapp}
                      </p>
                    )}
                    
                    {reseller.email && (
                      <p className="flex items-center text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        Email: {reseller.email}
                      </p>
                    )}
                    
                    {reseller.phone && (
                      <p className="flex items-center text-gray-600">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        Phone: {reseller.phone}
                      </p>
                    )}
                    
                    <div className="flex items-center text-gray-600 mt-2">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: reseller.rating }).map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Reseller */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Become a Reseller</h2>
            
            <Card className="p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-hw-blue mb-4">Join Our Global Network</h3>
                <p className="text-gray-600 mb-6">
                  Interested in becoming an official HW-Key Tool reseller? Join our growing network of partners and offer premium unlocking solutions to your customers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Benefits:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Competitive pricing and margins</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Priority technical support</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Official reseller listing on our website</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Marketing materials and support</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Requirements:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Established mobile repair business</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Technical knowledge of mobile devices</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Minimum order commitment</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Customer support capabilities</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Apply to Become a Reseller
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resellers;
