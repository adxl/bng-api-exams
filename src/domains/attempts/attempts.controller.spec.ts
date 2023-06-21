import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ExamsModule } from '../exams/exams.module';
import { AttemptsController } from './attempts.controller';
import { Attempt } from './attempts.entity';
import { AttemptsService } from './attempts.service';

describe('Tests for attempts of exams', () => {
  let attemptsController: AttemptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([Attempt]), ExamsModule],
      providers: [AttemptsService],
      controllers: [AttemptsController],
    }).compile();

    attemptsController = module.get(AttemptsController);
  });

  describe('Test find the active attempt by type for an user', () => {
    it('should return one attempt', async () => {
      const userId = 'c63a4bd1-cabd-44ee-b911-9ee2533dd014';
      const typeId = '33333333-bab3-439d-965d-0522568b0000';
      const attempt = await attemptsController.findActiveByType(userId, typeId);
      expect(attempt.score).toBeGreaterThan(80);
    });
  });

  describe('Test find one attempt', () => {
    it('should return one attempt', async () => {
      const attempt = await attemptsController.findOne('44444444-bab3-439d-965d-0522568b0003');
      expect(attempt.score).toEqual(100);
    });
  });

  describe('Test create attempt', () => {
    it('should return an UUID', async () => {
      const data = {
        exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
        userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd017',
      };
      expect((await attemptsController.create(data)).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update attempt - create & update', () => {
    it('should return the number of affected resources', async () => {
      const newAttempt = {
        exam: { id: '11111111-bab3-439d-965d-0522568b0000' },
        userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd024',
      };

      const attempt = await attemptsController.create(newAttempt);

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
  });
});
