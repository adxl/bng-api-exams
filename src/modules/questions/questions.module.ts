import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from 'src/modules/questions/questions.entity';
import { QuestionsService } from './questions.service';

@Module({
  providers: [QuestionsService],
  imports: [TypeOrmModule.forFeature([Questions])],
})
export class QuestionsModule {}
