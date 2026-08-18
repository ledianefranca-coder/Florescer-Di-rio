import { QuizQuestion } from '../types';

export const ARCHETYPE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Diante de um conflito inesperado ou tensão em um relacionamento próximo, qual é a sua reação mais natural?',
    subtitle: 'Observe a sua tendência primária de resposta emocional:',
    options: [
      {
        text: 'Assumo a liderança da conversa com clareza e firmeza para colocar ordem e definir os próximos passos.',
        archetypeId: 'rainha-soberana',
        scoreTrait: 'Autoridade & Direção',
      },
      {
        text: 'Recolho-me em silêncio para refletir, orar e entender o significado mais profundo por trás daquilo.',
        archetypeId: 'sabia-contemplativa',
        scoreTrait: 'Introspecção & Sabedoria',
      },
      {
        text: 'Busco acolher a dor da outra pessoa, tentando aliviar a tensão e restaurar o carinho rapidamente.',
        archetypeId: 'cuidadora-acolhedora',
        scoreTrait: 'Nutrição & Empatia',
      },
      {
        text: 'Analiso com prudência e bom senso, propondo uma solução prática que desmonte a crise sem brigas.',
        archetypeId: 'guardia-prudente',
        scoreTrait: 'Mediação & Prudência',
      },
    ],
  },
  {
    id: 2,
    question: 'Qual dessas frases mais ressoa com o anseio mais profundo da sua alma neste momento da sua vida?',
    subtitle: 'Aquilo que você busca construir com autenticidade:',
    options: [
      {
        text: 'Ter domínio próprio, dignidade e governar minha vida sem me deixar subjugar pelo medo ou pela opinião alheia.',
        archetypeId: 'rainha-soberana',
        scoreTrait: 'Soberania Emocional',
      },
      {
        text: 'Mergulhar nas verdades eternas de Deus, desenvolver discernimento espiritual e viver em paz interior.',
        archetypeId: 'sabia-contemplativa',
        scoreTrait: 'Discernimento & Verdade',
      },
      {
        text: 'Construir laços de amor genuíno, ser um porto seguro para minha família e servir com coração sincero.',
        archetypeId: 'cuidadora-acolhedora',
        scoreTrait: 'Amor & Acolhimento',
      },
      {
        text: 'Gerar novas oportunidades, superar estações difíceis e ver a manifestação da fertilidade e da fé.',
        archetypeId: 'criadora-renovadora',
        scoreTrait: 'Renovação & Fertilidade da Alma',
      },
    ],
  },
  {
    id: 3,
    question: 'Quando você se sente exausta e sobrecarregada, qual costuma ser a raiz inconsciente dessa exaustão?',
    subtitle: 'Identificando o ponto de sombra do seu comportamento:',
    options: [
      {
        text: 'Querer controlar todos os detalhes para garantir que nada dê errado e me frustrar quando os outros falham.',
        archetypeId: 'rainha-soberana',
        scoreTrait: 'Sombra do Controle',
      },
      {
        text: 'Pensar excessivamente em todas as possibilidades e esquecer de agir com leveza no mundo real.',
        archetypeId: 'sabia-contemplativa',
        scoreTrait: 'Sombra da Paralisia Mental',
      },
      {
        text: 'Não conseguir dizer "não", assumir os problemas de todo mundo e carregar culpas que não são minhas.',
        archetypeId: 'cuidadora-acolhedora',
        scoreTrait: 'Sombra da Salvadora',
      },
      {
        text: 'Querer lutar contra tudo o que parece injusto a ponto de viver em estado de alerta e combate constante.',
        archetypeId: 'guerreira-restauradora',
        scoreTrait: 'Sombra da Combatividade',
      },
    ],
  },
  {
    id: 4,
    question: 'Qual mulher bíblica você mais admira pela postura e virtude diante dos desafios?',
    subtitle: 'O modelo que inspira seu coração:',
    options: [
      {
        text: 'Ester e Débora: pela coragem régia, discernimento estratégico e liderança sob a direção de Deus.',
        archetypeId: 'rainha-soberana',
        scoreTrait: 'Liderança Consciente',
      },
      {
        text: 'Maria de Betânia: pela quietude de sentar-se aos pés de Jesus e discernir a melhor parte.',
        archetypeId: 'sabia-contemplativa',
        scoreTrait: 'Contemplação & Espiritualidade',
      },
      {
        text: 'Rute: pela lealdade afetuosa, generosidade e perseverança nos vínculos de amor.',
        archetypeId: 'cuidadora-acolhedora',
        scoreTrait: 'Fidelidade & Aliança',
      },
      {
        text: 'Abigail: pelo bom senso impecável que desarmou uma guerra com palavras sábias e ação rápida.',
        archetypeId: 'guardia-prudente',
        scoreTrait: 'Inteligência Estratégica',
      },
    ],
  },
  {
    id: 5,
    question: 'No seu processo de autorresponsabilidade, qual é o seu maior desafio atual?',
    subtitle: 'O passo de crescimento pessoal que você mais necessita dar:',
    options: [
      {
        text: 'Permitir-me ser vulnerável, soltar as rédeas do futuro e descansar na soberania de Deus.',
        archetypeId: 'rainha-soberana',
        scoreTrait: 'Rendição & Confiança',
      },
      {
        text: 'Tirar meus projetos e ideias da mente e colocá-los em prática com disciplina diária.',
        archetypeId: 'sabia-contemplativa',
        scoreTrait: 'Execução & Presença',
      },
      {
        text: 'Estabelecer limites claros com quem amo sem sentir culpa ou medo de abandono.',
        archetypeId: 'cuidadora-acolhedora',
        scoreTrait: 'Limites Saudáveis',
      },
      {
        text: 'Desenvolver doçura e mansidão, sem sentir que ser gentil é sinal de fraqueza.',
        archetypeId: 'guerreira-restauradora',
        scoreTrait: 'Mansidão com Firmeza',
      },
    ],
  },
  {
    id: 6,
    question: 'Como você prefere vivenciar seus momentos de espiritualidade e conexão com Deus?',
    subtitle: 'A atmosfera que mais restaura a sua alma:',
    options: [
      {
        text: 'Através de leituras reflexivas profundas, estudo das Escrituras e meditação no silêncio.',
        archetypeId: 'sabia-contemplativa',
        scoreTrait: 'Estudo & Meditação',
      },
      {
        text: 'Expressando gratidão, cantando, orando com paixão e profetizando vida nova sobre o deserto.',
        archetypeId: 'criadora-renovadora',
        scoreTrait: 'Celebração & Louvor',
      },
      {
        text: 'Servindo ao próximo, orando por pessoas queridas e cultivando um ambiente de paz acolhedora.',
        archetypeId: 'cuidadora-acolhedora',
        scoreTrait: 'Amor em Ação',
      },
      {
        text: 'Organizando minhas metas à luz da vontade de Deus, buscando discernimento para decisões chave.',
        archetypeId: 'guardia-prudente',
        scoreTrait: 'Planejamento com Deus',
      },
    ],
  },
];
