import React from 'react';
import { Navigate } from 'react-router';
import { useUnit } from 'effector-react';

import { $isAuthorized, $isLoading, $isUserInitializationLoading } from '@/store/authorization';

interface IProtectedRouteProps {
  element: React.ReactElement;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ element }) => {
  const [
    isUserInitializationLoading,
    isLoading,
    isAuthorized
  ] = useUnit([
    $isUserInitializationLoading,
    $isLoading,
    $isAuthorized
  ]);

  if (!isUserInitializationLoading && !isLoading && !isAuthorized) {
    return <Navigate to="/" replace />; 
  }
  if (isAuthorized) return element;

  return null;
};