import React, { useState } from 'react';
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

export const ReflectionLab: React.FC<ReflectionLabProps> = ({ onSaveToJournal }) => {
  const [situation, setSituation] = useState('');
  const [category, setCategory] = useState<'relacionamento' | 'sombra' | 'fe' | 'limites' | 'gratidao'>('relacionamento');
  const [relationshipRole, setRelationshipRole] = useState('Casamento / Namoro');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ReflectionAnalysis | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const sampleSituations = [
    {
      label: 'Medo de Rejeição & Silêncio',
      text: 'Sinto que meu parceiro se fecha quando tento conversar. Isso ativa uma dor profunda de rejeição e medo de abandono, e acabo explodindo ou me anulando para agradar.',
      category: 'relacionamento' as const,
      role: 'Casamento / Relacionamento',
    },
    {
      label: 'Sensação de Não Merecimento',
      text: 'Mesmo quando recebo elogios ou conquistas, sinto que não mereço ser vista ou respeitada. Acho que a qualquer momento vão me abandonar ou criticar.',
      category: 'sombra' as const,
      role: 'Identidade & Autoestima',
    },
    {
      label: 'Cobrança Familiar & Culpa',
      text: 'Minha família sempre espera que eu resolva os problemas de todos. Quando digo que não posso ajudar, sou tratada como egoísta e me sinto sem valor.',
      category: 'limites' as const,
      role: 'Família / Pais',
    },
  ];

  const handleAnalyze = async (customSituation?: string, customCategory?: any, customRole?: string) => {
    const textToAnalyze = customSituation || situation;
    if (!textToAnalyze.trim() || isLoading) return;

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

      if (!res.ok) throw new Error('Erro ao processar reflexão');
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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!analysis) return;
    const inControlText = analysis.chamadoAutoResponsabilidade.sobMinhaSoberania.join('\n• ');
    const outOfControlText = analysis.chamadoAutoResponsabilidade.foraDoMeuControle.join('\n• ');

    if (onSaveToJournal) {
      onSaveToJournal({
        title: analysis.tituloDiagnostico,
        content: `Situação analisada: ${situation}\n\nDiagnóstico Junguiano (${analysis.lenteJunguiana.conceitoChave}):\n${analysis.lenteJunguiana.explicacao}\n\nPergunta da Sombra: ${analysis.lenteJunguiana.perguntaSombra}\n\nAção Prática: ${analysis.acaoConsciente}`,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Laboratório de Autorresponsabilidade & Cura</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
          Da Reatividade à Soberania Interior
        </h2>
        <p className="text-sm sm:text-base text-[#385A45] leading-relaxed">
          Traga uma dor, ferida de rejeição, cobrança ou conflito. Nossa análise examina sua situação sob a lente de <strong>Carl Jung</strong>, ilumina com a <strong>Sabedoria Bíblica</strong> e devolve o poder de escolha e merecimento à sua <strong>autorresponsabilidade</strong>.
        </p>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Sample Situation Quick Selectors */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 block mb-2">
            Ou escolha uma situação comum para examinar com carinho:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleSituations.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSituation(sample.text);
                  setCategory(sample.category);
                  setRelationshipRole(sample.role);
                  handleAnalyze(sample.text, sample.category, sample.role);
                }}
                className="text-xs px-3.5 py-1.5 rounded-full bg-[#F4FAF6] border border-emerald-200 text-[#1C422C] hover:bg-rose-50 hover:text-rose-900 hover:border-pink-300 transition-all font-medium"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
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
            <label className="block text-xs font-semibold text-[#1C422C] uppercase tracking-wider mb-1.5">
              Descreva com honestidade o que aconteceu e como você se sentiu:
            </label>
            <textarea
              rows={4}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Ex: Tivemos uma conversa difícil e me senti completamente invisível e sem valor. Fiquei muito magoada e com medo de ser rejeitada..."
              className="w-full p-4 rounded-2xl bg-[#F8FCF9] border border-emerald-200 text-sm text-[#143823] placeholder-[#6E8F7A] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={!situation.trim() || isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                <span>Analisando Lente Psicanalítica & Bíblica...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Processar Análise de Consciência</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Diagnostic Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Diagnóstico de Consciência
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#143823] font-semibold mt-1">
                {analysis.tituloDiagnostico}
              </h3>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4FAF6] border border-emerald-200 text-xs font-semibold text-[#1C422C] hover:bg-emerald-100 shadow-2xs transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Salvo no Diário!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-emerald-700" />
                  <span>Salvar no Diário da Alma</span>
                </>
              )}
            </button>
          </div>

          {/* 4 Pillars Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pillar 1: Jungian Psychology */}
            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Psicanálise de Carl Jung: {analysis.lenteJunguiana.conceitoChave}</span>
              </div>
              <p className="text-sm text-[#143823] leading-relaxed">
                {analysis.lenteJunguiana.explicacao}
              </p>
              <div className="mt-4 p-3.5 rounded-xl bg-white border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 block mb-1">
                  Pergunta da Sombra (Olhar para Dentro com Amor):
                </span>
                <p className="text-sm text-[#1C422C] italic">
                  "{analysis.lenteJunguiana.perguntaSombra}"
                </p>
              </div>
            </div>

            {/* Pillar 2: Scripture */}
            <div className="p-6 rounded-2xl bg-[#FDF2F8] border border-pink-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Sabedoria Bíblica: {analysis.sabedoriaBiblicaAra.referencia}</span>
              </div>
              <blockquote className="font-serif text-lg text-[#143823] italic border-l-3 border-rose-500 pl-3 py-1">
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
            <div className="p-6 rounded-2xl bg-[#FFF1F2] border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Fora do Meu Controle (Preciso Soltar e Entregar)</span>
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
            <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-emerald-200 space-y-3">
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
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-[#FDF2F8] to-[#FFF1F2] border border-emerald-200 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                Ação Prática Consciente para Hoje
              </span>
              <p className="text-sm text-[#143823] font-medium leading-relaxed">
                {analysis.acaoConsciente}
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-100">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                Afirmação de Maturidade, Identidade & Fé
              </span>
              <p className="font-serif text-lg text-[#143823] italic">
                “{analysis.afirmacaoDiaria}”
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
