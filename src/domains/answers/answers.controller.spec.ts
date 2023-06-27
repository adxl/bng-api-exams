import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.entity';
import { AnswersModule } from './answers.module';
import { AnswersService } from './answers.service';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests for answers of exams', () => {
  let answersController: AnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Answer]),
        AnswersModule,
        QuestionsModule,
      ],
      controllers: [AnswersController],
      providers: [AnswersService],
    }).compile();

    answersController = module.get(AnswersController);
  });

  describe('Test create answer', () => {
    it('should return an UUID', async () => {
      const body = {
        title: 'Par les mains',
        isCorrect: false,
        question: { id: '22222222-bab3-439d-965d-0522568b0001' },
      };
      expect((await answersController.create({ body })).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update answer', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '33333333-bab3-439d-965d-0522568b0011',
        body: {
          title: 'Réponse mise à jour',
        },
      };
      expect((await answersController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one answer', () => {
    it('should return the number of affected resources', async () => {
      const id = '33333333-bab3-439d-965d-0522568b0011';
      expect((await answersController.remove({ id })).affected).toEqual(1);
    });
  });
});
