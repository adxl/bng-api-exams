import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Answer } from 'src/domains/answers/answers.entity';
import { Attempt } from 'src/domains/attempts/attempts.entity';
import { Exam } from 'src/domains/exams/exams.entity';
import { Question } from 'src/domains/questions/questions.entity';
// get variable from .env file
require('dotenv').config();

console.log('HEEEEEEEEEE');
console.log(process.env.DATABASE_URL);

const IS_LOCAL: boolean = process.env.STAGE === 'local';

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
