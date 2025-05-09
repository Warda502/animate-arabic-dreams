import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
  };
  return <div className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-pegasus-orange">Contact Us</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Get in touch with our support team or sales representatives
        </p>
        
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <div className="lg:w-1/2">
            <Card className="p-8 border border-orange-200 dark:border-orange-900/30 h-full">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." rows={5} required />
                </div>
                
                <Button type="submit" className="w-full bg-pegasus-orange hover:bg-orange-600">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="p-8 border border-orange-200 dark:border-orange-900/30 h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">General Inquiries:</p>
                    <p className="text-pegasus-orange">info@pegasus-tools.com</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1 mt-2">Technical Support:</p>
                    <p className="text-pegasus-orange">support@pegasus-tools.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">Sales Department:</p>
                    <p className="text-pegasus-orange">+1 (555) 123-4567</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1 mt-2">Technical Support:</p>
                    <p className="text-pegasus-orange">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pegasus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">Monday - Friday:</p>
                    <p className="text-pegasus-orange">9:00 AM - 6:00 PM (UTC)</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1 mt-2">Saturday:</p>
                    <p className="text-pegasus-orange">10:00 AM - 2:00 PM (UTC)</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1 mt-2">Sunday:</p>
                    <p className="text-pegasus-orange">Closed</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;