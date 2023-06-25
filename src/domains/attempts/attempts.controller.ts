import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InsertResult, UpdateResult } from 'typeorm';
import { ActiveAttemptByTypeDto, CreateAttemptDto, UpdateAttemptDtoWrapper } from './attempts.dto';
import { Attempt } from './attempts.entity';
import { AttemptsService } from './attempts.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @EventPattern('attempts.findActiveByType')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  findActiveByType(data: ActiveAttemptByTypeDto): Promise<Attempt> {
    return this.attemptsService.findActiveByType(data);
  }

  @EventPattern('attempts.create')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  create(data: CreateAttemptDto): Promise<InsertResult> {
    return this.attemptsService.create(data);
  }

  @EventPattern('attempts.update')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  update(data: UpdateAttemptDtoWrapper): Promise<UpdateResult> {
    return this.attemptsService.update(data.id, data.body);
  }
}
