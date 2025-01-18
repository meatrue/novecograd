import React from 'react';
import { useUnit } from 'effector-react';

import {
  $isProtocolThemesError,
  $isProtocolThemesLoading,
  $protocolThemes
} from '@/store/meetings';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Skeleton } from '@/components/ui-kit';

export const MeetingThemes: React.FC = () => {
  const [
    protocolThemes,
    isError,
    isLoading,
  ] = useUnit([
    $protocolThemes,
    $isProtocolThemesError,
    $isProtocolThemesLoading,
  ]);
  
  if (isError) return (
    <ErrorMessage />
  );
  
  if (!protocolThemes) return null;
  
  const { protocols } = protocolThemes;

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
        {isLoading && (
          <>
            <tr>
              <td colSpan={3}><Skeleton /></td>
            </tr>
            {[...new Array(3)].map((_, index) => (
              <tr key={index}>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
              </tr>          
            ))}
          </>
        )}
        {!isLoading && !protocols.length && (
          <tr>
            <td colSpan={3} className="text-center">
            Темы не найдены
            </td>
          </tr>
        )}
        {!isLoading && !!protocols.length && protocols.map(
          ({ name, themes, descriptions, authors }, index) => (
            <React.Fragment key={index}>
              <tr>
                <td colSpan={3} className="font-semibold">{name}</td>
              </tr>
              {themes.map((protocolTheme, index) => (
                <tr key={index}>
                  <td>{protocolTheme}</td>
                  <td>{authors[index]}</td>
                  <td className="whitespace-pre-wrap">{descriptions[index]}</td>
                </tr>   
              ))}         
            </React.Fragment>
          )
        )}
      </tbody>
    </table>
  );
};