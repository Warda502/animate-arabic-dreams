import React from 'react';
import { Card } from '@/components/ui/card';
const PaymentMethods = () => {
  const paymentMethods = [{
    name: "Credit/Debit Cards",
    description: "Securely pay with Visa, Mastercard, American Express, and other major credit cards.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
  }, {
    name: "PayPal",
    description: "Fast and secure payments through your PayPal account.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
  }, {
    name: "Bitcoin & Cryptocurrency",
    description: "Pay with Bitcoin, Ethereum, and other major cryptocurrencies.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
  }, {
    name: "Bank Transfer",
    description: "Direct bank transfers are available for larger purchases.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
  }, {
    name: "Mobile Payment",
    description: "Pay with Apple Pay, Google Pay, and other mobile payment solutions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
  }, {
    name: "Reseller Credits",
    description: "Pre-purchase credits for our reseller program for discounted pricing.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
  }];
  return <div className="pt-24 pb-20 bg-white dark:bg-gray-900 py-[86px]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-pegasus-orange">Payment Methods</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Multiple secure payment options for your convenience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paymentMethods.map((method, index) => <Card key={index} className="p-6 border border-orange-200 dark:border-orange-900/30 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {method.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{method.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
            </Card>)}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          
        </div>
      </div>
    </div>;
};
export default PaymentMethods;