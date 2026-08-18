import React, { useState } from 'react';
import { ActiveTab } from '../types';
import {
  Sparkles,
  BookOpen,
  HeartHandshake,
  Compass,
  Feather,
  Wind,
  MessageSquareHeart,
  Volume2,
  VolumeX,
  Menu,
  X,
  Flower2,
  Heart,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.setMuted(nextState);
    if (!nextState) {
      soundManager.playSingingBowl(528, 2.5); // 528Hz love/clarity frequency tone
    }
  };

  const navItems = [
    { id: 'home' as ActiveTab, label: 'Início', icon: Sparkles },
    { id: 'meadow-flowers' as ActiveTab, label: 'Flores do Campo', icon: Flower2 },
    { id: 'identity-worth' as ActiveTab, label: 'Cura & Identidade', icon: Heart },
    { id: 'letters-studio' as ActiveTab, label: 'Oficina de Cartas', icon: Feather },
    { id: 'mentor' as ActiveTab, label: 'Mentora IA', icon: MessageSquareHeart },
    { id: 'reflection-lab' as ActiveTab, label: 'Laboratório', icon: Compass },
    { id: 'relationships' as ActiveTab, label: 'Relacionamentos', icon: HeartHandshake },
    { id: 'archetypes' as ActiveTab, label: 'Arquétipos', icon: BookOpen },
    { id: 'journal' as ActiveTab, label: 'Diário da Alma', icon: Feather },
    { id: 'sanctuary' as ActiveTab, label: 'Oásis de Paz', icon: Wind },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    soundManager.playSingingBowl(440, 1.2);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Row: Brand Logo, Audio Toggle & Therapist Action Button */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand - Fixed and Proportionate in Full Screen */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3.5 group text-left transition-all flex-shrink-0 cursor-pointer"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-200/90 group-hover:scale-105 transition-transform flex-shrink-0">
              <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-12 text-white" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-emerald-950 block leading-tight whitespace-nowrap">
                Florescer Diário
              </span>
              <span className="text-[9px] sm:text-[11px] tracking-wider text-rose-700 uppercase font-sans font-semibold whitespace-nowrap block mt-0.5">
                Consciência Feminina & Sabedoria Bíblica
              </span>
            </div>
          </button>

          {/* Right Controls: Audio + Falar com a Terapeuta CTA */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Audio Ambient Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={toggleAudio}
              title={isMuted ? 'Ativar sinos suaves de paz' : 'Silenciar sons'}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
                isMuted
                  ? 'border-emerald-200 text-[#527961] bg-emerald-50 hover:bg-emerald-100'
                  : 'border-emerald-500 text-emerald-900 bg-emerald-100 hover:bg-emerald-200 ring-2 ring-emerald-400/30'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-800 animate-pulse" />}
            </button>

            {/* Botão Falar com a Terapeuta - Ícone Florescer Diário & Cor Rosa */}
            <button
              id="header-cta-therapist"
              onClick={() => handleNavClick('mentor')}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all transform active:scale-95 border border-pink-200/90 group flex-shrink-0 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white ring-1 ring-white/90 shadow-2xs group-hover:scale-110 transition-transform flex-shrink-0">
                <Flower2 className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold text-white drop-shadow-2xs whitespace-nowrap">Falar com a Terapeuta</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-emerald-900 hover:bg-emerald-50 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Top Navigation Bar: All Buttons Arranged with Sizing and Spacing */}
        <div className="hidden lg:flex items-center justify-between border-t border-emerald-100/90 py-2 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5 w-full justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white shadow-xs'
                      : 'text-[#2D503B] hover:text-emerald-950 hover:bg-emerald-50/90'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-emerald-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-200 bg-[#F7FCF9] px-4 pt-3 pb-6 space-y-1.5 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'text-[#2D503B] hover:bg-emerald-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-emerald-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-emerald-200">
            <button
              onClick={() => handleNavClick('mentor')}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold text-sm shadow-sm border border-pink-200 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white ring-1 ring-white/90 shadow-2xs flex-shrink-0">
                <Flower2 className="w-3 h-3 text-white" />
              </div>
              <span>Falar com a Terapeuta</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

