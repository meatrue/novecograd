import React from 'react';
import { motion } from 'framer-motion';

interface IModalContainerProps {
  children: React.ReactNode;
}

export const ModalContainer: React.FC<IModalContainerProps> = ({
  children,
}) => {
  return (
    <motion.div
      className="fixed z-100 top-0 left-0 w-full h-full flex flex-col items-center justify-center overflow-hidden py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};