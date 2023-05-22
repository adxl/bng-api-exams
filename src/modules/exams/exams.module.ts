import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsService } from 'src/modules/exams/exams.service';
import { ExamsController } from './exams.controller';
import { Exams } from './exams.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Exams])],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
