import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from 'src/modules/answers/answers.module';
import { AttemptsModule } from 'src/modules/attempts/attempts.module';
import { AttemptsService } from 'src/modules/attempts/attempts.service';
import { QuestionsModule } from 'src/modules/questions/questions.module';
import { QuestionsService } from 'src/modules/questions/questions.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { ExamsModule } from './modules/exams/exams.module';
import { ExamsService } from './modules/exams/exams.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TypeOrmModule.forFeature([
      ExamsModule,
      QuestionsModule,
      AnswersModule,
      AttemptsModule,
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ExamsService,
    AttemptsService,
    QuestionsService,
    AttemptsService,
  ],
})
export class AppModule {}
