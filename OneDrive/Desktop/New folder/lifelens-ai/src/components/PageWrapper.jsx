import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={`min-h-full w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
