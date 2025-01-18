import { axios } from '@/api/axios';
import { IDocumentsResponse } from '@/interfaces/backendResponse';

export const documentsApi = {
  getDocuments: () => axios.get<IDocumentsResponse>('/documents'),
};