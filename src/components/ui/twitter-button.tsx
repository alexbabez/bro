"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TwitterButtonProps {
  className?: string
  href?: string
}

export function TwitterButton({ className, href = "https://twitter.com/" }: TwitterButtonProps) {
  return (
    <motion.div className="relative">
      {/* Fire animation elements */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-300 opacity-0"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative flex items-center justify-center rounded-2xl w-12 h-12",
          "bg-black/90 border-2 border-amber-500/50 shadow-lg backdrop-blur-sm",
          "hover:border-amber-500 hover:bg-amber-500/20 transition-all duration-300",
          "hover:shadow-amber-500/20 hover:shadow-xl",
          className
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-amber-500"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </motion.div>
      </motion.a>
    </motion.div>
  )
} 