import React from 'react';

import { IDocument } from '@/interfaces/documents';
import { ErrorMessage } from '../ErrorMessage';
import { DownloadIcon, Skeleton } from '../ui-kit';
import { getBackendFilesUrl } from '@/utils/common';

interface IDocumentsListProps {
  items: IDocument[];
  isLoading: boolean;
  isError: boolean;
}

export const DocumentsList: React.FC<IDocumentsListProps> = ({
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
            {isLoading ? <Skeleton /> : <>Название</>}
          </th>
          <th className="w-[65%]">
            {isLoading ? <Skeleton /> : <>Описание</>}
          </th>
          <th className="w-[10%] text-center">
            {isLoading ? <Skeleton /> : <>Скачать</>}
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
        {!isLoading && !!items.length && items.map((document, index) => (
          <tr key={index}>
            <td className="break-words">{document.name}</td>
            <td>{document.descr}</td>
            <td className="flex justify-center">
              <a
                target="_blank"
                href={`${getBackendFilesUrl()}/${document.link}`}
                className="block w-8 h-8 text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                <DownloadIcon className="image-cover" />
              </a>
            </td>
          </tr>
        ))}

        {!isLoading && !items.length && (
          <tr>
            <td colSpan={7} className="text-center">
              <div className="py-10">Документов не найдено</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};