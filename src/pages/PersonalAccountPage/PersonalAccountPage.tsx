import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { PersonalAccountForm, PersonalAccountView } from '@/components/PersonalAccount';
import {
  $isUserInfoLoading,
  $isEditMode,
  personalAccountPageMounted,
  personalAccountPageUnmounted
} from '@/store/user';
import { Skeleton } from '@/components/ui-kit';

export const PersonalAccountPage: React.FC = () => {
  const [
    isUserInfoLoading,
    isEditMode,
    loadAccountInfo,
    clearAccountInfo,
  ] = useUnit([
    $isUserInfoLoading,
    $isEditMode,
    personalAccountPageMounted,
    personalAccountPageUnmounted,
  ]);

  React.useEffect(() => {
    loadAccountInfo();
    return () => {
      clearAccountInfo();
    };
  }, [loadAccountInfo, clearAccountInfo]);

  return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      <p><Link className="text-sm hover-color" to="/">На главную</Link></p>
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