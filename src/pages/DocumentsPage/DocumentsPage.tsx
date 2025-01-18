import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import {
  $documents,
  $isDocumentsError,
  $isDocumentsLoading,
  documentsPageMounted,
  documentsPageUnmounted
} from '@/store/documents';
import { Skeleton } from '@/components/ui-kit';
import { DocumentsList } from '@/components/DocumentsList';

export const DocumentsPage: React.FC = () => {
  const [
    documents,
    isLoading,
    isError,
    loadDocuments,
    unmountDocumentsPage,
  ] = useUnit([
    $documents,
    $isDocumentsLoading,
    $isDocumentsError,
    documentsPageMounted,
    documentsPageUnmounted,
  ]);

  React.useEffect(() => {
    loadDocuments();
  
    return () => {
      unmountDocumentsPage();
    };
  }, [loadDocuments, unmountDocumentsPage]);

  return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      <p>
        <Link className="text-sm hover-color" to="/">На главную</Link>
      </p>
      {isLoading
        ? <Skeleton className="h-10 rounded-md" bgClassName="bg-slate-300" />
        : <h1 className="text-4xl font-semibold">Документы</h1>
      }
      <DocumentsList
        items={documents}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};