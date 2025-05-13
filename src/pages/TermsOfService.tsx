
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: May 10, 2023
          </p>
        </div>
        
        <Card className="bg-white dark:bg-gray-800 shadow-md mb-8">
          <CardContent className="p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to Pegasus Tool ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website and software application Pegasus Tool (together or individually "Service") operated by our Company.
              </p>
              <p>
                Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages and software. Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood these Agreements and agree to be bound by them.
              </p>
              <p>
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">2. License Terms</h2>
              <p>
                Pegasus Tool grants you a non-exclusive, non-transferable, revocable license to use our Service strictly in accordance with the terms of this Agreement. The software is licensed, not sold, to you for use only under the terms of this license.
              </p>
              <p>
                <strong>2.1 License Tiers</strong>
              </p>
              <p>
                Pegasus Tool is available in several license tiers, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Standard License: For individual technicians and small repair shops.</li>
                <li>Professional License: For medium-sized repair businesses with advanced feature needs.</li>
                <li>Enterprise License: For large service centers and organizations requiring full feature access.</li>
              </ul>
              <p>
                <strong>2.2 License Restrictions</strong>
              </p>
              <p>
                You agree not to, and you will not permit others to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Service.</li>
                <li>Copy or use the Service for any purpose other than as permitted under this Agreement.</li>
                <li>Modify, make derivative works of, disassemble, decrypt, reverse compile or reverse engineer any part of the Service.</li>
                <li>Remove, alter or obscure any proprietary notice (including any notice of copyright or trademark).</li>
                <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                <li>Use the Service for unauthorized access, data extraction, or circumvention of security features.</li>
              </ul>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">3. Acceptable Use</h2>
              <p>
                You agree to use the Service only for purposes that are permitted by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>These Terms</li>
                <li>Applicable laws, regulations, and generally accepted practices or guidelines in the relevant jurisdictions</li>
              </ul>
              <p>
                <strong>3.1 Legitimate Repair Purposes</strong>
              </p>
              <p>
                Pegasus Tool is designed for legitimate smartphone repair purposes only. You agree to use the software exclusively for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Repairing your own devices or devices you have explicit permission to repair</li>
                <li>Providing legitimate repair services to customers</li>
                <li>Testing and developing compatible applications or systems</li>
                <li>Educational purposes to learn about device repair processes</li>
              </ul>
              <p>
                <strong>3.2 Prohibited Uses</strong>
              </p>
              <p>
                You explicitly agree not to use Pegasus Tool for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Unauthorized access to protected systems, networks, or data</li>
                <li>Theft or enabling theft of devices</li>
                <li>Circumvention of security measures for illicit purposes</li>
                <li>Any activity that violates the intellectual property rights of device manufacturers</li>
                <li>Any illegal activity under applicable laws</li>
              </ul>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of our Company and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of our Company.
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">5. Subscription and Billing</h2>
              <p>
                <strong>5.1 Subscription Terms</strong>
              </p>
              <p>
                Pegasus Tool may offer subscription-based licenses that renew automatically. By purchasing a subscription, you authorize us to charge the applicable fees to your designated payment method at the beginning of each subscription period.
              </p>
              <p>
                <strong>5.2 Cancellation</strong>
              </p>
              <p>
                You may cancel your subscription at any time through your account dashboard or by contacting our customer support. Upon cancellation, your subscription will remain active until the end of the current billing period.
              </p>
              <p>
                <strong>5.3 Refund Policy</strong>
              </p>
              <p>
                Refunds are available within 14 days of initial purchase if the software does not function as advertised. No refunds will be issued for subscription renewals or after the initial 14-day period. Special circumstances may be considered at our discretion.
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall our Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
                <li>Device damage resulting from the use of our software</li>
              </ul>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">7. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <ul className="list-none mb-4 space-y-1">
                <li>Email: terms@pegasustool.com</li>
                <li>Phone: +1 (800) 555-0123</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white">
            Download Terms of Service PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
