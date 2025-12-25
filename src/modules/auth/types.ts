export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: Pick<User, 'id' | 'email' | 'username' | 'role'>;
  };
};

export type User = {
  username: string;
  email: string;
  phone?: string;
  id: number;
  created_at: string;
  updated_at: string;
  role: 'admin' | 'user';
};

export type GetMeResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
};
