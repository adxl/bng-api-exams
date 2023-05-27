import { Answers } from 'src/domains/answers/answers.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exams } from '../exams/exams.entity';
@Entity()
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne(() => Exams, (exam) => exam.questions)
  exam: Exams[];

  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];
}
