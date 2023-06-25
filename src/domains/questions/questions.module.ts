import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsModule } from '../exams/exams.module';
import { Question } from '../questions/questions.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { AuthGuard } from '../../auth.guard';
import { AUTH_SERVICE } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), ExamsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, AuthGuard, AUTH_SERVICE],
  exports: [QuestionsService, AuthGuard, AUTH_SERVICE],
})
export class QuestionsModule {}
