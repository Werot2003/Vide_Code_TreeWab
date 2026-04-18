import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, ShieldCheck, Maximize2 } from 'lucide-react';
import { treesData } from '../data/trees';
import TreeModal from './TreeModal';

export default function CardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isHovering || isModalOpen) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [currentIndex, isHovering, isModalOpen]);

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        rotateY: direction > 0 ? 45 : -45,
        scale: 0.8
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        rotateY: direction < 0 ? 45 : -45,
        scale: 0.8
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return treesData.length - 1;
      if (nextIndex >= treesData.length) return 0;
      return nextIndex;
    });
  };

  const activeTree = treesData[currentIndex];

  return (
    <>
      <div 
        className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center perspective-1000"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.5 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full max-w-md md:max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl dark:shadow-brand-900/20 overflow-hidden border border-gray-100 dark:border-gray-800 cursor-grab active:cursor-grabbing group"
          >
            <div 
              className="relative h-64 md:h-80 overflow-hidden cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <motion.img 
                src={activeTree.image} 
                alt={activeTree.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity group-hover:bg-black/40" />
              
              {/* Expand Icon Hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white">
                  <Maximize2 size={32} />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold mb-2 tracking-tight"
                >
                  {activeTree.title}
                </motion.h2>
              </div>
            </div>
            
            <div className="p-8">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 line-clamp-2"
              >
                {activeTree.description}
              </motion.p>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-start space-x-3 p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300">
                  <Clock className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium opacity-80 mb-1">Growth Time</p>
                    <p className="font-semibold text-sm line-clamp-2">{activeTree.growth}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300">
                  <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium opacity-80 mb-1">Key Benefits</p>
                    <p className="font-semibold text-xs leading-relaxed line-clamp-2">{activeTree.benefits}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:-mx-12 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="pointer-events-auto p-4 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 backdrop-blur-sm z-10"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="pointer-events-auto p-4 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 backdrop-blur-sm z-10"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute -bottom-12 flex space-x-3 z-10">
          {treesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'bg-brand-500 w-8' 
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-brand-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <TreeModal 
        tree={activeTree} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
