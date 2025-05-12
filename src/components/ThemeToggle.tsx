
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-pegasus-orange/10 relative overflow-hidden group"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-pegasus-orange" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-pegasus-orange" />
          <span className="sr-only">Toggle theme</span>
          
          {/* Add a subtle ripple effect on hover */}
          <span className="absolute inset-0 w-full h-full bg-pegasus-orange/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="hover:text-pegasus-orange flex items-center cursor-pointer"
        >
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
            <Sun className="mr-2 h-4 w-4 text-pegasus-orange" />
          </motion.div>
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="hover:text-pegasus-orange flex items-center cursor-pointer"
        >
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
            <Moon className="mr-2 h-4 w-4 text-pegasus-orange" />
          </motion.div>
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="hover:text-pegasus-orange flex items-center cursor-pointer"
        >
          <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
            <span className="mr-2 h-4 w-4 flex items-center justify-center">🖥️</span>
          </motion.div>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
