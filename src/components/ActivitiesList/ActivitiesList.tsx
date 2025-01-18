import React from 'react';

import { IActivity } from '@/interfaces/activities';
import { Skeleton } from '@/components/ui-kit';
import { ErrorMessage } from '@/components/ErrorMessage';

interface IActivitiesListProps {
  items: IActivity[];
  isLoading: boolean;
  isError: boolean;
}

export const ActivitiesList: React.FC<IActivitiesListProps> = ({
  items,
  isLoading,
  isError
}) => {

  if (isError) return (
    <ErrorMessage />
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="w-[25%]">
            {isLoading ? <Skeleton /> : <>Активность</>}
          </th>
          <th className="w-[15%]">
            {isLoading ? <Skeleton /> : <>Ответственный-1</>}
          </th>
          <th className="w-[15%]">
            {isLoading ? <Skeleton /> : <>Ответственный-2</>}
          </th>
          <th className="w-[9.5%]">
            {isLoading ? <Skeleton /> : <>Дата создания</>}
          </th>
          <th className="w-[9.5%]">
            {isLoading ? <Skeleton /> : <>Дата старта (план)</>}
          </th>
          <th className="w-[13%]">
            {isLoading ? <Skeleton /> : <>Дата завершения (план)</>}
          </th>
          <th className="w-[13%]">
            {isLoading ? <Skeleton /> : <>Дата завершения (факт)</>}
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading && [...new Array(3)].map((_, index) => (
          <tr key={index}>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
          </tr>          
        ))}
        {!isLoading && !!items.length && items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.responsible1}</td>
            <td>{item.responsible2}</td>
            <td>{item.origin}</td>
            <td>{item.start}</td>
            <td>{item.final_plan}</td>
            <td>{item.final_fact}</td>
          </tr>
        ))}

        {!isLoading && !items.length && (
          <tr>
            <td colSpan={7} className="text-center">
              <div className="py-10">Активностей не найдено</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};