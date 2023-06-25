import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from '../answers/answers.module';
import { Attempt } from '../attempts/attempts.entity';
import { ExamsModule } from '../exams/exams.module';
import { QuestionsModule } from '../questions/questions.module';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { AuthGuard } from '../../auth.guard';
import { AUTH_SERVICE } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt]), AnswersModule, QuestionsModule, ExamsModule],
  controllers: [AttemptsController],
  providers: [AttemptsService, AuthGuard, AUTH_SERVICE],
  exports: [AttemptsService, AuthGuard, AUTH_SERVICE],
})
export class AttemptsModule {}
