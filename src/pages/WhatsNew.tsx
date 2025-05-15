
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, Download, Info, ArrowUp, ArrowDown, Code, CheckCircle, Star, Tag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface UpdateItem {
  varizon: string;
  name: string | null;
  changelog: string | null;
  release_at: string | null;
  link: string | null;
}

const WhatsNew = () => {
  const { toast: notifyToast } = useToast();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data, error } = await supabase
          .from('update')
          .select('varizon, name, changelog, release_at, link')
          .order('release_at', { ascending: false });
        
        if (error) throw error;
        setUpdates(data || []);
        
        // Set the latest version for comparison
        if (data && data.length > 0) {
          setLatestVersion(data[0].varizon);
          // Automatically expand the latest version
          setExpanded(data[0].varizon);
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
        toast.error('Failed to process download');
      } else {
        console.log('Download count increased to:', data);
        
        // Open the download link in a new tab
        window.open(link, '_blank');
        toast.success('Download started');
      }
    } catch (error) {
      console.error('Error during download:', error);
      toast.error('Failed to process download');
    }
  };

  const toggleExpand = (version: string) => {
    if (expanded === version) {
      setExpanded(null);
    } else {
      setExpanded(version);
    }
  };

  // Get icon based on version number
  const getUpdateIcon = (index: number) => {
    const icons = [Star, CheckCircle, Code, Tag];
    return icons[index % icons.length];
  };

  // Generate random highlight color classes for the timeline nodes
  const getHighlightColor = (index: number) => {
    const colors = [
      'bg-pegasus-orange',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What's New in 
            <span className="bg-gradient-to-r from-pegasus-orange to-pegasus-orange-400 bg-clip-text text-transparent ml-2">
              Pegasus Tool
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track our software updates and new features
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-12 w-12 text-pegasus-orange animate-spin" />
          </div>
        ) : updates.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-pegasus-orange via-blue-500 to-purple-500"></div>
            
            <motion.div 
              className="space-y-12"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {updates.map((update, index) => {
                const UpdateIcon = getUpdateIcon(index);
                const isLatest = update.varizon === latestVersion;
                const isExpanded = expanded === update.varizon;
                
                return (
                  <motion.div 
                    key={update.varizon} 
                    className="relative pl-14 md:pl-24"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                  >
                    {/* Timeline node */}
                    <motion.div 
                      className={`absolute left-0 md:left-8 w-10 h-10 rounded-full flex items-center justify-center transform -translate-x-4.5 md:-translate-x-4.5 border-4 border-white dark:border-gray-900 z-10 ${getHighlightColor(index)}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <UpdateIcon className="h-5 w-5 text-white" />
                    </motion.div>
                    
                    {/* Content card */}
                    <motion.div 
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${isLatest ? 'border-l-4 border-pegasus-orange' : ''}`}
                      whileHover={{ y: -5 }}
                      layout
                    >
                      {/* Header */}
                      <div className="p-6 cursor-pointer" onClick={() => toggleExpand(update.varizon)}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-pegasus-orange flex items-center gap-2">
                              {update.name || `Version ${update.varizon}`}
                              {isLatest && (
                                <span className="text-xs font-normal bg-pegasus-orange/20 text-pegasus-orange px-2 py-0.5 rounded-full">
                                  Latest
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                              <Calendar className="h-4 w-4 mr-2" />
                              {formatDate(update.release_at)}
                            </div>
                          </div>
                          <button
                            className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-pegasus-orange/10 text-pegasus-orange' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                          >
                            {isExpanded ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Changelog content - animated expansion */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="pt-4 text-gray-600 dark:text-gray-300 prose dark:prose-invert max-w-none">
                                {update.changelog ? (
                                  update.changelog.split('\n').map((line, i) => {
                                    // Check if line is a heading (starts with # or ##)
                                    if (line.startsWith('# ')) {
                                      return <h3 key={i} className="text-xl font-semibold mt-3 mb-2">{line.replace('# ', '')}</h3>;
                                    } else if (line.startsWith('## ')) {
                                      return <h4 key={i} className="text-lg font-semibold mt-3 mb-2">{line.replace('## ', '')}</h4>;
                                    } else if (line.startsWith('- ')) {
                                      // Check if line is a list item (starts with -)
                                      return (
                                        <div key={i} className="flex items-start space-x-2 my-1.5">
                                          <span className="h-1.5 w-1.5 rounded-full bg-pegasus-orange mt-2"></span>
                                          <span>{line.replace('- ', '')}</span>
                                        </div>
                                      );
                                    } else if (line === '') {
                                      return <div key={i} className="h-2"></div>; // Empty line spacer
                                    } else {
                                      return <p key={i} className="my-2">{line}</p>;
                                    }
                                  })
                                ) : (
                                  <p className="italic text-gray-500">No changelog available for this update.</p>
                                )}
                              </div>
                            </div>
                            
                            {update.link && (
                              <div className="flex justify-end items-center p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700">
                                <Button 
                                  onClick={() => handleDownload(update.link, update.varizon)}
                                  className="bg-pegasus-orange hover:bg-pegasus-orange-600 text-white flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                >
                                  <Download className="h-4 w-4" /> 
                                  Download v{update.varizon}
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No updates available</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back later for updates on Pegasus Tool</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WhatsNew;
