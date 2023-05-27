import { Attempts } from 'src/modules/attempts/attempts.entity';
import { Questions } from 'src/modules/questions/questions.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exams {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unsigned: true })
  duration: number;

  @OneToMany(() => Questions, (question) => question.exam, { cascade: true })
  questions: Questions[];

  @OneToMany(() => Attempts, (attempt) => attempt.exam, { cascade: true })
  attempts: Attempts[];
}
