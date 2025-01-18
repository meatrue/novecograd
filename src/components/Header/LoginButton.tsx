import React from 'react';
import clsx from 'clsx';

import { AccountIcon} from '@/components/ui-kit';

interface ILoginButtonProps {
  onClick: () => void;
  className?: string;
}

export const LoginButton: React.FC<ILoginButtonProps> = ({
  onClick,
  className
}) => {
  return (
    <div className={clsx(
      'flex gap-2 items-start',
      className
    )}>
      <button
        className="flex flex-col gap-2 items-center p-2 hover-color focus-within:outline-slate-400"
        type="button"
        onClick={onClick}
      >
        <span className='flex w-10 h-10'>
          <AccountIcon className='w-full h-full object-cover' />
        </span>
        <span className='text-sm'>Войти</span>
      </button>
    </div>
  );
};