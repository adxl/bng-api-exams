import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.entity';
import { AnswersService } from './answers.service';
import { AuthGuard } from '../../auth.guard';
import { AUTH_SERVICE } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService, AuthGuard, AUTH_SERVICE],
  exports: [AnswersService, AuthGuard, AUTH_SERVICE],
})
export class AnswersModule {}
