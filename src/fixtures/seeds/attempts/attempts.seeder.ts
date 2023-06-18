import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Attempt } from '../../../domains/attempts/attempts.entity';
import { attempts } from './attempts.data';

export class AttemptsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Attempt).insert([...attempts]);
  }
}
