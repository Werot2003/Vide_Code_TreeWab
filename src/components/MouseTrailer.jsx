import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function MouseTrailer() {
  const [particles, setParticles] = useState([]);
  const particleIdCounter = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Calculate distance from last position to avoid spawning too many
      const dx = clientX - lastMousePos.current.x;
      const dy = clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 15) {
        lastMousePos.current = { x: clientX, y: clientY };
        
        const newParticle = {
          id: particleIdCounter.current++,
          x: clientX,
          y: clientY,
          size: Math.random() * 10 + 10, // 10px to 20px
          rotation: Math.random() * 360,
          colorClass: ['text-brand-400', 'text-brand-500', 'text-brand-600'][Math.floor(Math.random() * 3)],
        };

        setParticles(prev => {
          const newParticles = [...prev, newParticle];
          // Keep maximum 20 particles to maintain performance
          if (newParticles.length > 20) {
            return newParticles.slice(newParticles.length - 20);
          }
          return newParticles;
        });

        // Auto remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000); // 1s lifespan
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden hidden md:block">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 0, rotate: p.rotation }}
            animate={{ 
              opacity: 0, 
              x: p.x + (Math.random() - 0.5) * 100, // Scatter X
              y: p.y + (Math.random() - 0.5) * 100 + 50, // Scatter Y and fall down slightly
              scale: 1,
              rotate: p.rotation + (Math.random() * 180 - 90) // Spin while falling
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute -ml-3 -mt-3 ${p.colorClass}`}
          >
            <Leaf size={p.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
