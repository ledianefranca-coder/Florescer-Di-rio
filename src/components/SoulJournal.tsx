import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import {
  Feather,
  Plus,
  Trash2,
  Bookmark,
  Sparkles,
  Calendar,
  Smile,
  ShieldCheck,
  ShieldAlert,
  BookOpen,
  Search,
  Download,
  Check,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface SoulJournalProps {
  externalNewEntry?: Partial<JournalEntry> | null;
  onClearExternalEntry?: () => void;
}

const DEFAULT_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-1',
    date: new Date().toLocaleDateString('pt-BR'),
    title: 'O Espelho da Paciência, Valor Próprio e Identidade',
    content: 'Hoje percebi que fiquei irritada quando meu esforço não foi visto de imediato. Em vez de me fechar no silêncio queixoso ou na sensação de desvalorização, respirei e entendi que o meu merecimento e valor vêm de Deus e da minha soberania interior, não da aprovação alheia.',
    mood: 'growing',
    category: 'relacionamento',
    inMyControl: 'Reconhecer meu próprio valor, expressar com clareza o que preciso e descansar no meu merecimento.',
    notInMyControl: 'A capacidade imediata do outro de reconhecer meu esforço ou seus estados emocionais.',
    linkedVerse: 'Provérbios 4:23 - "Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as fontes da vida."',
  },
];

const JOURNAL_PROMPTS = [
  'Onde senti medo de rejeição hoje e como posso me acolher em amor e pertencimento?',
  'Qual parte da minha aflição de hoje é um fato real e qual parte é uma projeção imaginária da carência?',
  'Se eu sentisse pleno merecimento e segurança na minha identidade, que escolha corajosa eu faria agora?',
  'Em que momento hoje eu me coloquei em postura de vítima ou invisível, e como assumo minha voz com mansidão e dignidade?',
  'Qual limite saudável preciso comunicar com firmeza amorosa para honrar meu valor próprio esta semana?',
  'O que a minha dor de abandono recente está tentando curar na minha história com Deus e comigo mesma?',
];

