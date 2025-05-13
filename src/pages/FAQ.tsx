
import React, { useEffect } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ - HW-Key Tool";
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to the most common questions about HW-Key Tool"
          highlightWord="Questions"
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">This page is under construction</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're currently compiling frequently asked questions and their answers to help you better understand HW-Key Tool. Please check back soon for a comprehensive FAQ section.
            </p>
            
            <div className="mt-8 mb-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is HW-Key Tool?</AccordionTrigger>
                  <AccordionContent>
                    HW-Key Tool is a professional unlocking and flashing tool for smartphones, specializing in brands like Xiaomi, Vivo, Oppo, Realme, Alcatel, Infinix, and more.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I download the latest version?</AccordionTrigger>
                  <AccordionContent>
                    You can download the latest version by clicking on the "Download Now" button on our homepage.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
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

export default FAQ;
