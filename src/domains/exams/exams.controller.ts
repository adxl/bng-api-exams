import { ClassSerializerInterceptor, Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateExamDto, UpdateExamDtoWrapper } from './exams.dto';
import { Exam } from './exams.entity';
import { ExamsService } from './exams.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';

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
  findOne(id: string): Promise<Exam> {
    return this.examsService.findOne(id);
  }

  @EventPattern('exams.create')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  create(data: CreateExamDto): Promise<InsertResult> {
    return this.examsService.create(data);
  }

  @EventPattern('exams.update')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  update(data: UpdateExamDtoWrapper): Promise<UpdateResult> {
    return this.examsService.update(data.id, data.body);
  }

  @EventPattern('exams.remove')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.examsService.remove(id);
  }
}
