import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { AnswersModule } from 'src/domains/answers/answers.module';
import { AttemptsModule } from 'src/domains/attempts/attempts.module';
import { QuestionsModule } from 'src/domains/questions/questions.module';
import { AppController } from './app.controller';
import { TypeOrmConfig } from './config/typeorm.config';
import { ExamsModule } from './domains/exams/exams.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ExamsModule,
    QuestionsModule,
    AnswersModule,
    AttemptsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
