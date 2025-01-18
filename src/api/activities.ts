import { axios } from '@/api/axios';
import { IActivitiesResponse } from '@/interfaces/backendResponse';

export const activitiesApi = {
  getActivities: () => axios.get<IActivitiesResponse>('/activities'),
};