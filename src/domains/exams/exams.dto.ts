import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { RequestPayload } from '../../types';

export class CreateExamDto {
  @IsPositive()
  duration: number;

  @IsUUID()
  typeId: string;
}

export class CreateExamPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateExamDto)
  body: CreateExamDto;
}

// ---

export class UpdateExamDto {
  @IsPositive()
  @IsOptional()
  duration?: number;
}

export class UpdateExamPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateExamDto)
  body: UpdateExamDto;
}
