import React from 'react';
import clsx from 'clsx';

import { CloseIcon } from '@/components/ui-kit';

interface ICloseButtonProps {
  onClick: () => void;
  className?: string;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      className={clsx(
        'p-2 hover-color rounded-full focus-within:outline-slate-400',
        className
      )}
      type="button"
      onClick={onClick}
    >
      <CloseIcon className="w-full h-full object-cover" />
    </button>
  );
};