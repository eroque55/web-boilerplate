export type TLoginPayload = {
  email: string;
  password: string;
};

export type TAuthTokens = {
  accessToken: string;
  refreshToken?: string;
};
