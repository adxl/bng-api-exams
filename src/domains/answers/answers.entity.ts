import { Questions } from 'src/domains/questions/questions.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Questions, (question) => question.answers)
  question: Questions[];
}
