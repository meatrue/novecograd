import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';

import { useModalsContainer } from '@/hooks';
import { SidebarContainer } from './SidebarContainer';
import { SidebarBackground } from './SidebarBackground';
import { SidebarPanel } from './SidebarPanel';

interface ISidebarProps {
  isOpen: boolean;
  close: () => void;
}

export const Sidebar: React.FC<ISidebarProps> = ({ isOpen, close }) => {
  const { modalsContainer } = useModalsContainer();

  const body = document.body;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <SidebarContainer>
          <SidebarBackground close={close} />
          <SidebarPanel close={close} />
        </SidebarContainer>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, modalsContainer ?? body);
};