import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InsertResult, UpdateResult } from 'typeorm';
import { ActiveAttemptPayload, CreateAttemptPayload, UpdateAttemptPayload } from './attempts.dto';
import { Attempt } from './attempts.entity';
import { AttemptsService } from './attempts.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @EventPattern('attempts.findActiveByType')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  findActiveByType(@Payload() payload: ActiveAttemptPayload): Promise<Attempt> {
    return this.attemptsService.findActiveByType(payload.body);
  }

  @EventPattern('attempts.create')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  create(@Payload() payload: CreateAttemptPayload): Promise<InsertResult> {
    return this.attemptsService.create(payload.body);
  }

  @EventPattern('attempts.update')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  update(@Payload() payload: UpdateAttemptPayload): Promise<UpdateResult> {
    return this.attemptsService.update(payload.id, payload.body);
  }
}
