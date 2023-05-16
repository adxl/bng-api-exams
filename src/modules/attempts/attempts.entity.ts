import { Max } from 'class-validator';
import { Exams } from 'src/modules/exams/exams.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attempts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unsigned: true })
  @Max(100)
  score: number;

  @Column({ type: 'datetime', default: () => 'NOW' })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  endedAt: Date;

  @ManyToOne(() => Exams, (exam) => exam.attempts)
  exam: Exams[];

  @Column('uuid')
  userId: string;
}
