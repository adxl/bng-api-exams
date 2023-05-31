import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InsertResult, UpdateResult } from 'typeorm';
import { CreateAttemptDto, UpdateAttemptDtoWrapper } from './attempts.dto';
import { Attempt } from './attempts.entity';
import { AttemptsService } from './attempts.service';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @EventPattern('findActiveByType')
  async findActiveByType(id: string): Promise<Attempt> {
    return await this.attemptsService.findActiveByType(id);
  }

  @EventPattern('findOne')
  async findOne(id: string): Promise<Attempt> {
    return await this.attemptsService.findOne(id);
  }

  @EventPattern('create')
  create(data: CreateAttemptDto): Promise<InsertResult> {
    return this.attemptsService.create(data);
  }

  @EventPattern('update')
  update(data: UpdateAttemptDtoWrapper): Promise<UpdateResult> {
    const { id, body } = data;
    return this.attemptsService.update(id, body);
  }
}
