
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  highlightWord?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  titleClassName = "",
  subtitleClassName = "",
  containerClassName = "",
  highlightWord
}) => {
  // Split title to highlight specific word if provided
  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return <span>{title}</span>;
    }
    
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-pegasus-orange relative inline-block">
          {highlightWord}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-pegasus-orange/30 rounded-full"></span>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      containerClassName
    )}>
      <motion.h2 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          centered ? "mx-auto" : "",
          "text-gray-800 dark:text-gray-100",
          titleClassName
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {renderTitle()}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={cn(
            "text-lg text-gray-600 dark:text-gray-300 max-w-3xl",
            centered ? "mx-auto" : "",
            subtitleClassName
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
