import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Bot, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { knowledgeBase, identifyRegion, identifyTopic } from "@/data/knowledgeBase";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const MessageContent = ({ text }: { text: string }) => {
  // Robust regex to find markdown links [text](url) or [text] (url)
  const parts = text.split(/(\[.*?\]\s*\(.*?\))/g);

  return (
    <>
      {parts.map((part, i) => {
        const linkMatch = part.match(/\[(.*?)\]\s*\((.*?)\)/);
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary underline hover:text-primary/80 font-bold break-all cursor-pointer relative z-10"
              onClick={(e) => {
                console.log("Link clicked:", linkMatch[2]);
                // Ensure the click propagates correctly or is handled
              }}
            >
              {linkMatch[1]}
              <ExternalLink className="ml-1 h-3 w-3 inline" />
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "¡Hola! Soy tu guía experto. ¿Estás perdido en alguna sede electrónica o necesitas saber qué documentos llevar para tu cita? Dime qué buscas y te lo aclaro en segundos.",
    isBot: true,
  },
];

const quickQuestions = [
  "¿Cómo renuevo el DNI sin cita?",
  "Papeles para el empadronamiento",
  "¿Dónde está mi vida laboral?",
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastQuestionType, setLastQuestionType] = useState<string | null>(null);
  const handleSendRef = useRef<any>(null);

  useEffect(() => {
    handleSendRef.current = handleSend;
  });

  useEffect(() => {
    const handleCustomSearch = (event: any) => {
      const query = event.detail;
      setIsOpen(true);
      if (handleSendRef.current) {
        handleSendRef.current(query);
      }
    };

    window.addEventListener('open-chat-with-query', handleCustomSearch as EventListener);
    return () => window.removeEventListener('open-chat-with-query', handleCustomSearch as EventListener);
  }, []);

  const simulateBotResponse = (userText: string) => {
    setIsTyping(true);

    let responseText = "Buscando información oficial...";
    let nextQuestionType: string | null = "generic_link";
    const lowers = userText.toLowerCase();

    // 1. Identify Topic and Region from current input
    const regionKey = identifyRegion(userText);
    const topicKey = identifyTopic(userText);

    // 2. Check context from previous turn
    let effectiveRegion = regionKey;
    let effectiveTopic = topicKey;

    if (lastQuestionType?.startsWith("waiting_for_region_")) {
      // Context: We were waiting for a region for a specific topic
      const pendingTopic = lastQuestionType.replace("waiting_for_region_", "") as any;

      // If the user provided a region now, we use it. 
      // If they didn't provide a distinguishable region but said something else, we might still want to know.
      if (effectiveRegion) {
        effectiveTopic = pendingTopic;
      }
    } else if (lastQuestionType?.startsWith("waiting_for_topic_")) {
      // Context: We were waiting for a topic for a specific region
      const pendingRegion = lastQuestionType.replace("waiting_for_topic_", "");
      if (effectiveTopic) {
        effectiveRegion = pendingRegion;
      }
    }

    // 3. Logic Matching
    if (effectiveRegion && effectiveTopic) {
      const regionData = knowledgeBase[effectiveRegion];
      const link = regionData.links[effectiveTopic];

      const topicName = effectiveTopic === 'discapacidad' ? 'Discapacidad' :
        effectiveTopic === 'desempleo' ? 'Desempleo/Paro' :
          effectiveTopic === 'familia' ? 'Familia' : 'Salud';

      const searchUrl = regionData.searchTemplate.replace("{query}", topicName);

      if (link) {
        responseText = `✅ Aquí tienes los trámites para **${topicName}** en **${regionData.name}**:\n\n1. [Enlace Directo Recomendado](${link})\n2. [🔍 Ver todos los resultados de búsqueda](${searchUrl})\n\n¿Necesitas algo más?`;
        nextQuestionType = null;
      } else {
        responseText = `He identificado que buscas sobre **${effectiveTopic}** en **${regionData.name}**.\n\nAquí tienes todos los resultados de la sede oficial:\n[🔍 Ver trámites de ${topicName}](${searchUrl})`;
        nextQuestionType = null;
      }
    } else if (effectiveRegion) {
      // Region found, but no topic
      const regionData = knowledgeBase[effectiveRegion];
      responseText = `🏢 Has mencionado **${regionData.name}**. ¿Qué trámite buscas? (Ej: "Desempleo", "Discapacidad", "Salud"...)`;
      nextQuestionType = "waiting_for_topic_" + effectiveRegion;
    } else if (effectiveTopic) {
      // Topic found, but no region
      const topicName = effectiveTopic === 'discapacidad' ? 'Discapacidad' :
        effectiveTopic === 'desempleo' ? 'Desempleo/Paro' : 'este tema';
      responseText = `Entiendo que buscas información sobre **${topicName}**. 🌍 ¿Para qué Comunidad Autónoma es? (Ej: Andalucía, Madrid, Galicia...)`;
      nextQuestionType = "waiting_for_region_" + effectiveTopic;
    } else {
      // Existing fallback logic
      const isConfirmation = lowers === "si" || lowers === "sí" ||
        /\b(vale|claro|por favor|ok|confirmar)\b/.test(lowers);

      if (lastQuestionType && isConfirmation) {
        if (lastQuestionType === "generic_link") {
          responseText = "¡Perfecto! Aquí tienes el acceso directo al portal oficial: [Portal de Trámites](https://www.sede.gob.es).";
          nextQuestionType = null;
        } else if (lastQuestionType === "dni_link") {
          responseText = "Aquí tienes el enlace oficial para la cita: [Cita Previa DNI](https://www.citapreviadnie.es).";
          nextQuestionType = null;
        } else if (lastQuestionType === "padron_query") {
          responseText = "Entendido. La mayoría de ayuntamientos usan el sistema Cl@ve. ¿Tienes ya tu Certificado Digital?";
          nextQuestionType = "has_clave";
        } else if (lastQuestionType === "vida_laboral_link") {
          responseText = "Accede aquí directamente con tu móvil: [Import@ss - Vida Laboral](https://portal.seg-social.gob.es).";
          nextQuestionType = null;
        } else if (lastQuestionType?.startsWith("waiting_for_topic_")) {
          responseText = "¿Qué trámite necesitas buscar?";
        }
      } else if (lowers.includes("dni")) {
        responseText = "📍 Renovar DNI: Necesitas cita previa en citapreviadnie.es. ¿Quieres el link de cita?";
        nextQuestionType = "dni_link";
      } else if (lowers.includes("padron") || lowers.includes("empadronamiento")) {
        responseText = "🏠 Padrón: Ve a la web de tu Ayuntamiento. ¿Sabes si tu Ayuntamiento tiene sede online?";
        nextQuestionType = "padron_query";
      } else if (lowers.includes("vida laboral")) {
        responseText = "👷 Vida Laboral: El método más rápido es vía SMS en el portal Import@ss. ¿Te paso el enlace?";
        nextQuestionType = "vida_laboral_link";
      } else if (lowers.includes("gracias")) {
        responseText = "¡De nada! Aquí estoy para lo que necesites.";
        nextQuestionType = null;
      } else {
        // Generic fallback
        responseText = "No estoy seguro de haberte entendido. Prueba diciendo algo como 'Desempleo en Valencia' o simplemente dime qué trámite buscas.";
        nextQuestionType = null;
      }
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + Math.random(),
        text: responseText,
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      setLastQuestionType(nextQuestionType);
    }, 1200);
  };

  const handleSend = (textOverride?: string) => {
    const textToSendMessage = textOverride || inputValue;
    if (!textToSendMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now() - 1,
      text: textToSendMessage,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    simulateBotResponse(textToSendMessage);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-accent shadow-accent flex items-center justify-center transition-all duration-300 hover:scale-105 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        aria-label="Abrir asistente"
      >
        <MessageCircle className="h-7 w-7 text-accent-foreground" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-medium border border-border overflow-hidden transition-all duration-300 ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        {/* Header */}
        <div className="gradient-hero p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Asistente Virtual</h3>
              <p className="text-xs text-primary-foreground/70">Siempre disponible para ayudarte</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            aria-label="Cerrar asistente"
          >
            <X className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot
                  ? "bg-primary text-primary-foreground"
                  : "bg-terracotta text-accent-foreground"
                  }`}
              >
                {message.isBot ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${message.isBot
                  ? "bg-card text-foreground rounded-tl-none border border-border"
                  : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
              >
                <MessageContent text={message.text} />
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-card text-foreground px-4 py-2.5 rounded-2xl rounded-tl-none border border-border text-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Quick questions */}
        {messages.length < 5 && (
          <div className="px-4 py-3 border-t border-border bg-card">
            <p className="text-xs text-muted-foreground mb-2">Sugerencias:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-sand-dark transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-background"
            />
            <Button onClick={() => handleSend()} variant="hero" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
