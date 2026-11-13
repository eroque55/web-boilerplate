export type TLoginUser = {
  id: number;
  documentId: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type TLoginResponse = {
  jwt: string;
  user: TLoginUser;
  refreshToken?: string;
};

export type TUser = {
  id: number;
  documentId: string;
  name: string;
  email?: string;
};
