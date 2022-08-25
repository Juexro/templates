import service from './service';

interface LoginRequest {
  name: string;
  password: string;
}

interface LoginResponse {
  refreshToken: string;
  token: string;
  name: string;
}

export function login(params: LoginRequest) {
  return service<LoginResponse>({
    method: 'GET',
    url: '/user/login',
    params
  });
}

export function getTokenByRefreshToken(refreshToken: string) {
  return service<LoginResponse>({
    method: 'GET',
    url: '/refreshToken',
    params: {
      refreshToken
    }
  });
}