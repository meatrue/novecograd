import { axios } from '@/api/axios';

import { IMeetingProtocolResponse, IMeetingsResponse, IProtocolThemeSearchResponse } from '@/interfaces/backendResponse';

const MEETINGS_API_URL = '/meetings';

export interface IGetMeetingProtocolParams {
  meeting_selected: string;
}

export interface IGetProtocolThemesParams {
  search: string;
}

export const meetingsApi = {
  getMeetings: () => axios.get<IMeetingsResponse>(MEETINGS_API_URL),
  getMeetingProtocol: (params: IGetMeetingProtocolParams) => (
    axios.post<IMeetingProtocolResponse>(MEETINGS_API_URL, params)
  ),
  getProtocolThemes: (params: IGetProtocolThemesParams) => (
    axios.post<IProtocolThemeSearchResponse>(MEETINGS_API_URL, params)
  ),
};