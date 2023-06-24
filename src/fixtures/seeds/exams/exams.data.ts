import { DeepPartial } from 'typeorm';
import { Exam } from '../../../domains/exams/exams.entity';
export const exams: DeepPartial<Exam>[] = [
  {
    id: '11111111-bab3-439d-965d-0522568b0000',
    typeId: '33333333-bab3-439d-965d-0522568b0000', // Hoverboard
    duration: 90,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0001',
    typeId: '33333333-bab3-439d-965d-0522568b0001', // Chaussures à propulsion
    duration: 60,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0002',
    typeId: '33333333-bab3-439d-965d-0522568b0002', // Jetpack à fusion
    duration: 30,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0003',
    typeId: '33333333-bab3-439d-965d-0522568b0003', // Exosquelette motorisé
    duration: 10,
  },
];
