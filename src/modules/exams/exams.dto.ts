import { IsPositive } from 'class-validator';

export class CreateExamsDto {
  @IsPositive()
  duration: number;
}

export class UpdateExamsDto {
  @IsPositive()
  duration?: number;
}
