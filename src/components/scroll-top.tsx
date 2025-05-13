
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export const ScrollTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 left-4 z-50 bg-pegasus-orange text-white hover:bg-pegasus-orange-600 border-none rounded-full shadow-lg p-2"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
