import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl">Trinexscan</Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/docs" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Docs
          </Link>
        </nav>
        
        <div>
          <Button variant="secondary" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
