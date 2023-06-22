import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { AnswersModule } from './domains/answers/answers.module';
import { AttemptsModule } from './domains/attempts/attempts.module';
import { ExamsModule } from './domains/exams/exams.module';
import { QuestionsModule } from './domains/questions/questions.module';

import { bootstrap } from './main';

describe('Tests entrypoint', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([ExamsModule, QuestionsModule, AnswersModule, AttemptsModule]),
      ],
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    appController = module.get(AppController);
  });

  describe('Start the server', () => {
    it('it should start the server', () => {
      expect(bootstrap).toBeDefined();
    });
  });

  describe('Test call index', () => {
    it('should return an welcome string', () => {
      expect(appController.getIndex()).toEqual('Welcome to Exams API');
    });
  });

  describe('Test kill', () => {
    it('should return exception ServiceUnavailableException', () => {
      expect(() => appController.kill()).toThrow();
    });
  });
});
