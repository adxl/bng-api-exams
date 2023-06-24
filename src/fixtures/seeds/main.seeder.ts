import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import { AnswersSeeder } from './answers/answers.seeder';
import { AttemptsSeeder } from './attempts/attempts.seeder';
import { ExamsSeeder } from './exams/exams.seeder';
import { QuestionsSeeder } from './questions/questions.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.synchronize(true);

    await runSeeder(dataSource, ExamsSeeder);
    await runSeeder(dataSource, QuestionsSeeder);
    await runSeeder(dataSource, AnswersSeeder);
    await runSeeder(dataSource, AttemptsSeeder);
  }
}
