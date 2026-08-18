import React, { useState } from 'react';
import { ARA_VERSES_COLLECTION } from '../data/biblicalAraData';
import { AraVerse } from '../types';
import {
  BookOpen,
  Sparkles,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Volume2,
  Send,
  Loader2,
  Lightbulb,
  Zap,
  Flower2,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface GeneratedDevotional {
  titulo: string;
  versiculoAra: {
    referencia: string;
    texto: string;
  };
  temaJunguiano: string;
  conteudoReflexao: string;
  perguntaDeOuro: string;
  oracaoContemplativa: string;
  desafioPratico: string;
}

const QUICK_TOPIC_PILLS = [
  { label: 'Criança Interior', prompt: 'Cura da Criança Interior e Acolhimento da Menina que Fui' },
  { label: 'Auto-Perdão', prompt: 'Auto-Perdão, Libertação de Culpa e Paz com Meu Passado' },
  { label: 'Poder Pessoal', prompt: 'Ativação do Poder Pessoal, Coragem e Firmeza de Limites' },
  { label: 'Pertencimento', prompt: 'Sentimento de Pertencimento, Solidão e Aceitação Divina' },
  { label: 'Dependência Emocional', prompt: 'Rompendo a Dependência Emocional e a Necessidade de Aprovação' },
  { label: 'Rejeição & Abandono', prompt: 'Cura das Feridas de Rejeição, Abandono e Medo de não ser Vista' },
  { label: 'Autoestima & Valor', prompt: 'Autoestima Inegociável, Identidade e Merecimento de Prosperar' },
];

export const DailyWordSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [devotionalCopied, setDevotionalCopied] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [customTheme, setCustomTheme] = useState('');
  const [aiDevotional, setAiDevotional] = useState<GeneratedDevotional | null>(null);

  const currentVerse: AraVerse = ARA_VERSES_COLLECTION[currentIndex];

  const handleNext = () => {
    soundManager.playSingingBowl(440, 1.2);
    setCurrentIndex((prev) => (prev + 1) % ARA_VERSES_COLLECTION.length);
  };

  const handlePrev = () => {
    soundManager.playSingingBowl(392, 1.2);
    setCurrentIndex((prev) => (prev === 0 ? ARA_VERSES_COLLECTION.length - 1 : prev - 1));
  };

  const handleCopy = () => {
    const textToCopy = `✨ ${currentVerse.reference}\n"${currentVerse.text}"\n\n🧠 Reflexão Junguiana: ${currentVerse.jungianReflection}\n\n🌱 Pergunta de Auto-responsabilidade: ${currentVerse.selfResponsibilityPrompt}\n\n— Florescer Diário | Desenvolvido por Lediane França`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    soundManager.playSingingBowl(528, 1.5);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateClientFallbackDevotional = (themeText: string): GeneratedDevotional => {
    const lower = themeText.toLowerCase();

    if (lower.includes('criança') || lower.includes('menina') || lower.includes('infância')) {
      return {
        titulo: 'O Abraço de Graça à Sua Menina Interior',
        temaJunguiano: 'Integração do Arquétipo da Criança Divina e Maternagem do Self',
        versiculoAra: {
          referencia: 'Isaías 66:13 (ARA)',
          texto: 'Como alguém a quem sua mãe consola, assim eu vos consolarei; e em Jerusalém vós sereis consolados.',
        },
        conteudoReflexao: 'Muitas vezes, a mulher madura que cumpre todas as suas obrigações ainda guarda no íntimo a ansiedade de uma menina que sentiu medo de ser rejeitada ou deixada de lado. Na psicologia profunda de Carl Jung, a Criança Interior é a chave da espontaneidade, criatividade e afeto autêntico.\n\nQuando você assume a responsabilidade afetuosa de cuidar de si mesma — acolhendo seus limites e confiando no consolo divino —, você quebra a carência que busca validação externa. Em Deus, a sua história é honrada e acolhida por inteiro.',
        perguntaDeOuro: 'Que palavra de segurança e acolhimento a sua menina interior mais precisa ouvir de você hoje?',
        oracaoContemplativa: 'Senhor, eu coloco nas Tuas mãos as memórias da minha infância. Acolho a menina que fui e firmo a mulher soberana que sou sob a Tua graça abundante. Amém.',
        desafioPratico: 'Dedique 5 minutos do seu dia a uma pausa gentil, respirando fundo e reconhecendo todo o caminho que você já percorreu.',
      };
    }

    if (lower.includes('perdão') || lower.includes('culpa') || lower.includes('autoperdão') || lower.includes('mágoa')) {
      return {
        titulo: 'A Chave do Perdão e a Desobstrução da Alma',
        temaJunguiano: 'Dissolução dos Complexos de Amargura e Integração Compassiva',
        versiculoAra: {
          referencia: 'Colossenses 3:13 (ARA)',
          texto: 'Suportai-vos uns aos outros, perdoai-vos mutuamente, caso alguém tenha motivo de queixa contra outrem. Assim como o Senhor vos perdoou, assim também perdoai vós.',
        },
        conteudoReflexao: 'Guardar ressentimentos ou punir-se por decisões do passado consome uma quantidade preciosa de energia psíquica. O perdão e o autoperdão não significam concordar com o erro; significam retirar o poder da ofensa sobre a sua paz de hoje.\n\nAo perdoar, você corta os laços emocionais com a dor e reassume o leme da sua própria história com elegância e maturidade espiritual.',
        perguntaDeOuro: 'Qual peso do passado você decide soltar hoje para abrir espaço ao florescimento do seu presente?',
        oracaoContemplativa: 'Pai amado, como recebi a Tua graça sem merecer, eu escolho liberar perdão a quem me feriu e depor as armas contra mim mesma. Descanso na Tua paz. Amém.',
        desafioPratico: 'Declare em voz baixa: "Eu cancelo as dívidas emocionais do meu passado. Minha alma é livre e plena".',
      };
    }

    if (lower.includes('dependência') || lower.includes('aprovação') || lower.includes('rejeição') || lower.includes('abandono')) {
      return {
        titulo: 'Soberania Emocional e Quebra da Mendicância Afetiva',
        temaJunguiano: 'Recolhimento de Projeções e Fortalecimento do Eixo Ego-Self',
        versiculoAra: {
          referencia: 'Jeremias 17:7 (ARA)',
          texto: 'Bendito o homem que confia no Senhor e cuja esperança é o Senhor.',
        },
        conteudoReflexao: 'Quando depositamos nossa sensação de valor nas mãos alheias, nos tornamos vulneráveis a qualquer oscilação de humor ou ausência do outro. A sabedoria bíblica e a psicanálise nos ensinam que o valor da mulher é estabelecido por Deus.\n\nA autorresponsabilidade emocional é a chave que abre a porta da liberdade: você assume suas próprias escolhas, estabelece limites claros com delicadeza e firmeza, e cultiva relacionamentos baseados no respeito mútuo.',
        perguntaDeOuro: 'Onde você tem se diminuído para caber na expectativa alheia, e qual limite saudável você pode erguer hoje?',
        oracaoContemplativa: 'Senhor, a minha segurança e o meu valor vêm de Ti. Renova a minha mente para que eu viva com dignidade, amor próprio e paz no coração. Amém.',
        desafioPratico: 'Pratique um "não" sereno e respeitoso para aquilo que rouba sua tranquilidade ou desrespeita seus princípios.',
      };
    }

    // Default Devotional
    return {
      titulo: 'Poder Pessoal, Identidade & Renovação da Mente',
      temaJunguiano: 'Individuação e Consciência do Valor Sagrado do Ser',
      versiculoAra: {
        referencia: '2 Timóteo 1:7 (ARA)',
        texto: 'Porque Deus não nos tem dado espírito de covardia, mas de poder, de amor e de moderação.',
      },
      conteudoReflexao: `Para o tema "${themeText || 'Poder Pessoal e Cura Interior'}", a sabedoria divina e a psicanálise profunda nos lembram de que fomos dotadas de capacidade, inteligência e graça para governar a nossa própria vida.\n\nVocê não precisa mais se posicionar a partir da fragilidade ou do desamparo. Com clareza, fé e limites saudáveis, o seu florescer diário se torna uma realidade sólida e inspiradora.`,
      perguntaDeOuro: 'Qual atitude madura e amorosa você pode tomar hoje para honrar a sua identidade em Deus?',
      oracaoContemplativa: 'Pai celeste, firma os meus passos na verdade da Tua Palavra. Que a minha alma descanse em Ti e que as minhas atitudes reflitam amor, poder e sabedoria. Amém.',
      desafioPratico: 'Faça hoje uma escolha consciente de cuidar do seu bem-estar físico, emocional e espiritual.',
    };
  };

  const handleGenerateAiDevotional = async (e?: React.FormEvent, overrideTheme?: string) => {
    if (e) e.preventDefault();
    const themeToUse = overrideTheme || customTheme || 'Poder Pessoal, Cura Interior e Autoestima na Sabedoria Bíblica';
    setIsAiLoading(true);
    soundManager.playSingingBowl(528, 2.0);

    try {
      const res = await fetch('/api/generate-devotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeToUse }),
      });

      if (!res.ok) {
        throw new Error('Falha na resposta do servidor');
      }

      const data = await res.json();
      if (data && data.titulo && data.versiculoAra) {
        setAiDevotional(data);
      } else {
        setAiDevotional(generateClientFallbackDevotional(themeToUse));
      }
      soundManager.playAffirmationChime();
    } catch (err) {
      console.warn('Utilizando gerador seguro de devocional acolhedor:', err);
      setAiDevotional(generateClientFallbackDevotional(themeToUse));
      soundManager.playAffirmationChime();
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSelectPill = (prompt: string) => {
    setCustomTheme(prompt);
    handleGenerateAiDevotional(undefined, prompt);
  };

  const handleCopyDevotional = () => {
    if (!aiDevotional) return;
    const text = `🌸 *Florescer Diário — Devocional Especial*\n\n✨ *${aiDevotional.titulo}*\n🌿 Linha Terapêutica: ${aiDevotional.temaJunguiano}\n\n📖 *${aiDevotional.versiculoAra.referencia}*\n"${aiDevotional.versiculoAra.texto}"\n\n💭 *Reflexão & Consciência:*\n${aiDevotional.conteudoReflexao}\n\n🔑 *Pergunta de Ouro para a Alma:*\n"${aiDevotional.perguntaDeOuro}"\n\n🛡️ *Desafio Prático:*\n${aiDevotional.desafioPratico}\n\n🙏 *Oração Contemplativa:*\n"${aiDevotional.oracaoContemplativa}"\n\n— Florescer Diário | Desenvolvido por Lediane França`;
    navigator.clipboard.writeText(text);
    setDevotionalCopied(true);
    soundManager.playSingingBowl(528, 1.2);
    setTimeout(() => setDevotionalCopied(false), 2500);
  };

  return (
    <section className="py-12 bg-[#F6FAF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Palavra Viva & Consciência Diária</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
              Acolhimento da Alma & Sabedoria Bíblica
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              title="Palavra anterior"
              className="p-2 rounded-full border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 transition-all shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#385A45] font-medium px-2">
              {currentIndex + 1} de {ARA_VERSES_COLLECTION.length}
            </span>
            <button
              onClick={handleNext}
              title="Próxima palavra"
              className="p-2 rounded-full border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 transition-all shadow-2xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Scripture & Jungian Reflection Card */}
        <div className="bg-white rounded-3xl border border-emerald-200/90 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle watermark background icon */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-emerald-800">
            <BookOpen className="w-72 h-72" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Top theme badge & copy button */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                {currentVerse.theme}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => soundManager.playSingingBowl(528, 2.5)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 transition-all cursor-pointer"
                  title="Ouvir sino suave de paz"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sino de Paz</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-medium text-emerald-900 bg-white hover:bg-emerald-50 shadow-2xs transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copiado com Carinho</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiar Reflexão</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scripture Verse Quote */}
            <div className="space-y-3">
              <blockquote className="font-serif text-2xl sm:text-3xl text-[#143823] font-normal leading-relaxed italic">
                “{currentVerse.text}”
              </blockquote>
              <div className="text-sm font-semibold tracking-wider text-rose-700 uppercase font-sans">
                — {currentVerse.reference}
              </div>
            </div>

            {/* Structured Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-emerald-100">
              {/* Pillar 1: Jungian Depth */}
              <div className="p-5 rounded-2xl bg-[#FFF9FB] border border-pink-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-800 uppercase tracking-wide mb-2">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  <span>Lente de Carl Jung</span>
                </div>
                <p className="text-sm text-[#4E2838] leading-relaxed">
                  {currentVerse.jungianReflection}
                </p>
              </div>

              {/* Pillar 2: Self-Responsibility Question */}
              <div className="p-5 rounded-2xl bg-[#F4FAF6] border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-2">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>Auto-responsabilidade</span>
                </div>
                <p className="text-sm text-[#1C422C] leading-relaxed italic">
                  "{currentVerse.selfResponsibilityPrompt}"
                </p>
              </div>

              {/* Pillar 3: Practical Action */}
              <div className="p-5 rounded-2xl bg-[#F4FAF6] border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Passo Prático de Hoje</span>
                </div>
                <p className="text-sm text-[#1C422C] leading-relaxed">
                  {currentVerse.practicalAction}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Custom Devotional Generator Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EBF8EE] via-[#FDF2F7] to-[#FFF0F5] border border-emerald-200 shadow-xs space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 mb-1">
              <Flower2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Gerador de Devocional & Pílula de Consciência</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#143823] font-semibold mb-2">
              Gerar Devocional Sob Medida para o seu Momento
            </h3>
            <p className="text-sm text-[#385A45] leading-relaxed mb-4">
              Receba uma mensagem acolhedora e profissional unindo a Sabedoria Bíblica (tradução ARA), psicanálise junguiana e direcionamento prático para a sua alma.
            </p>

            {/* Quick Topic Pills */}
            <div className="space-y-2 mb-5">
              <span className="text-xs font-semibold text-emerald-900 block">
                Temas sugeridos para reflexão imediata:
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_TOPIC_PILLS.map((pill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPill(pill.prompt)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-300 transition-all shadow-2xs hover:scale-[1.02] cursor-pointer"
                  >
                    ✨ {pill.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerateAiDevotional} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                placeholder="Ex: Como curar o medo da rejeição e ativar meu poder pessoal"
                className="flex-1 px-4 py-3 rounded-full bg-white border border-emerald-300 text-sm text-[#143823] placeholder-[#6E8F7A] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
              <button
                type="submit"
                disabled={isAiLoading}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Conectando Sabedoria...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-200" />
                    <span>Gerar Devocional</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Devotional Result Display */}
          {aiDevotional && (
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-emerald-200 space-y-6 shadow-sm animate-in fade-in slide-in-from-top-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                    Devocional Acolhedor Gerado
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#143823] font-bold">
                    {aiDevotional.titulo}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    {aiDevotional.temaJunguiano}
                  </span>
                  <button
                    onClick={handleCopyDevotional}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-medium text-emerald-900 bg-white hover:bg-emerald-50 transition-all cursor-pointer"
                    title="Copiar Devocional"
                  >
                    {devotionalCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Biblical Scripture (ARA) */}
              <div className="p-5 rounded-2xl bg-[#F4FAF6] border-l-4 border-emerald-600 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Palavra Bíblica de Sustentação (ARA)</span>
                </div>
                <p className="font-serif text-lg text-[#143823] italic leading-relaxed">
                  “{aiDevotional.versiculoAra.texto}”
                </p>
                <span className="text-xs font-semibold text-emerald-800 block">
                  — {aiDevotional.versiculoAra.referencia}
                </span>
              </div>

              {/* Reflection */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Reflexão e Consciência
                </h5>
                <p className="text-sm text-[#2E523A] leading-relaxed whitespace-pre-line">
                  {aiDevotional.conteudoReflexao}
                </p>
              </div>

              {/* Golden Question & Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#FFF9FB] border border-pink-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-800 block mb-1">
                    Pergunta de Ouro para a Alma
                  </span>
                  <p className="text-sm text-[#4E2838] italic font-medium leading-relaxed">
                    "{aiDevotional.perguntaDeOuro}"
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#F4FAF6] border border-emerald-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Desafio Prático de Auto-responsabilidade
                  </span>
                  <p className="text-sm text-[#1C422C] leading-relaxed">
                    {aiDevotional.desafioPratico}
                  </p>
                </div>
              </div>

              {/* Prayer */}
              <div className="p-5 rounded-2xl bg-[#F7FCF9] border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Oração Contemplativa
                </span>
                <p className="text-sm text-[#143823] italic leading-relaxed">
                  "{aiDevotional.oracaoContemplativa}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
