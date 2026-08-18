import React, { useState } from 'react';
import { MEADOW_FLOWERS_COLLECTION } from '../data/meadowFlowersData';
import { MeadowFlowerReflection } from '../types';
import {
  Sparkles,
  Heart,
  BookOpen,
  Volume2,
  Copy,
  Check,
  RefreshCw,
  Flower2,
  Compass,
  ArrowRight,
  Filter,
  Share2,
  BookmarkPlus,
  ShieldCheck,
  Sun,
  Feather,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface MeadowFlowersReflectionsProps {
  onSaveToJournal?: (text: string, title: string) => void;
}

export const MeadowFlowersReflections: React.FC<MeadowFlowersReflectionsProps> = ({ onSaveToJournal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [selectedFlower, setSelectedFlower] = useState<MeadowFlowerReflection>(MEADOW_FLOWERS_COLLECTION[0]);
  const [copied, setCopied] = useState(false);
  const [journalSaved, setJournalSaved] = useState(false);
  const [isPickingRandom, setIsPickingRandom] = useState(false);

  const filters = [
    { id: 'todos', label: 'Todas as Flores' },
    { id: 'crianca-interior', label: 'Criança Interior' },
    { id: 'perdao', label: 'Perdão' },
    { id: 'auto-perdao', label: 'Autoperdão' },
    { id: 'forca-interna', label: 'Força Interna' },
    { id: 'pertencimento', label: 'Pertencimento' },
    { id: 'dependencia-emocional', label: 'Dependência Emocional' },
    { id: 'autoestima', label: 'Autoestima' },
    { id: 'identidade', label: 'Identidade' },
    { id: 'merecimento', label: 'Merecimento' },
    { id: 'rejeicao', label: 'Cura da Rejeição' },
    { id: 'abandono', label: 'Cura do Abandono' },
    { id: 'valor-proprio', label: 'Valor Próprio' },
    { id: 'ser-vista', label: 'Ser Vista' },
    { id: 'paz', label: 'Paz Interior' },
  ];

  const filteredFlowers =
    selectedFilter === 'todos'
      ? MEADOW_FLOWERS_COLLECTION
      : MEADOW_FLOWERS_COLLECTION.filter((f) => f.theme === selectedFilter);

  const handleSelectFlower = (flower: MeadowFlowerReflection) => {
    setSelectedFlower(flower);
    soundManager.playSingingBowl(528, 1.5);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handlePickRandomFlower = () => {
    setIsPickingRandom(true);
    soundManager.playSingingBowl(639, 2.0);
    const randomIndex = Math.floor(Math.random() * MEADOW_FLOWERS_COLLECTION.length);
    setTimeout(() => {
      setSelectedFlower(MEADOW_FLOWERS_COLLECTION[randomIndex]);
      setIsPickingRandom(false);
      soundManager.playAffirmationChime();
    }, 400);
  };

  const handleCopyReflection = () => {
    const textToCopy = `🌸 *Florescer Diário — Reflexão com Flores do Campo*\n\n🌿 Flor: ${selectedFlower.flowerName} (${selectedFlower.botanicalName})\n✨ Tema: ${selectedFlower.themeLabel}\n\n📖 Palavra Bíblica: ${selectedFlower.biblicalVerse.reference}\n"${selectedFlower.biblicalVerse.text}"\n\n🕊️ Ensino: ${selectedFlower.biblicalVerse.teaching}\n\n🧠 Lente Junguiana: ${selectedFlower.jungianDepth}\n\n🌱 Autorresponsabilidade: ${selectedFlower.selfResponsibilityKey}\n\n💖 Afirmação: "${selectedFlower.dailyAffirmation}"\n\n— Florescer Diário | Desenvolvido por Lediane França`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    soundManager.playSingingBowl(528, 1.2);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleJournalSave = () => {
    if (onSaveToJournal) {
      onSaveToJournal(
        `Reflexão da ${selectedFlower.flowerName} (${selectedFlower.biblicalVerse.reference}):\n"${selectedFlower.biblicalVerse.text}"\n\nAfirmação: ${selectedFlower.dailyAffirmation}\nPasso prático: ${selectedFlower.practicalExercise}`,
        `Florescer com a ${selectedFlower.flowerName}`
      );
      setJournalSaved(true);
      soundManager.playAffirmationChime();
      setTimeout(() => setJournalSaved(false), 2500);
    }
  };

  return (
    <div className="py-10 bg-gradient-to-b from-[#F2FAF4] via-[#FCFDF9] to-[#FFF5F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Flower2 className="w-4 h-4 text-pink-600 animate-pulse" />
            <span>Jardim de Flores do Campo & Consciência Diária</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#143823] font-normal tracking-tight">
            Reflexões Diárias com as <span className="italic font-serif text-rose-600">Flores do Campo</span>
          </h2>

          <p className="text-base text-[#385A45] font-light leading-relaxed max-w-2xl mx-auto">
            Assim como Deus veste com esplendor cada lírio, margarida e papoula dos prados, Ele cuida do seu coração. Escolha uma flor para contemplar lições de <strong>autoestima, valor próprio, merecimento e paz</strong>.
          </p>

          {/* Sorteador Button */}
          <div className="pt-2">
            <button
              id="btn-pick-random-flower"
              onClick={handlePickRandomFlower}
              disabled={isPickingRandom}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isPickingRandom ? 'Colhendo a flor da sua alma...' : 'Colher Flor do Dia com Sabedoria'}</span>
              <RefreshCw className={`w-3.5 h-3.5 ${isPickingRandom ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Featured Reflection Showcase Card */}
        {selectedFlower && (
          <div
            id="featured-flower-card"
            className="bg-white rounded-3xl border border-emerald-200/80 shadow-md overflow-hidden transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Wildflower Photo with botanical badges */}
              <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full overflow-hidden group">
                <img
                  src={selectedFlower.imageUrl}
                  alt={selectedFlower.flowerName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badges on image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-emerald-900 border border-emerald-200 shadow-sm flex items-center gap-1.5">
                    <Flower2 className="w-3.5 h-3.5 text-rose-500" />
                    {selectedFlower.themeLabel}
                  </span>

                  <button
                    onClick={() => soundManager.playSingingBowl(528, 2.5)}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 hover:text-emerald-950 shadow-sm transition-all"
                    title="Ouvir frequência da flor"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>

                {/* Bottom botanical title */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-sans text-emerald-200 uppercase tracking-wider">
                    {selectedFlower.botanicalName}
                  </span>
                  <h3 className="font-serif text-3xl font-semibold text-white drop-shadow-sm">
                    {selectedFlower.flowerName}
                  </h3>
                  <p className="text-xs text-white/90 italic font-light line-clamp-2">
                    "{selectedFlower.metaphor}"
                  </p>
                </div>
              </div>

              {/* Right Column: Deep Insights & Scripture */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between bg-gradient-to-br from-white via-[#FCFDFB] to-[#F9FCFA]">
                {/* Scripture Quote Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/70 border border-emerald-200/90 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      Sabedoria Bíblica
                    </span>
                    <span className="text-xs font-semibold text-emerald-900 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {selectedFlower.biblicalVerse.reference}
                    </span>
                  </div>
                  <blockquote className="font-serif text-xl sm:text-2xl text-[#123821] font-normal leading-relaxed italic my-2">
                    “{selectedFlower.biblicalVerse.text}”
                  </blockquote>
                  <p className="text-xs sm:text-sm text-[#2D503B] font-light leading-relaxed mt-2 pt-2 border-t border-emerald-200/60">
                    🕊️ <strong>Ensino para sua vida:</strong> {selectedFlower.biblicalVerse.teaching}
                  </p>
                </div>

                {/* Dual Columns: Jungian Depth & Self-Responsibility Key */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jungian Depth */}
                  <div className="p-4 rounded-2xl bg-[#FFF9FB] border border-pink-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-pink-800 uppercase tracking-wide mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                      <span>Lente de Carl Jung</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E2838] leading-relaxed">
                      {selectedFlower.jungianDepth}
                    </p>
                  </div>

                  {/* Self-Responsibility Key */}
                  <div className="p-4 rounded-2xl bg-[#F4FAF6] border border-emerald-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1.5">
                      <Compass className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Autorresponsabilidade</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1C422C] leading-relaxed font-medium">
                      {selectedFlower.selfResponsibilityKey}
                    </p>
                  </div>
                </div>

                {/* Affirmation & Practical Exercise */}
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100/50 border border-pink-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-800 block mb-1">
                      🌸 Declaração de Identidade e Valor:
                    </span>
                    <p className="font-serif text-base sm:text-lg text-pink-950 italic font-medium">
                      "{selectedFlower.dailyAffirmation}"
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-[#2F523D] bg-emerald-50/80 p-3 rounded-xl border border-emerald-100">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Prática do dia:</strong> {selectedFlower.practicalExercise}
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-emerald-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReflection}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-300 text-xs font-medium text-emerald-900 bg-white hover:bg-emerald-50 transition-all shadow-2xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copiado com Carinho!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Copiar Reflexão</span>
                        </>
                      )}
                    </button>

                    {onSaveToJournal && (
                      <button
                        onClick={handleJournalSave}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-pink-300 text-xs font-medium text-pink-900 bg-white hover:bg-pink-50 transition-all shadow-2xs"
                      >
                        {journalSaved ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-rose-600" />
                            <span className="text-rose-700 font-semibold">Salvo no Diário!</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-3.5 h-3.5 text-rose-600" />
                            <span>Salvar no Diário da Alma</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <span className="text-xs text-[#527961] italic font-serif">
                    “Florescer no tempo certo sob a luz divina”
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Chips Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-emerald-700" />
              <span>Filtrar por Necessidade da Alma:</span>
            </div>
            <span className="text-xs text-[#527961]">
              Exibindo {filteredFlowers.length} flores do campo
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFilter(f.id);
                    soundManager.playSingingBowl(440, 0.8);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm font-semibold scale-105'
                      : 'bg-white text-emerald-900 border border-emerald-200/80 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wildflower Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFlowers.map((flower) => {
            const isCurrent = selectedFlower.id === flower.id;
            return (
              <div
                key={flower.id}
                id={`flower-card-${flower.id}`}
                onClick={() => handleSelectFlower(flower)}
                className={`group cursor-pointer rounded-3xl bg-white border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'border-emerald-500 ring-2 ring-emerald-400 shadow-lg scale-[1.02]'
                    : 'border-emerald-200/80 shadow-xs hover:shadow-md hover:border-emerald-400 hover:-translate-y-1'
                }`}
              >
                {/* Flower Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={flower.imageUrl}
                    alt={flower.flowerName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-900 shadow-2xs">
                    {flower.themeLabel}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif text-xl font-bold leading-tight drop-shadow-xs">
                      {flower.flowerName}
                    </h4>
                    <span className="text-[11px] text-emerald-200 italic font-sans block">
                      {flower.botanicalName}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#385A45] leading-relaxed line-clamp-3">
                    {flower.metaphor}
                  </p>

                  <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-rose-600 transition-colors">
                    <span>Ver Meditação Completa</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
