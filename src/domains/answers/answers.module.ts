import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.entity';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionsModule],
  providers: [AnswersService],
  controllers: [AnswersController],
})
export class AnswersModule {}
