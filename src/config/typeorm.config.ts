import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Answer } from '../domains/answers/answers.entity';
import { Attempt } from '../domains/attempts/attempts.entity';
import { Exam } from '../domains/exams/exams.entity';
import { Question } from '../domains/questions/questions.entity';

const IS_LOCAL: boolean = process.env.STAGE === 'local' || process.env.STAGE === 'test';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Exam, Question, Attempt, Answer],
  synchronize: IS_LOCAL,
  ssl: !IS_LOCAL,
  extra: IS_LOCAL
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};
