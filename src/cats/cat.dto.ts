import { IsString, isInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;
  readonly age: number;
  @IsString()
  readonly breed: string;
}
