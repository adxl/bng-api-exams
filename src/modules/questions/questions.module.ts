import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from 'src/modules/questions/questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
})
export class QuestionsModule {}
