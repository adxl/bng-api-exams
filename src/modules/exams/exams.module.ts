import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exams } from './exams.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Exams])],
})
export class ExamsModule {}