export const SoulJournal: React.FC<SoulJournalProps> = ({
  externalNewEntry,
  onClearExternalEntry,
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('florescer_diario_journal');
    return saved ? JSON.parse(saved) : DEFAULT_ENTRIES;
  });

  const [isWriting, setIsWriting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('thoughtful');
  const [category, setCategory] = useState<JournalEntry['category']>('relacionamento');
  const [inMyControl, setInMyControl] = useState('');
  const [notInMyControl, setNotInMyControl] = useState('');
  const [linkedVerse, setLinkedVerse] = useState('');

  // Handle external entry from Reflection Lab
  useEffect(() => {
    if (externalNewEntry) {
      setTitle(externalNewEntry.title || '');
      setContent(externalNewEntry.content || '');
      setCategory(externalNewEntry.category || 'relacionamento');
      setInMyControl(externalNewEntry.inMyControl || '');
      setNotInMyControl(externalNewEntry.notInMyControl || '');
      setLinkedVerse(externalNewEntry.linkedVerse || '');
      setIsWriting(true);
      if (onClearExternalEntry) onClearExternalEntry();
    }
  }, [externalNewEntry]);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('florescer_diario_journal', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      title,
      content,
      mood,
      category,
      inMyControl,
      notInMyControl,
      linkedVerse,
    };

    setEntries([newEntry, ...entries]);
    soundManager.playAffirmationChime();
    setIsWriting(false);

    // Reset form
    setTitle('');
    setContent('');
    setInMyControl('');
    setNotInMyControl('');
    setLinkedVerse('');
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Deseja excluir esta reflexão do seu diário?')) {
      setEntries(entries.filter((e) => e.id !== id));
      soundManager.playSingingBowl(392, 1.0);
    }
  };

  const handleRandomPrompt = () => {
    const random = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
    setContent((prev) => (prev ? `${prev}\n\n[Reflexão Guiada: ${random}]\n` : `[Reflexão Guiada: ${random}]\n`));
    soundManager.playSingingBowl(528, 1.2);
  };

  const handleExportJournal = () => {
    const text = entries
      .map(
        (e) =>
          `📅 DATA: ${e.date} | ${e.title.toUpperCase()}\nCategoria: ${e.category} | Humor: ${e.mood}\n\n${e.content}\n\nFORA DO MEU CONTROLE:\n${e.notInMyControl}\n\nSOB MINHA SOBERANIA:\n${e.inMyControl}\n\nSABEDORIA BÍBLICA:\n${e.linkedVerse || 'Nenhuma'}\n----------------------------------------\n`
      )
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meu-diario-florescer-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    soundManager.playSingingBowl(528, 1.5);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || entry.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-1">
            <Feather className="w-4 h-4 text-emerald-600" />
            <span>Espaço Íntimo & Auto-escuta</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#143823] font-normal">
            Diário da Consciência Feminina & Valor Próprio
          </h2>
          <p className="text-sm text-[#385A45] mt-1">
            Registre suas percepções, cure feridas de rejeição e abandono, e celebre seus passos de merecimento e identidade.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {entries.length > 0 && (
            <button
              onClick={handleExportJournal}
              title="Baixar diário como texto"
              className="p-2.5 rounded-full border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 transition-all"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              setIsWriting(!isWriting);
              soundManager.playSingingBowl(440, 1.0);
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isWriting ? 'Fechar Editor' : 'Nova Entrada'}</span>
          </button>
        </div>
      </div>

      {/* New Entry Form Card */}
      {isWriting && (
        <form
          onSubmit={handleSaveEntry}
          className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <h3 className="font-serif text-2xl font-bold text-[#143823]">
              Registrar Reflexão Consciente
            </h3>
            <button
              type="button"
              onClick={handleRandomPrompt}
              className="text-xs px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-rose-800 hover:bg-pink-100 flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Sortear Pergunta da Alma</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#143823] uppercase tracking-wider mb-1.5">
                Título da Reflexão
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Acolhendo o medo de não ser vista com mansidão"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F9FCFA] border border-emerald-200 text-sm text-[#143823] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143823] uppercase tracking-wider mb-1.5">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F9FCFA] border border-emerald-200 text-sm text-[#143823] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="relacionamento">Relacionamento & Vínculos</option>
                <option value="sombra">Sombra & Projeções</option>
                <option value="fe">Fé & Sabedoria Bíblica</option>
                <option value="limites">Autoestima & Merecimento</option>
                <option value="gratidao">Gratidão & Identidade</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#143823] uppercase tracking-wider mb-1.5">
              O que aconteceu e como a sua alma respondeu?
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva com autenticidade sem medo de julgamento..."
              className="w-full p-4 rounded-2xl bg-[#F9FCFA] border border-emerald-200 text-sm text-[#143823] placeholder-emerald-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          {/* Self-Responsibility Form Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-rose-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>O que está FORA do meu controle (Preciso Soltar):</span>
              </label>
              <textarea
                rows={2}
                value={notInMyControl}
                onChange={(e) => setNotInMyControl(e.target.value)}
                placeholder="Ex: A reação ou aprovação alheia, o julgamento dos outros, o passado..."
                className="w-full p-3 rounded-xl bg-[#FFF1F2] border border-rose-200 text-xs text-[#701A24] focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>O que está SOB MINHA SOBERANIA (Minha Ação):</span>
              </label>
              <textarea
                rows={2}
                value={inMyControl}
                onChange={(e) => setInMyControl(e.target.value)}
                placeholder="Ex: Minha postura de paz, validar minha identidade, me posicionar com amor..."
                className="w-full p-3 rounded-xl bg-[#ECFDF5] border border-emerald-200 text-xs text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#143823] uppercase tracking-wider mb-1.5">
              Palavra ou Versículo Bíblico Conectado (Opcional):
            </label>
            <input
              type="text"
              value={linkedVerse}
              onChange={(e) => setLinkedVerse(e.target.value)}
              placeholder="Ex: Isaías 43:4 - 'Visto que foste preciosa aos meus olhos...'"
              className="w-full px-4 py-2 rounded-xl bg-[#F9FCFA] border border-emerald-200 text-xs text-[#143823] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-rose-600 hover:from-emerald-700 hover:to-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              Salvar Entrada
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palavras..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-emerald-200 text-xs text-[#143823] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {['all', 'relacionamento', 'sombra', 'fe', 'limites', 'gratidao'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full capitalize whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-emerald-200 p-8 space-y-3">
            <Feather className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-xl text-[#143823]">Nenhuma reflexão encontrada</h4>
            <p className="text-xs text-[#385A45] max-w-sm mx-auto">
              Abra seu coração e crie sua primeira reflexão ou utilize o Laboratório de Auto-responsabilidade.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-2xs space-y-4 hover:border-emerald-300 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-800 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>{entry.date}</span>
                    <span>•</span>
                    <span className="capitalize px-2 py-0.5 rounded-full bg-pink-100 text-rose-800 font-medium">
                      {entry.category}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#143823]">
                    {entry.title}
                  </h4>
                </div>

                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  title="Excluir reflexão"
                  className="text-rose-400 hover:text-rose-700 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content */}
              <p className="text-sm text-[#264432] leading-relaxed whitespace-pre-line">
                {entry.content}
              </p>

              {/* Self-Responsibility breakdown if exists */}
              {(entry.inMyControl || entry.notInMyControl) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {entry.notInMyControl && (
                    <div className="p-3 rounded-xl bg-[#FFF1F2] border border-rose-200">
                      <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-0.5">
                        Fora do Meu Controle:
                      </span>
                      <p className="text-xs text-[#701A24] whitespace-pre-line">
                        {entry.notInMyControl}
                      </p>
                    </div>
                  )}

                  {entry.inMyControl && (
                    <div className="p-3 rounded-xl bg-[#ECFDF5] border border-emerald-200">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                        Sob Minha Soberania:
                      </span>
                      <p className="text-xs text-[#064E3B] whitespace-pre-line">
                        {entry.inMyControl}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Linked Verse */}
              {entry.linkedVerse && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-pink-50 border-l-3 border-rose-500 text-xs text-[#143823] font-serif italic">
                  {entry.linkedVerse}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
