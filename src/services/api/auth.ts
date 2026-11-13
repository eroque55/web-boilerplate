/* eslint-disable require-await */
import { TLoginResponse, TUser } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

// import { api } from '../http';

// const BASE_URL = '/auth';

export const authService = {
  login: async (form: LoginForm): Promise<TLoginResponse> => {
    // const { data } = await api.post<TLoginResponse>(`${BASE_URL}/local`, form);
    // return data;

    return {
      jwt: 'mocked-jwt-token',
      refreshToken: 'mocked-refresh-token',
      user: {
        id: 1,
        documentId: 'mocked-document-id',
        email: form.email,
      },
    };
  },

  refreshAccessToken: async (
    _refreshToken: string,
  ): Promise<TLoginResponse> => {
    // const { data } = await api.post<TLoginResponse>(
    //   `${BASE_URL}/refresh-token`,
    //   { refreshToken: _refreshToken },
    // );
    // return data;

    return {
      jwt: 'mocked-jwt-token',
      refreshToken: 'mocked-refresh-token',
      user: {
        id: 1,
        documentId: 'mocked-document-id',
        email: 'mocked-email@example.com',
      },
    };
  },

  fetchUser: async (): Promise<TUser> => {
    // const { data } = await api.get<TUser>(`${BASE_URL}/me`);
    // return data;

    return {
      id: 1,
      documentId: 'mocked-document-id',
      name: 'Mocked User',
    };
  },
};
