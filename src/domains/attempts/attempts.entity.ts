import { Max } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Exam } from '../exams/exams.entity';

@Entity()
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  @Max(100)
  score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt: Date | null;

  @ManyToOne(() => Exam, (exam) => exam.attempts, { onDelete: 'CASCADE' })
  exam: Exam;

  @RelationId((attempt: Attempt) => attempt.exam)
  examId: string;

  @Column('uuid')
  userId: string;
}
