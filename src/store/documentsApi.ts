import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import { documentsApi } from '@/api';
import { IDocumentsResponse } from '@/interfaces/backendResponse';

export const getDocumentsFx = createEffect<
  void,
  IDocumentsResponse,
  AxiosError
>(async () => {
  const response = await documentsApi.getDocuments();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});