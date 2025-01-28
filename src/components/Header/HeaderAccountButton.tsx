import React from 'react';
import { useUnit } from 'effector-react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import {
  $authData,
  $isAuthorized,
  $isUnAuthorizeLoading,
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
    isUnAuthorizeLoading,
    resetAuthorization,
  ] = useUnit([
    $isAuthorized,
    $authData,
    $isUnAuthorizeLoading,
    authorizationReseted,
  ]);  

  if (isAuthorized && authData) return (
    <LogoutButton
      username={authData.username}
      onClick={resetAuthorization}
      disabled={isUnAuthorizeLoading}
    />
  );

  return (
    <LoginButton onClick={openAuthModal} />
  );
};