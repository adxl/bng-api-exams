import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsUUID, ValidateNested } from 'class-validator';
import { EntityReference } from '../../types';

export class CreateAttemptDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  exam: EntityReference;

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

export class ActiveAttemptByTypeDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  typeId: string;
}
