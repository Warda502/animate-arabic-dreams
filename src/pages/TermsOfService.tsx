
import React, { useEffect } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - HW-Key Tool";
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Terms of Service"
          subtitle="Please read our terms of service carefully"
          highlightWord="Terms"
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">This page is under construction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our Terms of Service document is currently being prepared. This document will outline the rules, guidelines, and responsibilities for using HW-Key Tool.
            </p>
            
            <div className="flex items-center justify-center mt-8">
              <Button className="flex items-center" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Previous Page
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
