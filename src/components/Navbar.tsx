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
import orangeBlossomBranchImg from '../assets/images/orange_blossom_branch_1786992766212.jpg';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left transition-all"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-200 group-hover:scale-105 transition-transform">
              <Flower2 className="w-6 h-6 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wide text-emerald-950 block leading-none">
                Florescer Diário
              </span>
              <span className="text-[11px] tracking-wider text-rose-700 uppercase font-sans font-semibold">
                Consciência Feminina & Sabedoria Bíblica
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm'
                      : 'text-[#2D503B] hover:text-emerald-950 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-emerald-600'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Ambient Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={toggleAudio}
              title={isMuted ? 'Ativar sinos suaves de paz' : 'Silenciar sons'}
              className={`p-2.5 rounded-full border transition-all ${
                isMuted
                  ? 'border-emerald-200 text-[#527961] bg-emerald-50 hover:bg-emerald-100'
                  : 'border-emerald-500 text-emerald-900 bg-emerald-100 hover:bg-emerald-200 ring-2 ring-emerald-400/30'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-800 animate-pulse" />}
            </button>

            {/* Botão Falar com a Terapeuta - Flores de Laranjeira & Cor Rosa */}
            <button
              id="header-cta-therapist"
              onClick={() => handleNavClick('mentor')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all transform active:scale-95 border border-pink-200/90 group"
            >
              <img
                src={orangeBlossomBranchImg}
                alt="Flores de Laranjeira"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-white/90 shadow-2xs group-hover:scale-110 transition-transform"
              />
              <span className="font-semibold text-white drop-shadow-2xs">Falar com a Terapeuta</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-emerald-900 hover:bg-emerald-50 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-emerald-200 bg-[#F7FCF9] px-4 pt-3 pb-6 space-y-1.5 animate-in fade-in slide-in-from-top-2">
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
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold text-sm shadow-sm border border-pink-200"
            >
              <img
                src={orangeBlossomBranchImg}
                alt="Flores de Laranjeira"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-white/90"
              />
              <span>Falar com a Terapeuta</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
