import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ExamsController } from './exams.controller';
import { Exam } from './exams.entity';
import { ExamsService } from './exams.service';

describe('Tests for exams', () => {
  let examsController: ExamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Exam]), //
      ],
      providers: [ExamsService],
      controllers: [ExamsController],
    }).compile();

    examsController = module.get(ExamsController);
  });

  describe('Test find all exams', () => {
    it('should return an array of exams', async () => {
      expect(await examsController.findAll()).toHaveLength(4);
    });
  });

  describe('Test find one exam', () => {
    it('should return one exam', async () => {
      const exam = await examsController.findOne('11111111-bab3-439d-965d-0522568b0001');
      expect(exam.typeId).toEqual('33333333-bab3-439d-965d-0522568b0001');
    });
  });

  describe('Test create exam', () => {
    it('should return an UUID', async () => {
      const data = {
        duration: 3600,
        typeId: '33333333-bab3-439d-965d-0522568b0005',
      };
      expect((await examsController.create(data)).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update exams', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '11111111-bab3-439d-965d-0522568b0001',
        body: {
          duration: 6000,
        },
      };
      expect((await examsController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one exam', () => {
    it('should return the number of affected resources', async () => {
      const data = '11111111-bab3-439d-965d-0522568b0001';
      expect((await examsController.remove(data)).affected).toEqual(1);
    });
  });
});
