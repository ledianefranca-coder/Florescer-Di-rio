import React, { useState, useRef, useMemo } from 'react';
import { ReflectionAnalysis } from '../types';
import {
  Compass,
  Sparkles,
  Send,
  Loader2,
  Bookmark,
  Check,
  ShieldAlert,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Search,
  X,
  Copy,
  SlidersHorizontal,
  Flame,
  HeartHandshake,
  Heart,
  HelpCircle,
  Flower2,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface ReflectionLabProps {
  onSaveToJournal?: (entry: {
    title: string;
    content: string;
    inMyControl: string;
    notInMyControl: string;
    category: 'relacionamento' | 'sombra' | 'fe' | 'limites' | 'gratidao';
    linkedVerse?: string;
  }) => void;
}

interface SituationalPreset {
  id: string;
  label: string;
  category: 'relacionamento' | 'sombra' | 'fe' | 'limites' | 'gratidao';
  role: string;
  text: string;
  tags: string[];
}

export const ReflectionLab: React.FC<ReflectionLabProps> = ({ onSaveToJournal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [situation, setSituation] = useState('');
  const [category, setCategory] = useState<'relacionamento' | 'sombra' | 'fe' | 'limites' | 'gratidao'>('relacionamento');
  const [relationshipRole, setRelationshipRole] = useState('Casamento / Namoro');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ReflectionAnalysis | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Extended catalog of searchable psychological and spiritual dilemmas
  const situationalPresets: SituationalPreset[] = [
    {
      id: 'rejeicao-parceiro',
      label: 'Medo de Rejeição & Silêncio no Casamento',
      category: 'relacionamento',
      role: 'Casamento / Relacionamento',
      text: 'Sinto que meu parceiro se fecha quando tento conversar. Isso ativa uma dor profunda de rejeição e medo de abandono, e acabo explodindo ou me anulando para agradar.',
      tags: ['rejeição', 'abandono', 'casamento', 'silêncio', 'conflito', 'comunicação'],
    },
    {
      id: 'nao-merecimento',
      label: 'Sensação de Não Merecimento & Síndrome da Impostora',
      category: 'sombra',
      role: 'Identidade & Autoestima',
      text: 'Mesmo quando recebo elogios ou conquisto resultados, sinto que não mereço ser vista ou respeitada. Acho que a qualquer momento vão me desmascarar ou me criticar.',
      tags: ['merecimento', 'autoestima', 'insegurança', 'sombra', 'crítica', 'sucesso'],
    },
    {
      id: 'limites-familia',
      label: 'Cobrança Familiar, Culpa & Dificuldade de Dizer Não',
      category: 'limites',
      role: 'Família / Pais & Filhas',
      text: 'Minha família sempre espera que eu resolva os problemas de todos. Quando digo que não posso ajudar, sou tratada como egoísta e ingrata, e sou tomada por uma culpa paralisante.',
      tags: ['família', 'limites', 'culpa', 'pais', 'dizer não', 'sobrecarga'],
    },
    {
      id: 'necessidade-agradar',
      label: 'Compulsão por Agradar & Anulação da Própria Voz',
      category: 'sombra',
      role: 'Desenvolvimento Pessoal',
      text: 'Tenho tanto pavor de desagradar ou gerar atrito que concordo com tudo, coloco as vontades dos outros à frente das minhas e fico esgotada por viver uma vida que não é minha.',
      tags: ['agradar', 'anulação', 'persona', 'voz própria', 'medo', 'autocuidado'],
    },
    {
      id: 'ciumes-inseguranca',
      label: 'Ciúmes, Desconfiança & Controle nas Relações',
      category: 'relacionamento',
      role: 'Relacionamento Afetivo',
      text: 'Fico obcecada tentando controlar os passos e atitudes do outro por medo de ser traída ou trocada. Sei que esse controle me adoece e desgasta o relacionamento.',
      tags: ['ciúmes', 'controle', 'desconfiança', 'traição', 'ansiedade', 'apego'],
    },
    {
      id: 'perfeccionismo-critico',
      label: 'Perfeccionismo Tirânico & Autocrítica Severa',
      category: 'sombra',
      role: 'Vida Profissional & Pessoal',
      text: 'Nada do que faço parece bom o suficiente. Sou uma juíza implacável comigo mesma, me cobro perfeição em tudo e não consigo relaxar nem comemorar minhas vitórias.',
      tags: ['perfeccionismo', 'crítico interno', 'cobrança', 'ansiedade', 'descanso'],
    },
    {
      id: 'magoa-passado',
      label: 'Mágoa Antiga, Dificuldade de Perdoar & Amargura',
      category: 'relacionamento',
      role: 'Cura Emocional',
      text: 'Fui injustiçada por alguém em quem confiava muito. Não consigo esquecer a dor e percebo que esse ressentimento está envenenando meus dias e bloqueando meu futuro.',
      tags: ['perdão', 'mágoa', 'traição', 'ressentimento', 'passado', 'libertação'],
    },
    {
      id: 'crise-fe-deserto',
      label: 'Sensação de Vazio, Silêncio de Deus & Desânimo',
      category: 'fe',
      role: 'Espiritualidade & Alma',
      text: 'Estou passando por um momento de deserto espiritual. Parece que minhas orações não chegam a lugar nenhum e me sinto cansada de tentar ser forte o tempo todo.',
      tags: ['fé', 'deserto', 'vazio', 'cansaço', 'oração', 'esperança'],
    },
  ];

  // Filtered presets based on search query and category filter
  const filteredPresets = useMemo(() => {
    return situationalPresets.filter((preset) => {
      const matchesFilter =
        activeFilter === 'todos' || preset.category === activeFilter;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesFilter;

      const matchesSearch =
        preset.label.toLowerCase().includes(query) ||
        preset.text.toLowerCase().includes(query) ||
        preset.role.toLowerCase().includes(query) ||
        preset.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  // Robust Client-side Fallback Generator in case server/network is offline
  const getFallbackAnalysis = (text: string, cat: string, role: string): ReflectionAnalysis => {
    const lower = text.toLowerCase();

    if (lower.includes('rejeic') || lower.includes('abandono') || lower.includes('silêncio') || lower.includes('silencio')) {
      return {
        tituloDiagnostico: 'A Ferida do Abandono e o Resgate da Auto-Validação',
        lenteJunguiana: {
          conceitoChave: 'Complexo de Rejeição & Projeção do Objeto Primário',
          explicacao: 'Quando o parceiro se silencia, o inconsciente não reage apenas ao momento presente, mas a antigas memórias de desamparo infantil. A tendência a explodir ou se anular é uma tentativa arcaica da Criança Interior de garantir afeto e sobrevivência.',
          perguntaSombra: 'Qual parte de você ainda acredita que o seu valor depende da atenção imediata e aprovação constante do outro?',
        },
        sabedoriaBiblicaAra: {
          referencia: 'Salmos 27:10 (ARA)',
          textoVersiculo: 'Porque, se meu pai e minha mãe me desampararem, o SENHOR me acolherá.',
          reflexaoEspiritual: 'O amor de Deus é a base inegociável da sua segurança. Nenhum ser humano tem o poder de validar ou revogar a dignidade que o Criador já selou em sua vida.',
        },
        chamadoAutoResponsabilidade: {
          foraDoMeuControle: [
            'O tempo que o outro leva para processar as próprias emoções.',
            'As reações defensivas e a maturidade emocional de terceiros.',
          ],
          sobMinhaSoberania: [
            'Não me abandonar nem mendigar afeto quando o outro se cala.',
            'Expressar minhas necessidades com firmeza serena, sem ataques nem submissão cega.',
          ],
        },
        acaoConsciente: 'Respire fundo 3 vezes antes de reagir ao silêncio. Diga para si mesma: "Eu não estou desamparada; eu sou amada por Deus e cuido de mim com respeito."',
        afirmacaoDiaria: 'Minha paz não é negociável. Eu pertenço a Deus e governo o meu coração com dignidade e maturidade.',
      };
    }

    if (lower.includes('limite') || lower.includes('família') || lower.includes('familia') || lower.includes('dizer não') || lower.includes('culpa')) {
      return {
        tituloDiagnostico: 'A Libertação da Culpa Neurótica e os Limites Sagrados',
        lenteJunguiana: {
          conceitoChave: 'Diferenciação do Self & Dissolução da Inflação Parental',
          explicacao: 'Dizer não gera culpa quando fomos condicionadas a acreditar que nosso único valor reside em ser a "salvadora" dos outros. Romper essa dinânica exige tolerar a frustração alheia como um ato maduro de individuação.',
          perguntaSombra: 'O que você teme que aconteça com a sua autoimagem se você parar de carregar os fardos que não são seus?',
        },
        sabedoriaBiblicaAra: {
          referencia: 'Gálatas 6:5 (ARA)',
          textoVersiculo: 'Porque cada um levará o seu próprio fardo.',
          reflexaoEspiritual: 'O amor bíblico anda de mãos dadas com a ordem e a responsabilidade. Amar não é ser conivente com a dependência alheia; estabelecer limites é guardar a integridade da sua missão.',
        },
        chamadoAutoResponsabilidade: {
          foraDoMeuControle: [
            'A concordância ou insatisfação dos familiares quando você diz um não necessário.',
            'A maturidade das outras pessoas em lidar com suas próprias escolhas.',
          ],
          sobMinhaSoberania: [
            'Definir com clareza o que eu posso e o que eu não posso assumir.',
            'Sustentar meu posicionamento com amor e tranquilidade, sem necessidade de me justificar excessivamente.',
          ],
        },
        acaoConsciente: 'Comunique hoje um limite sereno: "Eu amo vocês, mas não poderei assumir essa responsabilidade neste momento."',
        afirmacaoDiaria: 'Estabelecer limites é um ato de respeito a Deus e à minha saúde. Minha integridade vem em primeiro lugar.',
      };
    }

    if (lower.includes('merecimento') || lower.includes('impostora') || lower.includes('insegura') || lower.includes('elogio')) {
      return {
        tituloDiagnostico: 'Despertar do Merecimento & Ancoragem na Graça Real',
        lenteJunguiana: {
          conceitoChave: 'Integração do Animus Luminoso & Cura da Auto-desvalorização',
          explicacao: 'A síndrome da impostora e o não-merecimento surgem de uma Sombra que interiorizou a ideia de que apenas o esforço extenuante ou o sofrimento legitimam a existência. Acolher as próprias conquistas é honrar os dons recebidos.',
          perguntaSombra: 'Qual ganho secundário oculto você obtém ao continuar se enxergando como pequena ou desmerecedora?',
        },
        sabedoriaBiblicaAra: {
          referencia: 'Efésios 2:10 (ARA)',
          textoVersiculo: 'Pois somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus de antemão preparou para que andássemos nelas.',
          reflexaoEspiritual: 'Você não é um acidente nem uma intrusa. Sua vida foi planejada com propósito elevado pelo Criador. Receba a bênção com humildade e cabeça erguida.',
        },
        chamadoAutoResponsabilidade: {
          foraDoMeuControle: [
            'O julgamento ou as comparações alheias.',
            'As inseguranças que o mundo tenta projetar sobre as mulheres que crescem.',
          ],
          sobMinhaSoberania: [
            'Receber elogios e conquistas com um simples e elegante "Muito obrigada".',
            'Celebrar minhas habilidades e me dedicar com excelência sem autoflagelação.',
          ],
        },
        acaoConsciente: 'Liste 3 talentos e vitórias reais que Deus já te concedeu e agradeça em oração sem diminuir sua relevância.',
        afirmacaoDiaria: 'Eu recebo a abundância e o respeito que me cabem. Sou obra-prima de Deus e caminho em confiança.',
      };
    }

    // Default General Reflection
    return {
      tituloDiagnostico: 'O Despertar da Consciência & A Soberania do Coração',
      lenteJunguiana: {
        conceitoChave: 'Projeção da Sombra e Recolhimento de Expectativas',
        explicacao: 'Na visão de Carl Jung, toda angústia e conflito externo representam um convite psíquico para integrar aspectos inconscientes, cessar projeções e assumir o leme da própria história.',
        perguntaSombra: 'Que limite ou verdade sobre você mesma você tem evitado encarar nessa situação?',
      },
      sabedoriaBiblicaAra: {
        referencia: 'Provérbios 4:23 (ARA)',
        textoVersiculo: 'Sobre tudo o que se deve guardar, guarda o coração, porque dele procedem as fontes da vida.',
        reflexaoEspiritual: 'Guardar o coração não é erguer muros de amargura, mas cultivar um jardim sagrado de paz, discernimento e autorresponsabilidade.',
      },
      chamadoAutoResponsabilidade: {
        foraDoMeuControle: [
          'A aprovação, as reações e o comportamento das outras pessoas.',
          'Os acontecimentos que já ficaram no passado.',
        ],
        sobMinhaSoberania: [
          'A postura madura e equilibrada com que decido agir daqui para frente.',
          'A escolha de viver alinhada aos meus valores e à vontade soberana de Deus.',
        ],
      },
      acaoConsciente: 'Dê hoje um passo concreto de coerência interior, sem esperar aplauso ou permissão alheia.',
      afirmacaoDiaria: 'Eu sou senhora das minhas escolhas e descanso na graça de Deus. Minha paz é inegociável.',
    };
  };

  const handleAnalyze = async (customSituation?: string, customCategory?: any, customRole?: string) => {
    let textToAnalyze = (customSituation || situation || searchQuery).trim();

    // If user clicked analyze with an empty field, auto-populate with the first or active preset to ensure an effortless experience
    if (!textToAnalyze) {
      const defaultPreset = filteredPresets[0] || situationalPresets[0];
      textToAnalyze = defaultPreset.text;
      setSituation(defaultPreset.text);
      setCategory(defaultPreset.category);
      setRelationshipRole(defaultPreset.role);
    }

    setIsLoading(true);
    setAnalysis(null);
    setSavedSuccess(false);
    soundManager.playSingingBowl(440, 2.0);

    try {
      const res = await fetch('/api/analyze-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: textToAnalyze,
          category: customCategory || category,
          relationshipRole: customRole || relationshipRole,
        }),
      });

      if (!res.ok) {
        throw new Error('API offline ou resposta não satisfatória');
      }

      const data: ReflectionAnalysis = await res.json();
      setAnalysis(data);
      soundManager.playAffirmationChime();

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#059669', '#DB2777', '#F472B6', '#10B981'],
        });
      } catch (e) {
        // ignore if canvas not ready
      }
    } catch (err) {
      console.warn('Utilizando análise de salvaguarda de alta fidelidade:', err);
      // Instant graceful fallback
      const fallback = getFallbackAnalysis(
        textToAnalyze,
        customCategory || category,
        customRole || relationshipRole
      );
      setAnalysis(fallback);
      soundManager.playAffirmationChime();
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSelectPreset = (preset: SituationalPreset, autoAnalyze = false) => {
    setSituation(preset.text);
    setCategory(preset.category);
    setRelationshipRole(preset.role);
    soundManager.playSingingBowl(528, 0.8);

    if (autoAnalyze) {
      handleAnalyze(preset.text, preset.category, preset.role);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleClearAll = () => {
    setSituation('');
    setSearchQuery('');
    setAnalysis(null);
    soundManager.playSingingBowl(396, 0.6);
  };

  const handleCopyAnalysis = () => {
    if (!analysis) return;
    const textToCopy = `FLORESCER DIÁRIO • DIAGNÓSTICO DE CONSCIÊNCIA
Título: ${analysis.tituloDiagnostico}

1. PSICANÁLISE DE CARL JUNG (${analysis.lenteJunguiana.conceitoChave})
${analysis.lenteJunguiana.explicacao}
Pergunta da Sombra: "${analysis.lenteJunguiana.perguntaSombra}"

2. SABEDORIA BÍBLICA (${analysis.sabedoriaBiblicaAra.referencia})
"${analysis.sabedoriaBiblicaAra.textoVersiculo}"
${analysis.sabedoriaBiblicaAra.reflexaoEspiritual}

3. AUTORRESPONSABILIDADE & SOBERANIA
• Fora do meu controle:
${analysis.chamadoAutoResponsabilidade.foraDoMeuControle.map(i => `  - ${i}`).join('\n')}

• Sob minha soberania:
${analysis.chamadoAutoResponsabilidade.sobMinhaSoberania.map(i => `  - ${i}`).join('\n')}

AÇÃO PRÁTICA: ${analysis.acaoConsciente}
AFIRMAÇÃO DIÁRIA: "${analysis.afirmacaoDiaria}"`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedSuccess(true);
    soundManager.playAffirmationChime();
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleSave = () => {
    if (!analysis) return;
    const inControlText = analysis.chamadoAutoResponsabilidade.sobMinhaSoberania.join('\n• ');
    const outOfControlText = analysis.chamadoAutoResponsabilidade.foraDoMeuControle.join('\n• ');

    if (onSaveToJournal) {
      onSaveToJournal({
        title: analysis.tituloDiagnostico,
        content: `Situação analisada: ${situation || searchQuery}\n\nDiagnóstico Junguiano (${analysis.lenteJunguiana.conceitoChave}):\n${analysis.lenteJunguiana.explicacao}\n\nPergunta da Sombra: ${analysis.lenteJunguiana.perguntaSombra}\n\nAção Prática: ${analysis.acaoConsciente}`,
        inMyControl: inControlText,
        notInMyControl: outOfControlText,
        category: category,
        linkedVerse: `${analysis.sabedoriaBiblicaAra.referencia} - "${analysis.sabedoriaBiblicaAra.textoVersiculo}"`,
      });
    }

    setSavedSuccess(true);
    soundManager.playSingingBowl(528, 1.5);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const filterButtons = [
    { id: 'todos', label: 'Todos os Temas' },
    { id: 'relacionamento', label: 'Relacionamento & Casamento' },
    { id: 'limites', label: 'Família & Limites' },
    { id: 'sombra', label: 'Sombra & Rejeição' },
    { id: 'fe', label: 'Fé & Espiritualidade' },
    { id: 'gratidao', label: 'Propósito & Merecimento' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-teal-100 to-rose-100 text-emerald-900 text-xs font-bold uppercase tracking-wider border border-emerald-200/80 shadow-2xs">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>Laboratório de Autorresponsabilidade & Cura</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-bold">
          Da Reatividade à Soberania Interior
        </h2>
        <p className="text-sm sm:text-base text-[#385A45] leading-relaxed">
          Pesquise uma situação comum ou descreva a sua dor. Nossa análise examina os conflitos sob a lente de <strong>Carl Jung</strong>, ilumina com a <strong>Sabedoria Bíblica (ARA)</strong> e devolve o poder de escolha à sua <strong>autorresponsabilidade</strong>.
        </p>
      </div>

      {/* SEARCH & EXPLORATION BAR CARD */}
      <div className="bg-gradient-to-br from-white via-[#FCFDFB] to-[#F3FAF5] rounded-3xl border border-emerald-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Search className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-emerald-950">
                Pesquisa & Banco de Dilemas de Consciência
              </h3>
              <p className="text-xs text-stone-600">
                Digite palavras-chave (ex: <em>rejeição, culpa, família, casamento, silêncio, ciúmes</em>) ou escolha abaixo.
              </p>
            </div>
          </div>

          {situation && (
            <button
              onClick={handleClearAll}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium transition-colors cursor-pointer w-fit"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar Formulário</span>
            </button>
          )}
        </div>

        {/* Search Input Box with Action Button */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-emerald-600 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchQuery.trim()) {
                  setSituation(searchQuery);
                  handleAnalyze(searchQuery);
                } else {
                  handleAnalyze();
                }
              }
            }}
            placeholder="Pesquise por tema ou digite sua situação para analisar diretamente..."
            className="w-full pl-12 pr-28 sm:pr-36 py-3.5 rounded-2xl bg-white border-2 border-emerald-200 focus:border-emerald-600 text-sm text-[#143823] placeholder-stone-400 focus:outline-none shadow-2xs transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1.5">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                title="Limpar pesquisa"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  setSituation(searchQuery);
                  handleAnalyze(searchQuery);
                } else {
                  handleAnalyze();
                }
              }}
              disabled={isLoading}
              className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              )}
              <span className="hidden sm:inline">Pesquisar & Analisar</span>
              <span className="sm:hidden">Analisar</span>
            </button>
          </div>
        </div>

        {/* Category Filters Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-emerald-700" />
            Filtrar:
          </span>
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                setActiveFilter(btn.id);
                soundManager.playSingingBowl(440, 0.4);
              }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-emerald-200 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Preset Situation Cards Carousel / Grid */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-rose-600" />
              Dilemas & Situações Disponíveis ({filteredPresets.length})
            </span>
            <span className="text-[11px] text-stone-500">
              Clique para preencher ou analisar instantaneamente
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected = situation === preset.text;
              return (
                <div
                  key={preset.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 text-left ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-400 shadow-xs'
                      : 'bg-white border-emerald-100 hover:border-emerald-300 hover:bg-[#F9FCFA]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif font-bold text-xs text-emerald-950 line-clamp-1">
                        {preset.label}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      "{preset.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-100/60 text-[11px]">
                    <span className="text-stone-500 text-[10px] italic">
                      Contexto: {preset.role}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSelectPreset(preset, false)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-semibold transition-colors cursor-pointer"
                      >
                        Carregar
                      </button>
                      <button
                        onClick={() => handleSelectPreset(preset, true)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-200" />
                        <span>Analisar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAILED INPUT & ANALYSIS PROCESSOR CARD */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-emerald-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
            Formulário de Consciência
          </span>
          <h3 className="font-serif text-xl font-bold text-emerald-950 mt-0.5">
            Sua Situação & Espelho Interior
          </h3>
        </div>

        {/* Input Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C422C] uppercase tracking-wider mb-1.5">
                Área da Situação
              </label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8FCF9] border border-emerald-200 text-sm text-[#143823] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="relacionamento">Casamento, Namoro & Afeto</option>
                <option value="limites">Família, Pais & Limites Saudáveis</option>
                <option value="sombra">Autoestima, Rejeição & Sombra Pessoal</option>
                <option value="fe">Fé, Crise Espiritual & Sentido</option>
                <option value="gratidao">Propósito & Valor Próprio</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C422C] uppercase tracking-wider mb-1.5">
                Contexto / Papel
              </label>
              <input
                type="text"
                value={relationshipRole}
                onChange={(e) => setRelationshipRole(e.target.value)}
                placeholder="Ex: Esposa, Mãe, Filha, Líder, Mulher em Cura"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8FCF9] border border-emerald-200 text-sm text-[#143823] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#1C422C] uppercase tracking-wider">
                Descreva com honestidade o que aconteceu e como você se sentiu:
              </label>
              <span className="text-[11px] text-stone-500">
                {situation.length} caracteres
              </span>
            </div>
            <textarea
              ref={inputRef}
              rows={4}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  handleAnalyze();
                }
              }}
              placeholder="Ex: Tivemos uma conversa difícil e me senti completamente invisível e sem valor. Fiquei muito magoada e com medo de ser rejeitada... (ou escolha um exemplo acima)"
              className="w-full p-4 rounded-2xl bg-[#F8FCF9] border border-emerald-200 text-sm text-[#143823] placeholder-[#6E8F7A] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Dica: Pressione <strong>Ctrl + Enter</strong> ou clique no botão abaixo para processar imediatamente.</span>
            </p>
          </div>

          {/* MAIN ACTIVE ACTION BUTTON */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => handleAnalyze()}
              disabled={isLoading}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 hover:from-emerald-700 hover:via-teal-800 hover:to-emerald-900 text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-200" />
                  <span>Processando Análise de Consciência...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>Processar Análise de Consciência</span>
                  <ArrowRight className="w-4 h-4 text-emerald-100" />
                </>
              )}
            </button>

            {situation && (
              <button
                onClick={handleClearAll}
                className="px-5 py-3 rounded-full bg-[#F4FAF6] border border-emerald-200 text-xs font-semibold text-stone-700 hover:bg-rose-50 hover:text-rose-900 hover:border-rose-200 transition-all cursor-pointer text-center"
              >
                Limpar Texto
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ANALYSIS RESULTS DISPLAY SECTION */}
      <div ref={resultsRef}>
        {analysis && (
          <div className="bg-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {/* Diagnostic Header with Save & Copy Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Diagnóstico de Consciência
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                    {category}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#143823] font-bold mt-1">
                  {analysis.tituloDiagnostico}
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopyAnalysis}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
                  title="Copiar análise completa"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-600" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span className="text-emerald-100">Salvo no Diário!</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-emerald-200" />
                      <span>Salvar no Diário da Alma</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 4 Pillars Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pillar 1: Jungian Psychology */}
              <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <span>Psicanálise de Carl Jung: {analysis.lenteJunguiana.conceitoChave}</span>
                </div>
                <p className="text-sm text-[#143823] leading-relaxed">
                  {analysis.lenteJunguiana.explicacao}
                </p>
                <div className="mt-4 p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    Pergunta da Sombra (Olhar para Dentro com Amor):
                  </span>
                  <p className="text-sm text-[#1C422C] font-serif italic">
                    "{analysis.lenteJunguiana.perguntaSombra}"
                  </p>
                </div>
              </div>

              {/* Pillar 2: Scripture */}
              <div className="p-6 rounded-2xl bg-[#FDF2F8] border border-pink-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-rose-700" />
                  <span>Sabedoria Bíblica: {analysis.sabedoriaBiblicaAra.referencia}</span>
                </div>
                <blockquote className="font-serif text-lg text-[#143823] italic border-l-4 border-rose-500 pl-3 py-1 bg-white/60 p-2.5 rounded-r-lg">
                  “{analysis.sabedoriaBiblicaAra.textoVersiculo}”
                </blockquote>
                <p className="text-sm text-[#385A45] leading-relaxed">
                  {analysis.sabedoriaBiblicaAra.reflexaoEspiritual}
                </p>
              </div>
            </div>

            {/* Pillar 3: Self-Responsibility Split (Control vs Sovereignty) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Out of my control */}
              <div className="p-6 rounded-2xl bg-[#FFF1F2] border border-rose-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Fora do Meu Controle (Soltar & Entregar a Deus)</span>
                </div>
                <ul className="space-y-2 text-sm text-[#701A24]">
                  {analysis.chamadoAutoResponsabilidade.foraDoMeuControle.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Under my sovereignty */}
              <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-emerald-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sob Minha Soberania (Minha Responsabilidade & Poder)</span>
                </div>
                <ul className="space-y-2 text-sm text-[#064E3B]">
                  {analysis.chamadoAutoResponsabilidade.sobMinhaSoberania.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action and Affirmation Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-[#FDF2F8] to-[#FFF1F2] border border-emerald-200 space-y-5 shadow-2xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Ação Prática Consciente para Hoje
                </span>
                <p className="text-sm text-[#143823] font-semibold leading-relaxed">
                  {analysis.acaoConsciente}
                </p>
              </div>
              <div className="pt-4 border-t border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  Afirmação de Maturidade, Identidade & Fé
                </span>
                <p className="font-serif text-lg text-[#143823] italic">
                  “{analysis.afirmacaoDiaria}”
                </p>
              </div>
            </div>

            {/* New analysis button */}
            <div className="text-center pt-2">
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                <span>Realizar Nova Análise de Consciência</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
