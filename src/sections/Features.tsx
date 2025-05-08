
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Cpu, Shield, Zap, Wifi, Code } from 'lucide-react';

const Features = () => {
  return (
    <div className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-pegasus-orange">Features</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">Explore the powerful capabilities of Pegasus Tool</p>
        
        <Tabs defaultValue="qualcomm" className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-orange-100 dark:bg-gray-800">
              <TabsTrigger value="qualcomm" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">Qualcomm</TabsTrigger>
              <TabsTrigger value="mediatek" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">MediaTek</TabsTrigger>
              <TabsTrigger value="xiaomi" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">Xiaomi</TabsTrigger>
              <TabsTrigger value="other" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">Other Brands</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="qualcomm" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>EDL Mode Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Access and service Qualcomm devices in Emergency Download mode, bypassing security verifications.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Read/Write Partitions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Reset FRP/Mi Account</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>IMEI Repair</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Security Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Handle security-related operations on Qualcomm-based devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Auth Bypass</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Screen Lock Removal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Encryption Handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Firmware Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Complete firmware management for Qualcomm devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Flash Stock ROM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Boot/Recovery Repair</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Force Flash Support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Advanced Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Specialized operations for technicians and power users.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Boot to EDL Mode</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Partition Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Bootloader Unlocking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="mediatek" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Preloader Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Complete MediaTek preloader and brom mode functionality.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>AUTH Bypass</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>DA Mode Access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Secure Boot Handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Security Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Security operations for MediaTek devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>FRP Removal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Pattern/PIN Unlock</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Privacy Lock Reset</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Wifi className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Network Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Network and connectivity operations.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>IMEI Repair</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Network Unlock</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Baseband Management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Firmware Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Complete firmware handling for MediaTek devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Flash Stock ROM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Scatter File Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>EMMC/UFS Support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="xiaomi" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Mi Account Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Handle Mi Account locks and security features.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Mi Account Removal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>FRP Bypass</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Anti-Rollback Protection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Firmware Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Complete firmware management for Xiaomi devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Flash MIUI ROM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Fastboot Operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>EDL Mode Flash</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Oppo/Realme</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Complete support for Oppo and Realme devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Auth File Operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Pattern Unlock</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>FRP Removal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 dark:border-orange-900/30">
                <CardHeader className="bg-orange-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-pegasus-orange p-2 rounded-md">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Vivo</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">Complete support for Vivo devices.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Account Unlock</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Demo Removal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pegasus-orange">✓</span>
                      <span>Password Reset</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Features;
