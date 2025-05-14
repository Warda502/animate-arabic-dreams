
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, Download, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UpdateItem {
  varizon: string;
  name: string | null;
  changelog: string | null;
  release_at: string | null;
  link: string | null;
  download_count: number | null;
}

const WhatsNew = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data, error } = await supabase
          .from('update')
          .select('*')
          .order('release_at', { ascending: false });
        
        if (error) throw error;
        setUpdates(data || []);
        
        // Set the latest version for comparison
        if (data && data.length > 0) {
          setLatestVersion(data[0].varizon);
        }
      } catch (error) {
        console.error('Error fetching updates:', error);
        toast.error('Failed to load update history');
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleDownload = async (link: string | null, version: string | null) => {
    if (!link) {
      toast.error('Download link not available');
      return;
    }

    try {
      // Call the increment_counter function
      const { data, error } = await supabase.rpc('increment_counter');
      
      if (error) {
        console.error('Error incrementing download counter:', error);
      } else {
        console.log('Download count increased to:', data);
      }
      
      // Open the download link in a new tab
      window.open(link, '_blank');
    } catch (error) {
      console.error('Error during download:', error);
      toast.error('Failed to process download');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What's New in Pegasus Tool</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track our software updates and new features
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-12 w-12 text-pegasus-orange animate-spin" />
          </div>
        ) : updates.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-pegasus-orange/30 transform md:translate-x-0 translate-x-4"></div>
            
            <div className="space-y-12">
              {updates.map((update, index) => (
                <div 
                  key={update.varizon} 
                  className={`relative flex flex-col md:flex-row items-start gap-x-6 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-pegasus-orange rounded-full flex items-center justify-center transform md:translate-x-[-1rem] translate-x-[-1rem] border-4 border-white dark:border-gray-900 z-10">
                    <Info className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-pegasus-orange">{update.name || `Version ${update.varizon}`}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(update.release_at)}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Version: {update.varizon}</div>
                        <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {update.changelog || 'No changelog available for this update.'}
                        </div>
                      </div>
                      
                      <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {update.link && update.varizon === latestVersion && (
                          <Button 
                            onClick={() => handleDownload(update.link, update.varizon)}
                            size="sm"
                            className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No updates available</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back later for updates on Pegasus Tool</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsNew;
