import React, { useState } from 'react';
import { ActiveTab, JournalEntry } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailyWordSection } from './components/DailyWordSection';
import { MeadowFlowersReflections } from './components/MeadowFlowersReflections';
import { IdentityHealingSection } from './components/IdentityHealingSection';
import { TherapeuticLettersStudio } from './components/TherapeuticLettersStudio';
import { MentorChatModal } from './components/MentorChatModal';
import { ReflectionLab } from './components/ReflectionLab';
import { RelationshipsGuide } from './components/RelationshipsGuide';
import { ArchetypesSection } from './components/ArchetypesSection';
import { SoulJournal } from './components/SoulJournal';
import { PeaceSanctuary } from './components/PeaceSanctuary';
import { PdfExportModal } from './components/PdfExportModal';
import { Footer } from './components/Footer';
import {
  Sparkles,
  Compass,
  HeartHandshake,
  BookOpen,
  Feather,
  Wind,
  MessageSquareHeart,
  ArrowRight,
  Flower2,
  Heart,
} from 'lucide-react';
import { soundManager } from './utils/audioSynth';
import orangeBlossomBranchImg from './assets/images/orange_blossom_branch_1786992766212.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [externalJournalEntry, setExternalJournalEntry] = useState<Partial<JournalEntry> | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handleSaveFromReflectionLab = (entry: Partial<JournalEntry>) => {
    setExternalJournalEntry(entry);
    setActiveTab('journal');
  };

  const handleNavigate = (tab: ActiveTab) => {
    soundManager.playSingingBowl(440, 1.2);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FCFA] text-[#143823]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero */}
            <HeroSection
              setActiveTab={handleNavigate}
              onOpenPdfModal={() => setIsPdfModalOpen(true)}
            />

            {/* Wildflowers Meadow Reflections Showcase */}
            <div className="border-t border-emerald-100">
              <MeadowFlowersReflections />
            </div>

            {/* Self-Esteem, Identity & Worth Pillars */}
            <div className="border-t border-pink-100">
              <IdentityHealingSection onOpenLetterStudio={() => handleNavigate('letters-studio')} />
            </div>

            {/* Therapeutic Letters Studio Showcase */}
            <div className="border-t border-emerald-100">
              <TherapeuticLettersStudio />
            </div>

            {/* Daily Word with Biblical Wisdom & Jungian Depth */}
            <div className="border-t border-emerald-100">
              <DailyWordSection />
            </div>

            {/* Quick Interactive Highlights section */}
            <section className="py-16 bg-[#F2FAF4]/80 border-y border-emerald-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Caminho de Florescimento
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
                    Ferramentas para a sua Jornada de Consciência
                  </h2>
                  <p className="text-sm text-[#385A45]">
                    Escolha um espaço para cuidar da sua mente, fortalecer sua identidade e viver em paz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Flores do Campo */}
                  <div
                    onClick={() => handleNavigate('meadow-flowers')}
                    className="cursor-pointer group bg-white rounded-3xl p-7 border border-emerald-200 shadow-2xs hover:shadow-md transition-all hover:border-emerald-400 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                        <Flower2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#143823] mb-2">
                        Flores do Campo
                      </h3>
                      <p className="text-sm text-[#385A45] leading-relaxed">
                        Reflexões diárias contemplativas com imagens e metáforas botânicas de flores silvestres para pacificar sua alma.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-950">
                      <span>Colher Flores do Dia</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Card 2: Autoestima & Identidade */}
                  <div
                    onClick={() => handleNavigate('identity-worth')}
                    className="cursor-pointer group bg-white rounded-3xl p-7 border border-pink-200 shadow-2xs hover:shadow-md transition-all hover:border-pink-400 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#143823] mb-2">
                        Autoestima & Identidade
                      </h3>
                      <p className="text-sm text-[#385A45] leading-relaxed">
                        Cure feridas de rejeição e abandono, declare seu valor próprio inegociável e descubra a coragem de ser vista.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-pink-100 flex items-center text-xs font-semibold text-rose-700 group-hover:text-rose-900">
                      <span>Fortalecer Autoestima</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Card 3: Mentora IA */}
                  <div
                    onClick={() => handleNavigate('mentor')}
                    className="cursor-pointer group bg-white rounded-3xl p-7 border border-emerald-200 shadow-2xs hover:shadow-md transition-all hover:border-emerald-400 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform shadow-xs ring-2 ring-emerald-100">
                        <Flower2 className="w-7 h-7 text-white transition-transform group-hover:rotate-12" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#143823] mb-2">
                        Mentora Florescer Diário
                      </h3>
                      <p className="text-sm text-[#385A45] leading-relaxed">
                        Converse em tempo real com nossa IA conselheira especializada em Carl Jung e na Sabedoria Bíblica para discernir suas emoções.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-rose-100 flex items-center text-xs font-semibold text-rose-700 group-hover:text-rose-900">
                      <span>Falar com a Mentora</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'meadow-flowers' && <MeadowFlowersReflections />}

        {activeTab === 'identity-worth' && (
          <IdentityHealingSection onOpenLetterStudio={() => handleNavigate('letters-studio')} />
        )}

        {activeTab === 'letters-studio' && <TherapeuticLettersStudio />}

        {activeTab === 'mentor' && <MentorChatModal />}

        {activeTab === 'reflection-lab' && (
          <ReflectionLab onSaveToJournal={handleSaveFromReflectionLab} />
        )}

        {activeTab === 'relationships' && <RelationshipsGuide />}

        {activeTab === 'archetypes' && <ArchetypesSection />}

        {activeTab === 'journal' && (
          <SoulJournal
            externalNewEntry={externalJournalEntry}
            onClearExternalEntry={() => setExternalJournalEntry(null)}
          />
        )}

        {activeTab === 'sanctuary' && <PeaceSanctuary />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigate}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Complete PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}

