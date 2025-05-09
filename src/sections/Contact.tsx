
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SectionHeader from '@/components/SectionHeader';
import { Mail, Phone, Clock, SendIcon } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
  };

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Contact Us" 
          subtitle="Get in touch with our support team or sales representatives"
        />
        
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <div className="lg:w-1/2 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            <Card className="p-8 border border-orange-200 dark:border-orange-900/30 h-full shadow-card hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 font-montserrat text-gray-800 dark:text-white">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      required 
                      className="transition-all duration-200 focus:border-pegasus-orange focus:ring-1 focus:ring-pegasus-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      className="transition-all duration-200 focus:border-pegasus-orange focus:ring-1 focus:ring-pegasus-orange"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    required 
                    className="transition-all duration-200 focus:border-pegasus-orange focus:ring-1 focus:ring-pegasus-orange"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    rows={5} 
                    required 
                    className="transition-all duration-200 focus:border-pegasus-orange focus:ring-1 focus:ring-pegasus-orange"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-pegasus-orange hover:bg-pegasus-orange-600 text-white font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <SendIcon className="h-5 w-5" /> Send Message
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="lg:w-1/2 opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            <Card className="p-8 border border-orange-200 dark:border-orange-900/30 h-full shadow-card bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900/80">
              <h2 className="text-2xl font-bold mb-6 font-montserrat text-gray-800 dark:text-white">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="h-7 w-7 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">General Inquiries:</p>
                    <p className="text-pegasus-orange font-medium mb-3 hover:underline cursor-pointer">info@pegasus-tools.com</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">Technical Support:</p>
                    <p className="text-pegasus-orange font-medium hover:underline cursor-pointer">support@pegasus-tools.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Phone className="h-7 w-7 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">Sales Department:</p>
                    <p className="text-pegasus-orange font-medium mb-3 hover:underline cursor-pointer">+1 (555) 123-4567</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">Technical Support:</p>
                    <p className="text-pegasus-orange font-medium hover:underline cursor-pointer">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="h-7 w-7 text-pegasus-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Business Hours</h3>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      <p className="text-gray-600 dark:text-gray-300">Monday - Friday:</p>
                      <p className="text-pegasus-orange font-medium">9:00 AM - 6:00 PM (UTC)</p>
                      <p className="text-gray-600 dark:text-gray-300">Saturday:</p>
                      <p className="text-pegasus-orange font-medium">10:00 AM - 2:00 PM (UTC)</p>
                      <p className="text-gray-600 dark:text-gray-300">Sunday:</p>
                      <p className="text-pegasus-orange font-medium">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
