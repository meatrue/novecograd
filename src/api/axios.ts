import _axios from 'axios';

import { getBackendApiUrl } from '@/utils/common';

export const axios = _axios.create({
  baseURL: getBackendApiUrl(),
  withCredentials: true,
});