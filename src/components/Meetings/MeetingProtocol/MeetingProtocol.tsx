import React from 'react';
import { useUnit } from 'effector-react';

import {
  $isProtocolError,
  $isProtocolLoading,
  $selectedProtocol
} from '@/store/meetings';
import { Skeleton } from '@/components/ui-kit';
import { ErrorMessage } from '@/components/ErrorMessage';

export const MeetingProtocol: React.FC = () => {
  const [
    protocol,
    isError,
    isLoading,
  ] = useUnit([
    $selectedProtocol,
    $isProtocolError,
    $isProtocolLoading
  ]);

  if (isError) return (
    <ErrorMessage />
  );

  if (!protocol) return null;

  const { points } = protocol;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="w-[25%]">
            {isLoading ? <Skeleton /> : <>Тема</>}
          </th>
          <th className="w-[12%]">
            {isLoading ? <Skeleton /> : <>Автор</>}
          </th>
          <th className="w-[63%]">
            {isLoading ? <Skeleton /> : <>Описание</>}
          </th>
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
        {!isLoading && !!points.length && points.map((point, index) => (
          <tr key={index}>
            <td>{point.theme}</td>
            <td>{point.author}</td>
            <td className="whitespace-pre-wrap">{point.description}</td>
          </tr>
        ))}

        {!isLoading && !points.length && (
          <tr>
            <td colSpan={3} className="text-center">
              <div className="py-10">Протокол не найден</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};