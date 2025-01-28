import React from 'react';
import { useUnit } from 'effector-react';
import { AnimatePresence } from 'framer-motion';

import { AuthorizationForm } from '@/components/AuthorizationForm';
import { $isAppLoaded } from '@/store/app';
import { $isAuthorized, $isUserInitializationLoading } from '@/store/authorization';
import { useModal } from '@/hooks';
import { Modal, Skeleton } from '@/components/ui-kit';
import { MenuButton } from './MenuButton';
import { HeaderAccountButton } from './HeaderAccountButton';
import { HeaderAccountButtonSkeleton } from './HeaderAccountButtonSkeleton';

export const Header: React.FC = () => {
  const { isOpen, close, open } = useModal();
  const [
    isUserInitializationLoading,
    isAppLoaded,
    isAuthorized,
  ] = useUnit([
    $isUserInitializationLoading,
    $isAppLoaded,
    $isAuthorized,
  ]);
  
  return (
    <>
      <header className="fixed z-100 left-0 top-0 w-full bg-white shadow-sm">
        <div className="flex gap-10 items-center w-full py-2 wrapper-main wrapper-max">
          {isAuthorized && <MenuButton className="-ml-2" />}
          {!isAppLoaded || isUserInitializationLoading
            ? (
              <div className="w-full max-w-[300px]">
                <Skeleton />
              </div>
            )
            : (
              <div>
                <span className="font-bold uppercase">Новэкоград</span> - управление проектами развития
              </div>
            )}
          <div className="ml-auto -mr-2">
            {!isAppLoaded || isUserInitializationLoading
              ? <HeaderAccountButtonSkeleton />
              : <HeaderAccountButton openAuthModal={open} />
            }
          </div>
        </div>
      </header>

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