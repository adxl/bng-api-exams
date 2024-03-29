import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { ExamsService } from '../exams/exams.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../questions/questions.dto';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @Inject(ExamsService) private readonly examsService: ExamsService,
  ) {}

  async findOne(id: string): Promise<Question> {
    const data = await this.questionsRepository.findOne({
      where: {
        id,
      },
      relations: {
        answers: true,
      },
    });

    if (!data) {
      throw new RpcException(new NotFoundException());
    }

    return data;
  }

  async create(data: CreateQuestionDto): Promise<InsertResult> {
    await this.examsService.findOne(data.exam.id);
    return this.questionsRepository.insert(data);
  }

  async update(id: string, data: UpdateQuestionDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.questionsRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return this.questionsRepository.delete(id);
  }
}
