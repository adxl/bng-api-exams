import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsController } from '../exams/exams.controller';
import { Exam } from './exams.entity';
import { ExamsService } from './exams.service';
import { AuthGuard } from '../../auth.guard';
import { AUTH_SERVICE } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  controllers: [ExamsController],
  providers: [ExamsService, AuthGuard, AUTH_SERVICE],
  exports: [ExamsService, AuthGuard, AUTH_SERVICE],
})
export class ExamsModule {}
