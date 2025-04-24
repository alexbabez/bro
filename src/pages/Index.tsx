import { GlowingEffectDemo } from "@/components/demo/glowing-effect-demo";
import { FooterDemo } from "@/components/demo/footer-demo";
import { AnimeNavBarDemo } from "@/components/demo/anime-navbar-demo";
import { PricingDemo } from "@/components/demo/pricing-demo";
import { FAQDemo } from "@/components/demo/faq-demo";
import { SilverSpots } from "@/components/ui/silver-spots";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// Custom cursor component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const ringX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const ringY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", moveCursor);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-amber-500 z-50 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-amber-500/50 z-50 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
    </>
  );
}

// Animated gradient text component
function AnimatedGradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300",
        className
      )}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </motion.span>
  );
}

// Create a simplified version of elegant shapes just for background
function GoldShapeBackground({ variant = "default" }: { variant?: "default" | "alt" | "alt2" }) {
  // Different shape positions based on variant
  const shapes = {
    default: [
      { 
        position: "left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]", 
        width: 600, 
        height: 140, 
        rotate: 0, 
        initialRotate: -15,
        delay: 0
      },
      { 
        position: "right-[-5%] md:right-[0%] top-[70%] md:top-[75%]", 
        width: 500, 
        height: 120, 
        rotate: -15, 
        initialRotate: 15,
        delay: 0.2
      }
    ],
    alt: [
      { 
        position: "right-[5%] md:right-[10%] top-[10%] md:top-[15%]", 
        width: 400, 
        height: 100, 
        rotate: 12, 
        initialRotate: -5,
        delay: 0.1
      },
      { 
        position: "left-[10%] md:left-[15%] bottom-[10%] md:bottom-[15%]", 
        width: 350, 
        height: 90, 
        rotate: -8, 
        initialRotate: 5,
        delay: 0.3
      }
    ],
    alt2: [
      { 
        position: "left-[15%] md:left-[20%] top-[20%] md:top-[25%]", 
        width: 300, 
        height: 80, 
        rotate: 5, 
        initialRotate: -10,
        delay: 0.2
      },
      { 
        position: "right-[10%] md:right-[15%] bottom-[15%] md:bottom-[20%]", 
        width: 450, 
        height: 110, 
        rotate: -12, 
        initialRotate: 8,
        delay: 0.1
      }
    ]
  };

  const currentShapes = shapes[variant];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {currentShapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -150, rotate: shape.initialRotate }}
          animate={{ opacity: 1, y: 0, rotate: shape.rotate }}
          transition={{ duration: 2.4, delay: shape.delay, ease: [0.23, 0.86, 0.39, 0.96] }}
          className={`absolute ${shape.position}`}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ width: shape.width, height: shape.height }}
            className="relative"
          >
            <div className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-r to-transparent from-amber-500/[0.15]",
              "backdrop-blur-[2px] border-2 border-amber-500/[0.15]",
              "shadow-[0_8px_32px_0_rgba(245,158,11,0.1)]",
              "after:absolute after:inset-0 after:rounded-full",
              "after:bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_70%)]"
            )} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// Scroll-triggered animation wrapper
function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.1 1", "0.4 1"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// Floating 3D card effect
function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      className={cn(
        "relative rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md p-px overflow-hidden",
        className
      )}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-amber-300/5 rounded-xl" />
      <div className="relative z-10 p-6">{children}</div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent rounded-xl" />
      </div>
    </motion.div>
  );
}

// Parallax background effect
function ParallaxLayer({ depth = 0.2, children }: { depth?: number; children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * depth);
  
  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Main content */}
      <AnimeNavBarDemo />
      
      <section id="hero" className="w-full">
        <HeroGeometric 
          badge="TRINEXSCAN"
          title1="Smarter Trades" 
          title2="Faster ✦ Wins."
          title3="Amplified With AI."
        />
      </section>
      
      <section id="offerings" className="py-20 w-full relative bg-black">
        <GoldShapeBackground />
        <SilverSpots variant="large" density="low" />
        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-center mb-12 text-white">
              What <AnimatedGradientText>We Offer</AnimatedGradientText>
            </h2>
          </RevealOnScroll>
          <GlowingEffectDemo />
        </div>
      </section>
      
      <div className="h-40 relative">
        <ParallaxLayer depth={0.1}>
          <div className="absolute w-64 h-64 rounded-full bg-amber-500/5 blur-3xl left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </ParallaxLayer>
      </div>
      
      <div id="pricing" className="bg-black py-24 pb-32 px-4 md:px-6 lg:px-8 text-center relative">
        <GoldShapeBackground variant="alt" />
        <SilverSpots variant="xlarge" density="low" />
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-center mb-20 relative z-10 text-white leading-relaxed py-1">
            <AnimatedGradientText className="inline-block">Premium</AnimatedGradientText>{" "}
            <span className="inline-block">Options</span>
          </h2>
        </RevealOnScroll>
        <div className="max-w-5xl mx-auto relative z-10">
          <PricingDemo />
        </div>
      </div>
      
      <section id="faq" className="w-full relative bg-black py-24">
        <GoldShapeBackground variant="alt2" />
        <SilverSpots variant="xlarge" density="low" />
        <div className="relative z-10 container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-center mb-20 relative z-10 text-white">
              Frequently <AnimatedGradientText>Asked</AnimatedGradientText> Questions
            </h2>
          </RevealOnScroll>
          <FAQDemo />
        </div>
      </section>
      
      <div className="relative bg-black">
        <SilverSpots variant="large" density="low" />
        <div className="relative z-10">
          <FooterDemo />
        </div>
      </div>
    </div>
  );
};

export default Index;
