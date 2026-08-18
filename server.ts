import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Curated Devotional Knowledge Base for instantaneous, 100% reliable fallback
function generateFallbackDevotional(rawTheme?: string) {
  const theme = (rawTheme || "Cura, Autoestima e Força")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (theme.includes("crianc") || theme.includes("infanc") || theme.includes("menin")) {
    return {
      titulo: "O Abraço de Graça à Sua Menina Interior",
      temaJunguiano: "Integração do Arquétipo da Criança Divina",
      versiculoAra: {
        referencia: "Isaías 66:13 (ARA)",
        texto: "Como alguém a quem sua mãe consola, assim eu vos consolarei; e em Jerusalém vós sereis consolados.",
      },
      conteudoReflexao: "Muitas vezes, a mulher adulta e esforçada de hoje ainda carrega no peito as inseguranças e os medos daquela menininha que precisou ser forte antes do tempo. Na psicanálise junguiana, a Criança Interior representa a sede viva de afeto, espontaneidade e segurança emocional.\n\nQuando você assume a auto-responsabilidade de maternar a si mesma com ternura, protegida pelo amor maternal e paternal de Deus, você cessa a necessidade de mendigar validação no mundo. Você já é acolhida, vista e guardada pelo Criador.",
      perguntaDeOuro: "Que carinho, descanso ou palavra de segurança a sua versão menina mais precisa receber de você hoje?",
      oracaoContemplativa: "Senhor Deus, eu trago diante de Ti a minha história e cada fase da minha infância. Acolhe a menina que fui e firma a mulher que sou na Tua paz inabalável. Amém.",
      desafioPratico: "Reserve 5 minutos de pausa hoje para colocar a mão no coração e dizer a si mesma: 'Você está segura, nós estamos sob a guarda de Deus'.",
    };
  }

  if (theme.includes("perda") || theme.includes("perdoa") || theme.includes("magoa") || theme.includes("ressentimento")) {
    return {
      titulo: "A Chave do Perdão e o Corte dos Grilhões",
      temaJunguiano: "Dissolução dos Complexos de Amargura e Fixação Psíquica",
      versiculoAra: {
        referencia: "Colossenses 3:13 (ARA)",
        texto: "Suportai-vos uns aos outros, perdoai-vos mutuamente, caso alguém tenha motivo de queixa contra outrem. Assim como o Senhor vos perdoou, assim também perdoai vós.",
      },
      conteudoReflexao: "Carregar ressentimento é como segurar uma brasa acesa esperando que o outro se queime. Na perspectiva analítica, a mágoa crônica mantém uma ponte invisível de energia prendendo você exatamente àquilo que mais te feriu.\n\nPerdoar não é concordar com a injustiça cometida, nem fingir que não doeu. Perdoar é um ato de soberania e elegância espiritual: você cancela a dívida perante Deus e retoma a guarda total da sua paz.",
      perguntaDeOuro: "Qual é o preço diário em saúde, sono e alegria que você vem pagando por manter essa mágoa viva?",
      oracaoContemplativa: "Pai celeste, pela autoridade do Teu amor que me perdoou, eu escolho soltar hoje todo ressentimento. Entrego a justiça em Tuas mãos e tomo posse da minha leveza. Amém.",
      desafioPratico: "Escreva mentalmente a declaração: 'Eu cancelo a dívida de quem me ofendeu. Eu escolho ser livre e florescer'.",
    };
  }

  if (theme.includes("auto-perda") || theme.includes("autoperda") || theme.includes("culpa") || theme.includes("vergonha") || theme.includes("passado")) {
    return {
      titulo: "Misericórdia Íntima: A Deposição das Armas Contra Si Mesma",
      temaJunguiano: "Integração Compassiva da Sombra e Desativação do Crítico Interno",
      versiculoAra: {
        referencia: "Romanos 8:1 (ARA)",
        texto: "Agora, pois, já nenhuma condenação há para os que estão em Cristo Jesus.",
      },
      conteudoReflexao: "Com frequência, a nossa juíza mais severa somos nós mesmas. Ficamos revivendo decisões passadas com o chicote da culpa mental, esquecendo que agimos com o nível de maturidade e carência que tínhamos naquele instante.\n\nSe o próprio Cristo não nos condena, continuar nos punindo é uma arrogância inconsciente. A graça nos convida a transformar o erro em sabedoria e a seguir em frente com a fronte erguida.",
      perguntaDeOuro: "Se uma amiga querida tivesse cometido o mesmo erro que você cometeu, você a trataria com a mesma dureza com que se trata?",
      oracaoContemplativa: "Senhor, eu recebo a Tua graça que apaga o meu passado e renova as minhas manhãs. Eu me perdoo e me autorizo a viver em paz. Amém.",
      desafioPratico: "Substitua a autocensura por uma oração de gratidão pelo aprendizado adquirido.",
    };
  }

  if (theme.includes("depend") || theme.includes("aprovacao") || theme.includes("agradar") || theme.includes("rejeic") || theme.includes("abandono")) {
    return {
      titulo: "Rompendo a Mendicância Afetiva e Reassumindo seu Valor",
      temaJunguiano: "Recolhimento de Projeções do Salvador e Fortalecimento do Self",
      versiculoAra: {
        referencia: "Jeremias 17:7 (ARA)",
        texto: "Bendito o homem que confia no Senhor e cuja esperança é o Senhor.",
      },
      conteudoReflexao: "Quando entregamos a chave do nosso bem-estar às reações, respostas e aprovações de outras pessoas, nos tornamos prisioneiras do medo da rejeição. Ninguém na terra foi criado para suportar o peso de ser o seu salvador emocional.\n\nA auto-responsabilidade madura nos lembra que a nossa dignidade é concedida pelo Criador. Relacionamentos saudáveis nascem de duas pessoas inteiras que transbordam, e não de carências que se escravizam mutuamente.",
      perguntaDeOuro: "Onde você tem se anulado ou diminuído o seu padrão de dignidade apenas para não se sentir rejeitada?",
      oracaoContemplativa: "Senhor, Tu és a fonte da minha saciedade e da minha honra. Eu me desligo da dependência da aprovação humana e descanso no Teu amor. Amém.",
      desafioPratico: "Pratique hoje um 'não' sereno e respeitoso para qualquer convite ou exigência que desrespeite a sua paz e integridade.",
    };
  }

  // General theme: Autoestima, Poder Pessoal, Cura e Força Interior
  return {
    titulo: "Florescimento da Alma: Poder Pessoal & Graça Soberana",
    temaJunguiano: "Individuação e Integração do Animus Luminoso",
    versiculoAra: {
      referencia: "2 Timóteo 1:7 (ARA)",
      texto: "Porque Deus não nos tem dado espírito de covardia, mas de poder, de amor e de moderação.",
      },
    conteudoReflexao: `Neste dia, o convite para a sua jornada é de alinhamento interior e clareza de propósito para o tema "${rawTheme || "Cura, Autoestima e Força"}".\n\nA sabedoria bíblica e a psicanálise profunda nos mostram que a verdadeira maturidade feminina consiste em reconhecer que você não é refém das tempestades externas. Sob a bênção de Deus, você possui autoridade espiritual, inteligência emocional e capacidade soberana de governar a sua história.`,
    perguntaDeOuro: "Qual decisão madura e corajosa você precisa tomar hoje para honrar a mulher valorosa que você é?",
    oracaoContemplativa: "Pai amado, fortalece o meu coração com sabedoria, discernimento e serenidade. Guia os meus passos no caminho da integridade e da paz. Amém.",
    desafioPratico: "Dê hoje um passo concreto em direção aos seus objetivos sem esperar validação ou permissão de terceiros.",
  };
}

