import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsUUID, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';

export class CreateAttemptDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  exam: EntityReference;

  @IsUUID()
  userId: string;
}

export class CreateAttemptPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAttemptDto)
  body: CreateAttemptDto;
}

//---

class UserAnswer {
  @IsUUID()
  questionId: string;

  @IsUUID()
  answerId: string;
}

export class UpdateAttemptDto {
  @ValidateNested({ each: true })
  @Type(() => UserAnswer)
  userAnswers?: UserAnswer[];
}

export class UpdateAttemptPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateAttemptDto)
  body: UpdateAttemptDto;
}

// ---

export class ActiveAttemptByTypeDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  typeId: string;
}

export class ActiveAttemptPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ActiveAttemptByTypeDto)
  body: ActiveAttemptByTypeDto;
}
