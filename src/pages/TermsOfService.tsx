
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Check, FileText, ShieldCheck, ScrollText } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedCard from '@/components/AnimatedCard';

const TermsOfService = () => {
  const [activeTab, setActiveTab] = useState('terms');
  const [hasAccepted, setHasAccepted] = useState(false);
  
  const handleAccept = () => {
    setHasAccepted(true);
    toast.success('You have accepted the Terms of Service');
  };
  
  const handlePrint = () => {
    toast.info('Preparing document for printing...');
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  const handleDownloadPDF = () => {
    toast.success('Terms of Service PDF downloaded successfully');
  };

  const renderTabContent = (content: React.ReactNode) => (
    <AnimatedCard variant="elegant" delay={0.2} className="overflow-hidden">
      <CardContent className="p-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {content}
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center">
          <div className="space-x-4">
            <Button 
              variant="outline" 
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handlePrint}
            >
              Print Document
            </Button>
            <Button 
              variant="outline" 
              className="text-pegasus-orange border-pegasus-orange hover:bg-pegasus-orange/10"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </div>
          
          {!hasAccepted && activeTab === 'terms' && (
            <Button 
              className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={handleAccept}
            >
              <Check className="h-5 w-5" />
              Accept Terms
            </Button>
          )}
        </div>
      </CardContent>
    </AnimatedCard>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Legal Documents</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Read our terms of service, privacy policy, and license agreement
          </p>
        </motion.div>
        
        <Tabs defaultValue="terms" className="mb-10" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger 
              value="terms" 
              onClick={() => setActiveTab('terms')}
              className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white"
            >
              <FileText className="mr-2 h-4 w-4" /> Terms of Service
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              onClick={() => setActiveTab('privacy')}
              className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white"
            >
              <ShieldCheck className="mr-2 h-4 w-4" /> Privacy Policy
            </TabsTrigger>
            <TabsTrigger 
              value="license" 
              onClick={() => setActiveTab('license')}
              className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white"
            >
              <ScrollText className="mr-2 h-4 w-4" /> License Agreement
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {renderTabContent(
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Terms of Service</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last updated: May 10, 2025</p>
                
                  <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Pegasus Tool software ("the Software") operated by Pegasus Technologies ("us", "we", or "our").</p>
                  
                  <p>Your access to and use of the Software is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Software.</p>
                  
                  <p>By accessing or using the Software, you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the Software.</p>
                  
                  <h3>License</h3>
                  <p>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to download and use the Software solely for your personal or business purposes.</p>
                  
                  <h3>Restrictions</h3>
                  <p>You are specifically prohibited from:</p>
                  <ul>
                    <li>Modifying, disassembling, decompiling or reverse engineering the Software</li>
                    <li>Renting, leasing, lending, selling, redistributing, or sublicensing the Software</li>
                    <li>Using the Software for illegal purposes or in violation of any local, state, national, or international law</li>
                    <li>Exploiting the Software for any unauthorized purpose</li>
                    <li>Transmitting any viruses, worms, or other malicious code</li>
                  </ul>
                  
                  <h3>Content</h3>
                  <p>Our Software allows you to perform various operations on your devices. You acknowledge that we have no control over and assume no responsibility for the content, privacy policies, or practices of any third party services or devices.</p>
                  
                  <h3>Limitation of Liability</h3>
                  <p>In no event shall Pegasus Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Software; (ii) any conduct or content of any third party on the Software; (iii) any content obtained from the Software; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>
                  
                  <h3>Changes</h3>
                  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 15 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                  
                  <h3>Contact Us</h3>
                  <p>If you have any questions about these Terms, please contact us.</p>
                </motion.div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {renderTabContent(
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Privacy Policy</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last updated: May 10, 2025</p>
                
                  <p>Pegasus Technologies ("us", "we", or "our") operates the Pegasus Tool software (the "Software"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Software.</p>
                  
                  <p>By using the Software, you agree to the collection and use of information in accordance with this policy.</p>
                  
                  <h3>Information Collection and Use</h3>
                  <p>While using our Software, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, and device information ("Personal Information").</p>
                  
                  <h3>Log Data</h3>
                  <p>We collect information that your device sends whenever you use our Software ("Log Data"). This Log Data may include information such as your device's Internet Protocol ("IP") address, device type, operating system version, the time and date of your use of the Software, and other statistics.</p>
                  
                  <h3>Communications</h3>
                  <p>We may use your Personal Information to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>
                  
                  <h3>Security</h3>
                  <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
                  
                  <h3>Changes to This Privacy Policy</h3>
                  <p>This Privacy Policy is effective as of the date mentioned above and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
                  
                  <p>We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the Software after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
                  
                  <h3>Contact Us</h3>
                  <p>If you have any questions about this Privacy Policy, please contact us.</p>
                </motion.div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="license" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {renderTabContent(
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>License Agreement</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last updated: May 10, 2025</p>
                
                  <p>THIS END USER LICENSE AGREEMENT ("AGREEMENT") IS A LEGAL AGREEMENT BETWEEN YOU AND PEGASUS TECHNOLOGIES GOVERNING YOUR USE OF PEGASUS TOOL SOFTWARE ("SOFTWARE").</p>
                  
                  <h3>Grant of License</h3>
                  <p>Subject to the terms and conditions of this Agreement, Pegasus Technologies grants you a limited, non-exclusive, non-transferable license to install and use the Software on your compatible devices.</p>
                  
                  <h3>License Types</h3>
                  <p>The Software is licensed, not sold, to you for use only under the terms of this Agreement. Pegasus Technologies reserves all rights not expressly granted to you. The Software is made available according to the license type you have purchased:</p>
                  
                  <p><strong>1. Monthly License:</strong> Grants use of the Software for 30 days from the date of activation.</p>
                  <p><strong>2. Annual License:</strong> Grants use of the Software for 365 days from the date of activation.</p>
                  <p><strong>3. Business License:</strong> Grants use of the Software for the specified term on multiple devices as stipulated in your specific business agreement.</p>
                  
                  <h3>Activation and Validation</h3>
                  <p>The Software includes technological measures designed to prevent unlicensed or illegal use of the Software. You agree that we may use those measures and you agree to follow any requirements regarding such technological measures. The Software may contain enforcement technology that limits the size of content, storage, and/or the number of devices on which the Software may be used.</p>
                  
                  <h3>Support and Maintenance</h3>
                  <p>Technical support is available as described in your specific license plan. Updates and upgrades may be provided at our discretion. We reserve the right to discontinue support for older versions of the Software.</p>
                  
                  <h3>Warranty Disclaimer</h3>
                  <p>THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
                  
                  <h3>Governing Law</h3>
                  <p>This Agreement shall be governed by the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
                  
                  <h3>Termination</h3>
                  <p>This Agreement is effective until terminated. Your rights under this Agreement will terminate automatically without notice from Pegasus Technologies if you fail to comply with any term of this Agreement.</p>
                </motion.div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Additional Resources Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Additional Resources</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            For more information about our legal policies or if you have any questions, please check our other resources
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => toast.info('Redirecting to FAQ...')}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                  Find answers to common questions about our services and policies
                </p>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 group mt-auto"
                  onClick={() => toast.info('Redirecting to FAQ...')}
                >
                  View FAQs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => toast.info('Redirecting to Contact Support...')}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-pegasus-orange/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-pegasus-orange" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Contact Support</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                  Get in touch with our legal team for specific questions or concerns
                </p>
                <Button 
                  variant="ghost" 
                  className="text-pegasus-orange hover:bg-pegasus-orange/10 group mt-auto"
                  onClick={() => toast.info('Redirecting to Contact Support...')}
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        {/* Acceptance Banner - Only show if user has accepted terms */}
        {hasAccepted && (
          <motion.div 
            className="fixed bottom-6 right-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg shadow-lg p-4 max-w-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  You have successfully accepted our Terms of Service
                </p>
                <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                  Thank you for using Pegasus Tool
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Add missing import
import { MessageCircle } from 'lucide-react';

export default TermsOfService;
