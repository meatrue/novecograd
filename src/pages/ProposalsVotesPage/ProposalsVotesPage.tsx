import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { ProposalsVotesList } from '@/components/Proposals';
import {
  $proposalsVotes,
  $isProposalsVotesError,
  $isProposalsVotesLoading,
  proposalsVotesPageMounted,
  proposalsVotesPageUnmounted,
} from '@/store/proposalsVotes';
import { Skeleton } from '@/components/ui-kit';

export const ProposalsVotesPage: React.FC = () => {
  const [
    proposals,
    isError,
    isLoading,
    loadProposals,
    clearProposals,
  ] = useUnit([
    $proposalsVotes,
    $isProposalsVotesError,
    $isProposalsVotesLoading,
    proposalsVotesPageMounted,
    proposalsVotesPageUnmounted,
  ]);

  React.useEffect(() => {
    loadProposals();
    
    return () => {
      clearProposals();
    };
  }, [loadProposals, clearProposals]);

  return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      <p><Link className="text-sm hover-color" to="/">На главную</Link></p>
      <section className="flex flex-col gap-6 mb-10">
        {isLoading
          ? <Skeleton className="h-10 rounded-md" bgClassName="bg-slate-300" />
          : (
            <h1 className="text-4xl font-semibold leading-[1.3]">
            Предложения по развитию кооператива<br />
            Результаты голосований
            </h1>
          )}        

        <ProposalsVotesList
          items={proposals}
          isLoading={isLoading}
          isError={isError}
        />
      </section>
    </div>
  );
};
