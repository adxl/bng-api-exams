import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  exam: EntityReference;
}

export class CreateQuestionPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateQuestionDto)
  body: CreateQuestionDto;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  title?: string;
}

export class UpdateQuestionPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateQuestionDto)
  body: UpdateQuestionDto;
}
