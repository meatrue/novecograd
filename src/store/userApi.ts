import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import { IChangeUserInfoParams, userApi } from '@/api/user';
import { IUserInfoResponse } from '@/interfaces/backendResponse';

export const getUserInfoFx = createEffect<
  void,
  IUserInfoResponse,
  AxiosError
>(async () => {
  const response = await userApi.getUserInfo();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const changeUserInfoFx = createEffect<
  IChangeUserInfoParams,
  IUserInfoResponse,
  AxiosError
>(async (params) => {
  const response = await userApi.changeUserInfo(params);
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});
