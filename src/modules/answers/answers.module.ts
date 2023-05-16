import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from 'src/modules/answers/answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answers])],
})
export class AnswersModule {}
