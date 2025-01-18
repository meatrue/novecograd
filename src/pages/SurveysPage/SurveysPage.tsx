import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import {
  $isSurveysError,
  $isSurveysLoading,
  $surveys,
  $surveysVoted,
  surveysPageMounted,
  surveysPageUnmounted
} from '@/store/surveys';
import { SurveysList, SurveysVotedList } from '@/components/Surveys';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Skeleton } from '@/components/ui-kit';

export const SurveysPage: React.FC = () => {
  const [
    surveys,
    surveysVoted,
    isSurveysLoading,
    isSurveysError,
    loadSurveys,
    unmountSurveysPage,
  ] = useUnit([
    $surveys,
    $surveysVoted,
    $isSurveysLoading,
    $isSurveysError,
    surveysPageMounted,
    surveysPageUnmounted,
  ]);

  React.useEffect(() => {
    loadSurveys();
    
    return () => {
      unmountSurveysPage();
    };
  }, [loadSurveys, unmountSurveysPage]);

  return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      <p><Link className="text-sm hover-color" to="/">На главную</Link></p>
      {isSurveysLoading
        ? <Skeleton className="h-10 rounded-md" bgClassName="bg-slate-300" />
        : (
          <h1 className="text-4xl font-semibold">Активные опросы</h1>
        )}  
      
      {isSurveysError && <ErrorMessage />}
      
      {!isSurveysError && (
        <div className="grid grid-cols-[3fr,2fr] gap-x-8">
          <section className="flex flex-col gap-6 mb-10">
            {isSurveysLoading
              ? <Skeleton className="h-7 rounded-md" bgClassName="bg-slate-300" />
              : (
                <h2 className="text-xl font-semibold text-center">Ещё не проголосовал</h2>
              )} 
            
            <SurveysList
              items={surveys}
              isLoading={isSurveysLoading && !surveys.length}
            />
          </section>

          <section className="flex flex-col gap-6 mb-10">
            {isSurveysLoading
              ? <Skeleton className="h-7 rounded-md" bgClassName="bg-slate-300" />
              : (
                <h2 className="text-xl font-semibold text-center">Уже проголосовал. Результаты опросов</h2>
              )} 
            
            <SurveysVotedList
              items={surveysVoted}
              isLoading={isSurveysLoading && !surveysVoted.length}
            />
          </section>
        </div>
      )}
    </div>
  );
};