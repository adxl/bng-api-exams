import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EntityReference } from '../../types';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  exam: EntityReference;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  title?: string;
}

export class UpdateQuestionDtoWrapper {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => UpdateQuestionDto)
  body: UpdateQuestionDto;
}
