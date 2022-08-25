import axios from 'axios';
import userStore from '@/stores/user';
import { customHistory } from '@/routes/RootRouter';
import { getTokenByRefreshToken } from './user';
import { message } from 'antd';

const service = axios.create({
  baseURL: '/api',
  withCredentials: true
});

service.interceptors.request.use(
  config => {
    if (userStore.info?.token) {
      config.headers.Authorization = `Bearer ${userStore.info.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => response.data.data,
  async error => {
    if (error.response.status === 401) {
      if (userStore.info?.refreshToken) {
        try {
          const { token, refreshToken } = await getTokenByRefreshToken(userStore.info.refreshToken);
          userStore.setInfo({
            token,
            refreshToken,
          });
          const next = await service(error.response.config);
          return next;
        } catch {
          userStore.setInfo(null);
          customHistory.push('/login');
        }
      } else {
        userStore.setInfo(null);
        customHistory.push('/login');
      }
    }
    message.error(error.response.data.message)
    return Promise.reject(error);
  },
);

export default service;