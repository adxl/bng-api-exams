import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ExamsModule } from '../exams/exams.module';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.entity';
import { QuestionsModule } from './questions.module';
import { QuestionsService } from './questions.service';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests for questions of exams', () => {
  let questionsController: QuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
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
      const body = {
        title: 'Une capsule peut-elle être dirigé sans pilote ?',
        exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
      };
      expect((await questionsController.create({ body })).identifiers[0].id).toHaveLength(36);
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
      const id = '22222222-bab3-439d-965d-0522568b0007';
      expect((await questionsController.remove({ id })).affected).toEqual(1);
    });
  });
});
