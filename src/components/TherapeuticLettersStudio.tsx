import React, { useState, useEffect } from 'react';
import { TherapeuticLetter } from '../types';
import { soundManager } from '../utils/audioSynth';
import {
  Feather,
  Sparkles,
  Flame,
  Download,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Heart,
  Shield,
  Trash2,
  Lock,
  Compass,
  ArrowRight,
  Sun,
  Volume2,
  Award,
  Flower2,
  FileText,
} from 'lucide-react';

interface TemplateOption {
  id: string;
  category: string;
  title: string;
  recipient: string;
  description: string;
  badgeColor: string;
  guidingQuestions: string[];
  initialPrompt: string;
  scriptureAnchor: {
    verse: string;
    text: string;
  };
  jungianPurpose: string;
}

const LETTER_TEMPLATES: TemplateOption[] = [
  {
    id: 'crianca-interior',
    category: 'Criança Interior',
    title: 'Carta à Minha Criança Interior (Acolhimento da Menina)',
    recipient: 'Minha Menina Interior',
    description: 'Para abraçar a versão de você que se sentiu assustada, negligenciada ou forçada a crescer rápido demais.',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    guidingQuestions: [
      'Como era a menina que você foi entre 5 e 10 anos? Do que ela tinha mais medo?',
      'O que ela precisava ter ouvido dos adultos na época (ex: "você está segura", "eu te amo do jeito que você é")?',
      'Como a sua mulher adulta de hoje pode prometer proteção, afeto e presença inabalável para ela?',
    ],
    initialPrompt: `Querida menininha de olhos doces e coração sensível,

Eu estou escrevendo esta carta do futuro para te dizer algo que você esperou muito tempo para ouvir: você não está mais sozinha.

Eu vejo todas as vezes em que você teve medo, em que tentou ser boazinha demais para não ser rejeitada, ou em que chorou escondida sentindo que não era importante. Eu quero que você saiba que você sobreviveu.

Hoje, eu sou uma mulher adulta, sustentada pela graça de Deus. Eu assumo a guarda do seu coração. Você não precisa mais carregar o peso do mundo nas costas...`,
    scriptureAnchor: {
      verse: 'Isaías 66:13 (ARA)',
      text: 'Como alguém a quem sua mãe consola, assim eu vos consolarei; e em Jerusalém vós sereis consolados.',
    },
    jungianPurpose: 'Integração do Arquétipo da Criança Divina e resgate do afeto reprimido no inconsciente.',
  },
  {
    id: 'perdao-libertador',
    category: 'Perdão',
    title: 'Carta de Perdão Libertador (Corte de Correntes)',
    recipient: 'A Pessoa Que Me Machucou (Não enviada)',
    description: 'Para cancelar a dívida emocional de quem feriu você, soltando a mágoa e entregando a justiça a Deus.',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    guidingQuestions: [
      'O que essa pessoa fez ou deixou de fazer que causou tanta dor na sua história?',
      'De que forma carregar essa mágoa tem envenenado a sua saúde, seu sono e sua paz hoje?',
      'Qual é a declaração de soltura e cancelamento de dívida que você decide fazer perante Deus?',
    ],
    initialPrompt: `Eu escrevo esta carta para passar a limpo um passado que pesou por tempo demais sobre a minha alma.

Por muito tempo eu guardei raiva, ressentimento e esperei um pedido sincero de desculpas pelo que você fez quando...

Hoje eu compreendo que esperar a sua mudança ou o seu reconhecimento é entregar a chave da minha paz a quem me machucou. Eu não quero mais carregar esse veneno.

Perante o tribunal soberano de Deus, eu cancelo hoje toda a dívida que você tinha comigo. Eu não te cobro mais nada. Eu te libero para seguir seu caminho e tomo de volta toda a minha liberdade e alegria de viver...`,
    scriptureAnchor: {
      verse: 'Colossenses 3:13 (ARA)',
      text: 'Suportai-vos uns aos outros, perdoai-vos mutuamente, caso alguém tenha motivo de queixa contra outrem. Assim como o Senhor vos perdoou, assim também perdoai vós.',
    },
    jungianPurpose: 'Desinvestimento psíquico da fixação no agressor e dissolução do complexo de ressentimento.',
  },
  {
    id: 'auto-perdao',
    category: 'Autoperdão',
    title: 'Carta de Autoperdão e Misericórdia Íntima',
    recipient: 'A Mim Mesma (Pelas Escolhas do Passado)',
    description: 'Para encerrar a autopunição por relacionamentos tóxicos, erros, fraquezas ou momentos de desespero.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    guidingQuestions: [
      'Pelo que exatamente você tem se culpado e se autoflagelado mentalmente nos últimos tempos?',
      'Qual era o sofrimento, carência ou falta de consciência que você tinha quando tomou aquelas decisões?',
      'Se Deus já lavou e perdoou você pela graça, como você pode estender essa mesma misericórdia a si mesma?',
    ],
    initialPrompt: `Minha querida alma,

Eu passei meses (ou anos) te julgando com uma régua de ferro. Eu te chamei de tola, me envergonhei das suas fraquezas e repeti mil vezes: "Como você pôde ter feito aquilo?".

Hoje eu decido depor as armas contra mim mesma. Eu reconheço que, na época daquele erro, você estava desesperada por afeto, confusa ou simplesmente não possuía a maturidade espiritual que tem hoje.

Se Cristo já me perdoou e lançou meus pecados no mar do esquecimento, eu recuso continuar no papel de minha própria acusadora. Eu me perdoo, eu me abraço e eu me autorizo a ser feliz...`,
    scriptureAnchor: {
      verse: 'Romanos 8:1 (ARA)',
      text: 'Agora, pois, já nenhuma condenação há para os que estão em Cristo Jesus.',
    },
    jungianPurpose: 'Abrandamento do Super-Ego carrasco e integração compassiva da Sombra.',
  },
  {
    id: 'dependencia-emocional',
    category: 'Dependência Emocional',
    title: 'Carta de Rompimento da Dependência Afetiva',
    recipient: 'Ao Vínculo de Dependência / Validação Externa',
    description: 'Para recolher as projeções de salvador, quebrar o vício de aprovação e resgatar sua dignidade inteira.',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    guidingQuestions: [
      'Em que momentos você se desfez de si mesma e mendigou afeto ou aprovação?',
      'Que peso de "deus" você colocou sobre o outro que ele não é capaz de sustentar?',
      'Como você declara a sua integridade e filiação direta em Deus a partir de hoje?',
    ],
    initialPrompt: `Hoje eu coloco um ponto final no ciclo da mendicância emocional.

Eu reconheço que transformei a sua aprovação, a sua atenção e as suas respostas no oxigênio da minha vida. Ao fazer isso, eu te dei um poder que pertence unicamente a Deus e abdiquei da minha própria soberania.

Eu retiro hoje as minhas expectativas infantis de ser salva por você. Eu assumo a responsabilidade sagrada pela minha felicidade, pela minha segurança e pelo meu destino.

Eu me declaro uma mulher inteira, livre e ancorada no amor de Deus. Eu amo sem me escravizar e relaciono-me em dignidade e respeito mútuo...`,
    scriptureAnchor: {
      verse: 'Jeremias 17:7 (ARA)',
      text: 'Bendito o homem que confia no Senhor e cuja esperança é o Senhor.',
    },
    jungianPurpose: 'Recolhimento da projeção do Animus/Salvador e restauração da autoridade do Self.',
  },
  {
    id: 'pertencimento',
    category: 'Pertencimento',
    title: 'Carta de Boas-Vindas ao Meu Pertencimento Sagrado',
    recipient: 'À Minha Alma Desterrada',
    description: 'Para curar o sentimento crônico de exclusão, de não se encaixar e de se sentir peixe fora d\'água.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    guidingQuestions: [
      'Onde e quando nasceu a ideia de que você não pertencia a lugar nenhum?',
      'De que forma você tem se autoexcluído antes que os outros o façam?',
      'O que significa para você ser concidadã dos santos e filha amada da Família de Deus?',
    ],
    initialPrompt: `Alma minha, que tantas vezes se sentiu estrangeira e desterrada nesta terra,

Eu te chamo de volta para casa hoje. Você não é um erro cósmico, nem um estorvo, nem alguém que precisa pedir desculpas por ocupar espaço no mundo.

O Criador te teceu com propósito, beleza e um lugar legítimo na mesa da vida. Você não precisa se moldar nem se anular para pertencer.

Você pertence à Família Eterna de Deus, e você pertence a este corpo e a esta existência. Seja bem-vinda ao seu próprio lar interior...`,
    scriptureAnchor: {
      verse: 'Efésios 2:19 (ARA)',
      text: 'Assim, já não sois estrangeiros e peregrinos, mas concidadãos dos santos, e sois da família de Deus.',
    },
    jungianPurpose: 'Cura do Complexo do Exilado e reencontro com o solo psíquico fundamental.',
  },
  {
    id: 'forca-interna',
    category: 'Força Interna',
    title: 'Carta de Ativação da Minha Capacidade e Soberania',
    recipient: 'À Mulher Forte Que Habita em Mim',
    description: 'Para despertar a coragem, autoeficácia, firmeza moral e poder de realização sob a bênção divina.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    guidingQuestions: [
      'Quais são os talentos, força moral e inteligência que você tem escondido por medo?',
      'Que decisões corajosas você precisa sustentar para governar sua vida com nobreza?',
      'Qual é o pacto de ação que você sela com Deus para o seu florescimento?',
    ],
    initialPrompt: `Eu me dirijo hoje à mulher forte, inteligente e compassiva que Deus forjou nas fornalhas da minha história.

Chega de me esconder na falsa modéstia ou na desculpa da fragilidade. O mesmo Deus que abriu o mar vermelho habita em meu espírito e me concede autoridade, foco e sabedoria.

Eu assumo o leme da minha vida financeira, emocional, espiritual e profissional. Eu não temo os gigantes do caminho, pois o Senhor é o meu escudo.

Eu me levanto com dignidade, falo com clareza e construo meu futuro com mãos diligentes e coração em paz...`,
    scriptureAnchor: {
      verse: '2 Timóteo 1:7 (ARA)',
      text: 'Porque Deus não nos tem dado espírito de covardia, mas de poder, de amor e de moderação.',
    },
    jungianPurpose: 'Integração do Animus Positivo e florescimento da individuação ativa.',
  },
  {
    id: 'dependencias-habitos',
    category: 'Dependências & Fugas',
    title: 'Carta de Despedida às Fugas e Compulsões Anestésicas',
    recipient: 'Ao Meu Hábito de Fuga / Compulsão',
    description: 'Para parar de anestesiar emoções com telas, comida, compras ou substâncias e abraçar a sobriedade.',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    guidingQuestions: [
      'Qual hábito ou anestésico tem roubado seu tempo, dinheiro e clareza mental?',
      'Qual é a dor ou vazio real que você estava tentando calar ao recorrer a essa fuga?',
      'Como você vai acolher essa necessidade de forma santa, saudável e verdadeira a partir de agora?',
    ],
    initialPrompt: `Caro hábito de fuga,

Por muito tempo você foi a minha anestesia favorita. Quando a solidão, o estresse ou o vazio apertavam, eu corria para você em busca de um alívio rápido.

Eu agradeço por ter percebido que você era apenas um sintoma gritando que a minha alma tinha sede de Deus e de cuidado real. Mas o seu ciclo de culpa e exaustão termina aqui.

Eu não preciso mais me entorpecer para tolerar a minha vida. Eu escolho a lucidez, a sobriedade e a paz verdadeira que vem da oração e do descanso no Pai...`,
    scriptureAnchor: {
      verse: '1 Coríntios 6:12 (ARA)',
      text: 'Todas as coisas me são lícitas, mas eu não me deixarei dominar por nenhuma delas.',
    },
    jungianPurpose: 'Ressignificação do Arquétipo do Vazio e canalização consciente da energia psíquica.',
  },
];

