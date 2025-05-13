
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 p-3 bg-pegasus-orange hover:bg-pegasus-orange/80 rounded-full z-50 shadow-lg"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 text-white" />
    </Button>
  );
}
