import React, { useState } from 'react';
import { RELATIONSHIP_TOPICS } from '../data/relationshipInsights';
import { RelationshipTopic } from '../types';
import {
  HeartHandshake,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  MessageCircle,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

export const RelationshipsGuide: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<RelationshipTopic>(RELATIONSHIP_TOPICS[0]);

  const handleSelect = (topic: RelationshipTopic) => {
    setSelectedTopic(topic);
    soundManager.playSingingBowl(440, 1.2);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vínculos Maduros, Autoestima & Comunicação</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
          Relacionamentos sem Projeções & com Auto-responsabilidade
        </h2>
        <p className="text-sm sm:text-base text-[#385A45] leading-relaxed">
          O amor autêntico começa onde a carência infantil e o medo da rejeição terminam. Aprenda a transformar conflitos em pontes de amadurecimento mútuo com base em Carl Jung e na Sabedoria Bíblica.
        </p>
      </div>

      {/* Topics Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {RELATIONSHIP_TOPICS.map((topic) => {
          const isSelected = selectedTopic.id === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-tr from-emerald-800 to-teal-900 text-white border-emerald-800 shadow-sm'
                  : 'bg-white text-[#143823] border-emerald-200 hover:bg-[#F4FAF6]'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-2 ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-pink-100 text-rose-800'
                  }`}
                >
                  {topic.badge}
                </span>
                <h4 className="font-serif text-lg font-bold leading-snug">
                  {topic.title}
                </h4>
              </div>
              <div
                className={`mt-4 text-xs font-medium flex items-center gap-1 ${
                  isSelected ? 'text-amber-200' : 'text-emerald-700'
                }`}
              >
                <span>Ler Guia Prático</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Deep Dive Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in">
        {/* Title and Badge */}
        <div className="border-b border-emerald-100 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
            {selectedTopic.badge}
          </span>
          <h3 className="font-serif text-3xl text-[#143823] font-semibold mt-1">
            {selectedTopic.title}
          </h3>
          <p className="text-base text-[#385A45] mt-2 leading-relaxed">
            {selectedTopic.description}
          </p>
        </div>

        {/* 2 Analytical Columns: Jung vs Biblical */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jungian Psychoanalysis */}
          <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="w-4 h-4" />
              <span>A Lente Psicanalítica de Carl Jung</span>
            </div>
            <p className="text-sm text-[#143823] leading-relaxed">
              {selectedTopic.jungianInsight}
            </p>
          </div>

          {/* Biblical Wisdom */}
          <div className="p-6 rounded-2xl bg-[#FDF2F8] border border-pink-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
              <BookOpen className="w-4 h-4" />
              <span>A Luz da Sabedoria Bíblica</span>
            </div>
            <blockquote className="font-serif text-base text-[#143823] italic border-l-3 border-rose-500 pl-3 py-1">
              “{selectedTopic.biblicalWisdomAra.text}”
            </blockquote>
            <span className="text-xs font-semibold text-rose-700 block">
              — {selectedTopic.biblicalWisdomAra.verse}
            </span>
            <p className="text-sm text-[#385A45] leading-relaxed">
              {selectedTopic.biblicalWisdomAra.explanation}
            </p>
          </div>
        </div>

        {/* Pattern Shift Comparison (The Core Self-Responsibility Leap) */}
        <div className="space-y-4">
          <h4 className="font-serif text-xl text-[#143823] font-bold">
            A Virada de Chave: Da Reação à Consciência & Merecimento
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Victim / Reactive Pattern */}
            <div className="p-5 rounded-2xl bg-[#FFF1F2] border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Padrão Reativo de Vítima (Cobrança, Medo do Abandono & Ressentimento)</span>
              </div>
              <p className="text-sm text-[#701A24] italic leading-relaxed">
                {selectedTopic.selfResponsibilityShift.victimPattern}
              </p>
            </div>

            {/* Conscious Responsible Pattern */}
            <div className="p-5 rounded-2xl bg-[#ECFDF5] border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Padrão de Auto-responsabilidade (Maturidade, Identidade & Paz)</span>
              </div>
              <p className="text-sm text-[#064E3B] font-medium leading-relaxed">
                {selectedTopic.selfResponsibilityShift.consciousPattern}
              </p>
            </div>
          </div>
        </div>

        {/* Actionable Practice Checklist */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-[#FDF2F8] to-[#FFF1F2] border border-emerald-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Shield className="w-4 h-4" />
            <span>Checklist Prático para o seu Dia a Dia</span>
          </div>

          <div className="space-y-2.5">
            {selectedTopic.practicalChecklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-sm text-[#143823]">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
