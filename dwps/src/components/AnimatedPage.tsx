import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedPageProps {
  children: React.ReactNode;
}

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
