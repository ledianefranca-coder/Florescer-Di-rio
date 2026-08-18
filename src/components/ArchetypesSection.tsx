import React, { useState } from 'react';
import { JUNGIAN_ARCHETYPES } from '../data/jungianArchetypes';
import { ARCHETYPE_QUIZ_QUESTIONS } from '../data/archetypeQuizQuestions';
import { ArchetypeProfile } from '../types';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Eye,
  Shield,
  Heart,
  X,
  Award,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export const ArchetypesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'quiz'>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<ArchetypeProfile | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<ArchetypeProfile | null>(null);

  const handleOpenProfile = (profile: ArchetypeProfile) => {
    setSelectedProfile(profile);
    soundManager.playSingingBowl(440, 1.2);
  };

  const handleSelectAnswer = (archetypeId: string) => {
    soundManager.playSingingBowl(493.88, 0.8);
    const newAnswers = { ...answers, [currentQuestionIndex]: archetypeId };
    setAnswers(newAnswers);

    if (currentQuestionIndex < ARCHETYPE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate winning archetype
      const countMap: Record<string, number> = {};
      Object.values(newAnswers).forEach((id) => {
        const key = String(id);
        countMap[key] = (countMap[key] || 0) + 1;
      });

      let highestArchetypeId = JUNGIAN_ARCHETYPES[0].id;
      let maxCount = 0;
      Object.entries(countMap).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highestArchetypeId = id;
        }
      });

      const matched = JUNGIAN_ARCHETYPES.find((a) => a.id === highestArchetypeId) || JUNGIAN_ARCHETYPES[0];
      setQuizResult(matched);
      soundManager.playAffirmationChime();

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#8C6D53', '#C9AF96', '#E2D5C8', '#DDC8B6'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleRestartQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizResult(null);
    soundManager.playSingingBowl(392, 1.0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Psicologia Analítica & Mulheres da Bíblia</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
          Arquétipos Femininos, Sombra e Individuação
        </h2>
        <p className="text-sm sm:text-base text-[#385A45] leading-relaxed">
          Conheça as forças arquetípicas da psique feminina descritas por <strong>Carl Jung</strong> e como elas se alinham com as grandes mulheres da <strong>Sabedoria Bíblica</strong>. Descubra sua força, cure a rejeição e ilumine sua Sombra.
        </p>

        {/* Tab switch between Catalog and Assessment */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'profiles'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xs'
                : 'bg-white text-[#1C422C] border border-emerald-200 hover:bg-[#F4FAF6]'
            }`}
          >
            Galeria de Arquétipos
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-xs'
                : 'bg-white text-[#1C422C] border border-emerald-200 hover:bg-rose-50 hover:text-rose-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Fazer Teste de Arquétipo</span>
          </button>
        </div>
      </div>

      {/* View 1: Archetypes Catalog Grid */}
      {activeTab === 'profiles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
          {JUNGIAN_ARCHETYPES.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleOpenProfile(profile)}
              className="group cursor-pointer bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs hover:shadow-md transition-all hover:border-emerald-400 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-pink-100 text-rose-800">
                    {profile.element}
                  </span>
                  <span className="text-xs text-emerald-800 font-medium">
                    {profile.biblicalParallel.name}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#143823] group-hover:text-emerald-700 transition-colors">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-rose-700 mt-0.5 font-medium">{profile.subtitle}</p>
                </div>

                <p className="text-sm text-[#385A45] line-clamp-3 leading-relaxed">
                  {profile.coreDesire}
                </p>

                {/* Light vs Shadow quick chips */}
                <div className="space-y-2 pt-2 border-t border-emerald-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                      Luz:
                    </span>
                    <p className="text-xs text-[#143823]">{profile.lightTraits[0]}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider">
                      Ponto de Sombra:
                    </span>
                    <p className="text-xs text-[#701A24]">{profile.shadowTraits[0]}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-950">
                <span>Ver Integração Completa</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Interactive Assessment Quiz */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-emerald-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
          {!quizResult ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  <span>Pergunta {currentQuestionIndex + 1} de {ARCHETYPE_QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestionIndex) / ARCHETYPE_QUIZ_QUESTIONS.length) * 100)}% concluído</span>
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-rose-500 transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentQuestionIndex + 1) / ARCHETYPE_QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#143823] font-normal leading-snug">
                  {ARCHETYPE_QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h3>
                <p className="text-sm text-[#385A45]">
                  {ARCHETYPE_QUIZ_QUESTIONS[currentQuestionIndex].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {ARCHETYPE_QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(option.archetypeId)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-[#F9FCFA] hover:bg-[#F0FDF4] hover:border-emerald-400 transition-all flex items-start gap-3 group"
                  >
                    <span className="w-6 h-6 rounded-full bg-white border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm text-[#143823] leading-relaxed font-normal">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Quiz Result Screen */
            <div className="space-y-8 animate-in fade-in">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-rose-500 text-white mx-auto flex items-center justify-center shadow-xs">
                  <Award className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
                  Seu Arquétipo Predominante
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#143823] font-bold">
                  {quizResult.name}
                </h3>
                <p className="text-sm text-[#385A45] max-w-md mx-auto">
                  {quizResult.subtitle} • Paralelo Bíblico: <strong>{quizResult.biblicalParallel.name}</strong>
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="p-6 rounded-2xl bg-[#F4FAF6] border border-emerald-200 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Anseio Central da sua Alma
                  </span>
                  <p className="text-sm text-[#143823] leading-relaxed">
                    {quizResult.coreDesire}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-emerald-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                      Luz & Virtudes:
                    </span>
                    <ul className="space-y-1 text-xs text-[#064E3B]">
                      {quizResult.lightTraits.map((trait, i) => (
                        <li key={i}>• {trait}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-pink-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block mb-2">
                      Sombra a Observar com Amor:
                    </span>
                    <ul className="space-y-1 text-xs text-[#701A24]">
                      {quizResult.shadowTraits.map((trait, i) => (
                        <li key={i}>• {trait}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Biblical Verse */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#F0FDF4] to-[#FDF2F8] border border-emerald-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                    Palavra Bíblica de Orientação ({quizResult.biblicalParallel.passage})
                  </span>
                  <p className="font-serif text-base text-[#143823] italic">
                    {quizResult.biblicalParallel.verseAra}
                  </p>
                  <p className="text-xs text-[#385A45] mt-2">
                    {quizResult.biblicalParallel.lesson}
                  </p>
                </div>

                {/* Individuation Key */}
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Chave de Auto-responsabilidade & Individuação
                  </span>
                  <p className="text-sm text-[#143823] font-medium">
                    {quizResult.individuationKey}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#1C422C] hover:bg-emerald-50 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer Teste</span>
                </button>

                <button
                  onClick={() => setActiveTab('profiles')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold uppercase tracking-wider hover:from-emerald-700 hover:to-teal-800 flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Explorar Todos os Arquétipos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Archetype Full Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-emerald-200 max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-emerald-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  {selectedProfile.element}
                </span>
                <h3 className="font-serif text-3xl text-[#143823] font-bold mt-1">
                  {selectedProfile.name}
                </h3>
                <p className="text-xs text-[#385A45]">{selectedProfile.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className="p-2 rounded-full text-emerald-800 hover:bg-emerald-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Desire */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                Anseio Fundamental da Alma
              </span>
              <p className="text-sm text-[#143823] leading-relaxed">
                {selectedProfile.coreDesire}
              </p>
            </div>

            {/* Light vs Shadow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#ECFDF5] border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Luz & Virtudes
                </span>
                <ul className="space-y-1.5 text-xs text-[#064E3B]">
                  {selectedProfile.lightTraits.map((t, idx) => (
                    <li key={idx}>• {t}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF1F2] border border-rose-200">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block mb-2">
                  Sombra & Armadilhas
                </span>
                <ul className="space-y-1.5 text-xs text-[#701A24]">
                  {selectedProfile.shadowTraits.map((t, idx) => (
                    <li key={idx}>• {t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Biblical Parallel */}
            <div className="p-5 rounded-2xl bg-[#FDF2F8] border border-pink-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Paralelo Bíblico: {selectedProfile.biblicalParallel.name}
                </span>
                <span className="text-xs text-rose-700">
                  {selectedProfile.biblicalParallel.passage}
                </span>
              </div>
              <p className="font-serif text-base text-[#143823] italic border-l-3 border-rose-500 pl-3 py-1">
                {selectedProfile.biblicalParallel.verseAra}
              </p>
              <p className="text-xs text-[#385A45] leading-relaxed">
                {selectedProfile.biblicalParallel.lesson}
              </p>
            </div>

            {/* Individuation Key & Daily Affirmation */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Chave de Individuação e Auto-responsabilidade
                </span>
                <p className="text-sm text-[#143823] font-medium leading-relaxed">
                  {selectedProfile.individuationKey}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-[#F0FDF4] to-[#FFF1F2] border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  Afirmação Diária para a sua Alma
                </span>
                <p className="font-serif text-lg text-[#143823] italic">
                  “{selectedProfile.dailyAffirmation}”
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedProfile(null)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-semibold uppercase tracking-wider hover:from-emerald-700 hover:to-teal-800 transition-all"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
