
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, HelpCircle, Search } from 'lucide-react';

const KnowledgeBase = () => {
  useEffect(() => {
    document.title = "Knowledge Base - HW-Key Tool";
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Knowledge Base"
          subtitle="Find answers to common questions and learn more about our tool"
          highlightWord="Knowledge"
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">This page is under construction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're currently building our knowledge base to provide you with comprehensive information about HW-Key Tool.
              Please check back soon for detailed guides, tutorials, and solutions to common questions.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button className="flex items-center" onClick={() => window.history.back()}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Back to Previous Page
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                <Search className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
