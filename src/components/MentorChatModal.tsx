import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  HeartHandshake,
  BookOpen,
  Compass,
} from 'lucide-react';
import { soundManager } from '../utils/audioSynth';
import orangeBlossomBranchImg from '../assets/images/orange_blossom_branch_1786992766212.jpg';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const MentorChatModal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Paz, acolhimento e boas-vindas ao seu santuário de autoconhecimento. Eu sou a sua mentora do **Florescer Diário**.

Aqui unimos a profundidade da **Psicanálise de Carl Jung** (o trabalho com a Sombra, feridas de rejeição e abandono, projeções e o verdadeiro Self) à luz inabalável da **Sabedoria Bíblica**, sempre alinhadas à sua **autoestima, identidade, merecimento, valor próprio e autorresponsabilidade emocional**.

Como está o seu coração hoje? Qual situação, sentimento de não pertencimento ou relação você gostaria de colocar sob a luz da consciência?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    'Como curar a ferida da rejeição e me sentir merecedora?',
    'Sinto medo do abandono e anulo minhas vontades. Como mudar?',
    'Como ter coragem de me posicionar e ser vista?',
    'Como parar de projetar minhas carências no meu cônjuge?',
    'Como a Bíblia e Carl Jung explicam o valor próprio da mulher?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || isLoading) return;

    soundManager.playSingingBowl(440, 1.0);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.text || 'Que a paz de Deus e a lucidez da mente guardem o seu coração.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
      soundManager.playSingingBowl(528, 1.8);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: 'Houve uma instabilidade momentânea. Por favor, respire e envie sua mensagem novamente.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (msg: Message) => {
    navigator.clipboard.writeText(msg.content);
    setCopiedId(msg.id);
    soundManager.playSingingBowl(528, 1.2);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Deseja reiniciar a conversa com a mentora?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'model',
          content: 'Conversa reiniciada com carinho. Respire fundo: sobre qual tema ou sentimento você gostaria de refletir agora?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      soundManager.playSingingBowl(392, 1.5);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-md overflow-hidden flex flex-col h-[750px]">
        {/* Top bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-300 shadow-xs flex-shrink-0">
              <img
                src={orangeBlossomBranchImg}
                alt="Flores de Laranjeira"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#143823] leading-tight">
                Mentora Florescer Diário
              </h3>
              <p className="text-xs text-emerald-800 font-medium">
                Psicanálise Junguiana • Sabedoria Bíblica • Autoestima & Autorresponsabilidade
              </p>
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            title="Limpar histórico da conversa"
            className="p-2 rounded-xl text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#F9FCFA]">
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-200 flex-shrink-0 shadow-2xs mt-1">
                    <img
                      src={orangeBlossomBranchImg}
                      alt="Flores de Laranjeira"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed shadow-2xs relative group ${
                    isBot
                      ? 'bg-white border border-emerald-100 text-[#143823]'
                      : 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-normal'
                  }`}
                >
                  {/* Message content */}
                  <div className="whitespace-pre-line prose prose-emerald max-w-none">
                    {msg.content}
                  </div>

                  {/* Message footer with timestamp and copy */}
                  <div
                    className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                      isBot
                        ? 'border-emerald-100 text-[#527961]'
                        : 'border-emerald-600/60 text-emerald-100'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {isBot && (
                      <button
                        onClick={() => handleCopyMessage(msg)}
                        className="inline-flex items-center gap-1 hover:text-emerald-950 transition-colors"
                        title="Copiar resposta"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex-shrink-0 flex items-center justify-center text-xs mt-1 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-sm text-[#385A45] animate-pulse">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="font-serif italic text-base">
                A mentora está discernindo sua reflexão sob a luz de Jung e da Sabedoria Bíblica...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts */}
        <div className="px-4 py-2.5 bg-white border-t border-emerald-100 overflow-x-auto flex gap-2 no-scrollbar">
          {promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full bg-[#F4FAF6] border border-emerald-200 text-[#1C422C] hover:bg-rose-50 hover:text-rose-900 hover:border-pink-300 transition-all disabled:opacity-50 font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-emerald-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Descreva o que está sentindo, um sentimento de não merecimento, conflito ou dúvida..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-full bg-[#F6FAF7] border border-emerald-200 text-sm text-[#143823] placeholder-[#6E8F7A] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white disabled:opacity-40 transition-all shadow-xs"
            >
              <Send className="w-4 h-4 text-amber-200" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
