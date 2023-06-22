import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.entity';
import { AnswersService } from './answers.service';

describe('Tests for answers of exams', () => {
  let answersController: AnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([Answer]), QuestionsModule],
      providers: [AnswersService],
      controllers: [AnswersController],
    }).compile();

    answersController = module.get(AnswersController);
  });

  describe('Test find one answer', () => {
    it('should return one answer', async () => {
      const answerTitle = 'Mouvements corporels';
      const answer = await answersController.findOne('33333333-bab3-439d-965d-0522568b0002');
      expect(answer.title).toEqual(answerTitle);
    });

    it('should throws a not found exception', async () => {
      await expect(answersController.findOne('33333333-bab3-439d-965d-1522568b0002')).rejects.toThrow();
    });
  });

  describe('Test create answer', () => {
    it('should return an UUID', async () => {
      const data = {
        title: 'Par les mains',
        isCorrect: false,
        question: { id: '22222222-bab3-439d-965d-0522568b0001' },
      };
      expect((await answersController.create(data)).identifiers[0].id).toHaveLength(36);
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
      const data = '33333333-bab3-439d-965d-0522568b0011';
      expect((await answersController.remove(data)).affected).toEqual(1);
    });
  });
});
