import { motion } from 'framer-motion';
import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  className = '',
}: ScrollRevealProps) => {
  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: 40 };
      case 'down': return { y: -40 };
      case 'left': return { x: -45 };
      case 'right': return { x: 45 };
      case 'none': default: return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getOffset(), filter: 'blur(2px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
