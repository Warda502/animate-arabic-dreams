
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, PhoneCall, Mail, Clock, CheckCircle, AlertTriangle, HelpCircle, ArrowRight } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get the assistance you need with Pegasus Tool. Our support team is ready to help you resolve any issues.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Describe your issue or search for solutions..."
              className="pl-10 py-6 text-lg w-full rounded-lg bg-white dark:bg-gray-800"
            />
            <Button className="absolute right-2 top-2 bg-pegasus-orange hover:bg-pegasus-orange-600">
              Search
            </Button>
          </div>
        </div>

        {/* Support Options */}
        <Tabs defaultValue="chat" className="mb-16">
          <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-6">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="phone">Phone Support</TabsTrigger>
            <TabsTrigger value="ticket">Submit Ticket</TabsTrigger>
          </TabsList>
          
          <Card className="max-w-3xl mx-auto bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <TabsContent value="chat" className="mt-0">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="h-6 w-6 text-pegasus-orange mr-2" />
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Live Chat Support</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Connect with our support team instantly via live chat for quick assistance with your questions.
                    </p>
                    <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" /> Available 24/7
                    </div>
                    <div className="flex items-center mb-6 text-sm text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> Support agents online now
                    </div>
                    <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600">
                      Start Chat Now
                    </Button>
                  </div>
                  <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 md:mt-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Chat Tips</h4>
                    <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Have your license key ready</li>
                      <li>• Describe your issue clearly</li>
                      <li>• Include any error messages</li>
                      <li>• Mention your device model</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="mt-0">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <PhoneCall className="h-6 w-6 text-pegasus-orange mr-2" />
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Phone Support</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Talk directly with our technical specialists who can walk you through solutions step by step.
                    </p>
                    <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" /> Mon-Fri: 8AM-8PM EST
                    </div>
                    <div className="mb-6">
                      <p className="text-xl font-medium text-gray-900 dark:text-white">+1 (800) 555-0123</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">International: +1 (123) 456-7890</p>
                    </div>
                    <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600">
                      Request Callback
                    </Button>
                  </div>
                  <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 md:mt-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Call Tips</h4>
                    <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Have your license key ready</li>
                      <li>• Be near your computer</li>
                      <li>• Note any error codes</li>
                      <li>• Premium support available</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ticket" className="mt-0">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Mail className="h-6 w-6 text-pegasus-orange mr-2" />
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Submit Support Ticket</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Create a support ticket for more complex issues that require detailed investigation.
                    </p>
                    <div className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" /> Average response time: 4-6 hours
                    </div>
                    <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600">
                      Create Support Ticket
                    </Button>
                  </div>
                  <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 md:mt-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ticket Tips</h4>
                    <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Include screenshots if possible</li>
                      <li>• List steps to reproduce the issue</li>
                      <li>• Mention software version</li>
                      <li>• Attach log files if available</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        {/* Quick Solutions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Quick Solutions to Common Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Connection Problems</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If your device isn't being detected, try these simple troubleshooting steps.
                </p>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                  <li>• Check USB cable and ports</li>
                  <li>• Restart device in fastboot mode</li>
                  <li>• Install or reinstall drivers</li>
                </ul>
                <Button variant="link" className="p-0 text-pegasus-orange hover:text-pegasus-orange-600 flex items-center">
                  View Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Flashing Errors</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Common flashing errors and how to resolve them quickly.
                </p>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                  <li>• Firmware verification failed</li>
                  <li>• Device stuck in bootloop</li>
                  <li>• Error code 0x80070057</li>
                </ul>
                <Button variant="link" className="p-0 text-pegasus-orange hover:text-pegasus-orange-600 flex items-center">
                  View Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">License Issues</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Solutions for common license activation and validation problems.
                </p>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                  <li>• Invalid license key</li>
                  <li>• License activation failed</li>
                  <li>• Exceeded device limit</li>
                </ul>
                <Button variant="link" className="p-0 text-pegasus-orange hover:text-pegasus-orange-600 flex items-center">
                  View Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Status */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Support Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Live Chat Support</h3>
                  </div>
                  <span className="text-green-500 font-medium">Online</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Current wait time: ~2 minutes</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone Support</h3>
                  </div>
                  <span className="text-green-500 font-medium">Available</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Current wait time: ~5 minutes</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Need More Help */}
        <div className="bg-gradient-to-r from-pegasus-orange to-orange-500 rounded-xl p-8 text-white mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg mb-6">Our team is here for you. Check our extensive knowledge base or contact us directly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Browse Knowledge Base
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-orange-600">
                Visit FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
