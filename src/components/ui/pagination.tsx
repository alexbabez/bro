import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ""
}: PaginationProps) {
  // Calculate what pages to show in UI
  const getPageNumbers = () => {
    // Always show first and last page
    // And always show pages around current page
    const displayedPages = [];
    
    // Create array for page items to be displayed
    if (totalPages <= 7) {
      // If there are 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        displayedPages.push(i);
      }
    } else {
      // Always show first page
      displayedPages.push(1);
      
      if (currentPage > 3) {
        // Show ellipsis if current page is far from start
        displayedPages.push(-1); // -1 represents ellipsis
      }
      
      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(currentPage + 1, totalPages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        // Show ellipsis if current page is far from end
        displayedPages.push(-2); // -2 represents right ellipsis
      }
      
      // Always show last page
      displayedPages.push(totalPages);
    }
    
    return displayedPages;
  };
  
  // Handle going to previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  // Handle going to next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Get pages to display
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page, index) => {
        // If page is -1 or -2, it represents ellipsis
        if (page === -1 || page === -2) {
          return (
            <Button 
              key={`ellipsis-${index}`}
              variant="ghost" 
              size="icon" 
              disabled
              className="h-8 w-8"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }
        
        // Otherwise it's a regular page number
        return (
          <Button 
            key={page} 
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            className="h-8 w-8" 
          >
            <span className="sr-only">Go to page {page}</span>
            {page}
          </Button>
        );
      })}
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
