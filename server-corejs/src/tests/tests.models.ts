export interface TestsModel {
  id: string;
  name: string;
  topic: string;
  type: string;
}

export type UserModelToResponse = Omit<TestsModel, 'id'>;
