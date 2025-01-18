import React from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Accordion, Skeleton } from '@/components/ui-kit';
import { IProposalVotes } from '@/interfaces/proposals';
import { ProposalVotesStatistics } from '../ProposalVotesStatistics';
import { VOTING_OPTIONS } from '../constants';

interface IProposalsVotesListProps {
  items: IProposalVotes[];
  isLoading: boolean;
  isError: boolean;
}

export const ProposalsVotesList: React.FC<IProposalsVotesListProps> = ({
  items,
  isLoading,
  isError,
}) => {
  if (isError) return (
    <ErrorMessage />
  );

  return (
    <div className="flex flex-col gap-1">
      {isLoading && [...new Array(3)].map((_, index) => (
        <Skeleton
          key={index}
          className="h-22 rounded-md"
          bgClassName="bg-slate-300"
        />    
      ))}
  
      {!isLoading && !!items.length && items.map((proposal, index) => (
        <Accordion
          key={index}
          title={proposal.title}
          content={
            <ProposalVotesStatistics
              statistics={
                Object.entries(proposal.options).map(([key, value]) => {
                  
                  return ({
                    value: VOTING_OPTIONS[Number(key)].label,
                    votes: value,
                  });
                })
              }
            />
          }
        />
      ))}
  
      {!isLoading && !items.length && (
        <div className="py-10 text-center">Предложений не найдено</div>
      )}
    </div>
  );
};