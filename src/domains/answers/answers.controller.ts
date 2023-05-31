import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  CreateAnswerDto,
  UpdateAnswerDtoWrapper,
} from 'src/domains/answers/answers.dto';
import { Answer } from 'src/domains/answers/answers.entity';
import { AnswersService } from 'src/domains/answers/answers.service';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @EventPattern('findOne')
  async findOne(id: string): Promise<Answer> {
    return await this.answersService.findOne(id);
  }

  @EventPattern('create')
  create(data: CreateAnswerDto): Promise<InsertResult> {
    return this.answersService.create(data);
  }

  @EventPattern('remove')
  remove(id: string): Promise<DeleteResult> {
    return this.answersService.remove(id);
  }

  @EventPattern('update')
  update(data: UpdateAnswerDtoWrapper): Promise<UpdateResult> {
    const { id, body } = data;
    return this.answersService.update(id, body);
  }
}
