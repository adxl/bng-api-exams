import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateExamsDto, UpdateExamsDto } from './exams.dto';
import { Exams } from './exams.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exams)
    private readonly examsRepository: Repository<Exams>,
  ) {}

  async findAll(): Promise<Exams[]> {
    return await this.examsRepository.find();
  }

  async findOne(id: string): Promise<Exams> {
    const data = await this.examsRepository.findOne({ where: { id: id } });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  create(data: CreateExamsDto): Exams {
    return this.examsRepository.create(data);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.examsRepository.delete(id);
  }

  async update(id: string, data: UpdateExamsDto): Promise<UpdateResult> {
    await this.findOne(id);
    return await this.examsRepository.update(id, data);
  }
}
