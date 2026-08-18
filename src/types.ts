export type ActiveTab =
  | 'home'
  | 'meadow-flowers'
  | 'identity-worth'
  | 'letters-studio'
  | 'mentor'
  | 'reflection-lab'
  | 'relationships'
  | 'archetypes'
  | 'journal'
  | 'sanctuary';

export interface AraVerse {
  id: string;
  reference: string; // e.g. "Provérbios 4:23"
  text: string;
  theme: string;
  jungianReflection: string;
  selfResponsibilityPrompt: string;
  practicalAction: string;
}

export interface MeadowFlowerReflection {
  id: string;
  flowerName: string;
  botanicalName: string;
  imageUrl: string;
  colorTone: string;
  theme: 'autoestima' | 'identidade' | 'merecimento' | 'rejeicao' | 'abandono' | 'valor-proprio' | 'ser-vista' | 'paz' | 'pertencimento' | 'crianca-interior' | 'perdao' | 'auto-perdao' | 'forca-interna' | 'dependencia-emocional';
  themeLabel: string;
  metaphor: string;
  biblicalVerse: {
    reference: string;
    text: string;
    teaching: string;
  };
  jungianDepth: string;
  selfResponsibilityKey: string;
  dailyAffirmation: string;
  practicalExercise: string;
}

export interface IdentityHealingTopic {
  id: string;
  title: string;
  pillar:
    | 'autoestima'
    | 'identidade'
    | 'merecimento'
    | 'rejeicao'
    | 'abandono'
    | 'pertencimento'
    | 'crianca-interior'
    | 'perdao'
    | 'auto-perdao'
    | 'forca-interna'
    | 'dependencia-emocional'
    | 'dependencias-habitos'
    | 'valor-proprio'
    | 'ser-vista';
  pillarLabel: string;
  badgeColor: string;
  subtitle: string;
  coreDilemma: string;
  jungianDiagnosis: {
    concept: string;
    shadowRoot: string;
    healingPath: string;
  };
  biblicalWisdom: {
    verse: string;
    text: string;
    revelation: string;
  };
  responsibilityShift: {
    victimBelief: string;
    sovereignTruth: string;
  };
  dailyTips: string[];
  practicalExercise: {
    name: string;
    description: string;
    steps: string[];
    reflectionQuestion: string;
  };
  therapeuticLetterTechnique: {
    title: string;
    purpose: string;
    guidePrompt: string;
    exampleOpening: string;
  };
  innerStrengthActivation: {
    powerMantra: string;
    resilienceKey: string;
  };
  holySpiritPrayer: string;
  therapeuticSteps: string[];
  affirmationOfWorth: string;
}

export interface TherapeuticLetter {
  id: string;
  date: string;
  title: string;
  category: string;
  recipient: string;
  content: string;
  status: 'saved' | 'burned_symbolically' | 'sealed_in_prayer';
  burnedDate?: string;
}

export interface ArchetypeProfile {
  id: string;
  name: string;
  subtitle: string;
  element: string;
  coreDesire: string;
  lightTraits: string[];
  shadowTraits: string[];
  jungianConcept: string;
  biblicalParallel: {
    name: string;
    passage: string;
    verseAra: string;
    lesson: string;
  };
  individuationKey: string;
  dailyAffirmation: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    archetypeId: string;
    scoreTrait: string;
  }[];
}

export interface RelationshipTopic {
  id: string;
  title: string;
  badge: string;
  description: string;
  jungianInsight: string;
  biblicalWisdomAra: {
    verse: string;
    text: string;
    explanation: string;
  };
  selfResponsibilityShift: {
    victimPattern: string;
    consciousPattern: string;
  };
  practicalChecklist: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'calm' | 'thoughtful' | 'challenged' | 'grateful' | 'growing';
  category: 'autoestima' | 'identidade' | 'merecimento' | 'rejeicao' | 'abandono' | 'relacionamento' | 'gratidao';
  inMyControl: string;
  notInMyControl: string;
  linkedVerse?: string;
  aiInsight?: string;
}

export interface ReflectionAnalysis {
  tituloDiagnostico: string;
  lenteJunguiana: {
    conceitoChave: string;
    explicacao: string;
    perguntaSombra: string;
  };
  sabedoriaBiblicaAra: {
    referencia: string;
    textoVersiculo: string;
    reflexaoEspiritual: string;
  };
  chamadoAutoResponsabilidade: {
    foraDoMeuControle: string[];
    sobMinhaSoberania: string[];
  };
  acaoConsciente: string;
  afirmacaoDiaria: string;
}

