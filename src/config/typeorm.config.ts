import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Answers } from 'src/modules/answers/answers.entity';
import { Attempts } from 'src/modules/attempts/attempts.entity';
import { Exams } from 'src/modules/exams/exams.entity';
import { Questions } from 'src/modules/questions/questions.entity';

const IS_LOCAL: boolean = process.env.STAGE === 'local';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Exams, Questions, Attempts, Answers],
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
