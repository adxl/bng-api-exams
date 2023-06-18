import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Question } from '../../../domains/questions/questions.entity';
import { questions } from './questions.data';

export class QuestionsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Question).insert([...questions]);
  }
}