const SAVED_LETTERS_KEY = 'florescer_diario_therapeutic_letters_v1';

export const TherapeuticLettersStudio: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(LETTER_TEMPLATES[0].id);
  const [letterRecipient, setLetterRecipient] = useState<string>(LETTER_TEMPLATES[0].recipient);
  const [letterContent, setLetterContent] = useState<string>(LETTER_TEMPLATES[0].initialPrompt);
  const [letterTitle, setLetterTitle] = useState<string>(LETTER_TEMPLATES[0].title);
  const [savedLetters, setSavedLetters] = useState<TherapeuticLetter[]>([]);
  const [copied, setCopied] = useState(false);
  const [burningState, setBurningState] = useState<'idle' | 'burning' | 'dissolved'>('idle');
  const [showSavedList, setShowSavedList] = useState(false);

  const selectedTemplate =
    LETTER_TEMPLATES.find((t) => t.id === selectedTemplateId) || LETTER_TEMPLATES[0];

  // Load saved letters
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_LETTERS_KEY);
      if (stored) {
        setSavedLetters(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync template change
  const handleSelectTemplate = (template: TemplateOption) => {
    setSelectedTemplateId(template.id);
    setLetterTitle(template.title);
    setLetterRecipient(template.recipient);
    setLetterContent(template.initialPrompt);
    setBurningState('idle');
    soundManager.playSingingBowl(528, 1.2);
  };

  const handleSaveDraft = () => {
    const newLetter: TherapeuticLetter = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      title: letterTitle,
      category: selectedTemplate.category,
      recipient: letterRecipient,
      content: letterContent,
      status: 'saved',
    };

    const updated = [newLetter, ...savedLetters];
    setSavedLetters(updated);
    localStorage.setItem(SAVED_LETTERS_KEY, JSON.stringify(updated));
    soundManager.playSingingBowl(528, 2.0);
    alert('✨ Sua Carta Terapêutica foi salva com carinho no seu Altar Íntimo local!');
  };

  const handleBurnSymbolically = () => {
    const confirmBurn = window.confirm(
      '🔥 O Ritual de Queima Simbólica & Entrega a Deus é uma técnica terapêutica profunda:\n\nEsta carta será queimada simbolicamente no fogo do altar de oração, liberando a sua mente de qualquer peso, mágoa ou amarra com o passado.\n\nDeseja realizar a queima sagrada agora?'
    );
    if (!confirmBurn) return;

    soundManager.playSingingBowl(440, 2.0);
    setBurningState('burning');

    setTimeout(() => {
      soundManager.playSingingBowl(528, 3.0);
      setBurningState('dissolved');

      // Save as burned
      const newLetter: TherapeuticLetter = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        title: letterTitle,
        category: selectedTemplate.category,
        recipient: letterRecipient,
        content: letterContent,
        status: 'burned_symbolically',
        burnedDate: new Date().toLocaleDateString('pt-BR'),
      };
      const updated = [newLetter, ...savedLetters.filter((l) => l.id !== newLetter.id)];
      setSavedLetters(updated);
      localStorage.setItem(SAVED_LETTERS_KEY, JSON.stringify(updated));
    }, 2800);
  };

  const handleReset = () => {
    setLetterContent(selectedTemplate.initialPrompt);
    setBurningState('idle');
  };

  const handleCopy = () => {
    const text = `✉️ *${letterTitle}*\nDestinatário: ${letterRecipient}\nData: ${new Date().toLocaleDateString('pt-BR')}\n\n${letterContent}\n\n📖 Sabedoria Bíblica: ${selectedTemplate.scriptureAnchor.verse}\n"${selectedTemplate.scriptureAnchor.text}"\n\n— Florescer Diário | Desenvolvido por Lediane França`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundManager.playSingingBowl(528, 1.0);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const text = `FLORESCER DIÁRIO — CARTA TERAPÊUTICA\n\nTítulo: ${letterTitle}\nDestinatário: ${letterRecipient}\nData: ${new Date().toLocaleDateString('pt-BR')}\nCategoria: ${selectedTemplate.category}\n\n${letterContent}\n\n=========================================\nSABEDORIA BÍBLICA: ${selectedTemplate.scriptureAnchor.verse}\n"${selectedTemplate.scriptureAnchor.text}"\n\nPROPÓSITO PSICANALÍTICO (JUNG):\n${selectedTemplate.jungianPurpose}\n=========================================\nDesenvolvido por Lediane França\n`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Carta_${selectedTemplate.id}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedLetters.filter((l) => l.id !== id);
    setSavedLetters(updated);
    localStorage.setItem(SAVED_LETTERS_KEY, JSON.stringify(updated));
  };

  return (
    <div className="py-12 bg-gradient-to-b from-[#F2FAF4] via-[#FFFFFF] to-[#FFF5F8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Feather className="w-3.5 h-3.5 text-pink-600" />
            <span>Oficina de Escrita Catártica & Espiritual</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#143823] font-normal tracking-tight">
            Oficina de <span className="italic font-serif text-rose-600">Cartas Terapêuticas</span>
          </h2>

          <p className="text-base text-[#385A45] font-light leading-relaxed max-w-2xl mx-auto">
            A técnica epistolar permite extrair dores reprimidas do inconsciente, curar a <strong>criança interior</strong>, selar o <strong>perdão e autoperdão</strong>, romper a <strong>dependência emocional</strong> e queimar simbolicamente as correntes do passado.
          </p>
        </div>

        {/* Template Selector Carousel / Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Escolha a sua Técnica de Carta:
            </span>
            <button
              onClick={() => setShowSavedList(!showSavedList)}
              className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-pink-200 shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Minhas Cartas Guardadas ({savedLetters.length})</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {LETTER_TEMPLATES.map((tmpl) => {
              const isActive = selectedTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-700 to-teal-800 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                      : 'bg-white text-[#1C422C] border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {tmpl.category}
                    </span>
                    <Heart className={`w-3.5 h-3.5 ${isActive ? 'text-pink-300' : 'text-rose-400'}`} />
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                    {tmpl.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Saved Letters Drawer / Modal View */}
        {showSavedList && (
          <div className="p-6 rounded-3xl bg-white border border-pink-200 shadow-md space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-pink-100">
              <h3 className="font-serif text-lg font-bold text-[#143823] flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-600" />
                Altar Íntimo: Suas Cartas Guardadas ({savedLetters.length})
              </h3>
              <button
                onClick={() => setShowSavedList(false)}
                className="text-xs text-gray-500 hover:text-gray-800 font-bold px-3 py-1 bg-gray-100 rounded-full"
              >
                Fechar
              </button>
            </div>

            {savedLetters.length === 0 ? (
              <p className="text-sm text-stone-500 italic py-4 text-center">
                Você ainda não salvou nenhuma carta. Escreva sua primeira carta abaixo e guarde-a no seu Altar Íntimo!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1">
                {savedLetters.map((l) => (
                  <div
                    key={l.id}
                    className="p-4 rounded-2xl bg-[#FCFAF7] border border-stone-200 flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="font-bold text-rose-700">{l.category}</span>
                        <span>{l.date}</span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm">{l.title}</h4>
                      <p className="text-xs text-stone-600 line-clamp-3 mt-1 italic font-serif">
                        "{l.content}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                      <span className="text-[11px] font-medium text-emerald-800">
                        {l.status === 'burned_symbolically' ? '🔥 Queimada & Entregue a Deus' : '🔒 Guardada no Altar'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setLetterTitle(l.title);
                            setLetterRecipient(l.recipient);
                            setLetterContent(l.content);
                            setShowSavedList(false);
                          }}
                          className="px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold"
                        >
                          Carregar
                        </button>
                        <button
                          onClick={() => handleDeleteSaved(l.id)}
                          className="p-1 text-stone-400 hover:text-red-600 rounded-full"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Letter Studio Writing Workspace */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden">
          {/* Top Banner: Technique Guidance & Biblical Wisdom */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#F0FDF4] via-[#FDF2F8] to-[#FFF1F2] border-b border-emerald-100 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${selectedTemplate.badgeColor}`}>
                    {selectedTemplate.category}
                  </span>
                  <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                    <Feather className="w-3.5 h-3.5 text-rose-500" />
                    Técnica Terapêutica Guiada
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143823]">
                  {selectedTemplate.title}
                </h3>
                <p className="text-sm text-[#385A45]">
                  {selectedTemplate.description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => soundManager.playSingingBowl(528, 2.5)}
                  className="px-3.5 py-2 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200 shadow-2xs text-xs font-bold flex items-center gap-1.5"
                  title="Tocar Frequência de Cura 528Hz"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Sino 528Hz</span>
                </button>
              </div>
            </div>

            {/* Psychological Purpose + Scripture Anchor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/90 border border-stone-200 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  Propósito Psicanalítico (Jung):
                </span>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {selectedTemplate.jungianPurpose}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Âncora na Sabedoria Bíblica:
                  </span>
                  <span className="text-emerald-700">{selectedTemplate.scriptureAnchor.verse}</span>
                </div>
                <blockquote className="font-serif text-xs italic text-emerald-950 leading-relaxed">
                  “{selectedTemplate.scriptureAnchor.text}”
                </blockquote>
              </div>
            </div>

            {/* Guiding Questions Helper */}
            <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-900 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-pink-600" />
                Perguntas Disparadoras para Inspirar sua Escrita:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-pink-950">
                {selectedTemplate.guidingQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-rose-600">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Letter Editor Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Recipient and Title inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                  Destinatário da Carta:
                </label>
                <input
                  type="text"
                  value={letterRecipient}
                  onChange={(e) => setLetterRecipient(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FCFAF7] border border-emerald-200 text-sm font-semibold text-[#143823] focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  placeholder="Ex: Minha Menina Interior, Nome da Pessoa..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                  Título da Carta:
                </label>
                <input
                  type="text"
                  value={letterTitle}
                  onChange={(e) => setLetterTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FCFAF7] border border-emerald-200 text-sm font-semibold text-[#143823] focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
                  placeholder="Título da sua carta"
                />
              </div>
            </div>

            {/* The Textarea Stage with Burn Animation */}
            <div className="relative">
              {burningState === 'burning' && (
                <div className="absolute inset-0 z-20 rounded-3xl bg-gradient-to-t from-orange-600/90 via-rose-500/80 to-amber-400/90 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-4 animate-pulse p-6 text-center">
                  <Flame className="w-16 h-16 text-amber-200 animate-bounce" />
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold">
                    Queimando Simbolicamente no Altar...
                  </h4>
                  <p className="text-sm text-amber-100 max-w-md">
                    Entregando todo o peso, mágoa e ressentimento a Deus. O passado não tem mais poder sobre você.
                  </p>
                </div>
              )}

              {burningState === 'dissolved' ? (
                <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-pink-50 border-2 border-emerald-300 text-center space-y-5 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <Sun className="w-8 h-8 text-amber-200" />
                  </div>
                  <h4 className="font-serif text-3xl font-bold text-emerald-950">
                    Carta Consumida & Entregue a Deus!
                  </h4>
                  <p className="text-base text-[#1C422C] max-w-xl mx-auto leading-relaxed">
                    A dívida foi cancelada. O peso foi retirado. Pela autoridade da fé e da consciência, você está em paz, livre e guardada pela graça do Senhor.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                    >
                      Escrever Nova Carta
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium">Escreva com o coração livre e sem julgamentos:</span>
                    <span>{letterContent.length} caracteres</span>
                  </div>
                  <textarea
                    rows={12}
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    className="w-full p-5 rounded-3xl bg-[#FAF7F2] border border-emerald-200 font-serif text-base text-[#1E3326] leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:bg-white shadow-inner resize-y"
                    placeholder="Comece a escrever sua carta..."
                  />
                </div>
              )}
            </div>

            {/* Action Buttons Toolbar */}
            {burningState !== 'dissolved' && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSaveDraft}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Guardar no Altar Íntimo</span>
                  </button>

                  <button
                    onClick={handleBurnSymbolically}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                    title="Realizar ritual de queima simbólica e entrega espiritual"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-200" />
                    <span>Ritual de Queima Simbólica</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                    title="Copiar texto da carta"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="hidden sm:inline text-emerald-700 font-bold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-700" />
                        <span className="hidden sm:inline">Copiar</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="p-2.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                    title="Baixar como arquivo .txt"
                  >
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span className="hidden sm:inline">Baixar .TXT</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-semibold transition-all shadow-2xs"
                    title="Restaurar modelo inicial"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
