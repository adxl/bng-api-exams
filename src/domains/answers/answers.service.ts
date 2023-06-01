import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswerDto, UpdateAnswerDto } from 'src/domains/answers/answers.dto';
import { Answer } from 'src/domains/answers/answers.entity';
import { QuestionsService } from 'src/domains/questions/questions.service';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

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
    await this.questionService.findOne(data.questionId);
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
