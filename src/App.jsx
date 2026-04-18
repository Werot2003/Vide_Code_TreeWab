import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import CardCarousel from './components/CardCarousel';
import MouseTrailer from './components/MouseTrailer';
import ImpactSection from './components/ImpactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-brand-500 selection:text-white flex flex-col">
      <MouseTrailer />
      <ThemeToggle />

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-300/20 dark:bg-brand-900/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/20 dark:bg-brand-800/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="w-full relative z-10 py-6 px-6 md:px-12 max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-brand-600 dark:text-brand-400"
        >
          <Leaf size={32} />
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">EcoForest</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          <a href="#" className="hover:text-brand-500 transition-colors">Home</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Species</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Impact</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Contact</a>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center pt-20 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-20 px-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>Join our 2026 planting initiative</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
            Plant a Tree,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-400 dark:to-brand-600">
              Restore the Earth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Discover valuable tree species, support biodiversity, and help us build a sustainable and greener future for our planet.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-brand-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>Get Involved</span>
              <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <div className="w-full mb-32">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Species</h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2">Swipe to explore native trees</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CardCarousel />
          </motion.div>
        </div>
        
        {/* Impact Section */}
        <ImpactSection />

      </main>

      <Footer />
    </div>
  );
}

export default App;
