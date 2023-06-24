import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Answer } from '../../../domains/answers/answers.entity';
import { answers } from './answers.data';

export class AnswersSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Answer).insert([...answers]);
  }
}
