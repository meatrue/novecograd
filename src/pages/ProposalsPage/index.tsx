import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { ProposalsList, AddProposalForm } from '@/components/Proposals';
import {
  $isError,
  $isLoading,
  $proposals,
  proposalsPageMounted,
  proposalsPageUnmounted
} from '@/store/proposals';

export const ProposalsPage: React.FC = () => {
  const [
    proposals,
    isLoading,
    isError,
    loadProposals,
    clearProposals,
  ] = useUnit([
    $proposals,
    $isLoading,
    $isError,
    proposalsPageMounted,
    proposalsPageUnmounted,
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
      <h1 className="mb-10 text-4xl font-semibold">Предложения по развитию кооператива</h1>

      <div className="flex flex-col gap-6 mb-10">
        <h2 className="text-xl font-semibold ">Внесите свое предложение</h2>
        <AddProposalForm />
      </div>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-center">Актуальные предложения</h2>
        <ProposalsList
          items={proposals}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};