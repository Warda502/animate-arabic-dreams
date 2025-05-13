
import React, { useEffect } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, ArrowLeft, MessageCircle } from 'lucide-react';

const HelpCenter = () => {
  useEffect(() => {
    document.title = "Help Center - HW-Key Tool";
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Help Center"
          subtitle="Get assistance with your questions or issues"
          highlightWord="Help"
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">This page is under construction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our Help Center is coming soon. We're working on building a comprehensive support system to assist you with any questions or issues you might have with HW-Key Tool.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button className="flex items-center" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Previous Page
              </Button>
              <Button variant="outline" className="flex items-center" onClick={() => window.location.href = "/#contact"}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
