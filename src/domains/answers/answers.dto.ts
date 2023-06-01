import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  title: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsUUID()
  questionId: string;
}

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}

export class UpdateAnswerDtoWrapper {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => UpdateAnswerDto)
  body: UpdateAnswerDto;
}
