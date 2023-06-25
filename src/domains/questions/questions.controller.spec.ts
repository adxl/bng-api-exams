import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ExamsModule } from '../exams/exams.module';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.entity';
import { QuestionsModule } from './questions.module';
import { QuestionsService } from './questions.service';

describe('Tests for questions of exams', () => {
  let questionsController: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Question]),
        QuestionsModule,
        ExamsModule,
      ],
      providers: [QuestionsService],
      controllers: [QuestionsController],
    }).compile();

    questionsController = module.get(QuestionsController);
  });

  describe('Test create question', () => {
    it('should return an UUID', async () => {
      const data = {
        title: 'Une capsule peut-elle être dirigé sans pilote ?',
        exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
      };
      expect((await questionsController.create(data)).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update question', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '22222222-bab3-439d-965d-0522568b0001',
        body: {
          title: 'Question mise à jour',
        },
      };
      expect((await questionsController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one question', () => {
    it('should return the number of affected resources', async () => {
      const data = '22222222-bab3-439d-965d-0522568b0007';
      expect((await questionsController.remove(data)).affected).toEqual(1);
    });
  });
});
