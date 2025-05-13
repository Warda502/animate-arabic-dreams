
import React from 'react';

const KnowledgeBase = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Knowledge Base</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find detailed information about Pegasus Tool features and how to use them
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Our knowledge base is currently under construction. 
              Check back soon for detailed guides and documentation about Pegasus Tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
