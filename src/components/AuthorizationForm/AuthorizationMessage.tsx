import React from 'react';

import { CloseIcon } from '@/components/ui-kit';

interface IAuthorizationMessageProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const AuthorizationMessage: React.FC<IAuthorizationMessageProps> = ({ children, onClose }) => {
  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center bg-white">
      {children}
      <button
        type="button"
        className="absolute z-10 top-2 right-2 w-9 h-9 p-2"
        onClick={onClose}
      >
        <CloseIcon className="w-full h-full object-cover" />
      </button>
    </div>    
  );
};