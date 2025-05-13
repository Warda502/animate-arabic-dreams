
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const KnowledgeBase = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 text-pegasus-orange animate-spin mb-4" />
          <p className="text-lg text-gray-500 dark:text-gray-400">Loading knowledge base...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-8">Knowledge Base</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Our knowledge base is currently under construction. Please check back later for detailed guides and tutorials.
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
