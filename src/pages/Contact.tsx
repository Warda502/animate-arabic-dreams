
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Have questions or need support? Get in touch with our team
          </p>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div className="opacity-0 animate-fade-in-delay-3" style={{ animationFillMode: 'forwards' }}>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                
                <Card className="p-6 shadow-lg">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <Input id="subject" placeholder="How can we help you?" required />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea id="message" placeholder="Enter your message here..." rows={6} required />
                    </div>
                    
                    <div className="text-right">
                      <Button type="submit" className="bg-hw-blue hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
              
              {/* Contact Information */}
              <div className="opacity-0 animate-fade-in-delay-4" style={{ animationFillMode: 'forwards' }}>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <Card className="p-6 shadow-lg mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p className="text-gray-600">renas.muslm@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-1">WhatsApp</h3>
                        <p className="text-gray-600">+90 538 551 0232</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hw-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.303l3.2 1.061 1.841 6.125a2.25 2.25 0 0 0 2.35 1.525c.563-.108 1.039-.45 1.324-.9l2.076-3.293c1.62 1.016 3.165 1.976 3.401 2.123a2.226 2.226 0 0 0 1.82.127c.626-.26 1.072-.757 1.213-1.359.165-.71.361-3.09.401-3.6.101-1.305.206-3.124.309-4.926.077-1.341.133-2.336.176-3.46.034-.88-.114-1.236-.28-1.469-.186-.261-.551-.456-1.026-.55a2.221 2.221 0 0 0-.419-.044Z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-1">Telegram</h3>
                        <p className="text-gray-600">@renastech</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hw-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold mb-1">Telegram Group</h3>
                        <p className="text-gray-600">hwkey</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Support Hours</h3>
                  <p className="mb-4">Our team is available to assist you during the following hours:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-100">Weekdays:</h4>
                      <p className="font-bold">9:00 AM - 10:00 PM (GMT+3)</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-blue-100">Weekends:</h4>
                      <p className="font-bold">10:00 AM - 8:00 PM (GMT+3)</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-sm text-blue-100">
                    For urgent matters outside of these hours, please contact us via Telegram or email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">How do I activate my license?</h3>
                <p className="text-gray-600">
                  After purchasing a license from an official reseller, you will receive an activation code. Open the HW-Key Tool software, go to the "License" section, and enter your activation code.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Can I transfer my license to another computer?</h3>
                <p className="text-gray-600">
                  Yes, you can deactivate your license on one computer and activate it on another. However, this can only be done once every 30 days to prevent license sharing.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">I've purchased a license but haven't received my activation code</h3>
                <p className="text-gray-600">
                  Please contact the reseller from whom you purchased the license. If you don't receive a response within 24 hours, contact our support team with proof of purchase.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Does HW-Key Tool work with all phone models?</h3>
                <p className="text-gray-600">
                  HW-Key Tool supports a wide range of phone models from manufacturers including Xiaomi, Vivo, Oppo, Realme, Alcatel, and Infinix. Please check our Features page for specific compatibility information.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">I'm having trouble with the software. Where can I get technical support?</h3>
                <p className="text-gray-600">
                  For technical support, please join our Telegram group or contact us via email. Including screenshots or error logs will help us troubleshoot your issue more effectively.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
