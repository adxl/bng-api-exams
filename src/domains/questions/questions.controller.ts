import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateQuestionDto, UpdateQuestionDtoWrapper } from './questions.dto';
import { Question } from './questions.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { QuestionsService } from './questions.service';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @EventPattern('questions.findOne')
  findOne(id: string): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  @EventPattern('questions.create')
  create(data: CreateQuestionDto): Promise<InsertResult> {
    return this.questionsService.create(data);
  }

  @EventPattern('questions.update')
  update(data: UpdateQuestionDtoWrapper): Promise<UpdateResult> {
    return this.questionsService.update(data.id, data.body);
  }

  @EventPattern('questions.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.questionsService.remove(id);
  }
}
