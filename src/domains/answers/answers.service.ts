import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Answer } from '../answers/answers.entity';
import { QuestionsService } from '../questions/questions.service';
import { CreateAnswerDto, UpdateAnswerDto } from './answers.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>,
    @Inject(QuestionsService)
    private readonly questionService: QuestionsService,
  ) {}
  async findOne(id: string): Promise<Answer> {
    const data = await this.answersRepository.findOneBy({ id });
    if (!data) {
      throw new RpcException(new NotFoundException());
    }
    return data;
  }

  async create(data: CreateAnswerDto): Promise<InsertResult> {
    await this.questionService.findOne(data.question.id);
    return this.answersRepository.insert(data);
  }

  async update(id: string, data: UpdateAnswerDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.answersRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.answersRepository.delete(id);
  }
}
