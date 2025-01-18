import React from 'react';
import { motion } from 'framer-motion';

import { ANIMATION_DURATION } from './const';

interface ISidebarContainerProps {
  children: React.ReactNode;
}

export const SidebarContainer: React.FC<ISidebarContainerProps> = ({ children }) => {
  return (
    <motion.div
      className='fixed z-110 top-0 left-0 w-full h-full overflow-hidden'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{
        scale: 0,
        transition: { duration: 0, delay: ANIMATION_DURATION },
      }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.div>
  );
};