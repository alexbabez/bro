import React, { useEffect } from "react";
import { SilverSpots } from "@/components/ui/silver-spots";
import { FooterDemo } from "@/components/demo/footer-demo";
import { AnimeNavBarDemo } from "@/components/demo/anime-navbar-demo";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Custom cursor component
function CustomCursor() {
  const cursorDotRef = React.useRef<HTMLDivElement>(null);
  const cursorRingRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorRingRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Add a slight delay to the outer ring for a trailing effect
        setTimeout(() => {
          if (cursorRingRef.current) {
            cursorRingRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
        }, 50);
      }
    };
    
    const mouseDownHandler = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.classList.add("scale-90");
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.add("scale-75");
      }
    };
    
    const mouseUpHandler = () => {
      if (cursorDotRef.current) {
        cursorDotRef.current.classList.remove("scale-90");
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.remove("scale-75");
      }
    };
    
    // Add hover effect on interactive elements
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursorDotRef.current) {
            cursorDotRef.current.classList.add("scale-150");
          }
          if (cursorRingRef.current) {
            cursorRingRef.current.classList.add("opacity-0");
          }
        });
        
        el.addEventListener('mouseleave', () => {
          if (cursorDotRef.current) {
            cursorDotRef.current.classList.remove("scale-150");
          }
          if (cursorRingRef.current) {
            cursorRingRef.current.classList.remove("opacity-0");
          }
        });
      });
    };
    
    // Initial setup
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    
    // Hide default cursor
    document.documentElement.classList.add('custom-cursor');
    
    // Add hover effects
    addHoverEffect();
    
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);
  
  return (
    <>
      {/* Logo cursor (main dot) */}
      <div 
        ref={cursorDotRef}
        className="fixed w-6 h-6 pointer-events-none z-50 translate-x-[-50%] translate-y-[-50%] transition-transform duration-100 ease-out"
        style={{
          filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M250 0L450 115.47V346.41L250 461.88L50 346.41V115.47L250 0Z" fill="#F59E0B" />
          <path d="M250 103.13L358.59 164.84V288.28L250 350L141.41 288.28V164.84L250 103.13Z" fill="white" />
          <path d="M250 165.63L304.69 196.88V259.38L250 290.63L195.31 259.38V196.88L250 165.63Z" fill="#F59E0B" />
        </svg>
      </div>
      
      {/* Outer ring/glow */}
      <div 
        ref={cursorRingRef}
        className="fixed w-12 h-12 rounded-full border-2 border-amber-500/30 pointer-events-none z-50 translate-x-[-50%] translate-y-[-50%] transition-all duration-200 ease-out backdrop-blur-sm"
        style={{
          boxShadow: "0 0 15px rgba(245, 158, 11, 0.3)",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0) 70%)"
        }}
      />
    </>
  );
}

// Background gold shapes with animation
function GoldShapeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <SilverSpots className="!fill-amber-500/20" />
      
      {/* Animated shape 1 */}
      <motion.div 
        className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-amber-400/10 to-amber-600/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Animated shape 2 */}
      <motion.div 
        className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-amber-500/10 to-amber-700/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Section with enhanced animation
