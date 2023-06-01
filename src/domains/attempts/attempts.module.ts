import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from 'src/domains/answers/answers.module';
import { Attempt } from 'src/domains/attempts/attempts.entity';
import { ExamsModule } from 'src/domains/exams/exams.module';
import { QuestionsModule } from 'src/domains/questions/questions.module';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attempt]),
    AnswersModule,
    QuestionsModule,
    ExamsModule,
  ],
  providers: [AttemptsService],
  controllers: [AttemptsController],
})
export class AttemptsModule {}
