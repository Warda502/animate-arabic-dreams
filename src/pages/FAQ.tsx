
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const FAQ = () => {
  const generalFaqs = [
    {
      question: "What is Pegasus Tool?",
      answer: "Pegasus Tool is a professional software solution designed for smartphone repair technicians and service centers. It enables unlocking, flashing, and repairing various smartphone models from manufacturers like Xiaomi, Vivo, Oppo, Realme, Alcatel, and Infinix."
    },
    {
      question: "What devices does Pegasus Tool support?",
      answer: "Pegasus Tool supports a wide range of devices from manufacturers including Xiaomi, Vivo, Oppo, Realme, Alcatel, Infinix, and many others. Our database includes over 1,000 smartphone models with regular updates to add support for new devices."
    },
    {
      question: "Do I need technical knowledge to use Pegasus Tool?",
      answer: "While Pegasus Tool is designed with an intuitive interface, basic technical knowledge about smartphone repair and flashing operations is recommended. We provide comprehensive documentation and video tutorials to help users get started."
    },
    {
      question: "Is Pegasus Tool legal to use?",
      answer: "Pegasus Tool is legal for authorized use cases such as repairing your own devices or providing professional repair services. However, it should only be used in compliance with local laws and manufacturer policies. The tool is intended for legitimate repair purposes only."
    },
    {
      question: "How often is Pegasus Tool updated?",
      answer: "We release updates regularly, typically once every 1-2 months for major updates and more frequently for minor updates and bug fixes. Updates include new device support, improved features, and security enhancements."
    }
  ];
  
  const licensingFaqs = [
    {
      question: "What licensing options are available?",
      answer: "Pegasus Tool offers several licensing options: Standard License (for individual technicians), Professional License (for repair shops), and Enterprise License (for large service centers). Each tier offers different features and device quotas."
    },
    {
      question: "How many devices can I use with one license?",
      answer: "The number of devices you can work with depends on your license tier. Standard licenses support up to 100 devices per month, Professional licenses support up to 500 devices, and Enterprise licenses offer unlimited device support."
    },
    {
      question: "Can I transfer my license to another computer?",
      answer: "Yes, you can deactivate your license on one computer and activate it on another. Standard licenses allow transfers once per month, Professional licenses twice per month, and Enterprise licenses have unlimited transfers."
    },
    {
      question: "Do you offer a trial version?",
      answer: "Yes, we offer a 7-day trial version with limited functionality. The trial allows you to test basic features and compatibility before purchasing a full license."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and selected cryptocurrencies. For large orders or enterprise customers, we can arrange custom payment terms."
    }
  ];
  
  const technicalFaqs = [
    {
      question: "What are the system requirements for Pegasus Tool?",
      answer: "Pegasus Tool requires Windows 10/11 (64-bit), minimum 4GB RAM (8GB recommended), Intel Core i3 or equivalent processor, 5GB free disk space, and internet connection for activation and updates. USB 3.0 ports are recommended for faster operation."
    },
    {
      question: "Can Pegasus Tool remove FRP lock?",
      answer: "Yes, Pegasus Tool can remove FRP (Factory Reset Protection) locks on supported devices. This feature is intended for legitimate use cases where the device owner has forgotten their credentials after a factory reset."
    },
    {
      question: "Does Pegasus Tool work without internet connection?",
      answer: "After initial activation, Pegasus Tool can work offline for most operations. However, some features like firmware downloads and license verification require an internet connection. We recommend maintaining internet access for the best experience."
    },
    {
      question: "Can Pegasus Tool fix bricked devices?",
      answer: "In many cases, yes. Pegasus Tool includes recovery modes that can restore functionality to devices in boot loops or soft-brick conditions. Success depends on the specific device and the nature of the problem."
    },
    {
      question: "Will using Pegasus Tool void my device warranty?",
      answer: "Operations like unlocking bootloaders, flashing custom ROMs, or bypassing security features typically void manufacturer warranties. We recommend users inform their customers about this when providing repair services."
    }
  ];
  
  const supportFaqs = [
    {
      question: "How can I get technical support?",
      answer: "Technical support is available through multiple channels: in-app support ticket system, email support, live chat during business hours, and phone support for enterprise customers. We also maintain an extensive knowledge base and video tutorials."
    },
    {
      question: "What is the response time for support requests?",
      answer: "Standard license holders typically receive responses within 24 hours. Professional license holders receive priority support with responses within 12 hours. Enterprise customers enjoy dedicated support with response times under 4 hours."
    },
    {
      question: "Do you offer remote assistance?",
      answer: "Yes, for complex issues, our support team can provide remote assistance sessions to directly help resolve problems. This service is included with Professional and Enterprise licenses and available as a paid add-on for Standard licenses."
    },
    {
      question: "Is training available for Pegasus Tool?",
      answer: "Yes, we offer online training sessions for new users. Professional and Enterprise license holders receive complimentary training sessions. We also provide custom training packages for teams and organizations."
    },
    {
      question: "Where can I find documentation for Pegasus Tool?",
      answer: "Comprehensive documentation is available in our Knowledge Base, including step-by-step guides, troubleshooting information, and device-specific instructions. Video tutorials are also available on our website and YouTube channel."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to the most common questions about Pegasus Tool
          </p>
          
          <div className="mt-8 relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-10 py-6 text-lg w-full rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <Tabs defaultValue="general" className="mb-10">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="licensing">Licensing</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <TabsContent value="general" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {generalFaqs.map((faq, index) => (
                  <AccordionItem value={`faq-${index}`} key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <AccordionTrigger className="bg-gray-50 dark:bg-gray-800 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      <div className="mt-4 flex items-center justify-end space-x-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</p>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="licensing" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {licensingFaqs.map((faq, index) => (
                  <AccordionItem value={`faq-${index}`} key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <AccordionTrigger className="bg-gray-50 dark:bg-gray-800 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      <div className="mt-4 flex items-center justify-end space-x-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</p>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {technicalFaqs.map((faq, index) => (
                  <AccordionItem value={`faq-${index}`} key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <AccordionTrigger className="bg-gray-50 dark:bg-gray-800 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      <div className="mt-4 flex items-center justify-end space-x-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</p>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="support" className="mt-0">
              <Accordion type="single" collapsible className="space-y-4">
                {supportFaqs.map((faq, index) => (
                  <AccordionItem value={`faq-${index}`} key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <AccordionTrigger className="bg-gray-50 dark:bg-gray-800 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      <div className="mt-4 flex items-center justify-end space-x-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Was this helpful?</p>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </div>
        </Tabs>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Activation Issues</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Solutions for license activation problems</p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Device Connection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Troubleshoot device detection problems</p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Error Codes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Understanding common error messages</p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Firmware Flashing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Tips for successful firmware updates</p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Bootloader Unlocking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Safe bootloader unlock procedures</p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Billing & Subscriptions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Managing your license and payments</p>
            </Card>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-pegasus-orange to-orange-500 text-white rounded-xl p-8 text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is ready to help with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              Contact Support
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-orange-600">
              Visit Help Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
