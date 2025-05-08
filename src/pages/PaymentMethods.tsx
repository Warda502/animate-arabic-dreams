
import React from 'react';
import { Card } from '@/components/ui/card';

const PaymentMethods = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "PayPal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="#003087">
          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 4.02-.024.15a.798.798 0 01-.79.68h-2.75a.483.483 0 01-.477-.558l1.56-9.902a.735.735 0 01.725-.627h4.8c2.142 0 3.75.625 4.65 2.573zm-7.18-5.604c3.007 0 5.587 1.154 6.38 4.27.895 3.483-1.673 6.802-5.23 6.802h-1.21c-.4 0-.74.29-.802.685l-.693 4.38a.82.82 0 01-.81.685H7.366a.499.499 0 01-.493-.576l2.143-13.58a.824.824 0 01.811-.685l3.059.02z" />
        </svg>
      ),
      description: "Fast and secure online payment service"
    },
    {
      id: 2,
      name: "Bank Transfer",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      description: "Direct transfer to our bank accounts"
    },
    {
      id: 3,
      name: "USDT",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="#26A17B">
          <circle cx="12" cy="12" r="12" fill="#26A17B" />
          <path d="M13.24 8.64v-.79h2.58V6.24H8.19v1.61h2.58v.79a8.66 8.66 0 00-4.42 1.28v7.17a9.88 9.88 0 004.42 1.13 10.06 10.06 0 004.74-1.13v-7.17a8.52 8.52 0 00-2.27-.79zm1.89 7.17a8.1 8.1 0 01-3.2.63 8 8 0 01-2.9-.47v-4.69a7.08 7.08 0 012.9-.63 7.08 7.08 0 013.2.63z" fill="white" />
        </svg>
      ),
      description: "Tether stablecoin cryptocurrency"
    },
    {
      id: 4,
      name: "BTC",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="#F7931A">
          <path d="M23.638 14.904c-1.602 6.425-8.113 10.34-14.542 8.736C2.67 22.052-1.244 15.542.359 9.105 1.962 2.67 8.475-1.243 14.9.358c6.453 1.605 10.356 8.116 8.738 14.548v-.002zm-5.54-3.006c.085-.894-.5-1.374-1.342-1.697l.28-1.12-1.315-.33-.272 1.085c-.35-.09-.7-.168-1.052-.25l.273-1.09-1.32-.328-.274 1.118c-.288-.07-.576-.134-.856-.204l.004-.02-1.82-.455-.35 1.407s.98.225.96.238c.533.134.632.488.615.77l-.616 2.473c.037.01.083.022.135.044l-.14-.035-.866 3.47c-.064.158-.23.398-.6.307.012.02-.96-.24-.96-.24l-.658 1.514 1.736.434c.32.08.636.164.946.243l-.278 1.117 1.315.33.277-1.11c.36.1.713.19 1.057.275l-.273 1.102 1.32.33.28-1.112c2.25.427 3.944.255 4.65-1.774.57-1.637-.03-2.586-1.217-3.205.867-.198 1.517-.77 1.69-1.94l.01-.002zm-3.01 4.24c-.404 1.64-3.157.75-4.05.53l.72-2.894c.896.225 3.757.67 3.33 2.363zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.625c.744.188 3.137.535 2.75 2.077z" />
        </svg>
      ),
      description: "Bitcoin cryptocurrency"
    },
    {
      id: 5,
      name: "ETH",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="#627EEA">
          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
        </svg>
      ),
      description: "Ethereum cryptocurrency"
    },
    {
      id: 6,
      name: "Binance/BNB",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="#F3BA2F">
          <path d="M12 0L5.708 6.293 8.54 9.123l3.46-3.46 3.46 3.46 2.831-2.83L12 0zM5.708 12L2.876 9.17 0 12.044l2.876 2.873L5.708 12zM8.54 14.877l-2.832 2.83L12 24l6.292-6.293-2.831-2.83L12 18.337l-3.46-3.46zM21.124 14.917L24 12.043l-2.876-2.873L18.292 12l2.832 2.917z" />
          <path d="M15.456 12l-1.2 1.2-2.256 2.245-1.2 1.2-1.2-1.2-2.256-2.245L6.12 12l1.223-1.2 2.256-2.257 1.2-1.2 1.2 1.2 2.256 2.257L15.456 12z" />
        </svg>
      ),
      description: "Binance Coin cryptocurrency"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Accepted Payment Methods
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Flexible options available through our resellers
          </p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-10">We Accept</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="mb-4 text-gray-700">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center text-gray-600">
              <p className="mb-6">
                Availability of specific methods depends on the reseller. Please check with your chosen reseller for details.
              </p>
              <p>
                Our resellers provide various payment options to accommodate your preferences and location. Contact your regional reseller for specific payment instructions.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Payment Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Payment Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-hw-blue text-white flex items-center justify-center font-bold text-lg">1</div>
                <div className="h-20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Contact a Reseller</h3>
                <p className="text-gray-600">
                  Choose an official reseller from our list and contact them through their preferred communication channel.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-hw-blue text-white flex items-center justify-center font-bold text-lg">2</div>
                <div className="h-20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Payment</h3>
                <p className="text-gray-600">
                  Complete the payment using one of the available methods provided by your reseller.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-hw-blue text-white flex items-center justify-center font-bold text-lg">3</div>
                <div className="h-20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Activation</h3>
                <p className="text-gray-600">
                  After payment confirmation, you'll receive your license activation details from the reseller.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing Information</h2>
          
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-hw-blue">License Options</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1-Month License</h4>
                      <p className="text-gray-600 text-sm">Full feature access for 30 days</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Annual License</h4>
                      <p className="text-gray-600 text-sm">Full feature access for 1 year (best value)</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Credits System</h4>
                      <p className="text-gray-600 text-sm">Pay-per-use option for occasional users</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-hw-blue">Important Notes</h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Prices vary between resellers and regions</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Discounts available for bulk purchases</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Regular users may benefit from longer-term licenses</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-hw-blue mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Automatic updates included with valid licenses</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button className="bg-hw-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Contact a Reseller for Pricing
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentMethods;
