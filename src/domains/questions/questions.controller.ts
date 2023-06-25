import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateQuestionDto, UpdateQuestionDtoWrapper } from './questions.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { QuestionsService } from './questions.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @EventPattern('questions.create')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  create(data: CreateQuestionDto): Promise<InsertResult> {
    return this.questionsService.create(data);
  }

  @EventPattern('questions.update')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  update(data: UpdateQuestionDtoWrapper): Promise<UpdateResult> {
    return this.questionsService.update(data.id, data.body);
  }

  @EventPattern('questions.remove')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.questionsService.remove(id);
  }
}
