import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Volume2, Sparkles, BookOpen, Heart } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

type BreathTechnique = '4-7-8' | 'box' | 'calm';

export const PeaceSanctuary: React.FC = () => {
  const [technique, setTechnique] = useState<BreathTechnique>('4-7-8');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inspire' | 'segure' | 'expire' | 'pausa'>('inspire');
  const [countdown, setCountdown] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Technique timing definitions
  const timings = {
    '4-7-8': {
      name: 'Respiração 4-7-8 (Descanso Profundo & Rendição)',
      desc: 'Desativa o sistema de alerta, reduz a ansiedade e ancora a mente na paz.',
      inspire: 4,
      segure: 7,
      expire: 8,
      pausa: 0,
      inspirePrompt: 'Inspire a graça e a presença divina...',
      segurePrompt: 'Descanse em silêncio e confiança...',
      expirePrompt: 'Expire todo o medo e solte o controle...',
    },
    box: {
      name: 'Respiração Quadrada (Clareza & Equilíbrio)',
      desc: 'Harmoniza a mente para tomada de decisões difíceis e restaura o foco.',
      inspire: 4,
      segure: 4,
      expire: 4,
      pausa: 4,
      inspirePrompt: 'Inspire sabedoria e clareza...',
      segurePrompt: 'Sustente com dignidade e firmeza...',
      expirePrompt: 'Solte a reatividade e as tensões...',
      pausaPrompt: 'Repouse no espaço sagrado do agora...',
    },
    calm: {
      name: 'Pausa Serena (Alívio Imediato da Tensão)',
      desc: 'Um ciclo suave para momentos de conflito ou agitação nos relacionamentos.',
      inspire: 4,
      segure: 2,
      expire: 6,
      pausa: 0,
      inspirePrompt: 'Inspire mansidão e amor...',
      segurePrompt: 'Guarde o seu coração...',
      expirePrompt: 'Solte a necessidade de justificar-se...',
    },
  };

  const currentTiming = timings[technique];

  // Timer loop
  useEffect(() => {
    let timer: any = null;

    if (isActive) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Advance phase
          if (phase === 'inspire') {
            soundManager.playBreathCue('hold');
            setPhase('segure');
            return currentTiming.segure;
          } else if (phase === 'segure') {
            soundManager.playBreathCue('exhale');
            setPhase('expire');
            return currentTiming.expire;
          } else if (phase === 'expire') {
            if (currentTiming.pausa > 0) {
              setPhase('pausa');
              return currentTiming.pausa;
            } else {
              soundManager.playBreathCue('inhale');
              setPhase('inspire');
              setCyclesCompleted((c) => c + 1);
              return currentTiming.inspire;
            }
          } else {
            soundManager.playBreathCue('inhale');
            setPhase('inspire');
            setCyclesCompleted((c) => c + 1);
            return currentTiming.inspire;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, technique, currentTiming]);

  const handleStartPause = () => {
    if (!isActive) {
      soundManager.playSingingBowl(528, 2.0);
      setPhase('inspire');
      setCountdown(currentTiming.inspire);
      soundManager.playBreathCue('inhale');
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inspire');
    setCountdown(currentTiming.inspire);
    setCyclesCompleted(0);
    soundManager.playSingingBowl(392, 1.0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inspire':
        return 'from-emerald-500 to-teal-600 text-white scale-110 shadow-emerald-200';
      case 'segure':
        return 'from-emerald-700 to-teal-800 text-white scale-105 shadow-emerald-300';
      case 'expire':
        return 'from-rose-400 to-pink-500 text-white scale-95 shadow-pink-200';
      case 'pausa':
        return 'from-pink-100 to-emerald-100 text-[#143823] scale-90 shadow-pink-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Wind className="w-3.5 h-3.5 text-emerald-600" />
          <span>Oásis de Paz, Quietude & Merecimento</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
          Respirar, Desacelerar e Repousar
        </h2>
        <p className="text-sm text-[#385A45]">
          Antes de responder, antes de se desvalorizar ou reagir com medo de rejeição, aquiete o corpo. A neurociência e a Sabedoria Bíblica ensinam que a resposta sábia nasce do silêncio interior.
        </p>

        {/* Technique Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {(['4-7-8', 'box', 'calm'] as BreathTechnique[]).map((tech) => (
            <button
              key={tech}
              onClick={() => {
                setTechnique(tech);
                handleReset();
              }}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                technique === tech
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                  : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              {tech === '4-7-8' ? '4-7-8 Rendição' : tech === 'box' ? 'Quadrada (Foco)' : 'Pausa Serena'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Breathing Circle Stage */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-14 shadow-sm text-center flex flex-col items-center justify-center relative overflow-hidden">
        {/* Breathing Orb */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-8">
          {/* Outer gentle ambient pulse ring */}
          <div
            className={`absolute inset-0 rounded-full bg-pink-100/50 blur-xl transition-all duration-1000 ${
              phase === 'inspire' ? 'scale-125 opacity-90' : 'scale-90 opacity-30'
            }`}
          />

          {/* Main animated orb */}
          <div
            className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr transition-all duration-1000 flex flex-col items-center justify-center shadow-xl ${getPhaseColor()}`}
          >
            <span className="text-xs uppercase font-bold tracking-widest opacity-90 mb-1">
              {phase === 'inspire'
                ? 'Inspire'
                : phase === 'segure'
                ? 'Segure'
                : phase === 'expire'
                ? 'Expire'
                : 'Pausa'}
            </span>
            <span className="font-serif text-5xl sm:text-6xl font-light">
              {countdown}
            </span>
            <span className="text-[11px] opacity-75 mt-1 font-sans">segundos</span>
          </div>
        </div>

        {/* Phase Prompt Guidance */}
        <div className="max-w-md space-y-2 mb-8 h-16 flex flex-col justify-center">
          <p className="font-serif text-xl sm:text-2xl text-[#143823] italic">
            {phase === 'inspire'
              ? currentTiming.inspirePrompt
              : phase === 'segure'
              ? currentTiming.segurePrompt
              : phase === 'expire'
              ? currentTiming.expirePrompt
              : currentTiming.pausaPrompt || 'Apenas seja...'}
          </p>
          <p className="text-xs text-emerald-800 font-medium">
            Ciclos completos: <strong>{cyclesCompleted}</strong>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStartPause}
            className={`px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm ${
              isActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-100" />
                <span>Começar Exercício</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            title="Reiniciar contagem"
            className="p-3.5 rounded-full bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scripture Contemplation for Stillness */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F0FDF4] to-[#FDF2F8] border border-emerald-200 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <BookOpen className="w-4 h-4 text-rose-600" />
          <span>Palavra de Quietude para o seu Descanso</span>
        </div>

        <blockquote className="font-serif text-2xl text-[#143823] italic leading-relaxed">
          “Aquietai-vos e sabei que eu sou Deus; sou exaltado entre as nações, sou exaltado na terra.”
        </blockquote>
        <span className="text-xs font-semibold text-rose-700 block">
          — Salmo 46:10
        </span>

        <p className="text-sm text-[#385A45] leading-relaxed pt-2 border-t border-emerald-200/60">
          O verbo hebraico para "aquietai-vos" (<em>raphah</em>) significa literalmente "soltar as mãos, cessar o combate, deixar de tentar forçar os resultados". Entregue o controle a Deus e respire com tranquilidade no seu merecimento.
        </p>
      </div>
    </div>
  );
};
