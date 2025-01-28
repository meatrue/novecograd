import React from 'react';
import { useUnit } from 'effector-react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import {
  $authData,
  $isAuthorized,
  authorizationReseted 
} from '@/store/authorization';

interface IHeaderAccountButtonProps {
  openAuthModal: () => void;
}

export const HeaderAccountButton: React.FC<IHeaderAccountButtonProps> = ({
  openAuthModal
}) => {
  const [
    isAuthorized,
    authData,
    resetAuthorization,
  ] = useUnit([
    $isAuthorized,
    $authData,
    authorizationReseted,
  ]);  

  if (isAuthorized && authData) return (
    <LogoutButton
      username={authData.username}
      onClick={resetAuthorization}
    />
  );

  return (
    <LoginButton onClick={openAuthModal} />
  );
};