function AnimatedSection({ 
  children, 
  index = 0 
}: { 
  children: React.ReactNode, 
  index?: number 
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.25, 0.4, 0.25, 1] 
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 border border-white/5"
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
      }}
    >
      {/* Subtle sliding highlight effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none rounded-2xl"
        initial={{ x: "-100%" }}
        whileInView={{ x: "200%" }}
        transition={{ 
          duration: 2, 
          delay: index * 0.1 + 0.3,
          ease: "easeInOut"
        }}
        viewport={{ once: true }}
      />
      
      {children}
    </motion.section>
  );
}

// Logo component
function TrinexscanLogo() {
  return (
    <motion.div 
      className="flex items-center gap-2 fixed top-6 left-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 to-amber-600 text-black font-bold text-xs">
        TS
      </div>
      <span className="text-white font-semibold tracking-wider">Trinexscan</span>
    </motion.div>
  );
}

// Section title component
function SectionTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.h2 
      className={cn("text-2xl font-bold text-amber-500 mb-6", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  );
}

// Text paragraph component
function TextParagraph({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.p 
      className={cn("text-white/80 mb-6 leading-relaxed", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  );
}

const Terms = () => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 300 });
  const opacity = useTransform(smoothScrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(smoothScrollYProgress, [0, 0.1], [1, 0.9]);

  // Enhanced scroll to top with smooth effect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location]);

  // Add smooth scrolling behavior to the entire page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen text-white pb-20">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Add a style tag for the custom cursor */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-cursor {
          cursor: none;
        }
        .custom-cursor a, 
        .custom-cursor button, 
        .custom-cursor [role="button"],
        .custom-cursor input,
        .custom-cursor select,
        .custom-cursor textarea {
          cursor: none;
        }
        `
      }} />
      
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-400 origin-left z-[100]"
        style={{ 
          scaleX: smoothScrollYProgress,
          boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)"
        }}
      />
      
      {/* Background Elements */}
      <GoldShapeBackground />
      
      {/* Glass overlay for more glass effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] -z-5"></div>
      
      {/* Go back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full backdrop-blur-lg bg-white/5 border border-amber-500/30 z-40 hover:bg-amber-500/20 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ 
          opacity: useTransform(smoothScrollYProgress, [0, 0.1], [0, 1]),
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
      
      {/* Logo */}
      <TrinexscanLogo />
      
      {/* Navigation */}
      <AnimeNavBarDemo />
      
      <div className="container mx-auto px-4 pt-24 max-w-4xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ scale, opacity }}
        >
          Terms of Service
        </motion.h1>
        
          <motion.div
          className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-12 rounded-full"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            boxShadow: "0 0 10px rgba(245, 158, 11, 0.3)"
          }}
        />
        
        <div className="space-y-12">
          <AnimatedSection index={0}>
            <SectionTitle>1. Introduction</SectionTitle>
            <TextParagraph>
              Welcome to Trinexscan. By accessing or using our services, you agree to be bound by these Terms of Service. Please read these terms carefully before using our platform.
            </TextParagraph>
            <TextParagraph>
              These Terms of Service ("Terms") govern your access to and use of the services, including our website, APIs, and applications (the "Services"), and any information, content, or materials provided through our Services.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={1}>
            <SectionTitle>2. Account Registration</SectionTitle>
            <TextParagraph>
              To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </TextParagraph>
            <TextParagraph>
              You are responsible for safeguarding your account and password. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={2}>
            <SectionTitle>3. User Conduct</SectionTitle>
            <TextParagraph>
              You agree not to use our Services for any purpose that is unlawful or prohibited by these Terms. You may not:
            </TextParagraph>
            <ul className="list-disc text-white/80 ml-8 mb-6 space-y-2">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Use the Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Services.
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Attempt to gain unauthorized access to any part of the Services or any other systems or networks connected to the Services.
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Use the Services for any illegal or unauthorized purpose, or engage in any activity that violates any applicable law or regulation.
              </motion.li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection index={3}>
            <SectionTitle>4. Intellectual Property</SectionTitle>
            <TextParagraph>
              The Services and their original content, features, and functionality are and will remain the exclusive property of Trinexscan and its licensors. The Services are protected by copyright, trademark, and other laws.
            </TextParagraph>
            <TextParagraph>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Trinexscan.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={4}>
            <SectionTitle>5. User Content</SectionTitle>
            <TextParagraph>
              Our Services may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post to the Services.
            </TextParagraph>
            <TextParagraph>
              By posting content to the Services, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Services.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={5}>
            <SectionTitle>6. Termination</SectionTitle>
            <TextParagraph>
              We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
            </TextParagraph>
            <TextParagraph>
              Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={6}>
            <SectionTitle>7. Limitation of Liability</SectionTitle>
            <TextParagraph>
              In no event shall Trinexscan, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={7}>
            <SectionTitle>8. Changes to Terms</SectionTitle>
            <TextParagraph>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on our Services. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={8}>
            <SectionTitle>9. Contact Us</SectionTitle>
            <TextParagraph>
              If you have any questions about these Terms, please contact us at:
            </TextParagraph>
            <motion.div 
              className="p-4 bg-white/5 rounded-lg border border-amber-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-400 font-medium">Email: support@trinexscan.com</p>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-20 relative">
        <SilverSpots variant="large" density="low" />
        <div className="relative z-10">
          <FooterDemo />
        </div>
      </div>
    </div>
  );
};

export default Terms;
