import React from 'react';
import { motion } from 'framer-motion';

import { ANIMATION_DURATION, BG_ANIMATION_DELAY } from './const';

interface ISidebarBackgroundProps {
  close: () => void;
}

export const SidebarBackground: React.FC<ISidebarBackgroundProps> = ({ close }) => {
  return (
    <motion.div
      className="absolute z-10 top-0 left-0 w-full h-full bg-black"
      onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      exit={{
        opacity: 0,
        transition: { duration: ANIMATION_DURATION, ease: 'easeOut', delay: 0 },
      }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: 'easeOut',
        delay: BG_ANIMATION_DELAY,
      }}
    />
  );
};