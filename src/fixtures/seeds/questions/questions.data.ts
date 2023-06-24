import { DeepPartial } from 'typeorm';
import { Question } from '../../../domains/questions/questions.entity';

export const questions: DeepPartial<Question>[] = [
  /* VEHICLE TYPE : Hoverboard */
  {
    id: '22222222-bab3-439d-965d-0522568b0000',
    title: "Quelle est la bonne règle de sécurité à suivre lors de l'utilisation d'un hoverboard ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0000' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0001',
    title: 'Comment un hoverboard est-il contrôlé ?',
    exam: { id: '11111111-bab3-439d-965d-0522568b0000' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0002',
    title: 'Quelle fonctionnalité de sécurité avancée est intégrée dans un hoverboard ?',
    exam: { id: '11111111-bab3-439d-965d-0522568b0000' },
  },

  /* VEHICLE TYPE : Chaussures à propulsion */
  {
    id: '22222222-bab3-439d-965d-0522568b0003',
    title: 'Quelle est la hauteur maximale de saut atteignable avec les chaussures à propulsion ?',
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0004',
    title: "Quelle fonctionnalité de sécurité n'est pas intégrée aux chaussures à propulsion ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0005',
    title: "Quelle est l'autonomie moyenne des chaussures à propulsion ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0001' },
  },

  /* VEHICLE TYPE : Capsule pneumatique */
  {
    id: '22222222-bab3-439d-965d-0522568b0006',
    title: "Quelle fonctionnalité de confort n'est pas intégrée dans les capsules pneumatiques ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0007',
    title: 'Comment les capsules pneumatiques sont-elles guidées sur leur trajectoire ?',
    exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0008',
    title: 'Quelle vérification doit être effectuée en premier avant de monter dans une capsule pneumatique ?',
    exam: { id: '11111111-bab3-439d-965d-0522568b0002' },
  },

  /* VEHICLE TYPE : Exosquelette motorisé */
  {
    id: '22222222-bab3-439d-965d-0522568b0009',
    title: "Quelle est la principale fonction d'un exosquelette motorisé ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0003' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0010',
    title: "Comment contrôle-t-on la vitesse de déplacement d'un exosquelette motorisé ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0003' },
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0011',
    title: "Est-ce qu'un exosquelette motorisé peut être utilisé sur tous types de terrain ?",
    exam: { id: '11111111-bab3-439d-965d-0522568b0003' },
  },
];
