import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateExamsDto, UpdateExamsDto } from 'src/modules/exams/exams.dto';
import { Exams } from 'src/modules/exams/exams.entity';
import { ExamsService } from 'src/modules/exams/exams.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @EventPattern('findAll')
  async findAll(): Promise<Exams[]> {
    return await this.examsService.findAll();
  }

  @EventPattern('findOne')
  async findOne(id: string): Promise<Exams> {
    return await this.examsService.findOne(id);
  }

  @EventPattern('create')
  create(data: CreateExamsDto): Exams {
    return this.examsService.create(data);
  }

  @EventPattern('remove')
  async remove(id: string): Promise<DeleteResult> {
    return await this.examsService.remove(id);
  }

  @EventPattern('update')
  async update({
    id,
    body,
  }: {
    id: string;
    body: UpdateExamsDto;
  }): Promise<UpdateResult> {
    return await this.examsService.update(id, body);
  }
}
