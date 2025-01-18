import { axios } from '@/api/axios';

import { IBaseResponse, ISurveysResponse } from '@/interfaces/backendResponse';

export interface ISurveyAddVoteParams {
  [key:number]: number;
}

export const surveysApi = {
  getSurveys: () => axios.get<ISurveysResponse>('/surveys'),
  addVote: (params: ISurveyAddVoteParams) => axios.post<IBaseResponse>('/surveys', params),
};