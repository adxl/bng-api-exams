import { Max } from 'class-validator';
import { Exam } from 'src/domains/exams/exams.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Exam, (exam) => exam.attempts)
  exam: Exam;

  @Column('uuid')
  userId: string;
}
