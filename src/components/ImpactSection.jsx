import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Droplets, Wind, Globe2 } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: <TreePine size={32} />,
    value: "10,000+",
    label: "Trees Planted",
    description: "Across multiple provinces in Thailand"
  },
  {
    id: 2,
    icon: <Wind size={32} />,
    value: "2,500",
    label: "Tons of CO2",
    description: "Absorbed annually by our forests"
  },
  {
    id: 3,
    icon: <Droplets size={32} />,
    value: "50+",
    label: "Water Sources",
    description: "Restored and protected ecosystems"
  },
  {
    id: 4,
    icon: <Globe2 size={32} />,
    value: "1,200",
    label: "Volunteers",
    description: "Community members joined our cause"
  }
];

export default function ImpactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Our Global Impact
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Every tree planted is a step towards a greener, healthier planet. Here is what we've achieved together so far.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            variants={itemVariants}
            className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-16 h-16 mb-6 rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <h3 className="text-4xl font-black mb-2 text-gray-900 dark:text-white">
              {stat.value}
            </h3>
            <p className="text-lg font-bold text-brand-600 dark:text-brand-400 mb-2">
              {stat.label}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
