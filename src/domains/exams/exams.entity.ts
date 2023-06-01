import { Attempt } from 'src/domains/attempts/attempts.entity';
import { Question } from 'src/domains/questions/questions.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unsigned: true })
  duration: number;

  @Column({ unique: true, type: 'uuid' })
  typeId: string;

  @OneToMany(() => Question, (question) => question.exam, { cascade: true })
  questions: Question[];

  @OneToMany(() => Attempt, (attempt) => attempt.exam, { cascade: true })
  attempts: Attempt[];
}
