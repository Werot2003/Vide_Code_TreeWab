import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ShieldCheck, Info } from 'lucide-react';

export default function TreeModal({ tree, isOpen, onClose }) {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && tree && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black backdrop-blur-md rounded-full text-gray-800 dark:text-gray-200 transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Left Image Side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0">
              <img 
                src={tree.image} 
                alt={tree.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
            </div>

            {/* Right Information Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-start">
              <div className="inline-flex items-center space-x-2 text-brand-500 mb-4 mt-auto md:mt-0 pt-4 md:pt-0">
                <Info size={18} />
                <span className="font-semibold uppercase tracking-wider text-sm">Species Details</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white leading-tight">
                {tree.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {tree.description}
                <br /><br />
                Planting {tree.title} helps restore the ecosystem by providing vital habitats for local wildlife and improving soil quality. It's an excellent choice for long-term sustainability projects.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30">
                  <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded-xl text-brand-500 shadow-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Growth Timeline</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{tree.growth} to reach full maturity. Requires proper care in the early stages.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/30">
                  <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded-xl text-brand-500 shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Environmental Benefits</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{tree.benefits}. Highly effective at capturing carbon dioxide.</p>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Pledge to Plant
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
