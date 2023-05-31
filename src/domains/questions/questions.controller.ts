import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  CreateQuestionDto,
  UpdateQuestionDtoWrapper,
} from 'src/domains/questions/questions.dto';
import { Question } from 'src/domains/questions/questions.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @EventPattern('findOne')
  async findOne(id: string): Promise<Question> {
    return await this.questionsService.findOne(id);
  }

  @EventPattern('create')
  create(data: CreateQuestionDto): Promise<InsertResult> {
    return this.questionsService.create(data);
  }

  @EventPattern('update')
  update(data: UpdateQuestionDtoWrapper): Promise<UpdateResult> {
    const { id, body } = data;
    return this.questionsService.update(id, body);
  }

  @EventPattern('remove')
  remove(id: string): Promise<DeleteResult> {
    return this.questionsService.remove(id);
  }
}
