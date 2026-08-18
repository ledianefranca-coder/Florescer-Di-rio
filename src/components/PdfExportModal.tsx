import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Printer,
  BookOpen,
  Flower2,
  Loader2,
  Heart,
  Feather,
  Shield,
  Wind,
  Sparkles,
  CheckCircle2,
  Compass
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { ARA_VERSES_COLLECTION } from '../data/biblicalAraData';
import { MEADOW_FLOWERS_COLLECTION } from '../data/meadowFlowersData';
import { IDENTITY_AND_WORTH_TOPICS } from '../data/identityAndWorthTopics';
import { RELATIONSHIP_TOPICS } from '../data/relationshipInsights';
import { JUNGIAN_ARCHETYPES } from '../data/jungianArchetypes';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentPageCount, setCurrentPageCount] = useState(13);
  const printContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateDirectPdf = async () => {
    if (!printContainerRef.current) return;
    setIsGenerating(true);
    setGenerationProgress(5);

    try {
      const container = printContainerRef.current;
      const pageElements = Array.from(container.querySelectorAll('.pdf-a4-page')) as HTMLElement[];
      
      if (pageElements.length === 0) {
        throw new Error('Nenhuma página A4 encontrada para renderização.');
      }

      const totalPages = pageElements.length;
      setCurrentPageCount(totalPages);

      // Create jsPDF document: A4 portrait, in millimeters
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let i = 0; i < totalPages; i++) {
        const pageEl = pageElements[i] as HTMLElement;
        
        // Update progress smoothly
        const progress = Math.round(((i + 1) / totalPages) * 90);
        setGenerationProgress(progress);

        // Render each A4 page individually with html2canvas-pro
        const canvas = await html2canvas(pageEl, {
          scale: 2, // High resolution for crisp vector-like text
          useCORS: true,
          logging: false,
          backgroundColor: '#FCFAF7',
          windowWidth: 794,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        if (i > 0) {
          pdf.addPage('a4', 'p');
        }

        // Exact A4 dimensions: 210mm x 297mm
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      setGenerationProgress(100);
      pdf.save('Florescer-Diario-Livro-Completo-A4.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF por páginas A4:', error);
      // Fallback to browser print if canvas fails
      window.print();
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Split content sets for page balancing
  const biblePart1 = ARA_VERSES_COLLECTION.slice(0, 4);
  const biblePart2 = ARA_VERSES_COLLECTION.slice(4, 8);

  const flowersPart1 = MEADOW_FLOWERS_COLLECTION.slice(0, 3);
  const flowersPart2 = MEADOW_FLOWERS_COLLECTION.slice(3, 6);

  const identityPart1 = IDENTITY_AND_WORTH_TOPICS.slice(0, 3);
  const identityPart2 = IDENTITY_AND_WORTH_TOPICS.slice(3, 6);

  const archetypesPart1 = JUNGIAN_ARCHETYPES.slice(0, 3);
  const archetypesPart2 = JUNGIAN_ARCHETYPES.slice(3, 6);

  const totalPagesCount = 13;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-rose-50 border-b border-emerald-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-rose-500 flex items-center justify-center text-white shadow-xs">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950">
                Livro & Compêndio Editorial em Páginas A4
              </h2>
              <p className="text-xs text-emerald-800 font-medium">
                Florescer Diário • Diagramação Editorial em 13 Páginas Sem Cortes de Conteúdo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-emerald-800 hover:bg-emerald-100/60 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-[#FAFDFB] px-6 py-3 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              13 Páginas A4 Formatadas
            </span>
            <span className="text-stone-500 hidden sm:inline">• Sem cortes entre títulos e parágrafos</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-50 font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>Imprimir / Salvar Nativo</span>
            </button>

            <button
              onClick={handleGenerateDirectPdf}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Gerando A4 ({generationProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-white" />
                  <span>Baixar Livro em PDF (.pdf)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Document Preview & Discrete A4 Pages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#EFECE6]">
          <div
            id="printable-florescer-book"
            ref={printContainerRef}
            className="space-y-8 flex flex-col items-center"
          >
            
            {/* =========================================================================
                PÁGINA 1: CAPA EDITORIAL
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-14 flex flex-col justify-between text-[#233529]">
              {/* Header Capa */}
              <div className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-emerald-900/60 font-semibold border-b border-emerald-900/10 pb-3">
                <span>Edição Oficial • 2026</span>
                <span>Florescer Diário</span>
              </div>

              {/* Centro Capa */}
              <div className="text-center my-auto py-8">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-tr from-emerald-700 via-teal-700 to-rose-500 flex items-center justify-center text-white shadow-lg ring-8 ring-emerald-50">
                  <Flower2 className="w-12 h-12 text-white" />
                </div>
                
                <span className="text-xs uppercase tracking-[0.3em] text-rose-700 font-bold block mb-3">
                  Compêndio Editorial de Sabedoria & Consciência
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#143823] tracking-wide mb-4">
                  Florescer Diário
                </h1>

                <p className="font-serif italic text-xl sm:text-2xl text-emerald-900 max-w-lg mx-auto mb-6">
                  Consciência Feminina & Sabedoria Bíblica
                </p>

                <div className="w-20 h-0.5 bg-rose-400 mx-auto mb-8" />

                <div className="max-w-md mx-auto bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/60 shadow-2xs">
                  <p className="font-serif italic text-xs text-emerald-950 leading-relaxed">
                    "Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as fontes da vida."
                  </p>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-rose-800 block mt-2">
                    Provérbios 4:23 (ARA)
                  </span>
                </div>
              </div>

              {/* Footer Capa */}
              <div className="border-t border-emerald-900/15 pt-4 text-center text-xs text-stone-600">
                <p className="font-semibold text-emerald-950 text-sm">Autoria: Lediane França</p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Guia Integrado de Psicologia Analítica Junguiana, Autorresponsabilidade e Escrituras Sagradas.
                </p>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 2: SUMÁRIO & APRESENTAÇÃO
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              {/* Running Header */}
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Florescer Diário • Compêndio Editorial</span>
                <span>Sumário & Introdução</span>
              </div>

              {/* Content */}
              <div className="my-auto space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Abertura</span>
                  <h2 className="font-serif text-2xl font-bold text-emerald-950">Apresentação & Sumário da Obra</h2>
                  <div className="w-12 h-0.5 bg-rose-400 mt-2 mb-4" />
                  <p className="text-xs text-stone-700 leading-relaxed">
                    O <strong>Florescer Diário</strong> nasceu como um instrumento de reconciliação interior. A verdadeira maturidade feminina exige a superação das ilusões de vitimização através da autorresponsabilidade, o acolhimento da própria Sombra psíquica à luz de Carl Jung e a ancoragem inabalável na verdade das Escrituras Sagradas (Almeida Revista e Atualizada).
                  </p>
                </div>

                {/* Tabela de Conteúdo */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-2xs">
                  <h3 className="font-serif text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Estrutura dos 7 Capítulos</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo I:</strong> A Sabedoria da Palavra & Devocionais Bíblicos (ARA)</span>
                      <span className="text-emerald-800 font-semibold">Págs. 3 – 4</span>
                    </li>
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo II:</strong> Flores do Campo & Reflexões Botânicas Terapêuticas</span>
                      <span className="text-emerald-800 font-semibold">Págs. 5 – 6</span>
                    </li>
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo III:</strong> Cartas Terapêuticas do Coração & Liberação Emocional</span>
                      <span className="text-emerald-800 font-semibold">Pág. 7</span>
                    </li>
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo IV:</strong> Cura da Identidade, Feridas Emocionais & Valor Próprio</span>
                      <span className="text-emerald-800 font-semibold">Págs. 8 – 9</span>
                    </li>
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo V:</strong> Relacionamentos Saudáveis & Comunicação Não-Violenta</span>
                      <span className="text-emerald-800 font-semibold">Pág. 10</span>
                    </li>
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo VI:</strong> Arquétipos Femininos & Integração da Sombra (Carl Jung)</span>
                      <span className="text-emerald-800 font-semibold">Págs. 11 – 12</span>
                    </li>
                    <li className="flex justify-between border-b border-dashed border-emerald-100 pb-1">
                      <span><strong>Capítulo VII:</strong> Oásis de Paz, Quietude & Rituais de Florescimento</span>
                      <span className="text-emerald-800 font-semibold">Pág. 13</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200/70 text-xs text-stone-700 leading-relaxed">
                  <strong className="text-rose-900 block mb-1">Princípio Norteador:</strong>
                  "Nenhum florescimento é forçado. A flor não compete com a planta ao lado; ela apenas abre suas pétalas no tempo estabelecido pelo Sol."
                </div>
              </div>

              {/* Running Footer */}
              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Lediane França</span>
                <span>Página 2 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 3: CAPÍTULO I (PARTE 1) - DEVOCIONAIS BÍBLICOS ARA
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo I • Sabedoria da Palavra (ARA)</span>
                <span>Devocionais 1 a 4</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo I</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">A Sabedoria da Palavra & Devocionais Bíblicos (Parte 1)</h2>
                </div>

                <div className="space-y-3">
                  {biblePart1.map((verse, idx) => (
                    <div key={verse.id || idx} className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-serif font-bold text-emerald-900 text-sm">{verse.reference}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {verse.theme}
                        </span>
                      </div>
                      <blockquote className="font-serif italic text-stone-800 border-l-2 border-rose-400 pl-2.5 my-1.5">
                        "{verse.text}"
                      </blockquote>
                      <div className="space-y-1 text-[11px] text-stone-700">
                        <p><strong className="text-emerald-900">Visão Junguiana:</strong> {verse.jungianReflection}</p>
                        <p><strong className="text-rose-900">Autoexame:</strong> {verse.selfResponsibilityPrompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 3 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 4: CAPÍTULO I (PARTE 2) - DEVOCIONAIS BÍBLICOS ARA
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo I • Sabedoria da Palavra (ARA)</span>
                <span>Devocionais 5 a 8</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo I</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">A Sabedoria da Palavra & Devocionais Bíblicos (Parte 2)</h2>
                </div>

                <div className="space-y-3">
                  {biblePart2.map((verse, idx) => (
                    <div key={verse.id || idx} className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-serif font-bold text-emerald-900 text-sm">{verse.reference}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {verse.theme}
                        </span>
                      </div>
                      <blockquote className="font-serif italic text-stone-800 border-l-2 border-emerald-500 pl-2.5 my-1.5">
                        "{verse.text}"
                      </blockquote>
                      <div className="space-y-1 text-[11px] text-stone-700">
                        <p><strong className="text-emerald-900">Visão Junguiana:</strong> {verse.jungianReflection}</p>
                        <p><strong className="text-teal-900">Ação Prática:</strong> {verse.practicalAction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 4 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 5: CAPÍTULO II (PARTE 1) - FLORES DO CAMPO
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo II • Flores do Campo & Botânica</span>
                <span>Flores 1 a 3</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo II</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Flores do Campo & Reflexões Terapêuticas (Parte 1)</h2>
                </div>

                <div className="space-y-3.5">
                  {flowersPart1.map((flower, idx) => (
                    <div key={flower.id || idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-emerald-950 text-sm">
                          {flower.flowerName} <span className="font-sans text-[11px] font-normal italic text-stone-500">({flower.botanicalName})</span>
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                          {flower.themeLabel}
                        </span>
                      </div>
                      <blockquote className="font-serif italic text-stone-700 bg-emerald-50/40 p-2 rounded border-l-2 border-emerald-600 my-1 text-[11px]">
                        "{flower.biblicalVerse.text}" — <span className="font-semibold">{flower.biblicalVerse.reference}</span>
                      </blockquote>
                      <div className="space-y-1 text-[11px] text-stone-700 mt-2">
                        <p><strong className="text-emerald-950">Metáfora:</strong> {flower.metaphor}</p>
                        <p><strong className="text-rose-900">Exercício:</strong> {flower.practicalExercise}</p>
                        <p className="italic text-emerald-900 font-serif">"{flower.dailyAffirmation}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 5 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 6: CAPÍTULO II (PARTE 2) - FLORES DO CAMPO
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo II • Flores do Campo & Botânica</span>
                <span>Flores 4 a 6</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo II</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Flores do Campo & Reflexões Terapêuticas (Parte 2)</h2>
                </div>

                <div className="space-y-3.5">
                  {flowersPart2.map((flower, idx) => (
                    <div key={flower.id || idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-emerald-950 text-sm">
                          {flower.flowerName} <span className="font-sans text-[11px] font-normal italic text-stone-500">({flower.botanicalName})</span>
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                          {flower.themeLabel}
                        </span>
                      </div>
                      <blockquote className="font-serif italic text-stone-700 bg-emerald-50/40 p-2 rounded border-l-2 border-emerald-600 my-1 text-[11px]">
                        "{flower.biblicalVerse.text}" — <span className="font-semibold">{flower.biblicalVerse.reference}</span>
                      </blockquote>
                      <div className="space-y-1 text-[11px] text-stone-700 mt-2">
                        <p><strong className="text-emerald-950">Metáfora:</strong> {flower.metaphor}</p>
                        <p><strong className="text-teal-900">Profundidade Junguiana:</strong> {flower.jungianDepth}</p>
                        <p className="italic text-emerald-900 font-serif">"{flower.dailyAffirmation}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 6 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 7: CAPÍTULO III - CARTAS TERAPÊUTICAS
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo III • Cartas Terapêuticas</span>
                <span>Liberação Emocional & Cura</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo III</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Cartas Terapêuticas do Coração & Liberação</h2>
                </div>

                <div className="space-y-3.5 text-xs text-stone-700">
                  <div className="bg-white p-4 rounded-xl border border-emerald-100">
                    <h3 className="font-serif text-sm font-bold text-emerald-950 mb-1">1. Carta de Desvinculação e Honra aos Pais</h3>
                    <p className="text-[11px] text-stone-600 mb-1.5"><strong>Finalidade:</strong> Libertar-se da necessidade inconsciente de aprovação e curar o complexo parental com maturidade.</p>
                    <div className="bg-emerald-50/60 p-2.5 rounded-lg font-serif italic text-stone-800 border border-emerald-200 text-[11px]">
                      "Queridos pais, eu recebo a vida que veio através de vocês pelo preço que lhes custou. O que foi bom, eu guardo com gratidão. As dores e expectativas que não me pertencem, eu as deixo com vocês com respeito. Hoje assumo a responsabilidade pela minha própria história."
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-100">
                    <h3 className="font-serif text-sm font-bold text-emerald-950 mb-1">2. Carta de Acolhimento à Criança Interior</h3>
                    <p className="text-[11px] text-stone-600 mb-1.5"><strong>Finalidade:</strong> Resgatar a segurança e o afeto que a sua versão infantil precisou no passado.</p>
                    <div className="bg-rose-50/60 p-2.5 rounded-lg font-serif italic text-stone-800 border border-rose-200 text-[11px]">
                      "Minha pequena, eu te vejo. Eu sei o quanto você tentou ser forte e perfeita para ser amada. Você não precisa mais carregar o medo. Agora sou eu, a sua versão adulta e consciente, que cuida de você e te protege."
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-100">
                    <h3 className="font-serif text-sm font-bold text-emerald-950 mb-1">3. Carta de Renúncia à Culpa e Autoacusação</h3>
                    <p className="text-[11px] text-stone-600 mb-1.5"><strong>Finalidade:</strong> Desarmar o crítico interno e a culpa neurótica que paralisam a alma.</p>
                    <div className="bg-stone-50 p-2.5 rounded-lg font-serif italic text-stone-800 border border-stone-200 text-[11px]">
                      "Eu renuncio à ilusão de que me punir apagará o passado. Eu escolho a sabedoria do arrependimento que transforma, e não o veneno da culpa que paralisa. Recebo o perdão e dou o próximo passo com dignidade."
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 7 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 8: CAPÍTULO IV (PARTE 1) - IDENTIDADE & VALOR PRÓPRIO
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo IV • Identidade & Valor Próprio</span>
                <span>Tópicos 1 a 3</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo IV</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Cura da Identidade, Feridas & Valor Próprio (Parte 1)</h2>
                </div>

                <div className="space-y-3.5">
                  {identityPart1.map((topic, idx) => (
                    <div key={topic.id || idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs">
                      <h3 className="font-serif font-bold text-emerald-950 text-sm mb-0.5">{topic.title}</h3>
                      <p className="text-rose-800 font-medium text-[11px] mb-1.5">{topic.subtitle}</p>
                      <p className="text-stone-700 text-[11px] mb-2">{topic.coreDilemma}</p>

                      <div className="grid grid-cols-2 gap-2 bg-[#FAFDFB] p-2.5 rounded-lg border border-emerald-100 text-[11px]">
                        <div>
                          <strong className="text-emerald-900 block mb-0.5">Diagnóstico & Sombra:</strong>
                          <p className="text-stone-600">{topic.jungianDiagnosis.shadowRoot}</p>
                        </div>
                        <div>
                          <strong className="text-rose-900 block mb-0.5">Caminho de Cura:</strong>
                          <p className="text-stone-600">{topic.jungianDiagnosis.healingPath}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 8 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 9: CAPÍTULO IV (PARTE 2) - IDENTIDADE & VALOR PRÓPRIO
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo IV • Identidade & Valor Próprio</span>
                <span>Tópicos 4 a 6</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo IV</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Cura da Identidade, Feridas & Valor Próprio (Parte 2)</h2>
                </div>

                <div className="space-y-3.5">
                  {identityPart2.map((topic, idx) => (
                    <div key={topic.id || idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs">
                      <h3 className="font-serif font-bold text-emerald-950 text-sm mb-0.5">{topic.title}</h3>
                      <p className="text-rose-800 font-medium text-[11px] mb-1.5">{topic.subtitle}</p>
                      <p className="text-stone-700 text-[11px] mb-2">{topic.coreDilemma}</p>

                      <div className="grid grid-cols-2 gap-2 bg-[#FAFDFB] p-2.5 rounded-lg border border-emerald-100 text-[11px]">
                        <div>
                          <strong className="text-emerald-900 block mb-0.5">Diagnóstico & Sombra:</strong>
                          <p className="text-stone-600">{topic.jungianDiagnosis.shadowRoot}</p>
                        </div>
                        <div>
                          <strong className="text-rose-900 block mb-0.5">Caminho de Cura:</strong>
                          <p className="text-stone-600">{topic.jungianDiagnosis.healingPath}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 9 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 10: CAPÍTULO V - RELACIONAMENTOS SAUDÁVEIS
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo V • Relacionamentos Saudáveis</span>
                <span>Comunicação Não-Violenta & Limites</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo V</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Relacionamentos Saudáveis & Comunicação Não-Violenta</h2>
                </div>

                <div className="space-y-3">
                  {RELATIONSHIP_TOPICS.map((rel, idx) => (
                    <div key={rel.id || idx} className="bg-white rounded-xl p-3.5 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-emerald-950 text-sm">{rel.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {rel.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-700 mb-1.5">{rel.description}</p>
                      <div className="p-2 bg-emerald-50/50 rounded-lg text-[11px] space-y-1 border border-emerald-100">
                        <p><strong className="text-emerald-950">Insight Junguiano:</strong> {rel.jungianInsight}</p>
                        <p><strong className="text-teal-950">Mudança Consciente:</strong> <span className="italic">{rel.selfResponsibilityShift.consciousPattern}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 10 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 11: CAPÍTULO VI (PARTE 1) - ARQUÉTIPOS JUNGIANOS
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo VI • Arquétipos Femininos (Carl Jung)</span>
                <span>Arquétipos 1 a 3</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo VI</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Arquétipos Femininos & Integração da Sombra (Parte 1)</h2>
                </div>

                <div className="space-y-3.5">
                  {archetypesPart1.map((arch, idx) => (
                    <div key={arch.id || idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-emerald-950 text-sm">{arch.name}</h3>
                        <span className="text-[11px] font-serif italic text-rose-800">{arch.subtitle}</span>
                      </div>
                      <p className="text-[11px] text-stone-700 mb-2">{arch.coreDesire}</p>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                          <strong className="text-emerald-900 block mb-0.5">Luz Manifesta:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-[10.5px]">
                            {arch.lightTraits.slice(0, 3).map((trait, tIdx) => (
                              <li key={tIdx}>{trait}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                          <strong className="text-rose-900 block mb-0.5">Sombra & Risco:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-[10.5px]">
                            {arch.shadowTraits.slice(0, 3).map((trait, tIdx) => (
                              <li key={tIdx}>{trait}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-2 text-[10.5px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <strong>Chave de Individuação:</strong> {arch.individuationKey}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 11 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 12: CAPÍTULO VI (PARTE 2) - ARQUÉTIPOS JUNGIANOS
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo VI • Arquétipos Femininos (Carl Jung)</span>
                <span>Arquétipos 4 a 6</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo VI</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Arquétipos Femininos & Integração da Sombra (Parte 2)</h2>
                </div>

                <div className="space-y-3.5">
                  {archetypesPart2.map((arch, idx) => (
                    <div key={arch.id || idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-emerald-950 text-sm">{arch.name}</h3>
                        <span className="text-[11px] font-serif italic text-rose-800">{arch.subtitle}</span>
                      </div>
                      <p className="text-[11px] text-stone-700 mb-2">{arch.coreDesire}</p>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                          <strong className="text-emerald-900 block mb-0.5">Luz Manifesta:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-[10.5px]">
                            {arch.lightTraits.slice(0, 3).map((trait, tIdx) => (
                              <li key={tIdx}>{trait}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                          <strong className="text-rose-900 block mb-0.5">Sombra & Risco:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-stone-700 text-[10.5px]">
                            {arch.shadowTraits.slice(0, 3).map((trait, tIdx) => (
                              <li key={tIdx}>{trait}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-2 text-[10.5px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <strong>Chave de Individuação:</strong> {arch.individuationKey}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 12 de {totalPagesCount}</span>
              </div>
            </div>

            {/* =========================================================================
                PÁGINA 13: CAPÍTULO VII - OÁSIS DE PAZ & CONCLUSÃO
                ========================================================================= */}
            <div className="pdf-a4-page w-full max-w-[210mm] min-h-[297mm] bg-[#FCFAF7] rounded-xl shadow-lg border border-emerald-200/80 p-8 sm:p-12 flex flex-col justify-between text-[#233529]">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-stone-500 border-b border-emerald-200/60 pb-2">
                <span>Capítulo VII • Oásis de Paz</span>
                <span>Rituais de Cura & Conclusão</span>
              </div>

              <div className="my-auto space-y-6">
                <div className="border-b border-emerald-800/20 pb-1">
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Capítulo VII</span>
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Oásis de Paz, Quietude & Bênção de Florescimento</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-emerald-100 text-xs text-stone-700 space-y-4 shadow-2xs">
                  <h3 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-700" />
                    <span>O Ritual Diário de Respiração Diafragmática (4-7-8)</span>
                  </h3>
                  <div className="space-y-2 text-stone-700">
                    <p><strong>1. Inspire (4 segundos):</strong> Pelas narinas suavemente, dilatando o abdômen e recebendo a paz da graça.</p>
                    <p><strong>2. Retenha (7 segundos):</strong> Em silêncio e repouso sereno, consciente de que seu valor já foi definido no Céu.</p>
                    <p><strong>3. Expire (8 segundos):</strong> Lentamente pela boca, liberando expectativas alheias, ansiedade e peso.</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-rose-50 rounded-xl border border-emerald-200 text-center font-serif italic text-emerald-950 text-sm leading-relaxed">
                    "Que o seu florescer seja diário, corajoso, sereno e inegociável. Que suas raízes repousem na verdade da Palavra e suas pétalas se abram com a beleza singular que só a sua alma possui."
                  </div>
                </div>

                <div className="text-center py-4 bg-emerald-900/5 rounded-2xl border border-emerald-900/10">
                  <p className="font-serif font-bold text-emerald-950 text-sm">Florescer Diário • Livro Editorial Completo</p>
                  <p className="text-[11px] text-stone-600 mt-1">Desenvolvido por Lediane França • Todos os direitos reservados</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-emerald-200/60 pt-2">
                <span>Florescer Diário • Lediane França</span>
                <span>Página 13 de {totalPagesCount}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-emerald-100 flex flex-wrap items-center justify-between text-xs text-stone-500 flex-shrink-0 gap-2">
          <span>Formato A4 Portrait (210mm x 297mm) com quebras limpas e sem cortes de conteúdo.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            Fechar Visualizador
          </button>
        </div>

      </div>
    </div>
  );
};
