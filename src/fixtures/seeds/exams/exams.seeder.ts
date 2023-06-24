import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Exam } from '../../../domains/exams/exams.entity';
import { exams } from './exams.data';

export class ExamsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Exam).insert([...exams]);
  }
}
