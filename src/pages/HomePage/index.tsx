import React from 'react';
import { useUnit } from 'effector-react';

import { PersonalAccountForm, PersonalAccountView } from '@/components/PersonalAccount';
import {
  $isUserInfoLoading,
  $isEditMode,
  personalAccountPageMounted,
  personalAccountPageUnmounted
} from '@/store/user';
import { Skeleton } from '@/components/ui-kit';
import {
  $isAuthorized,
  $isLoading,
  $isUserInitializationLoading
} from '@/store/authorization';
import { $isAppLoaded } from '@/store/app';

export const HomePage: React.FC = () => {
  const [
    isAppLoaded,
    isUserInitializationLoading,
    isAuthorized,
    isAuthorizationLoading,
    isUserInfoLoading,
    isEditMode,
    loadAccountInfo,
    clearAccountInfo,
  ] = useUnit([
    $isAppLoaded,
    $isUserInitializationLoading,
    $isAuthorized,
    $isLoading,
    $isUserInfoLoading,
    $isEditMode,
    personalAccountPageMounted,
    personalAccountPageUnmounted,
  ]);

  React.useEffect(() => {
    if (!isAuthorized) return;

    loadAccountInfo();
    return () => {
      clearAccountInfo();
    };
  }, [isAuthorized, loadAccountInfo, clearAccountInfo]);

  if (isAppLoaded && !isUserInitializationLoading && !isAuthorizationLoading && !isAuthorized) {
    return (
      <div className="grow flex flex-col items-center">
        <h1 className="mt-32 text-xl text-center">Авторизуйтесь, пожалуйста</h1>
      </div>
    );
  }

  if (!isAuthorizationLoading && isAuthorized) return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      {isUserInfoLoading
        ? <Skeleton className="h-10 rounded-md" bgClassName="bg-slate-300" />
        : <h1 className="text-4xl font-semibold">Личный кабинет</h1>
      }

      {isEditMode
        ? <PersonalAccountForm /> 
        : <PersonalAccountView />
      }
    </div>
  );
};