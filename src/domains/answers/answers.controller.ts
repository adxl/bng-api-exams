import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateAnswerDto, UpdateAnswerDtoWrapper } from './answers.dto';
import { AnswersService } from './answers.service';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @EventPattern('answers.create')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  create(data: CreateAnswerDto): Promise<InsertResult> {
    return this.answersService.create(data);
  }

  @EventPattern('answers.update')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  update(data: UpdateAnswerDtoWrapper): Promise<UpdateResult> {
    return this.answersService.update(data.id, data.body);
  }

  @EventPattern('answers.remove')
  @UseGuards(new RolesGuard([UserRole.INSTRUCTOR]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.answersService.remove(id);
  }
}
