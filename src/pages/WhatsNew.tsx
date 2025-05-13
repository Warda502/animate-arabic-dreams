
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from '@/components/SectionHeader';

interface Update {
  varizon: string;
  name: string | null;
  changelog: string | null;
  release_at: string | null;
  download_count: number | null;
}

const WhatsNew = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data, error } = await supabase
          .from('update')
          .select('*')
          .order('release_at', { ascending: false });

        if (error) throw error;
        setUpdates(data || []);
      } catch (error) {
        console.error('Error fetching updates:', error);
        toast({
          title: "Failed to load updates",
          description: "Could not retrieve the update history.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();

    // Set page title
    document.title = "What's New - HW-Key Tool";
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Parse changelog text to array of features
  const parseChangelog = (changelog: string | null) => {
    if (!changelog) return [];
    return changelog.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="What's New in HW-Key Tool"
          subtitle="Explore our update history and feature improvements"
          highlightWord="New"
        />

        <div className="max-w-4xl mx-auto mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-hw-blue animate-spin mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">Loading update history...</p>
            </div>
          ) : updates.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-1 bg-hw-blue/20 dark:bg-hw-blue/30"></div>
              
              {updates.map((update, index) => (
                <motion.div 
                  key={update.varizon}
                  className="mb-12 relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-hw-blue shadow-lg shadow-hw-blue/20 z-10"></div>
                  
                  <div className="ml-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                          {update.name || `Version ${update.varizon}`}
                          <Badge variant="outline" className="ml-3 bg-hw-blue/10 text-hw-blue border-hw-blue/20">
                            v{update.varizon}
                          </Badge>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Released on {formatDate(update.release_at)}
                          {update.download_count ? ` • ${update.download_count} downloads` : ''}
                        </p>
                      </div>
                    </div>
                    
                    <Card className="p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <h4 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">What's Changed:</h4>
                      <ul className="space-y-2">
                        {parseChangelog(update.changelog).map((change, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{change}</span>
                          </li>
                        ))}
                        {!update.changelog && (
                          <li className="flex items-center text-gray-500 dark:text-gray-400">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            No detailed changelog available for this version.
                          </li>
                        )}
                      </ul>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No update history available
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                Check back later for information about our software updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
