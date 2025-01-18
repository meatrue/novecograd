import React from 'react';

import { ModalContainer } from './ModalContainer';
import { ModalBackground } from './ModalBackground';
import { ModalContent } from './ModalContent';
import { ModalContext } from './ModalContext';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, close, children }) => {
  return (
    <ModalContext.Provider value={{ isOpen, close }}>
      <ModalContainer>
        <ModalBackground />
        <ModalContent>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalContext.Provider>
  );
};