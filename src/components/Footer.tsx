import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Heart, BookOpen, Feather, Flower2, UserCheck, ShieldCheck, FileDown } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPdfModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPdfModal }) => {
  const handleNav = (tab: ActiveTab) => {
    soundManager.playSingingBowl(440, 1.0);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#112419] text-[#F3FAF5] pt-16 pb-12 border-t border-[#1C3D2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white shadow-md">
                <Flower2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wide text-white block leading-none">
                  Florescer Diário
                </span>
                <span className="text-[11px] tracking-wider text-rose-300 uppercase font-sans font-semibold">
                  Consciência Feminina & Sabedoria Bíblica
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#C8E0D2] leading-relaxed max-w-md">
              Uma plataforma dedicada ao florescimento da alma feminina, integrando a profundidade da <strong>Psicanálise de Carl Jung</strong> à autoridade da <strong>Sabedoria Bíblica</strong> para curar feridas, edificar a <strong>autoestima, identidade, merecimento e valor próprio</strong>.
            </p>
            
            {/* Developer Credit Signature Badge */}
            <div className="pt-3 flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/80 text-emerald-200 text-xs font-medium shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Desenvolvido por <strong>Lediane França</strong></span>
              </div>
            </div>

            <div className="pt-1 text-xs text-[#8EBC9F] italic font-serif">
              “Quem olha para fora sonha; quem olha para dentro desperta.” — Carl G. Jung
            </div>
          </div>

          {/* Col 2: Pilares */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Pilares de Consciência
            </h4>
            <ul className="space-y-2 text-xs text-[#C8E0D2]">
              <li>
                <button
                  onClick={() => handleNav('meadow-flowers')}
                  className="hover:text-rose-300 transition-colors flex items-center gap-1.5"
                >
                  <Flower2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Flores do Campo & Reflexões</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('identity-worth')}
                  className="hover:text-rose-300 transition-colors flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Autoestima & Identidade</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('archetypes')}
                  className="hover:text-rose-300 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Arquétipos & Sombra (Jung)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('relationships')}
                  className="hover:text-rose-300 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Relacionamentos & Limites</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ferramentas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Ferramentas de Cuidado
            </h4>
            <ul className="space-y-2 text-xs text-[#C8E0D2]">
              <li>
                <button
                  onClick={() => handleNav('mentor')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Mentora IA Florescer Diário
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reflection-lab')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Laboratório de Reflexão
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('journal')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Diário da Alma
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sanctuary')}
                  className="hover:text-rose-300 transition-colors"
                >
                  Oásis de Paz & Respiração
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    if (onOpenPdfModal) onOpenPdfModal();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 text-rose-300 border border-emerald-700/80 font-semibold transition-all cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-rose-400" />
                  <span>Baixar Livro Completo (PDF)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="pt-8 border-t border-[#1C3D2B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8EBC9F]">
          <p>© {new Date().getFullYear()} Florescer Diário • Desenvolvido por Lediane França — Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 text-[#C8E0D2]">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Guarda o teu coração, porque dele procedem as fontes da vida. (Provérbios 4:23)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
