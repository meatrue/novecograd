import React from 'react';

import { ModalContext } from './ModalContext';
import { CloseButton } from '@/components/ui-kit';

interface IModalContentProps {
  children: React.ReactNode;
}

export const ModalContent: React.FC<IModalContentProps> = ({ children }) => {
  const { close } = React.useContext(ModalContext);

  return (
    <div className="relative flex flex-col gap-5 min-w-[500px] min-h-[200px] max-h-full overflow-auto p-10 bg-white rounded-md shadow">
      <CloseButton
        className="absolute top-2 right-2 w-9 h-9"
        onClick={close}
      />
      {children}
    </div>
  );
};