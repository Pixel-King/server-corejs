import { IsNotEmpty, IsString } from 'class-validator';

export class updatePasedTest {
  @IsNotEmpty()
  @IsString()
  public rating: string;

  @IsNotEmpty()
  @IsString()
  public date: string;

  @IsNotEmpty()
  @IsString()
  public testId: string;
}
