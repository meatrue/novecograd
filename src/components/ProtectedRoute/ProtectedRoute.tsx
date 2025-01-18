import React from 'react';
import { Navigate } from 'react-router';
import { useUnit } from 'effector-react';

import { $isAuthorized, $isLoading } from '@/store/authorization';

interface IProtectedRouteProps {
  element: React.ReactElement;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ element }) => {
  const [isLoading, isAuthorized] = useUnit([$isLoading, $isAuthorized]);

  if (!isAuthorized && !isLoading) return (
    <Navigate to="/" replace />
  ); 

  if (isAuthorized) return element;

  return null;
};