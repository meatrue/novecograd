import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import { surveysApi } from '@/api/surveys';
import { ISurveysResponse } from '@/interfaces/backendResponse';


export const getSurveysFx = createEffect<
  void,
  ISurveysResponse,
  AxiosError
>(async () => {
  const response = await surveysApi.getSurveys();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});
