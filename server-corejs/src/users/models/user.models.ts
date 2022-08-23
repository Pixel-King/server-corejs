export interface UserModel {
  id: string;
  email: string;
  password: string;
  role?: string;
  userName?: string;
}

export type UserModelToResponse = Omit<UserModel, 'password'>;
