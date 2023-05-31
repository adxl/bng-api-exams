import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  CreateExamDto,
  UpdateExamDtoWrapper,
} from 'src/domains/exams/exams.dto';
import { Exam } from 'src/domains/exams/exams.entity';
import { ExamsService } from 'src/domains/exams/exams.service';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @EventPattern('findAll')
  findAll(): Promise<Exam[]> {
    return this.examsService.findAll();
  }

  @EventPattern('findOne')
  async findOne(id: string): Promise<Exam> {
    return await this.examsService.findOne(id);
  }

  @EventPattern('create')
  create(data: CreateExamDto): Promise<InsertResult> {
    return this.examsService.create(data);
  }

  @EventPattern('update')
  update(data: UpdateExamDtoWrapper): Promise<UpdateResult> {
    const { id, body } = data;
    return this.examsService.update(id, body);
  }

  @EventPattern('remove')
  remove(id: string): Promise<DeleteResult> {
    return this.examsService.remove(id);
  }
}
