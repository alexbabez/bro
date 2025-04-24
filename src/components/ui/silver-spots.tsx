import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SilverSpotsProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "small" | "medium" | "large" | "xlarge";
  density?: "low" | "medium" | "high";
  shimmer?: boolean;
  className?: string;
}

export function SilverSpots({
  variant = "medium",
  density = "medium",
  shimmer = true,
  className,
  ...props
}: SilverSpotsProps) {
  // Determine number of spots based on density
  const spotCount = {
    low: 3,
    medium: 5,
    high: 8,
  }[density];

  // Determine size range based on variant
  const sizeRange = {
    small: { min: 50, max: 100 },
    medium: { min: 100, max: 200 },
    large: { min: 200, max: 300 },
    xlarge: { min: 300, max: 500 },
  }[variant];

  // Generate random spots
  const spots = Array.from({ length: spotCount }).map((_, index) => {
    const size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
    const x = Math.random() * 100; // Random position X (0-100%)
    const y = Math.random() * 100; // Random position Y (0-100%)
    const delay = Math.random() * 5; // Random animation delay
    const duration = 15 + Math.random() * 10; // Random animation duration between 15-25s
    const opacity = 0.05 + Math.random() * 0.1; // Random opacity between 0.05-0.15
    const blur = 30 + Math.random() * 50; // Random blur between 30-80px
    
    // Create a slightly different silver color for each spot
    const silverHue = 210 + Math.random() * 20; // Silver hue variation
    const silverSaturation = 2 + Math.random() * 5; // Very low saturation for silver
    const silverLightness = 60 + Math.random() * 20; // High lightness for silver
    
    return { 
      id: index, 
      size, 
      x, 
      y, 
      delay, 
      duration, 
      opacity,
      blur,
      color: `hsl(${silverHue}, ${silverSaturation}%, ${silverLightness}%)`,
    };
  });

  return (
    <div 
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
      {...props}
    >
      {spots.map((spot) => (
        <motion.div
          key={spot.id}
          className="absolute rounded-full"
          style={{
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            background: `radial-gradient(circle at center, ${spot.color} 0%, rgba(210, 210, 220, 0) 70%)`,
            filter: `blur(${spot.blur}px)`,
            opacity: spot.opacity,
          }}
          initial={{ 
            opacity: 0,
            scale: 0.7,
          }}
          animate={{ 
            opacity: spot.opacity,
            scale: 1,
          }}
          transition={{
            duration: spot.duration / 3,
            delay: spot.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
