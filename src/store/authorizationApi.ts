import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import { authorizationApi } from '@/api';
import { IAuthorizationResponse, IBaseResponse } from '@/interfaces/backendResponse';

interface IAuthorizationParams {
  username: string;
  password: string;
}

interface IUnauthorizeParams {
  logoff: boolean;
}

export const authorizeFx = createEffect<
  IAuthorizationParams,
  IAuthorizationResponse,
  AxiosError
>(async ({ username, password }) => {
  const response = await authorizationApi.authorize({ username, password });
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const unAuthorizeFx = createEffect<
  IUnauthorizeParams,
  IBaseResponse,
  AxiosError
>(async ({ logoff }) => {
  const response = await authorizationApi.unAuthorize({ logoff });
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const getMeFx = createEffect<
  void,
  IAuthorizationResponse,
  AxiosError
>(async () => {
  const response = await authorizationApi.getMe();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});