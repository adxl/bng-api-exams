import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateQuestionPayload, UpdateQuestionPayload } from './questions.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { QuestionsService } from './questions.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @EventPattern('questions.create')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  create(@Payload() payload: CreateQuestionPayload): Promise<InsertResult> {
    return this.questionsService.create(payload.body);
  }

  @EventPattern('questions.update')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  update(@Payload() payload: UpdateQuestionPayload): Promise<UpdateResult> {
    return this.questionsService.update(payload.id, payload.body);
  }

  @EventPattern('questions.remove')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.questionsService.remove(payload.id);
  }
}
