import React from 'react';

import { Skeleton } from '@/components/ui-kit';
import { ErrorMessage } from '@/components/ErrorMessage';
import { IProposal } from '@/interfaces/proposals';
import { ProposalsVotingForm } from '@/components/Proposals';

interface IProposalsListProps {
  items: IProposal[];
  isError: boolean;
  isLoading: boolean;
}

export const ProposalsList: React.FC<IProposalsListProps> = ({
  items,
  isError,
  isLoading
}) => {
  if (isError) return (
    <ErrorMessage />
  );

  return (
    <div className="flex flex-col gap-6">
      <table className="table">
        <thead>
          <tr>
            <th className="w-[50%]">Предложение</th>
            <th className="w-[12%]">Дата создания</th>
            <th className="w-[38%]">Проголосовать</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && [...new Array(3)].map((_, index) => (
            <tr key={index}>
              <td><Skeleton /></td>
              <td><Skeleton /></td>
              <td><Skeleton /></td>
            </tr>          
          ))}
          {!isLoading && !!items.length && items.map((item, index) => (
            <tr key={index}>
              <td>
                <div
                  className="[&_a]:text-blue-700 [&_a]:underline [&_a]:hover:no-underline"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </td>
              <td>{item.date}</td>
              <td>
                <ProposalsVotingForm
                  className="flex gap-6 flex-wrap items-center"
                  proposal={item}
                  proposalNumber={index}
                />
              </td>
            </tr>
          ))}

          {!isLoading && !items.length && (
            <tr>
              <td colSpan={7} className="text-center">
                <div className="py-10">Предложений не найдено</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};