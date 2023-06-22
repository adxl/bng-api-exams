import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateAnswerDto, UpdateAnswerDtoWrapper } from './answers.dto';
import { Answer } from './answers.entity';
import { AnswersService } from './answers.service';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @EventPattern('answers.findOne')
  findOne(id: string): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @EventPattern('answers.create')
  create(data: CreateAnswerDto): Promise<InsertResult> {
    return this.answersService.create(data);
  }

  @EventPattern('answers.update')
  update(data: UpdateAnswerDtoWrapper): Promise<UpdateResult> {
    return this.answersService.update(data.id, data.body);
  }

  @EventPattern('answers.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.answersService.remove(id);
  }
}
