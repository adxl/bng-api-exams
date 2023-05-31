import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateExamDto, UpdateExamDto } from './exams.dto';
import { Exam } from './exams.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examsRepository: Repository<Exam>,
  ) {}

  findAll(): Promise<Exam[]> {
    return this.examsRepository.find({
      relations: {
        questions: {
          answers: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Exam> {
    const data = await this.examsRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: {
          answers: true,
        },
      },
    });

    if (!data) {
      throw new RpcException(new NotFoundException());
    }

    return data;
  }

  create(data: CreateExamDto): Promise<InsertResult> {
    return this.examsRepository.insert(data);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return this.examsRepository.delete(id);
  }

  async update(id: string, data: UpdateExamDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.examsRepository.update(id, data);
  }
}
