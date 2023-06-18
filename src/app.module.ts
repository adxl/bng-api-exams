import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { AnswersModule } from './domains/answers/answers.module';
import { AttemptsModule } from './domains/attempts/attempts.module';
import { ExamsModule } from './domains/exams/exams.module';
import { QuestionsModule } from './domains/questions/questions.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), ExamsModule, QuestionsModule, AnswersModule, AttemptsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
