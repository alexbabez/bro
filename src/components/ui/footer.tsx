"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Footer({ className, ...props }: FooterProps) {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  return (
    <footer
      className={cn(
        "w-full py-6 bg-background/10 backdrop-blur-lg border-t border-border",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Trinexscan. All rights reserved.
            <div className="mt-2 flex space-x-4">
              <button 
                onClick={() => handleNavigation('/terms')}
                className="text-xs text-muted-foreground hover:text-amber-500 transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="text-xs text-muted-foreground hover:text-amber-500 transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/trinexscan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-amber-500 transition-colors"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/trinexscan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-amber-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
    
            <a
              href="mailto:contact@trinexscan.com"
              className="text-foreground/70 hover:text-amber-500 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