// Fallback for Mentor Chat
function generateFallbackMentorReply(userMessage: string): string {
  const msg = (userMessage || "").toLowerCase();

  if (msg.includes("rejeição") || msg.includes("abandono") || msg.includes("medo")) {
    return `Compreendo profundamente o peso dessa dor. Na perspectiva junguiana, o medo do abandono frequentemente remonta a carências da nossa infância, quando acreditávamos que precisávamos nos moldar para sermos aceitas.\n\nNas Escrituras, o Salmo 27:10 nos lembra: *"Porque, se meu pai e minha mãe me desampararem, o Senhor me acolherá."*\n\nA cura começa quando você assume a auto-responsabilidade de não se abandonar mais. O que você pode fazer hoje para ser o seu próprio refúgio seguro de respeito e acolhimento sob a graça de Deus?`;
  }

  if (msg.includes("perdoar") || msg.includes("culpa") || msg.includes("mágoa")) {
    return `O perdão é uma das maiores expressões de soberania e maturidade da alma. Quando guardamos rancor ou nos culpamos sem cessar, mantemos nossa mente aprisionada ao passado.\n\nComo lemos em Colossenses 3:13, somos convidadas a perdoar assim como fomos perdoadas. O perdão não valida o erro do outro; ele liberta você para viver o presente com leveza.\n\nQual parte da sua história você decide entregar nas mãos soberanas de Deus neste momento?`;
  }

  return `Agradeço pela sua confiança e sensibilidade ao compartilhar essa questão. Toda dor ou conflito que emerge em nossa vida traz em si a semente de um salto de maturidade e consciência.\n\nNa Palavra de Deus (2 Timóteo 1:7), somos lembradas de que recebemos um espírito de poder, amor e moderação — e não de covardia ou desamparo. Quando unimos a fé e a auto-responsabilidade emocional, nenhum obstáculo tem o poder de nos diminuir.\n\nRespire fundo e reflita: qual é a atitude mais nobre e amorosa que você pode tomar por si mesma e pelos seus relacionamentos hoje?`;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mentor Chat: Acolhimento, Psicanálise Junguiana e Sabedoria Bíblica
app.post("/api/mentor-chat", async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Mensagens inválidas fornecidas." });
    }

    const lastUserMsg = messages[messages.length - 1]?.content || "";
    const genAI = getGenAI();

    if (!genAI) {
      const replyText = generateFallbackMentorReply(lastUserMsg);
      return res.json({ text: replyText });
    }

    const systemInstruction = `Você é a Mentora 'Florescer Diário', uma conselheira e psicanalista de linha junguiana e profunda conhecedora da Sabedoria Bíblica e da Palavra de Deus.
Seu público-alvo são mulheres em busca de cura interior, autoestima, identidade, merecimento, superação da rejeição e abandono, valor próprio, coragem de ser vista e profunda auto-responsabilidade emocional nos relacionamentos.

Suas diretrizes fundamentais:
1. TOM E POSTURA: Acolhedor, elegante, empático, firme, profissional e reflexivo. Nunca condescendente, nunca moralista ou acusatório.
2. PSICANÁLISE JUNGUIANA: Utilize conceitos de Carl Gustav Jung (Sombra, Projeções inconscientes nos relacionamentos, Persona vs. Self, Complexos, Individuação, Cura da Criança Interior, Integração do Animus/Anima, Arquétipos femininos) de maneira didática e libertadora.
3. SABEDORIA BÍBLICA: Cite passagens das Escrituras Sagradas (tradução ARA), mostrando a perfeita consonância entre a verdade divina, a renovação da mente, a graça e a saúde da alma.
4. AUTOESTIMA, IDENTIDADE & PODER PESSOAL: Reforce que o valor da mulher é inegociável e concedido por Deus, curando feridas de rejeição e o medo de abandono.
5. AUTO-RESPONSABILIDADE & CONSCIÊNCIA: Ajude a mulher a sair do papel de vítima das circunstâncias ou de terceiros, guiando-a a enxergar suas próprias escolhas, limites claros e soberania emocional.
6. MOTIVAÇÃO & AÇÃO: Conclua sempre com uma pergunta reflexiva de ouro e um passo prático ou oração de consciência.
7. IDIOMA: Português do Brasil com excelente redação, tom acolhedor e profissional.`;

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    if (userContext) {
      contents.unshift({
        role: "user",
        parts: [{ text: `[Contexto da usuária: ${userContext}]` }],
      });
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const replyText = response.text || generateFallbackMentorReply(lastUserMsg);
    return res.json({ text: replyText });
  } catch (error: any) {
    console.error("Erro no mentor-chat, utilizando resposta segura e acolhedora:", error?.message);
    const lastUserMsg = req.body?.messages?.[req.body.messages.length - 1]?.content || "";
    return res.json({ text: generateFallbackMentorReply(lastUserMsg) });
  }
});

