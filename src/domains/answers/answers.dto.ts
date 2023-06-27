import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';

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

export class CreateAnswerPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAnswerDto)
  body: CreateAnswerDto;
}

export class UpdateAnswerDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}

export class UpdateAnswerPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateAnswerDto)
  body: UpdateAnswerDto;
}
