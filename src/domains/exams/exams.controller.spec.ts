import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ExamsController } from './exams.controller';
import { Exam } from './exams.entity';
import { ExamsModule } from './exams.module';
import { ExamsService } from './exams.service';

describe('Tests for exams', () => {
  let examsController: ExamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([Exam]), ExamsModule],
      providers: [ExamsService],
      controllers: [ExamsController],
    }).compile();

    examsController = module.get(ExamsController);
  });

  describe('Test find all exams', () => {
    it('should return an array of exams', async () => {
      const exams = await examsController.findAll();
      expect(Array.isArray(exams)).toBe(true);
    });
  });

  describe('Test find one exam', () => {
    it('should return one exam', async () => {
      const exam = await examsController.findOne('11111111-bab3-439d-965d-0522568b0001');
      expect(exam.typeId).toEqual('33333333-bab3-439d-965d-0522568b0001');
    });

    it('should throws a not found exception', async () => {
      await expect(examsController.findOne('11111111-bab3-439d-965d-0522568bd001')).rejects.toThrow();
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

    it('should throws a conflict exception', async () => {
      const data = {
        duration: 3600,
        typeId: '33333333-bab3-439d-965d-0522568b0005',
      };
      await expect(examsController.create(data)).rejects.toThrow();
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
      const data = '11111111-bab3-439d-965d-0522568b0003';
      expect((await examsController.remove(data)).affected).toEqual(1);
    });
  });
});
