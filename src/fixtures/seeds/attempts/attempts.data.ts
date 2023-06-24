import { DeepPartial } from 'typeorm';
import { Attempt } from '../../../domains/attempts/attempts.entity';

export const attempts: DeepPartial<Attempt>[] = [
  /* USER 1  */
  {
    id: '44444444-bab3-439d-965d-0522568b0000',
    score: 99,
    exam: { id: '11111111-bab3-439d-965d-0522568b0000' }, //
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd003',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0001',
    score: 100,
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd003',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0002',
    score: 100,
    exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd003',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },

  /* USER 2 */
  {
    id: '44444444-bab3-439d-965d-0522568b0003',
    score: 100,
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd002',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },

  /* USER 3 */
  {
    id: '44444444-bab3-439d-965d-0522568b0004',
    score: 88,
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd003',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },

  /* USER 4 */
  {
    id: '44444444-bab3-439d-965d-0522568b0005',
    score: 94,
    exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd010',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0006',
    score: 68,
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd010',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0007',
    score: 55,
    exam: { id: '11111111-bab3-439d-965d-0522568b0000' },
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd010',
    endedAt: new Date('2020-01-01T00:00:00.000Z'),
  },
];
