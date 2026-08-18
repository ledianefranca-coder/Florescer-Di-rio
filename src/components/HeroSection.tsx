import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, BookOpen, Compass, Flower2, Heart, FileDown } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPdfModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenPdfModal }) => {
  const handleCta = (tab: ActiveTab) => {
    soundManager.playSingingBowl(528, 2.0);
    setActiveTab(tab);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#EBF8EE] via-[#FCFDF9] to-[#FFF1F5]">
      {/* Delicate background decorative radial blossom & meadow glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-32 right-10 w-[350px] h-[350px] bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-teal-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <Flower2 className="w-4 h-4 text-rose-500 animate-spin-slow" />
            <span>Florescer Diário • Consciência Feminina & Sabedoria Bíblica</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#143823] font-normal tracking-tight leading-[1.15]">
            Onde a <span className="italic font-serif text-rose-600">alma feminina</span> floresce na sabedoria bíblica e na verdade interior.
          </h1>

          <p className="text-base sm:text-lg text-[#2E523A] font-light leading-relaxed max-w-2xl mx-auto">
            Integrando a psicanálise profunda de <strong>Carl Gustav Jung</strong> à autoridade da <strong>Palavra de Deus</strong> para curar feridas de <strong>rejeição e abandono</strong>, despertar o <strong>valor próprio</strong> e viver com plena <strong>autorresponsabilidade</strong>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              id="hero-btn-meadow-flowers"
              onClick={() => handleCta('meadow-flowers')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Flower2 className="w-4 h-4 text-amber-200" />
              <span>Colher Reflexão das Flores do Campo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-identity-worth"
              onClick={() => handleCta('identity-worth')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-rose-50 text-rose-800 border border-pink-300 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Autoestima & Valor Próprio</span>
            </button>

            <button
              id="hero-btn-download-pdf"
              onClick={() => {
                if (onOpenPdfModal) onOpenPdfModal();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <FileDown className="w-4 h-4 text-emerald-700" />
              <span>Baixar Livro Completo (PDF)</span>
            </button>
          </div>
        </div>

        {/* 3 Core Conceptual Pillars Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20">
          {/* Card 1: Autoestima, Identidade & Valor Próprio */}
          <div
            id="pillar-card-identity"
            onClick={() => handleCta('identity-worth')}
            className="group cursor-pointer p-7 rounded-3xl bg-white border border-pink-200/80 shadow-xs hover:shadow-md transition-all hover:border-pink-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold tracking-wider text-pink-700 uppercase">Cura Interior</span>
              <h3 className="font-serif text-2xl text-emerald-950 font-semibold mt-1 mb-3">
                Autoestima, Identidade & Merecimento
              </h3>
              <p className="text-sm text-[#3C5E49] leading-relaxed">
                Supere a ferida da rejeição e o medo do abandono. Reconheça o seu valor inegociável e a coragem de ser vista sob o amor do Criador.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-pink-100 flex items-center text-xs font-semibold text-rose-700 group-hover:text-rose-900">
              <span>Trabalhar Autoestima e Identidade</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Sabedoria Bíblica & Flores do Campo */}
          <div
            id="pillar-card-biblical"
            onClick={() => handleCta('meadow-flowers')}
            className="group cursor-pointer p-7 rounded-3xl bg-white border border-emerald-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Flower2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase">Sabedoria Bíblica</span>
              <h3 className="font-serif text-2xl text-emerald-950 font-semibold mt-1 mb-3">
                Flores do Campo & Palavra Viva
              </h3>
              <p className="text-sm text-[#3C5E49] leading-relaxed">
                Reflexões diárias contemplativas com imagens e metáforas de flores que ancoram sua mente na paz divina e silenciam a ansiedade.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-950">
              <span>Ver Jardim das Flores do Campo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Psicanálise Junguiana & Relacionamentos */}
          <div
            id="pillar-card-relationships"
            onClick={() => handleCta('relationships')}
            className="group cursor-pointer p-7 rounded-3xl bg-white border border-teal-200/80 shadow-xs hover:shadow-md transition-all hover:border-teal-400 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold tracking-wider text-teal-700 uppercase">Psicanálise Junguiana</span>
              <h3 className="font-serif text-2xl text-emerald-950 font-semibold mt-1 mb-3">
                Autorresponsabilidade nos Vínculos
              </h3>
              <p className="text-sm text-[#3C5E49] leading-relaxed">
                Desarme as projeções inconscientes, abandone o papel de vítima e estabeleça limites saudáveis com firmeza, mansidão e autoridade.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-teal-100 flex items-center text-xs font-semibold text-teal-700 group-hover:text-teal-950">
              <span>Guias de Relacionamento Consciente</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
