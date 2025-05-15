
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, PhoneCall, Mail, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AnimatedCard from '@/components/AnimatedCard';

const HelpCenter = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle expanding/collapsing FAQ items
  const toggleExpand = (index: number) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    
    if (searchQuery.trim()) {
      toast.info(`Searching for help with: ${searchQuery}`);
    } else {
      toast.warning('Please enter a search query');
    }
  };

  // Handle contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill out all fields');
      return;
    }
    
    // Form validation passed
    toast.success('Your message has been sent! We will get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I install Pegasus Tool?",
      answer: "Download the latest version from our website, run the installer, and follow the on-screen instructions. Make sure to run the installer as administrator."
    },
    {
      question: "Why is my device not being detected?",
      answer: "First, ensure your device has USB debugging enabled. Second, install the appropriate drivers for your device. Finally, try using a different USB cable or port."
    },
    {
      question: "How do I update to the latest version?",
      answer: "You can update directly from within the application by going to Help > Check for Updates, or download the latest version from our website and install it over your current installation."
    },
    {
      question: "Is my device supported?",
      answer: "Check our Supported Models section to see if your specific device model is listed. We regularly add support for new devices with each update."
    },
    {
      question: "How do I activate my license?",
      answer: "After purchase, you'll receive an activation key by email. Open Pegasus Tool, go to Settings > License, and enter your activation key."
    }
  ];

  // Contact methods
  const contactMethods = [
    {
      method: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: () => toast.info("Initiating live chat with support...")
    },
    {
      method: "Phone Support",
      description: "Call our dedicated support line",
      icon: PhoneCall,
      action: () => toast.info("Opening phone support details...")
    },
    {
      method: "Email",
      description: "Send us an email and we'll respond within 24 hours",
      icon: Mail,
      action: () => toast.info("Preparing email support form...")
    }
  ];

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
            Help Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get the support you need to make the most of Pegasus Tool
          </p>
          
          {/* Search section */}
          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                name="search"
                type="text" 
                placeholder="What do you need help with?" 
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
        
        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Get in Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <AnimatedCard 
                key={index} 
                variant="elegant" 
                hoverEffect="lift" 
                delay={index * 0.1}
                className="h-full cursor-pointer"
                onClick={method.action}
              >
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-pegasus-orange/10 flex items-center justify-center mb-4">
                    <method.icon className="h-8 w-8 text-pegasus-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{method.method}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {method.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-pegasus-orange hover:bg-pegasus-orange/10 group"
                    onClick={method.action}
                  >
                    Contact Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => toggleExpand(index)}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                      <Button variant="ghost" size="icon">
                        {expanded === index ? (
                          <ChevronUp className="h-5 w-5 text-pegasus-orange" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Answer */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: expanded === index ? "auto" : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              className="border-pegasus-orange text-pegasus-orange hover:bg-pegasus-orange hover:text-white transition-colors"
              onClick={() => toast.info('Loading more frequently asked questions')}
            >
              View All FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Contact Form */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Send Us a Message</h2>
              
              <form onSubmit={handleContactSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className="w-full border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit"
                      className="w-full bg-pegasus-orange hover:bg-pegasus-orange-600 text-white py-6 transition-transform hover:scale-[1.02]"
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
