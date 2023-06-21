import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, IsNull, MoreThanOrEqual, Not, Repository, UpdateResult } from 'typeorm';
import { ExamsService } from '../exams/exams.service';
import { CreateAttemptDto, UpdateAttemptDto } from './attempts.dto';
import { Attempt } from './attempts.entity';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt)
    private readonly attemptsRepository: Repository<Attempt>,
    @Inject(ExamsService) private readonly examsService: ExamsService,
  ) {}

  findActiveByType(userId: string, typeId: string): Promise<Attempt> {
    return this.attemptsRepository.findOne({
      where: {
        userId,
        exam: {
          typeId,
        },
        endedAt: Not(IsNull()),
        score: MoreThanOrEqual(80),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Attempt> {
    const data = await this.attemptsRepository.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      throw new RpcException(new NotFoundException("can't find attempt"));
    }
    return data;
  }

  async create(data: CreateAttemptDto): Promise<InsertResult> {
    const exam = await this.examsService.findOne(data.exam.id);

    if (await this.findActiveByType(data.userId, exam.typeId)) {
      throw new RpcException(new ConflictException('attempt already exists'));
    }

    //TODO: bng/feature/6

    return this.attemptsRepository.insert(data);
  }

  async update(id: string, data: UpdateAttemptDto): Promise<UpdateResult> {
    const { examId, endedAt } = await this.findOne(id);
    const exam = await this.examsService.findOne(examId);

    if (endedAt) throw new RpcException(new ConflictException('attempt already ended'));

    const score = exam.questions.filter((question) =>
      question.answers.find((answer) => {
        answer.isCorrect &&
          data.userAnswers.find((userAnswer) => userAnswer.questionId === question.id).answerId === answer.id;
      }),
    );

    const result = Math.floor(score.length / exam.questions.length) * 100;

    return this.attemptsRepository.update(id, {
      score: result,
      endedAt: new Date(),
    });
  }
}
