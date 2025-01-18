import React from 'react';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { AuthorizationForm } from '@/components/AuthorizationForm';
import { AccountIcon, Modal } from '@/components/ui-kit';
import { useModal } from '@/hooks';

interface IAccountButtonProps {
  isAuthorized: boolean;
  username: string | null;
  className?: string;
}

export const AccountButton: React.FC<IAccountButtonProps> = ({
  isAuthorized,
  username,
  className
}) => {
  const { isOpen, open, close} = useModal();

  return (
    <>
      <div className={clsx(
        'flex gap-2 items-start',
        className
      )}>
        {!!username && (
          <div className='flex items-center h-14 p-2 text-sm'>
            <span>{username}</span>
          </div>
        )}
        <button
          className="flex flex-col gap-2 items-center p-2 hover-color focus-within:outline-slate-400"
          type="button"
          onClick={open}
        >
          <span className='flex w-10 h-10'>
            <AccountIcon className='w-full h-full object-cover' />
          </span>
          {isAuthorized
            ? <span className='text-sm'>Выйти</span>
            : <span className='text-sm'>Войти</span>
          }
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Modal isOpen={isOpen} close={close}>
            <AuthorizationForm onSuccess={close} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};