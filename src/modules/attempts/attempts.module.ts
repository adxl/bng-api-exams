import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempts } from 'src/modules/attempts/attempts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempts])],
})
export class AttemptsModule {}
