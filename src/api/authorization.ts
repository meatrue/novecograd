import { axios } from './axios';

import { IAuthorizationResponse, IBaseResponse } from '@/interfaces/backendResponse';

interface AuthorizeProps {
  username: string;
  password: string;
}

interface UnAuthorizeProps {
  logoff: boolean;
}

export const authorizationApi = {
  authorize: (params: AuthorizeProps) => (
    axios.post<IAuthorizationResponse>('/login', params)
  ),
  unAuthorize: (params: UnAuthorizeProps) => (
    axios.post<IBaseResponse>('/login', params)
  ),
  getMe: () => (
    axios.get<IAuthorizationResponse>('/me')
  ),
};