import { TUser } from '@/types/user';

import api from './api';

export const userService = {
  me: async (): Promise<TUser> => {
    const { data } = await api.get<TUser>('users/me');
    return data;
  },
};
