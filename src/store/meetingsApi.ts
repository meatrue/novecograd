import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import {
  IGetMeetingProtocolParams,
  IGetProtocolThemesParams,
  meetingsApi
} from '@/api/meetings';
import {
  IMeetingProtocolResponse,
  IMeetingsResponse,
  IProtocolThemeSearchResponse
} from '@/interfaces/backendResponse';

export const getMeetingsFx = createEffect<
  void,
  IMeetingsResponse,
  AxiosError
>(async () => {
  const response = await meetingsApi.getMeetings();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const getMeetingProtocolFx = createEffect<
  IGetMeetingProtocolParams,
  IMeetingProtocolResponse,
  AxiosError
>(async (params) => {
  const response = await meetingsApi.getMeetingProtocol(params);
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const getProtocolThemesFx = createEffect<
  IGetProtocolThemesParams,
  IProtocolThemeSearchResponse,
  AxiosError
>(async (params) => {
  const response = await meetingsApi.getProtocolThemes(params);
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});
