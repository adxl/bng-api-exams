import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateExamDto, UpdateExamDtoWrapper } from './exams.dto';
import { Exam } from './exams.entity';
import { ExamsService } from './exams.service';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @EventPattern('exams.findAll')
  findAll(): Promise<Exam[]> {
    return this.examsService.findAll();
  }

  @EventPattern('exams.findOne')
  findOne(id: string): Promise<Exam> {
    return this.examsService.findOne(id);
  }

  @EventPattern('exams.create')
  create(data: CreateExamDto): Promise<InsertResult> {
    return this.examsService.create(data);
  }

  @EventPattern('exams.update')
  update(data: UpdateExamDtoWrapper): Promise<UpdateResult> {
    return this.examsService.update(data.id, data.body);
  }

  @EventPattern('exams.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.examsService.remove(id);
  }
}
