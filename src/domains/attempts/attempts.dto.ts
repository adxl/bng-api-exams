import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';

export class CreateAttemptDto {
  @IsUUID()
  examId: string;

  @IsUUID()
  userId: string;
}

export class UpdateAttemptDto {
  @ValidateNested({ each: true })
  @Type(() => UserAnswer) // validate type of each element in array
  userAnswers?: UserAnswer[];
}

class UserAnswer {
  @IsUUID()
  questionId: string;
  @IsUUID()
  answerId: string;
}

export class UpdateAttemptDtoWrapper {
  @IsUUID()
  id: string;

  @ValidateNested()
  @Type(() => UpdateAttemptDto)
  body: UpdateAttemptDto;
}
