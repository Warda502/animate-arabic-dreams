
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  titleClassName = "",
  subtitleClassName = "",
  containerClassName = ""
}) => {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      containerClassName
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in",
        centered ? "mx-auto" : "",
        "text-pegasus-orange dark:text-pegasus-orange",
        titleClassName
      )}
      style={{ animationFillMode: 'forwards' }}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          "text-lg text-gray-600 dark:text-gray-300 max-w-3xl opacity-0 animate-fade-in-delay-1",
          centered ? "mx-auto" : "",
          subtitleClassName
        )}
        style={{ animationFillMode: 'forwards' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
