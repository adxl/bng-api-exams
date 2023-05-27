import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsController } from 'src/modules/exams/exams.controller';
import { Exams } from './exams.entity';
import { ExamsService } from './exams.service';
@Module({
  imports: [TypeOrmModule.forFeature([Exams])],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
