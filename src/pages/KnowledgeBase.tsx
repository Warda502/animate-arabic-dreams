
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Book, FileText, HelpCircle, ArrowRight, Coffee, Laptop, Shield, Smartphone } from "lucide-react";

const KnowledgeBase = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Knowledge Base</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Find answers to common questions and learn how to get the most out of Pegasus Tool
          </p>
          <div className="relative mt-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search the knowledge base..."
              className="pl-10 py-6 text-lg w-full rounded-lg bg-white dark:bg-gray-800"
            />
            <Button className="absolute right-2 top-2 bg-pegasus-orange hover:bg-pegasus-orange-600">
              Search
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-blue-500 text-white p-6">
              <div className="flex items-center mb-2">
                <Laptop className="h-8 w-8 mr-2" />
                <CardTitle className="text-xl">Getting Started</CardTitle>
              </div>
              <CardDescription className="text-blue-50">
                New to Pegasus Tool? Start here.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" /> 
                  <a href="#" className="hover:text-blue-500 transition-colors">Installation Guide</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" /> 
                  <a href="#" className="hover:text-blue-500 transition-colors">System Requirements</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" /> 
                  <a href="#" className="hover:text-blue-500 transition-colors">Quick Start Tutorial</a>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 text-blue-500 border-blue-500">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-green-500 text-white p-6">
              <div className="flex items-center mb-2">
                <Smartphone className="h-8 w-8 mr-2" />
                <CardTitle className="text-xl">Device Support</CardTitle>
              </div>
              <CardDescription className="text-green-50">
                Learn about supported devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-green-500" /> 
                  <a href="#" className="hover:text-green-500 transition-colors">Supported Phone Models</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-green-500" /> 
                  <a href="#" className="hover:text-green-500 transition-colors">Firmware Databases</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-green-500" /> 
                  <a href="#" className="hover:text-green-500 transition-colors">Compatibility Guide</a>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 text-green-500 border-green-500">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-purple-500 text-white p-6">
              <div className="flex items-center mb-2">
                <Shield className="h-8 w-8 mr-2" />
                <CardTitle className="text-xl">Troubleshooting</CardTitle>
              </div>
              <CardDescription className="text-purple-50">
                Resolve common issues quickly.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-purple-500" /> 
                  <a href="#" className="hover:text-purple-500 transition-colors">Connection Problems</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-purple-500" /> 
                  <a href="#" className="hover:text-purple-500 transition-colors">Error Code Solutions</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-purple-500" /> 
                  <a href="#" className="hover:text-purple-500 transition-colors">Recovery Options</a>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 text-purple-500 border-purple-500">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-amber-500 text-white p-6">
              <div className="flex items-center mb-2">
                <Coffee className="h-8 w-8 mr-2" />
                <CardTitle className="text-xl">Advanced Usage</CardTitle>
              </div>
              <CardDescription className="text-amber-50">
                Take your skills to the next level.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-amber-500" /> 
                  <a href="#" className="hover:text-amber-500 transition-colors">Advanced Features</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-amber-500" /> 
                  <a href="#" className="hover:text-amber-500 transition-colors">Custom Firmware</a>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-amber-500" /> 
                  <a href="#" className="hover:text-amber-500 transition-colors">Batch Processing</a>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 text-amber-500 border-amber-500">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow-md transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <Book className="h-8 w-8 text-pegasus-orange mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">How to Unlock Bootloader</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">A step-by-step guide to safely unlocking the bootloader on supported devices.</p>
                <Button variant="link" className="p-0 text-pegasus-orange hover:text-pegasus-orange-600 flex items-center">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <Book className="h-8 w-8 text-pegasus-orange mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Installing Custom ROMs</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Learn how to safely install custom ROMs on your device using Pegasus Tool.</p>
                <Button variant="link" className="p-0 text-pegasus-orange hover:text-pegasus-orange-600 flex items-center">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <Book className="h-8 w-8 text-pegasus-orange mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Bypassing FRP Lock</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Professional guide to bypassing FRP locks on compatible devices.</p>
                <Button variant="link" className="p-0 text-pegasus-orange hover:text-pegasus-orange-600 flex items-center">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-all duration-200 hover:shadow-lg">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600 rounded-full h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">Getting Started with Pegasus Tool</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">12:45 • Updated 2 weeks ago</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-all duration-200 hover:shadow-lg">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600 rounded-full h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">Flashing Firmware Guide</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">18:32 • Updated 1 month ago</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-all duration-200 hover:shadow-lg">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600 rounded-full h-12 w-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">Unlocking Xiaomi Devices</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">15:20 • Updated 3 weeks ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Need More Help */}
        <div className="bg-gradient-to-r from-pegasus-orange to-orange-500 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-lg mb-6">Can't find what you're looking for? Our support team is ready to help you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Contact Support
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-orange-600">
                Browse FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
