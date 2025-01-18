import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { ActivitiesList } from '@/components/ActivitiesList';
import {
  $activities,
  $isError,
  $isLoading,
  activitiesPageMounted,
  activitiesPageUnmounted
} from '@/store/activities';
import { Skeleton } from '@/components/ui-kit';

export const ActivitiesPage: React.FC = () => {
  const [
    activities,
    isLoading,
    isError,
    loadActivities,
    unmountActivitiesPage,
  ] = useUnit([
    $activities,
    $isLoading,
    $isError,
    activitiesPageMounted,
    activitiesPageUnmounted,
  ]);

  React.useEffect(() => {
    loadActivities();

    return () => {
      unmountActivitiesPage();
    };
  }, [loadActivities, unmountActivitiesPage]);

  return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      <p>
        <Link className="text-sm hover-color" to="/">На главную</Link>
      </p>
      {isLoading
        ? <Skeleton className="h-10 rounded-md" bgClassName="bg-slate-300" />
        : <h1 className="text-4xl font-semibold">Текущие активности</h1>
      }
      <ActivitiesList
        items={activities}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};