import { ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateExamPayload, UpdateExamPayload } from './exams.dto';
import { Exam } from './exams.entity';
import { ExamsService } from './exams.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @EventPattern('exams.findAll')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  findAll(): Promise<Exam[]> {
    return this.examsService.findAll();
  }

  @EventPattern('exams.findOne')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR, UserRole.USER]), AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Payload() payload: RequestPayload): Promise<Exam> {
    return this.examsService.findOne(payload.id);
  }

  @EventPattern('exams.create')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  create(@Payload() payload: CreateExamPayload): Promise<InsertResult> {
    return this.examsService.create(payload.body);
  }

  @EventPattern('exams.update')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  update(@Payload() payload: UpdateExamPayload): Promise<UpdateResult> {
    return this.examsService.update(payload.id, payload.body);
  }

  @EventPattern('exams.remove')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.examsService.remove(payload.id);
  }
}
