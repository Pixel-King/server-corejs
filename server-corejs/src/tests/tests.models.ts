export interface TestsModel {
  id: string;
  name: string;
  type: string;
}

export type UserModelToResponse = Omit<TestsModel, 'id'>;
