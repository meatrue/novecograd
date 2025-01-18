import React from 'react';
import clsx from 'clsx';

import { AccountIcon } from '@/components/ui-kit';

interface IAccountButtonProps {
  username: string;
  onClick: () => void;
  className?: string;
}

export const LogoutButton: React.FC<IAccountButtonProps> = ({
  username,
  onClick,
  className
}) => {
  return (
    <div className={clsx(
      'flex gap-2 items-start',
      className
    )}>
      <div className='flex items-center h-14 p-2 text-sm'>
        <span>{username}</span>
      </div>
      <button
        className="flex flex-col gap-2 items-center p-2 hover-color focus-within:outline-slate-400"
        type="button"
        onClick={onClick}
      >
        <span className='flex w-10 h-10'>
          <AccountIcon className='w-full h-full object-cover' />
        </span>
        <span className='text-sm'>Выйти</span>
      </button>
    </div>
  );
};