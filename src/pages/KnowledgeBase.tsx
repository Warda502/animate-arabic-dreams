
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileQuestion, ArrowRight, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AnimatedCard from '@/components/AnimatedCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const KnowledgeBase = () => {
  // Function to handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
    } else {
      toast.warning('Please enter a search query');
    }
  };

  // Function to handle article clicks
  const handleArticleClick = (title: string) => {
    toast.info(`Opening article: ${title}`);
  };

  // Function to handle category clicks
  const handleCategoryClick = (category: string) => {
    toast.info(`Viewing ${category} category`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Knowledge Base
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find articles, tutorials, and guides to help you get the most out of Pegasus Tool
          </p>
          
          {/* Search section */}
          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                name="search"
                type="text" 
                placeholder="Search for topics, articles, or keywords..." 
                className="pl-10 pr-16 py-6 w-full text-base rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-pegasus-orange focus:ring-pegasus-orange"
              />
              <Button 
                type="submit"
                className="absolute right-2 bg-pegasus-orange hover:bg-pegasus-orange-600 text-white rounded-full transition-transform hover:scale-105"
              >
                Search
              </Button>
            </div>
          </form>
        </motion.div>
        
        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Categories</h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[
              { title: 'Getting Started', icon: Book, color: 'from-pegasus-orange to-red-500' },
              { title: 'Troubleshooting', icon: FileQuestion, color: 'from-blue-500 to-purple-600' },
              { title: 'Advanced Features', icon: Award, color: 'from-green-500 to-teal-500' },
              { title: 'Compatibility', icon: ArrowRight, color: 'from-purple-500 to-pink-500' }
            ].map((category, index) => (
              <motion.div key={index} variants={item}>
                <AnimatedCard 
                  variant="elegant" 
                  hoverEffect="lift" 
                  delay={index * 0.1}
                  className="h-full cursor-pointer"
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <CardContent className="flex flex-col items-center text-center p-8">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{category.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Find articles related to {category.title.toLowerCase()}
                    </p>
                    <Button 
                      variant="ghost" 
                      className="mt-4 text-pegasus-orange hover:bg-pegasus-orange/10 group"
                    >
                      View Articles
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Popular Articles</h2>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            {[
              "How to flash firmware using Pegasus Tool",
              "Troubleshooting connection issues with devices",
              "Understanding security levels and unlocking procedures",
              "Updating Pegasus Tool to the latest version",
              "Backup and restore device data",
              "Working with locked bootloaders"
            ].map((article, index) => (
              <motion.div key={index} variants={item}>
                <Card 
                  className="cursor-pointer hover:border-pegasus-orange transition-colors"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{article}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Updated 2 days ago</p>
                    </div>
                    <Button variant="ghost" size="icon" className="group">
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 text-pegasus-orange" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              className="border-pegasus-orange text-pegasus-orange hover:bg-pegasus-orange hover:text-white transition-colors"
              onClick={() => toast.info('Loading more articles')}
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Contact Support */}
        <motion.div 
          className="bg-gradient-to-r from-pegasus-orange to-pegasus-orange-600 rounded-2xl p-8 text-white text-center shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="mb-6">Our support team is ready to help you with any questions</p>
          <Button 
            className="bg-white hover:bg-gray-100 text-pegasus-orange hover:scale-105 transform transition-transform shadow-lg"
            onClick={() => toast.success('Support request initiated')}
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
