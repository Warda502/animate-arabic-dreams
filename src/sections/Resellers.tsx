
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Mail, Phone, ExternalLink } from 'lucide-react';

const Resellers = () => {
  const worldwideResellers = [
    {
      name: "Halabtech",
      type: "Distributor",
      website: "server.halabtech.com",
      websiteUrl: "https://server.halabtech.com",
      contact: "support@halabtech.com",
      phone: "+1 (555) 123-4567",
      rating: 5
    },
    {
      name: "Leope-GSM",
      type: "Reseller",
      website: "leope-gsm.com",
      websiteUrl: "https://leope-gsm.com",
      contact: "info@leope-gsm.com",
      phone: "+44 20 1234 5678",
      rating: 5
    },
    {
      name: "Martlobs GSM",
      type: "Reseller",
      website: "martlobsgsm.com",
      websiteUrl: "https://martlobsgsm.com",
      contact: "contact@martlobsgsm.com",
      phone: "+971 50 123 4567",
      rating: 5
    }
  ];

  const europeanResellers = [
    {
      name: "EuroUnlock",
      type: "Reseller",
      website: "eurounlock.com",
      websiteUrl: "https://eurounlock.com",
      contact: "sales@eurounlock.com",
      phone: "+33 1 23 45 67 89",
      rating: 5
    },
    {
      name: "GSM-Solutions",
      type: "Reseller",
      website: "gsm-solutions.eu",
      websiteUrl: "https://gsm-solutions.eu",
      contact: "info@gsm-solutions.eu",
      phone: "+49 30 123456",
      rating: 4
    }
  ];

  const asianResellers = [
    {
      name: "AsiaGSM",
      type: "Reseller",
      website: "asiagsmunlock.com",
      websiteUrl: "https://asiagsmunlock.com",
      contact: "support@asiagsmunlock.com",
      phone: "+91 98765 43210",
      rating: 5
    },
    {
      name: "MobileTechAsia",
      type: "Reseller",
      website: "mobiletechasia.com",
      websiteUrl: "https://mobiletechasia.com",
      contact: "contact@mobiletechasia.com",
      phone: "+65 9876 5432",
      rating: 4
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center mt-4 space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  const renderResellerCard = (reseller: any) => (
    <Card key={reseller.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-pegasus-orange text-white py-3 px-4 font-semibold">
        {reseller.type === "Distributor" ? "WorldWide Distributor" : "Official Reseller"}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{reseller.name}</h3>
        <div className="space-y-3">
          <p className="flex items-center text-gray-600 dark:text-gray-300">
            <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            {reseller.name} ({reseller.type})
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 group">
            <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
              <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </span>
            <a 
              href={reseller.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pegasus-orange transition-colors duration-200 flex items-center"
            >
              {reseller.website}
              <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 group">
            <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
              <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </span>
            <a 
              href={`mailto:${reseller.contact}`} 
              className="hover:text-pegasus-orange transition-colors duration-200"
            >
              {reseller.contact}
            </a>
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 group">
            <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
              <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </span>
            <a 
              href={`tel:${reseller.phone.replace(/\s+/g, '')}`} 
              className="hover:text-pegasus-orange transition-colors duration-200"
            >
              {reseller.phone}
            </a>
          </p>
          <div className="flex items-center text-gray-600">
            {renderStars(reseller.rating)}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-pegasus-orange">Our Official Resellers</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Authorized Pegasus Tool distributors and resellers worldwide
        </p>

        <Tabs defaultValue="worldwide" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-orange-100 dark:bg-gray-800">
              <TabsTrigger value="worldwide" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">Worldwide</TabsTrigger>
              <TabsTrigger value="europe" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">Europe</TabsTrigger>
              <TabsTrigger value="asia" className="data-[state=active]:bg-pegasus-orange data-[state=active]:text-white">Asia</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="worldwide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {worldwideResellers.map(renderResellerCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="europe">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {europeanResellers.map(renderResellerCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="asia">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {asianResellers.map(renderResellerCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resellers;
