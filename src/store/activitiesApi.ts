import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import { activitiesApi } from '@/api';
import { IActivitiesResponse } from '@/interfaces/backendResponse';

export const getActivitiesFx = createEffect<
  void,
  IActivitiesResponse,
  AxiosError
>(async () => {
  const response = await activitiesApi.getActivities();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});