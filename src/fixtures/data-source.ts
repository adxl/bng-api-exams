import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Answer } from '../domains/answers/answers.entity';
import { Attempt } from '../domains/attempts/attempts.entity';
import { Exam } from '../domains/exams/exams.entity';
import { Question } from '../domains/questions/questions.entity';
import { MainSeeder } from './seeds/main.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Exam, Question, Attempt, Answer],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
