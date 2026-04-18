import React from 'react';
import { Leaf, Globe, Share2, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-16 pb-8 relative z-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 mb-6">
              <Leaf size={28} />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">EcoForest</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
              We are on a mission to restore the Earth's forests, protect biodiversity, and create a sustainable future for generations to come. Join us in planting trees today.
            </p>
            <div className="flex space-x-4">
              {[Globe, Share2, MessageCircle, Mail].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Projects', 'Tree Species', 'Volunteer', 'Contact'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Stay Updated</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on our planting projects.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-l-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 text-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-r-xl font-medium transition-colors text-sm"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-900 text-center text-gray-400 dark:text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} EcoForest Initiative. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
