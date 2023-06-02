export type AuthRequest = {
  email: string;
  password: string;
};

export type Tokens = {
  access_token: string;
  expires_in: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  details: object;
};

export type Loading = {
  loading?: boolean;
  error?: object;
};
