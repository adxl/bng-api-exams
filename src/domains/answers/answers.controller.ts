import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { AnswersService } from './answers.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { CreateAnswerPayload, UpdateAnswerPayload } from './answers.dto';
import { RequestPayload } from 'src/types';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @EventPattern('answers.create')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  create(@Payload() payload: CreateAnswerPayload): Promise<InsertResult> {
    return this.answersService.create(payload.body);
  }

  @EventPattern('answers.update')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  update(@Payload() payload: UpdateAnswerPayload): Promise<UpdateResult> {
    return this.answersService.update(payload.id, payload.body);
  }

  @EventPattern('answers.remove')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.answersService.remove(payload.id);
  }
}
