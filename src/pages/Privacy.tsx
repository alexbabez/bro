import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SilverSpots } from "@/components/ui/silver-spots";
import { cn } from "@/lib/utils";
import { AnimeNavBarDemo } from "@/components/demo/anime-navbar-demo";
import { FooterDemo } from "@/components/demo/footer-demo";

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

// Main Privacy Policy component
const Privacy = () => {
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 300 });
  const opacity = useTransform(smoothScrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(smoothScrollYProgress, [0, 0.1], [1, 0.9]);

  // Add smooth scrolling behavior to the entire page
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
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
          Privacy Policy
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
              At Trinexscan, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
            </TextParagraph>
            <TextParagraph>
              We encourage you to read this Privacy Policy carefully to understand our practices regarding your personal data and how we will treat it.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={1}>
            <SectionTitle>2. Information We Collect</SectionTitle>
            <TextParagraph>
              We may collect several different types of information for various purposes to provide and improve our service to you:
            </TextParagraph>
            <ul className="list-disc text-white/80 ml-8 mb-6 space-y-2">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-400 font-medium">Personal Data:</span> Name, email address, and other contact information you provide when creating an account or contacting us.
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-400 font-medium">Usage Data:</span> Information on how you access and use our services, including your IP address, browser type, pages visited, and time spent.
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-400 font-medium">Cookies and Tracking Data:</span> We use cookies and similar tracking technologies to track activity on our services and hold certain information.
              </motion.li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection index={2}>
            <SectionTitle>3. How We Use Your Information</SectionTitle>
            <TextParagraph>
              We use the collected data for various purposes:
            </TextParagraph>
            <ul className="list-disc text-white/80 ml-8 mb-6 space-y-2">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                To provide and maintain our services
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                To notify you about changes to our services
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                To provide customer support
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
              >
                To gather analysis or valuable information so that we can improve our services
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                To detect, prevent and address technical issues
              </motion.li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection index={3}>
            <SectionTitle>4. Data Security</SectionTitle>
            <TextParagraph>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={4}>
            <SectionTitle>5. Your Data Protection Rights</SectionTitle>
            <TextParagraph>
              Depending on your location, you may have certain rights regarding your personal information:
            </TextParagraph>
            <ul className="list-disc text-white/80 ml-8 mb-6 space-y-2">
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                The right to access, update or delete the information we have on you
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                The right of rectification - the right to have your information corrected if it is inaccurate or incomplete
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                The right to object to our processing of your personal data
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
              >
                The right of restriction - the right to request that we restrict the processing of your personal information
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                The right to data portability - the right to be provided with a copy of your personal data in a structured, machine-readable format
              </motion.li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection index={5}>
            <SectionTitle>6. Cookies</SectionTitle>
            <TextParagraph>
              We use cookies and similar tracking technologies to track activity on our services and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </TextParagraph>
            <TextParagraph>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={6}>
            <SectionTitle>7. Service Providers</SectionTitle>
            <TextParagraph>
              We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.
            </TextParagraph>
            <TextParagraph>
              These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={7}>
            <SectionTitle>8. Changes to This Privacy Policy</SectionTitle>
            <TextParagraph>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
            </TextParagraph>
            <TextParagraph>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </TextParagraph>
          </AnimatedSection>
          
          <AnimatedSection index={8}>
            <SectionTitle>9. Contact Us</SectionTitle>
            <TextParagraph>
              If you have any questions about this Privacy Policy, please contact us:
            </TextParagraph>
            <motion.div 
              className="p-4 bg-white/5 rounded-lg border border-amber-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-400 font-medium">Email: privacy@trinexscan.com</p>
            </motion.div>
          </AnimatedSection>
        </div>
        
        {/* Footer */}
        <div className="mt-20 relative">
          <SilverSpots variant="large" density="low" />
          <div className="relative z-10">
            <FooterDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
