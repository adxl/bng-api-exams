import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateExamDto {
  @IsPositive()
  duration: number;

  @IsUUID()
  typeId: string;
}

export class UpdateExamDto {
  @IsPositive()
  @IsOptional()
  duration?: number;
}

export class UpdateExamDtoWrapper {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => UpdateExamDto)
  body: UpdateExamDto;
}
