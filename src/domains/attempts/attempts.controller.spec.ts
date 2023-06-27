import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ExamsModule } from '../exams/exams.module';
import { AttemptsController } from './attempts.controller';
import { Attempt } from './attempts.entity';
import { AttemptsModule } from './attempts.module';
import { AttemptsService } from './attempts.service';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests for attempts of exams', () => {
  let attemptsController: AttemptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Attempt]),
        AttemptsModule,
        ExamsModule,
      ],
      providers: [AttemptsService],
      controllers: [AttemptsController],
    }).compile();

    attemptsController = module.get(AttemptsController);
  });

  describe('Test find the active attempt by type for an user', () => {
    it('should return one attempt', async () => {
      const userId = 'c63a4bd1-cabd-44ee-b911-9ee2533dd003';
      const typeId = '33333333-bab3-439d-965d-0522568b0001';
      const attempt = await attemptsController.findActiveByType({ body: { userId, typeId } });
      expect(attempt.score).toBeGreaterThan(80);
    });
  });

  describe('Test create attempt', () => {
    it('should return an UUID', async () => {
      const body = {
        exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
        userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd017',
      };
      expect((await attemptsController.create({ body })).identifiers[0].id).toHaveLength(36);
    });

    it('should throws a conflict exception', async () => {
      const body = {
        exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
        userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd003',
      };
      await expect(attemptsController.create({ body })).rejects.toThrow();
    });
  });

  describe('Test update attempt - create & update', () => {
    it('should return the number of affected resources', async () => {
      const body = {
        exam: { id: '11111111-bab3-439d-965d-0522568b0000' },
        userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd024',
      };

      const attempt = await attemptsController.create({ body });

      const data = {
        id: attempt.identifiers[0].id,
        body: {
          userAnswers: [
            {
              questionId: '22222222-bab3-439d-965d-0522568b0000',
              answerId: '33333333-bab3-439d-965d-0522568b0001',
            },
            {
              questionId: '22222222-bab3-439d-965d-0522568b0001',
              answerId: '33333333-bab3-439d-965d-0522568b0003',
            },
            {
              questionId: '22222222-bab3-439d-965d-0522568b0002',
              answerId: '33333333-bab3-439d-965d-0522568b0007',
            },
          ],
        },
      };
      expect((await attemptsController.update(data)).affected).toEqual(1);
    });

    it('should throws a conflict exception', async () => {
      const data = {
        id: '44444444-bab3-439d-965d-0522568b0000',
        body: {
          userAnswers: [
            {
              questionId: '22222222-bab3-439d-965d-0522568b0000',
              answerId: '33333333-bab3-439d-965d-0522568b0001',
            },
            {
              questionId: '22222222-bab3-439d-965d-0522568b0001',
              answerId: '33333333-bab3-439d-965d-0522568b0003',
            },
            {
              questionId: '22222222-bab3-439d-965d-0522568b0002',
              answerId: '33333333-bab3-439d-965d-0522568b0007',
            },
          ],
        },
      };
      await expect(attemptsController.update(data)).rejects.toThrow();
    });
  });
});
