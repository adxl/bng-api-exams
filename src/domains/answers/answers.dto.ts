import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EntityReference } from '../../types';

export class CreateAnswerDto {
  @IsString()
  title: string;

  @IsBoolean()
  isCorrect: boolean;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  question: EntityReference;
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
