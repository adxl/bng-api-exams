import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { RequestPayload } from '../../types';
import { UserRole } from '../../types/user-role';
import { CreateQuestionPayload, UpdateQuestionPayload } from './questions.dto';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @EventPattern('questions.findOne')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  findOne(@Payload() payload: RequestPayload): Promise<Question> {
    return this.questionsService.findOne(payload.id);
  }

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
