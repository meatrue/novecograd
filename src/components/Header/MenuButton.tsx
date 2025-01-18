import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Sidebar } from '@/components/Sidebar';
import { useModal } from '@/hooks';
import { BurgerIcon } from '@/components/ui-kit/icons';

interface IMenuButtonProps {
  className?: string;
}

export const MenuButton: React.FC<IMenuButtonProps> = ({ className }) => {
  const { 
    isOpen: isSidebarOpen,
    open: openSidebar,
    close: closeSidebar
  } = useModal();

  const location = useLocation();

  React.useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <>
      <button
        className={clsx(
          'flex w-14 h-14 py-4 px-2 hover-color rounded-full focus-within:outline-slate-400',
          className
        )}
        type="button"
        onClick={openSidebar}
      >
        <BurgerIcon className='w-full h-full object-cover' />
      </button>
      <Sidebar isOpen={isSidebarOpen} close={closeSidebar} />
    </>
  );
};