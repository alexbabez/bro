import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SilverSpots } from "@/components/ui/silver-spots";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Silver Spots Background */}
      <SilverSpots variant="xlarge" density="low" className="opacity-75" />
      <SilverSpots variant="small" density="medium" className="opacity-50" />
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-zinc-900/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-zinc-900/30 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-4 max-w-md">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mb-8"
        >
          <a href="/" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img src="/logo.png" alt="404 logo" className="h-32 relative" />
          </a>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-7xl font-bold text-white mb-2 drop-shadow-glow">404</h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent my-6"></div>
          <h2 className="text-2xl font-medium text-zinc-100 mb-4">Page Not Found</h2>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-75"></div>
            <Button 
              asChild
              className="relative bg-black border border-zinc-800 hover:bg-zinc-900 text-white px-6 py-6 rounded-lg font-medium group overflow-hidden"
            >
              <a href="/">
                <span className="relative z-10 flex items-center">
                  <HomeIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Return to Home
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-zinc-500 text-sm"
        >
          <p>Attempted to access: <span className="font-mono text-zinc-400">{location.pathname}</span></p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
