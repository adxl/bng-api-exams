import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsUUID()
  examId: string;
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
