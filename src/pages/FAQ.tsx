
import React from 'react';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about Pegasus Tool
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Our FAQ section is currently being developed.
              Please check back later for answers to commonly asked questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
