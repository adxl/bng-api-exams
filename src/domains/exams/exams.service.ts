import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, InsertResult, IsNull, MoreThanOrEqual, Not, Repository, UpdateResult } from 'typeorm';
import { UserRole } from '../../types/user-role';
import { CreateExamDto, UpdateExamDto } from './exams.dto';
import { Exam } from './exams.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examsRepository: Repository<Exam>,
  ) {}

  async findAll(role: UserRole, userId: string | null): Promise<Exam[]> {
    if (role === UserRole.USER) {
      const examsPassed = await this.examsRepository.find({
        join: {
          alias: 'exam',
          leftJoin: {
            attempts: 'exam.attempts',
          },
        },
        where: [
          {
            attempts: {
              userId,
              endedAt: Not(IsNull()),
              score: MoreThanOrEqual(80),
            },
          },
          {
            attempts: null,
          },
        ],
        relations: {
          questions: true,
          attempts: true,
        },
      });

      const examsIds = examsPassed.map((exam) => exam.id);

      const examsNotPassed = await this.examsRepository.find({
        where: {
          id: Not(In(examsIds)),
        },
        relations: {
          questions: true,
        },
      });

      return [...examsPassed, ...examsNotPassed];
    }
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

  async findOneByType(id: string): Promise<Exam> {
    return await this.examsRepository.findOne({
      where: {
        typeId: id,
      },
    });
  }

  async create(data: CreateExamDto): Promise<InsertResult> {
    if (await this.findOneByType(data.typeId))
      throw new RpcException(new ConflictException('exam already exists for this type'));
    return this.examsRepository.insert(data);
  }

  async update(id: string, data: UpdateExamDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.examsRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return this.examsRepository.delete(id);
  }
}
