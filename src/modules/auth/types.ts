export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      username: string;
      role: 'admin' | 'user';
    };
  };
};
