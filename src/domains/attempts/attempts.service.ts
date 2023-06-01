import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamsService } from 'src/domains/exams/exams.service';
import { InsertResult, IsNull, MoreThanOrEqual, Not, Repository, UpdateResult } from 'typeorm';
import { CreateAttemptDto, UpdateAttemptDto } from './attempts.dto';
import { Attempt } from './attempts.entity';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectRepository(Attempt)
    private readonly attemptsRepository: Repository<Attempt>,
    @Inject(ExamsService) private readonly examsService: ExamsService,
  ) {}

  findActiveByType(typeId: string): Promise<Attempt> {
    return this.attemptsRepository.findOne({
      where: {
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
    const data = await this.attemptsRepository.findOneBy({ id });

    if (!data) {
      throw new RpcException(new NotFoundException("can't find attempt"));
    }

    return data;
  }

  async create(data: CreateAttemptDto): Promise<InsertResult> {
    const exam = await this.examsService.findOne(data.examId);

    if (await this.findActiveByType(exam.typeId)) {
      throw new RpcException(new ConflictException('attempt already exists'));
    }

    //TODO: bng/feature/6

    return this.attemptsRepository.insert(data);
  }

  async update(id: string, data: UpdateAttemptDto): Promise<UpdateResult> {
    const { exam } = await this.findOne(id);

    // TODO: exams/feature/4

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
