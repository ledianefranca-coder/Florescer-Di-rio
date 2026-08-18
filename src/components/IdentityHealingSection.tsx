import React, { useState } from 'react';
import { IDENTITY_AND_WORTH_TOPICS } from '../data/identityAndWorthTopics';
import { IdentityHealingTopic } from '../types';
import {
  Sparkles,
  Heart,
  BookOpen,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Lock,
  Unlock,
  Copy,
  Check,
  Volume2,
  Flower2,
  Sun,
  Eye,
  ShieldAlert,
  UserCheck,
  Award,
  Feather,
  Flame,
  Zap,
  CheckSquare,
  Square,
  HelpCircle,
  Clock,
  Send,
  MessageCircle,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface IdentityHealingSectionProps {
  onOpenLetterStudio?: (category?: string) => void;
}

export const IdentityHealingSection: React.FC<IdentityHealingSectionProps> = ({ onOpenLetterStudio }) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(IDENTITY_AND_WORTH_TOPICS[0].id);
  const [copied, setCopied] = useState(false);
  const [prayerCopied, setPrayerCopied] = useState(false);
  const [checkedTips, setCheckedTips] = useState<Record<string, boolean>>({});
  const [exerciseAnswer, setExerciseAnswer] = useState<string>('');
  const [exerciseSaved, setExerciseSaved] = useState<boolean>(false);

  const activeTopic = IDENTITY_AND_WORTH_TOPICS.find((t) => t.id === activeTopicId) || IDENTITY_AND_WORTH_TOPICS[0];

  const handleSelectTopic = (topic: IdentityHealingTopic) => {
    setActiveTopicId(topic.id);
    setExerciseAnswer('');
    setExerciseSaved(false);
    soundManager.playSingingBowl(528, 1.2);
  };

  const handleToggleTip = (tipIndex: number) => {
    const key = `${activeTopic.id}-${tipIndex}`;
    setCheckedTips((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    soundManager.playSingingBowl(528, 0.8);
  };

  const handleCopyPrayer = () => {
    const textToCopy = `🕊️ *Florescer Diário — Oração ao Espírito Santo*\n*Pilar: ${activeTopic.pillarLabel}*\n\n"${activeTopic.holySpiritPrayer}"\n\n— Florescer Diário | Desenvolvido por Lediane França`;
    navigator.clipboard.writeText(textToCopy);
    setPrayerCopied(true);
    soundManager.playSingingBowl(528, 1.0);
    setTimeout(() => setPrayerCopied(false), 2500);
  };

  const handleCopyAffirmation = () => {
    const textToCopy = `🌸 *Florescer Diário — Pilar de Cura: ${activeTopic.pillarLabel}*\n\n📖 Sabedoria Bíblica: ${activeTopic.biblicalWisdom.verse}\n"${activeTopic.biblicalWisdom.text}"\n\n✨ Revelação: ${activeTopic.biblicalWisdom.revelation}\n\n🕊️ Oração ao Espírito Santo:\n"${activeTopic.holySpiritPrayer}"\n\n🧠 Diagnóstico Junguiano: ${activeTopic.jungianDiagnosis.concept}\n${activeTopic.jungianDiagnosis.healingPath}\n\n👑 Salto de Autorresponsabilidade:\n• Antes: ${activeTopic.responsibilityShift.victimBelief}\n• Agora: ${activeTopic.responsibilityShift.sovereignTruth}\n\n⚡ Poder Pessoal: ${activeTopic.innerStrengthActivation.powerMantra}\n\n💖 Afirmação: "${activeTopic.affirmationOfWorth}"\n\n— Florescer Diário | Desenvolvido por Lediane França`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    soundManager.playSingingBowl(528, 1.0);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveExerciseReflection = () => {
    if (!exerciseAnswer.trim()) return;
    setExerciseSaved(true);
    soundManager.playSingingBowl(528, 1.8);
    setTimeout(() => setExerciseSaved(false), 3000);
  };

  const getPillarIcon = (pillar: string) => {
    switch (pillar) {
      case 'autoestima':
        return <Heart className="w-4 h-4 text-pink-600" />;
      case 'identidade':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'pertencimento':
        return <Sun className="w-4 h-4 text-amber-600" />;
      case 'crianca-interior':
        return <Flower2 className="w-4 h-4 text-pink-500" />;
      case 'perdao':
        return <Flame className="w-4 h-4 text-rose-600" />;
      case 'auto-perdao':
        return <Heart className="w-4 h-4 text-teal-600" />;
      case 'forca-interna':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'dependencia-emocional':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'dependencias-habitos':
        return <ShieldCheck className="w-4 h-4 text-teal-600" />;
      case 'merecimento':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'rejeicao':
        return <ShieldCheck className="w-4 h-4 text-rose-600" />;
      case 'abandono':
        return <Compass className="w-4 h-4 text-teal-600" />;
      case 'valor-proprio':
        return <ShieldAlert className="w-4 h-4 text-pink-600" />;
      case 'ser-vista':
        return <Eye className="w-4 h-4 text-emerald-600" />;
      default:
        return <Flower2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-[#F2FAF4] via-[#FFFFFF] to-[#FFF5F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Guia Completo de Fortalecimento da Alma Feminina</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#143823] font-normal tracking-tight">
            Cura, Pertencimento & <span className="italic font-serif text-rose-600">Força Interna</span>
          </h2>

          <p className="text-base text-[#385A45] font-light leading-relaxed max-w-3xl mx-auto">
            Aborde os pilares fundamentais da psique feminina: cure a <strong>criança interior</strong>, experimente o <strong>perdão e autoperdão</strong>, liberte-se da <strong>dependência emocional</strong>, encontre seu <strong>pertencimento</strong> e desenvolva sua <strong>capacidade e força interna</strong>.
          </p>
        </div>

        {/* 14 Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {IDENTITY_AND_WORTH_TOPICS.map((topic) => {
            const isActive = activeTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                id={`btn-pillar-${topic.pillar}`}
                onClick={() => handleSelectTopic(topic)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all transform active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                    : 'bg-white text-[#1C422C] border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                {getPillarIcon(topic.pillar)}
                <span>{topic.pillarLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Deep Dive Card */}
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden transition-all animate-in fade-in">
          {/* Top Banner with Title & Badges */}
          <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-[#F0FDF4] via-[#FDF2F8] to-[#FFF1F2] border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeTopic.badgeColor}`}>
                  Pilar: {activeTopic.pillarLabel}
                </span>
                <span className="text-xs text-[#527961] font-medium flex items-center gap-1">
                  <Flower2 className="w-3.5 h-3.5 text-rose-500" />
                  Psicanálise (Carl Jung) & Sabedoria Bíblica
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143823] leading-tight">
                {activeTopic.title}
              </h3>
              <p className="text-sm text-[#385A45] font-light max-w-3xl">
                {activeTopic.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => soundManager.playSingingBowl(528, 2.0)}
                className="p-3 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200 shadow-2xs transition-all"
                title="Sino de Paz e Elevação 528Hz"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
              </button>

              <button
                onClick={handleCopyAffirmation}
                className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Compartilhar Pilar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card Body Grid */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-10">
            {/* Dilemma Callout */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                  O Conflito Central da Alma Feminina:
                </span>
                <p className="text-sm text-amber-950 mt-1 leading-relaxed">
                  {activeTopic.coreDilemma}
                </p>
              </div>
            </div>

            {/* Two Pillars Grid: Jungian Diagnosis & Biblical Wisdom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1. Jungian Diagnosis */}
              <div className="p-6 rounded-3xl bg-[#FCFAF7] border border-stone-200 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Diagnóstico Psicanalítico (Carl Jung)</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Conceito: {activeTopic.jungianDiagnosis.concept}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-rose-700 block mb-1">
                      A Raiz Oculta na Sombra:
                    </span>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {activeTopic.jungianDiagnosis.shadowRoot}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-200/60">
                    <span className="text-xs font-semibold text-emerald-700 block mb-1">
                      Caminho de Integração & Cura:
                    </span>
                    <p className="text-sm text-stone-800 leading-relaxed font-medium">
                      {activeTopic.jungianDiagnosis.healingPath}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Biblical Wisdom */}
              <div className="p-6 rounded-3xl bg-[#F0FDF4] border border-emerald-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    Sabedoria Bíblica
                  </span>
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-emerald-300 font-semibold text-emerald-800">
                    {activeTopic.biblicalWisdom.verse}
                  </span>
                </div>

                <blockquote className="font-serif text-lg sm:text-xl text-[#123821] italic leading-relaxed">
                  “{activeTopic.biblicalWisdom.text}”
                </blockquote>

                <div className="pt-2 border-t border-emerald-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    🕊️ Revelação Espiritual:
                  </span>
                  <p className="text-sm text-[#1C422C] leading-relaxed">
                    {activeTopic.biblicalWisdom.revelation}
                  </p>
                </div>
              </div>
            </div>

            {/* NEW: Oração de Clamor e Ajuda ao Espírito Santo */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FEFCE8]/90 via-[#F0FDF4] to-[#FFF1F2] border border-amber-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-2xs">
                    <Flame className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                      Oração de Clamor ao Espírito Santo
                    </span>
                    <span className="text-[11px] text-amber-800/80 font-medium">
                      Pedindo ajuda e renovação no pilar de {activeTopic.pillarLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => soundManager.playSingingBowl(528, 2.2)}
                    className="px-3.5 py-1.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200 shadow-2xs text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sino 528Hz</span>
                  </button>

                  <button
                    onClick={handleCopyPrayer}
                    className="px-3.5 py-1.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white shadow-2xs text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    {prayerCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-200" />
                        <span>Oração Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-100" />
                        <span>Copiar Oração</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <blockquote className="font-serif text-base sm:text-lg text-[#193B26] italic font-medium leading-relaxed bg-white/70 p-5 rounded-2xl border border-amber-100/90 shadow-2xs">
                “{activeTopic.holySpiritPrayer}”
              </blockquote>
            </div>

            {/* Self-Responsibility Shift: Victim vs Sovereign */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-white to-emerald-50 border border-pink-200 space-y-5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-900">
                <Compass className="w-4 h-4 text-pink-600" />
                <span>O Salto da Autorresponsabilidade Emocional</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Victim Pattern */}
                <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Padrão de Reatividade & Vítima:</span>
                  </div>
                  <p className="text-sm text-rose-950 italic">
                    {activeTopic.responsibilityShift.victimBelief}
                  </p>
                </div>

                {/* Sovereign Conscious Pattern */}
                <div className="p-5 rounded-2xl bg-white border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Padrão de Soberania & Graça:</span>
                  </div>
                  <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                    {activeTopic.responsibilityShift.sovereignTruth}
                  </p>
                </div>
              </div>
            </div>

            {/* NEW: Dicas Práticas no Dia a Dia & Ativação de Força Interna Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Actionable Tips with Interactive Checkbox */}
              <div className="p-6 rounded-3xl bg-white border border-emerald-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Dicas Práticas no Dia a Dia
                  </h4>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Marque as que praticou hoje
                  </span>
                </div>

                <div className="space-y-3">
                  {activeTopic.dailyTips.map((tip, idx) => {
                    const isChecked = !!checkedTips[`${activeTopic.id}-${idx}`];
                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleTip(idx)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                            : 'bg-[#FCFAF7] border-stone-200 text-stone-800 hover:border-emerald-200'
                        }`}
                      >
                        <button className="mt-0.5 flex-shrink-0 text-emerald-600">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <Square className="w-4 h-4 text-stone-400" />
                          )}
                        </button>
                        <span className="text-sm leading-relaxed">{tip}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inner Strength & Resilience Activation */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-emerald-50 to-teal-50 border border-amber-200 space-y-4 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 pb-3 border-b border-amber-200/80">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Ativação de Força Interna & Soberania</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="p-4 rounded-2xl bg-white/90 border border-amber-200/70">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                        ⚡ Poder Pessoal:
                      </span>
                      <p className="text-sm text-stone-900 font-serif font-bold italic leading-relaxed">
                        “{activeTopic.innerStrengthActivation.powerMantra}”
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200/70">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        🛡️ Chave de Compaixão & Sabedoria Diária:
                      </span>
                      <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                        {activeTopic.innerStrengthActivation.resilienceKey}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-medium">
                  <span>Ancore no seu espírito</span>
                  <button
                    onClick={() => soundManager.playSingingBowl(528, 2.0)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Sino 528Hz</span>
                  </button>
                </div>
              </div>
            </div>

            {/* NEW: Exercício Prático Estruturado Passo a Passo */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-pink-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <Flower2 className="w-4 h-4 text-rose-500" />
                    Exercício Prático Estruturado
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#143823]">
                    {activeTopic.practicalExercise.name}
                  </h4>
                </div>
                <span className="text-xs px-3 py-1 bg-pink-100 text-pink-900 rounded-full font-semibold self-start sm:self-auto">
                  5 a 10 minutos
                </span>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed">
                {activeTopic.practicalExercise.description}
              </p>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {activeTopic.practicalExercise.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FCFAF7] border border-stone-200 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                        Passo {idx + 1}
                      </span>
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* Reflection Question & Fast Journaling */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50/90 to-emerald-50/90 border border-pink-200 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5 block">
                  <HelpCircle className="w-4 h-4 text-rose-600" />
                  Pergunta de Reflexão Profunda:
                </label>
                <p className="text-sm font-serif italic text-stone-900 font-semibold">
                  "{activeTopic.practicalExercise.reflectionQuestion}"
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={exerciseAnswer}
                    onChange={(e) => setExerciseAnswer(e.target.value)}
                    placeholder="Escreva sua resposta de reflexão aqui..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-pink-200 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                  />
                  <button
                    onClick={handleSaveExerciseReflection}
                    className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    {exerciseSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Salvo!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-rose-100" />
                        <span>Salvar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* NEW: Técnica de Carta Terapêutica Específica */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F0FDF4] via-[#FDF2F8] to-[#FFF1F2] border border-emerald-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-pink-200 text-pink-900">
                    Técnica Epistolar
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                    <Feather className="w-3.5 h-3.5 text-rose-600" />
                    Oficina de Cartas
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#143823]">
                  {activeTopic.therapeuticLetterTechnique.title}
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {activeTopic.therapeuticLetterTechnique.purpose}
                </p>
                <div className="p-3 rounded-xl bg-white/80 border border-emerald-100 text-xs text-stone-600 font-serif italic">
                  "{activeTopic.therapeuticLetterTechnique.exampleOpening}..."
                </div>
              </div>

              {onOpenLetterStudio && (
                <button
                  onClick={() => onOpenLetterStudio(activeTopic.pillarLabel)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all self-start md:self-auto flex-shrink-0"
                >
                  <Feather className="w-4 h-4 text-emerald-200" />
                  <span>Escrever Esta Carta na Oficina</span>
                </button>
              )}
            </div>

            {/* Therapeutic Steps & Worth Affirmation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Therapeutic Action Steps */}
              <div className="lg:col-span-7 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Passos Contínuos de Florescimento:
                </h4>
                <div className="space-y-2.5">
                  {activeTopic.therapeuticSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#F6FAF7] border border-emerald-100 flex items-start gap-3 text-sm text-[#1C422C]"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worth Affirmation Box */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-pink-100/90 via-rose-100/70 to-emerald-100/70 border border-pink-300 flex flex-col justify-between space-y-4 shadow-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-900 block mb-2">
                    🌸 Declaração de Identidade e Valor:
                  </span>
                  <blockquote className="font-serif text-lg sm:text-xl text-pink-950 italic font-medium leading-relaxed">
                    "{activeTopic.affirmationOfWorth}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-pink-200/80 flex items-center justify-between text-xs text-pink-900">
                  <span className="font-serif italic">Repita com o coração sereno</span>
                  <button
                    onClick={() => soundManager.playSingingBowl(528, 2.5)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-pink-800 hover:text-pink-950"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Sino 528Hz</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
