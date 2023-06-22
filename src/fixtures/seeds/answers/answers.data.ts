import { DeepPartial } from 'typeorm';
import { Answer } from '../../../domains/answers/answers.entity';

const answersHoverBoard = [
  /* QUESTION : Quelle est la bonne règle de sécurité à suivre lors de l'utilisation d'un hoverboard? */
  {
    id: '33333333-bab3-439d-965d-0522568b0000',
    title: 'Ne pas utiliser l’appareil sur la voie publique',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0000' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0001',
    title: 'Utiliser l’appareil sur la voie publique',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0000' },
  },

  /* QUESTION : Comment un hoverboard est-il contrôlé ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0002',
    title: 'Mouvements corporels',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0001' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0003',
    title: 'Commandes vocales',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0001' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0004',
    title: 'Télécommande',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0001' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0005',
    title: 'Puce électronique implantée',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0001' },
  },

  /* QUESTION : Quelle fonctionnalité de sécurité avancée est intégrée dans un hoverboard ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0006',
    title: 'Système anti-collision holographique',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0002' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0007',
    title: 'Générateur de champ de force',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0002' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0008',
    title: 'Réparation automatique en cas de dommage',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0002' },
  },
];

const answersChassuresAPropulsion = [
  /* QUESTION: Quelle est la hauteur maximale de saut atteignable avec les chaussures à propulsion du futur ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0009',
    title: 'Illimitée',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0003' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0010',
    title: '5 mètre',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0003' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0011',
    title: '10 mètres',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0003' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0012',
    title: '30 mètres',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0003' },
  },

  /* QUESTION : Quelle fonctionnalité de sécurité n'est pas intégrée aux chaussures à propulsion ?*/
  {
    id: '33333333-bab3-439d-965d-0522568b0013',
    title: 'Caméra de recul',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0004' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0014',
    title: 'Boucliers de protection énergétiques',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0004' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0015',
    title: 'Capteurs anti-chute',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0004' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0016',
    title: 'Dispositif de freinage magnétique',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0004' },
  },

  /* QUESTION :  Quelle est l'autonomie moyenne des chaussures à propulsion ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0017',
    title: '24 heures',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0005' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0018',
    title: '10 heures',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0005' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0019',
    title: '4 heures',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0005' },
  },
];

const answersCapsulePneumatique = [
  /* QUESTION : Quelle fonctionnalité de confort n'est pas intégrée dans les capsules pneumatiques ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0020',
    title: 'Système de divertissement holographique',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0006' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0021',
    title: 'Contrôle climatique individuel',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0006' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0022',
    title: 'Siège massant',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0006' },
  },

  /* QUESTION : Comment les capsules pneumatiques sont-elles guidées sur leur trajectoire ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0023',
    title: 'Navigation GPS avancée',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0007' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0024',
    title: 'Système de guidage par laser',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0007' },
  },

  /* QUESTION : Quelle vérification doit être effectuée en premier avant de monter dans une capsule pneumatique ?*/

  {
    id: '33333333-bab3-439d-965d-0522568b0025',
    title: "Vérifier l'intégrité des parois de la capsule",
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0008' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0026',
    title: 'Vérifier la disponibilité des sièges massants',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0008' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0027',
    title: "Vérifier le système d'évacuation d'urgence en cas d'incident",
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0008' },
  },
];

const answersExosqueletteMotorise = [
  /* QUESTION : Quelle est la principale fonction d'un exosquelette motorisé ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0028',
    title: "Améliorer la force et l'endurance humaines",
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0009' },
  },

  {
    id: '33333333-bab3-439d-965d-0522568b0029',
    title: 'Assurer une protection contre les chocs',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0009' },
  },

  {
    id: '33333333-bab3-439d-965d-0522568b0030',
    title: 'Fournir une assistance auditive',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0009' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0031',
    title: 'Contrôler des drones à distance',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0009' },
  },

  /* QUESTION : Comment contrôle-t-on la vitesse de déplacement d'un exosquelette motorisé  ?  */
  {
    id: '33333333-bab3-439d-965d-0522568b0032',
    title: 'Capteurs de mouvement',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0010' },
  },

  {
    id: '33333333-bab3-439d-965d-0522568b0033',
    title: 'Télécommande sans fil',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0010' },
  },

  /* QUESTION : Est-ce qu'un exosquelette motorisé peut être utilisé sur tous types de terrain ? */
  {
    id: '33333333-bab3-439d-965d-0522568b0034',
    title: 'Oui',
    isCorrect: true,
    question: { id: '22222222-bab3-439d-965d-0522568b0011' },
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0035',
    title: 'Non',
    isCorrect: false,
    question: { id: '22222222-bab3-439d-965d-0522568b0011' },
  },
];

export const answers: DeepPartial<Answer>[] = [
  ...answersHoverBoard,
  ...answersChassuresAPropulsion,
  ...answersCapsulePneumatique,
  ...answersExosqueletteMotorise,
];