// Situational Analysis / Reflection Scanner
app.post("/api/analyze-reflection", async (req, res) => {
  try {
    const { situation, category, relationshipRole } = req.body;

    if (!situation) {
      return res.status(400).json({ error: "Descreva a situação ou sentimento." });
    }

    const genAI = getGenAI();

    if (!genAI) {
      return res.json({
        tituloDiagnostico: "O Despertar da Consciência & O Espelho das Relações",
        lenteJunguiana: {
          conceitoChave: "Projeção da Sombra e Recolhimento de Expectativas",
          explicacao: "Na visão de Carl Jung, aquilo que mais nos desestabiliza no comportamento do outro reflete aspectos inconscientes que precisamos integrar em nós mesmas (nossas necessidades não expressas ou limites que deixamos de impor).",
          perguntaSombra: "Que limite claro você deixou de comunicar por medo de desagradar ou perder a aprovação alheia?",
        },
        sabedoriaBiblicaAra: {
          referencia: "Provérbios 4:23 (ARA)",
          textoVersiculo: "Sobre tudo o que se deve guardar, guarda o coração, porque dele procedem as fontes da vida.",
          reflexaoEspiritual: "Guardar o coração não significa se fechar com amargura, mas erguer limites sagrados que protegem a sua dignidade e paz interior.",
        },
        chamadoAutoResponsabilidade: {
          foraDoMeuControle: [
            "A aprovação, reação ou mudança de comportamento de terceiros.",
            "As palavras e escolhas que já aconteceram no passado.",
          ],
          sobMinhaSoberania: [
            "Como eu me posiciono com firmeza e elegância a partir de agora.",
            "A escolha de honrar meus valores e não aceitar menos do que respeito mútuo.",
          ],
        },
        acaoConsciente: "Escreva em um papel o limite inegociável que você precisa sustentar nesta relação com serenidade.",
        afirmacaoDiaria: "Eu sou senhora das minhas atitudes e descanso na soberania de Deus. Minha paz é inegociável.",
      });
    }

    const systemInstruction = `Você é uma especialista em desenvolvimento feminino do 'Florescer Diário' que une a Psicanálise de Carl Jung, a Sabedoria Bíblica e a Auto-responsabilidade Emocional (autoestima, identidade, valor próprio, merecimento, cura de rejeição e abandono). Mantenha sempre um tom acolhedor e profissional.`;

    const prompt = `Analise com profundidade a seguinte situação vivida por uma mulher:
Categoria: ${category || "Geral / Relacionamento / Autoestima"}
Papel/Contexto: ${relationshipRole || "Pessoal"}
Relato da usuária: "${situation}"

Retorne uma análise profunda, acolhedora, profissional e transformadora nos campos especificados no schema.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tituloDiagnostico: {
              type: Type.STRING,
              description: "Um título poético e reflexivo para a análise (ex: O Espelho da Projeção e a Cura do Coração)",
            },
            lenteJunguiana: {
              type: Type.OBJECT,
              properties: {
                conceitoChave: { type: Type.STRING, description: "Nome do conceito (ex: Projeção da Sombra, Inflação da Persona, Ferida Materna, Ferida do Abandono, etc.)" },
                explicacao: { type: Type.STRING, description: "Como este conceito de Carl Jung se manifesta no relato dela" },
                perguntaSombra: { type: Type.STRING, description: "Uma pergunta desconfortável mas libertadora sobre o que ela está evitando ver em si mesma" },
              },
              required: ["conceitoChave", "explicacao", "perguntaSombra"],
            },
            sabedoriaBiblicaAra: {
              type: Type.OBJECT,
              properties: {
                referencia: { type: Type.STRING, description: "Livro, Capítulo e Versículo da Bíblia (ARA)" },
                textoVersiculo: { type: Type.STRING, description: "Texto bíblico fiel e inspirador" },
                reflexaoEspiritual: { type: Type.STRING, description: "Como a palavra de Deus ilumina, conforta e liberta essa situação" },
              },
              required: ["referencia", "textoVersiculo", "reflexaoEspiritual"],
            },
            chamadoAutoResponsabilidade: {
              type: Type.OBJECT,
              properties: {
                foraDoMeuControle: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2 a 3 coisas que ela precisa parar de tentar controlar nos outros ou no passado",
                },
                sobMinhaSoberania: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "2 a 3 atitudes concretas que pertencem 100% à responsabilidade e poder dela",
                },
              },
              required: ["foraDoMeuControle", "sobMinhaSoberania"],
            },
            acaoConsciente: {
              type: Type.STRING,
              description: "Um passo prático, comunicacional ou comportamental para dar hoje",
            },
            afirmacaoDiaria: {
              type: Type.STRING,
              description: "Uma declaração de fé, identidade, merecimento e maturidade para repetir hoje",
            },
          },
          required: [
            "tituloDiagnostico",
            "lenteJunguiana",
            "sabedoriaBiblicaAra",
            "chamadoAutoResponsabilidade",
            "acaoConsciente",
            "afirmacaoDiaria",
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (error: any) {
    console.error("Erro no analyze-reflection, utilizando análise de salvaguarda:", error?.message);
    return res.json({
      tituloDiagnostico: "O Despertar da Consciência & O Espelho das Relações",
      lenteJunguiana: {
        conceitoChave: "Projeção da Sombra e Recolhimento de Expectativas",
        explicacao: "Na visão de Carl Jung, aquilo que mais nos desestabiliza no comportamento do outro reflete aspectos inconscientes que precisamos integrar em nós mesmas (nossas necessidades não expressas ou limites que deixamos de impor).",
        perguntaSombra: "Que limite claro você deixou de comunicar por medo de desagradar ou perder a aprovação alheia?",
      },
      sabedoriaBiblicaAra: {
        referencia: "Provérbios 4:23 (ARA)",
        textoVersiculo: "Sobre tudo o que se deve guardar, guarda o coração, porque dele procedem as fontes da vida.",
        reflexaoEspiritual: "Guardar o coração não significa se fechar com amargura, mas erguer limites sagrados que protegem a sua dignidade e paz interior.",
      },
      chamadoAutoResponsabilidade: {
        foraDoMeuControle: [
          "A aprovação, reação ou mudança de comportamento de terceiros.",
          "As palavras e escolhas que já aconteceram no passado.",
        ],
        sobMinhaSoberania: [
          "Como eu me posiciono com firmeza e elegância a partir de agora.",
          "A escolha de honrar meus valores e não aceitar menos do que respeito mútuo.",
        ],
      },
      acaoConsciente: "Escreva em um papel o limite inegociável que você precisa sustentar nesta relação com serenidade.",
      afirmacaoDiaria: "Eu sou senhora das minhas atitudes e descanso na soberania de Deus. Minha paz é inegociável.",
    });
  }
});

// Generate Custom Daily Inspiration & Devotional
app.post("/api/generate-devotional", async (req, res) => {
  try {
    const { theme } = req.body;
    const genAI = getGenAI();

    if (!genAI) {
      const fallback = generateFallbackDevotional(theme);
      return res.json(fallback);
    }

    const systemInstruction = `Você cria devocionais e reflexões para mulheres do 'Florescer Diário', unindo a Sabedoria Bíblica (versículos fiéis da Bíblia ARA) e a psicanálise junguiana.
Mantenha sempre um tom acolhedor, refinado, respeitoso e profissional.
Foque na cura da alma, autoestima, identidade, poder pessoal, pertencimento, cura da criança interior, perdão, quebra de dependência emocional e auto-responsabilidade.`;

    const prompt = `Gere uma reflexão inspiradora, acolhedora e profissional para hoje com o tema: "${theme || "Renovação da Mente, Cura Interior e Poder Pessoal"}".
Enfatize a graça divina, a maturidade emocional e a soberania da mulher sob a bênção de Deus.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titulo: { type: Type.STRING },
            versiculoAra: {
              type: Type.OBJECT,
              properties: {
                referencia: { type: Type.STRING },
                texto: { type: Type.STRING },
              },
              required: ["referencia", "texto"],
            },
            temaJunguiano: { type: Type.STRING },
            conteudoReflexao: { type: Type.STRING },
            perguntaDeOuro: { type: Type.STRING },
            oracaoContemplativa: { type: Type.STRING },
            desafioPratico: { type: Type.STRING },
          },
          required: [
            "titulo",
            "versiculoAra",
            "temaJunguiano",
            "conteudoReflexao",
            "perguntaDeOuro",
            "oracaoContemplativa",
            "desafioPratico",
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (error: any) {
    console.error("Erro no generate-devotional, gerando devocional acolhedor de salvaguarda:", error?.message);
    const fallback = generateFallbackDevotional(req.body?.theme);
    return res.json(fallback);
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Florescer Diário Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
