import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InsertResult, UpdateResult } from 'typeorm';
import { CreateAttemptDto, UpdateAttemptDtoWrapper } from './attempts.dto';
import { Attempt } from './attempts.entity';
import { AttemptsService } from './attempts.service';

@Controller()
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @EventPattern('attempts.findActiveByType')
  findActiveByType(userId: string, typeId: string): Promise<Attempt> {
    return this.attemptsService.findActiveByType(userId, typeId);
  }

  @EventPattern('attempts.findOne')
  findOne(id: string): Promise<Attempt> {
    return this.attemptsService.findOne(id);
  }

  @EventPattern('attempts.create')
  create(data: CreateAttemptDto): Promise<InsertResult> {
    return this.attemptsService.create(data);
  }

  @EventPattern('attempts.update')
  update(data: UpdateAttemptDtoWrapper): Promise<UpdateResult> {
    return this.attemptsService.update(data.id, data.body);
  }
}
