import React from 'react';
import { motion } from 'framer-motion';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AdminCard = ({ children, className = '', delay = 0 }: AdminCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/85 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AdminCard;
