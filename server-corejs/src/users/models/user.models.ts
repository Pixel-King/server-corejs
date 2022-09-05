export interface UserModel {
  id: string;
  email: string;
  password: string;
  role?: string;
  userName?: string;
  rating?: string;
  passedTests?: { date: string; testId: string }[];
  readedArticle?: { date: string; articleId: string }[];
}

export type UserModelToResponse = Omit<UserModel, 'password'>;
