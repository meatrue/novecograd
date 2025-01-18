import React from 'react';
import { useUnit } from 'effector-react';
import { AnimatePresence } from 'framer-motion';

import { AuthorizationForm } from '@/components/AuthorizationForm';
import { $authData, $isAuthorized, authorizationReseted } from '@/store/authorization';
import { useModal } from '@/hooks';
import { Modal } from '@/components/ui-kit';
import { MenuButton } from './MenuButton';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

export const Header: React.FC = () => {
  const { isOpen, open, close} = useModal();
  const [
    isAuthorized,
    authData,
    resetAuthorization
  ] = useUnit([
    $isAuthorized,
    $authData,
    authorizationReseted
  ]);
  
  return (
    <>
      <header className="fixed z-100 left-0 top-0 w-full bg-white shadow-sm">
        <div className="flex gap-10 items-center w-full py-2 wrapper-main wrapper-max">
          {isAuthorized && <MenuButton className="-ml-2" />}
          <div>
            <span className="font-bold uppercase">Новэкоград</span> - управление проектами развития
          </div>
          {isAuthorized && authData
            ? (
              <LogoutButton
                className="ml-auto -mr-2"
                username={authData.username}
                onClick={resetAuthorization}
              />
            )
            : (
              <LoginButton
                className="ml-auto -mr-2"
                onClick={open}
              />
            )
          }
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