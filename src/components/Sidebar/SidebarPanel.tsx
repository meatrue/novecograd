import React from 'react';
import { motion } from 'framer-motion';

import { CloseButton } from '@/components/ui-kit';
import { ANIMATION_DURATION } from './const';
import { NavigationLink } from './NavigationLink';

const navigationLinks = [
  {
    text: 'Собрания',
    source: '/meetings',
  },
  {
    text: 'Активности',
    source: '/activities',
  },
  {
    text: 'Предложения по развитию кооператива',
    source: '/proposals',
  },
  {
    text: 'Предложения. Результаты голосований',
    source: '/proposals-votes',
  },
  {
    text: 'Опросы',
    source: '/surveys',
  },
  // {
  //   text: 'Управление данными',
  //   source: '#',
  // },
  {
    text: 'Документы',
    source: '/documents',
  },
  // {
  //   text: 'Личный кабинет',
  //   source: '/personal-account',
  // },
];

interface ISidebarPanelProps {
  close: () => void;
}

export const SidebarPanel: React.FC<ISidebarPanelProps> = ({ close }) => {
  return (
    <motion.div
      className="absolute z-20 top-0 left-0 w-[400px] h-full overflow-y-auto bg-white shadow"
      initial={{ translateX: '-100%' }}
      animate={{ translateX: '0%' }}
      exit={{
        translateX: '-100%',
        transition: { duration: ANIMATION_DURATION, ease: 'easeOut' },
      }}
      transition={{ duration: ANIMATION_DURATION, ease: 'easeOut' }}
    >
      <CloseButton
        onClick={close}
        className="absolute top-2 right-2 w-9 h-9"
      />
      <nav className="flex flex-col pt-14 pb-10 px-6">
        {navigationLinks.map((item, index) => (
          <NavigationLink
            key={index}
            href={item.source}
            text={item.text}
          />
        ))}
      </nav>
    </motion.div>
  );
};