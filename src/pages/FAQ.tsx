
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AnimatedCard from '@/components/AnimatedCard';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toggle FAQ question expansion
  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
    // Here you would normally filter the FAQs based on search query
  };
  
  // Categories
  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'account', name: 'Account & Licensing' },
    { id: 'technical', name: 'Technical Issues' },
    { id: 'features', name: 'Features & Usage' },
    { id: 'compatibility', name: 'Device Compatibility' }
  ];
  
  // FAQ Data
  const faqData = {
    general: [
      { 
        id: 'what-is-pegasus',
        question: 'What is Pegasus Tool?',
        answer: 'Pegasus Tool is a professional software solution designed for smartphone flashing, unlocking, and repair operations. It supports a wide range of devices including Xiaomi, Vivo, Oppo, Realme, and many others.'
      },
      { 
        id: 'cost',
        question: 'How much does Pegasus Tool cost?',
        answer: 'Pegasus Tool is available in different license types including monthly and yearly subscriptions. Please check our Pricing section for detailed information.'
      },
      { 
        id: 'customer-support',
        question: 'Do you offer customer support?',
        answer: 'Yes, we provide comprehensive customer support through various channels including email, live chat, and phone. Our support team is available to assist with any issues you might encounter.'
      }
    ],
    account: [
      { 
        id: 'create-account',
        question: 'How do I create an account?',
        answer: 'To create an account, click the "Sign Up" button on our website, fill out the registration form with your details, and follow the verification instructions sent to your email.'
      },
      { 
        id: 'forgot-password',
        question: 'I forgot my password. How can I reset it?',
        answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your registered email address and follow the instructions sent to your inbox.'
      },
      { 
        id: 'transfer-license',
        question: 'Can I transfer my license to another computer?',
        answer: 'Yes, you can deactivate your license on one computer and activate it on another. Go to Settings > License > Deactivate in the application on your current computer, then activate it on the new one.'
      }
    ],
    technical: [
      { 
        id: 'device-not-detected',
        question: 'My device is not being detected by Pegasus Tool',
        answer: 'First, ensure you have the proper USB drivers installed. Try using a different USB cable or port. Make sure USB debugging is enabled on your device. Restart both your computer and device. If the issue persists, contact our support team.'
      },
      { 
        id: 'installation-error',
        question: 'I\'m getting installation errors',
        answer: 'Make sure you\'re running the installer as administrator. Temporarily disable your antivirus software as it might be blocking the installation. Ensure your system meets the minimum requirements. Clear temporary files and try reinstalling.'
      },
      { 
        id: 'operation-failed',
        question: 'Why do I get "Operation Failed" errors?',
        answer: 'This can happen for several reasons: incompatible device firmware, connection issues, insufficient device battery, or locked bootloader. Check our troubleshooting guide for specific error codes and solutions.'
      }
    ],
    features: [
      { 
        id: 'unlock-bootloader',
        question: 'Can Pegasus Tool unlock my device\'s bootloader?',
        answer: 'Yes, Pegasus Tool supports bootloader unlocking for many supported devices. However, the process varies by manufacturer and model. Some devices may require additional authentication or waiting periods set by the manufacturer.'
      },
      { 
        id: 'data-backup',
        question: 'Does the tool include data backup features?',
        answer: 'Yes, Pegasus Tool includes comprehensive backup and restore functions for contacts, messages, apps, and other user data. We recommend always creating a backup before performing any flashing or unlocking operations.'
      },
      { 
        id: 'remove-frp',
        question: 'Can Pegasus Tool remove FRP locks?',
        answer: 'Pegasus Tool includes features to address FRP (Factory Reset Protection) on supported devices. This feature is intended for legitimate use cases where the device owner has forgotten their credentials.'
      }
    ],
    compatibility: [
      { 
        id: 'check-compatibility',
        question: 'How do I check if my device is compatible?',
        answer: 'You can check our Supported Models section on the website, which is regularly updated with new devices. You can search for your specific brand and model to verify compatibility.'
      },
      { 
        id: 'unsupported-device',
        question: 'What if my device is not listed as supported?',
        answer: 'If your device is not currently listed, it may be added in future updates. You can contact our support team to request device support or to inquire about potential workarounds for similar models.'
      },
      { 
        id: 'windows-compatibility',
        question: 'Which Windows versions are supported?',
        answer: 'Pegasus Tool is compatible with Windows 10 and Windows 11. It may work on Windows 8.1, but we officially support and recommend Windows 10/11 for the best experience and full feature set.'
      }
    ]
  };
  
  // Get current FAQs based on active category
  const currentFaqs = faqData[activeCategory as keyof typeof faqData] || [];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about Pegasus Tool
          </p>
          
          {/* Search section */}
          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for questions..." 
                className="pl-10 pr-16 py-6 w-full text-base rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-pegasus-orange focus:ring-pegasus-orange"
              />
              <Button 
                type="submit"
                className="absolute right-2 bg-pegasus-orange hover:bg-pegasus-orange-600 text-white rounded-full transition-transform hover:scale-105"
              >
                Search
              </Button>
            </div>
          </form>
        </motion.div>
        
        {/* FAQ Categories */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id 
                  ? "bg-pegasus-orange hover:bg-pegasus-orange-600 text-white" 
                  : "border-gray-300 hover:border-pegasus-orange hover:text-pegasus-orange"
                }
                onClick={() => {
                  setActiveCategory(category.id);
                  setExpandedQuestions([]);
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* FAQ Questions */}
        <AnimatedCard variant="elegant" delay={0.2} className="max-w-4xl mx-auto mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {categories.find(c => c.id === activeCategory)?.name || "Frequently Asked Questions"}
            </h2>
            
            <div className="space-y-4">
              {currentFaqs.length > 0 ? (
                currentFaqs.map((faq) => (
                  <motion.div 
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div
                        className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                        <Button variant="ghost" size="sm" className="shrink-0">
                          {expandedQuestions.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-pegasus-orange" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </Button>
                      </div>
                      
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ 
                          height: expandedQuestions.includes(faq.id) ? "auto" : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No FAQs available for this category at the moment.
                </p>
              )}
            </div>
          </CardContent>
        </AnimatedCard>
        
        {/* Still need help section */}
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you couldn't find the answers you're looking for, our support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white group"
              onClick={() => toast.info('Redirecting to contact page...')}
            >
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              className="border-pegasus-orange text-pegasus-orange hover:bg-pegasus-orange/10"
              onClick={() => toast.info('Redirecting to knowledge base...')}
            >
              Visit Knowledge Base
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
