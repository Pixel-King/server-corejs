export interface UserModel {
  id: string;
  email: string;
  password: string;
  role?: string;
  userName?: string;
  raiting?: string;
  passedTests?: string[];
}

export type UserModelToResponse = Omit<UserModel, 'password'>;
