import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/domains/answers/answers.entity';
import { QuestionsModule } from 'src/domains/questions/questions.module';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionsModule],
  providers: [AnswersService],
  controllers: [AnswersController],
})
export class AnswersModule {}
