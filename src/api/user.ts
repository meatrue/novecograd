import { axios } from '@/api/axios';

import { IUserInfoResponse } from '@/interfaces/backendResponse';

const ACCOUNT_API_URL = '/pers_acc';

export interface IChangeUserInfoParams {
  region: string;
  entry: string;
  birth: string;
  family: string;
  skills: string;
  contacts: string;
  second_name: string;
}

export const userApi = {
  getUserInfo: () => axios.get<IUserInfoResponse>(ACCOUNT_API_URL),
  changeUserInfo: (params: IChangeUserInfoParams) => (
    axios.post<IUserInfoResponse>(ACCOUNT_API_URL, params)
  ),
};