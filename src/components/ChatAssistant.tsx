import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Bot, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
              className="inline-flex items-center text-accent-foreground underline hover:text-accent-foreground/80 font-medium break-all"
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

    // Simulate specialized responses based on common keywords
    let responseText = "Buscando información oficial... Encontrado. Para completar ese trámite necesitas entrar en la sede electrónica oficial. ¿Te gustaría que te envíe el enlace directo?";

    const lowers = userText.toLowerCase();
    let nextQuestionType: string | null = "generic_link";

    // Improved confirmation check (avoiding collisions with "valenciana")
    const isConfirmation = lowers === "si" || lowers === "sí" ||
      /\b(vale|claro|por favor|ok|confirmar)\b/.test(lowers);

    // Handle confirmations if a question was recently asked
    if (lastQuestionType && isConfirmation) {
      if (lastQuestionType === "generic_link") {
        responseText = "¡Perfecto! Aquí tienes el acceso directo al portal oficial: [Portal de Trámites](https://www.sede.gob.es). ¿Necesitas ayuda con algún paso específico de la solicitud?";
        nextQuestionType = "needs_steps";
      } else if (lastQuestionType === "dni_link") {
        responseText = "Aquí tienes el enlace oficial para la cita: [Cita Previa DNI](https://www.citapreviadnie.es). Recuerda tener tu DNI actual a mano para los datos.";
        nextQuestionType = null;
      } else if (lastQuestionType === "padron_query") {
        responseText = "Entendido. La mayoría de ayuntamientos usan el sistema Cl@ve. ¿Tienes ya tu Certificado Digital o Cl@ve activa?";
        nextQuestionType = "has_clave";
      } else if (lastQuestionType === "vida_laboral_link") {
        responseText = "Accede aquí directamente con tu móvil: [Import@ss - Vida Laboral](https://portal.seg-social.gob.es). Recibirás el SMS al instante.";
        nextQuestionType = null;
      } else if (lastQuestionType === "madrid_link") {
        responseText = "Aquí tienes el catálogo completo: [Sede Comunidad de Madrid](https://sede.comunidad.madrid). ¿Buscas alguna consejería específica?";
        nextQuestionType = null;
      } else if (lastQuestionType === "catalunya_link") {
        responseText = "Aquí tienes el enlace oficial: [Tràmits Gencat](https://tramits.gencat.cat). Puedes buscar por temas o departamentos.";
        nextQuestionType = null;
      } else if (lastQuestionType === "andalucia_link") {
        responseText = "Accede desde aquí: [Sede Junta de Andalucía](https://www.juntadeandalucia.es/servicios.html). Tienen un buscador muy eficiente.";
        nextQuestionType = null;
      } else if (lastQuestionType === "valencia_link") {
        responseText = "Perfecto, aquí tienes el acceso: [Sede Electrónica GVA](https://sede.gva.es). ¿Necesitas ayuda para identificar tu trámite?";
        nextQuestionType = null;
      } else if (lastQuestionType === "euskadi_link") {
        responseText = "Aquí lo tienes: [Sede Electrónica Euskadi](https://www.euskadi.eus/sedeelectronica). ¿Quieres saber cómo usar la BakQ?";
        nextQuestionType = null;
      }
    } else if (lowers.includes("dni")) {
      responseText = "📍 Renovar DNI: Necesitas cita previa en citapreviadnie.es. Debes llevar: Foto reciente, el DNI antiguo y 12€ (en efectivo o pago telemático). ¿Quieres el link de cita?";
      nextQuestionType = "dni_link";
    } else if (lowers.includes("padron") || lowers.includes("empadronamiento") || lowers.includes("ayuntamiento")) {
      responseText = "🏠 Padrón: Ve a la web de tu Ayuntamiento. Si tienes Cl@ve o Certificado Digital, puedes descargar el 'Volante' al instante. ¿Sabes si tu Ayuntamiento tiene sede online?";
      nextQuestionType = "padron_query";
    } else if (lowers.includes("vida laboral")) {
      responseText = "👷 Vida Laboral: El método más rápido es vía SMS en el portal Import@ss. Recibes un código en el móvil y descargas el PDF al momento. ¿Te paso el enlace?";
      nextQuestionType = "vida_laboral_link";
    } else if (lowers.includes("madrid")) {
      responseText = "🏢 Aquí tienes el portal oficial de la **Comunidad de Madrid**: [Sede Comunidad de Madrid](https://sede.comunidad.madrid). ¿Buscas alguna consejería específica?";
      nextQuestionType = null;
    } else if (lowers.includes("catalunya") || lowers.includes("cataluña")) {
      responseText = "🏢 Aquí tienes el portal de trámites oficial de la **Generalitat de Catalunya**: [Tràmits Gencat](https://tramits.gencat.cat). ¿Necesitas ayuda para buscar un tema concreto?";
      nextQuestionType = null;
    } else if (lowers.includes("andalucía") || lowers.includes("andalucia")) {
      responseText = "🏢 Aquí tienes la sede electrónica oficial de la **Junta de Andalucía**: [Sede Junta de Andalucía](https://www.juntadeandalucia.es/servicios.html). ¿Buscas algún trámite de ciudadanos?";
      nextQuestionType = null;
    } else if (lowers.includes("valenciana") || lowers.includes("valencia")) {
      responseText = "🏢 Aquí tienes el acceso directo a la **Generalitat Valenciana (GVA)**: [Sede Electrónica GVA](https://sede.gva.es). ¿Quieres que te ayude a encontrar un trámite específico allí?";
      nextQuestionType = null;
    } else if (lowers.includes("vasco") || lowers.includes("euskadi")) {
      responseText = "🏢 Aquí tienes la sede electrónica oficial del **Gobierno Vasco (Euskadi)**: [Sede Electrónica Euskadi](https://www.euskadi.eus/sedeelectronica). ¿Buscas información sobre la BakQ o algún trámite?";
      nextQuestionType = null;
    } else if (lowers.includes("no es mi ayuntamiento") || lowers.includes("otro ayuntamiento")) {
      responseText = "Vaya, parece que te he dado una información genérica. ¿Me podrías decir de qué localidad eres para buscarte el enlace exacto de tu ayuntamiento?";
      nextQuestionType = "ask_location";
    } else if (lowers === "no" || lowers.includes("gracias") || lowers.includes("nada más")) {
      responseText = "¡De nada! Si te surge cualquier otra duda con la burocracia, aquí estaré. ¡Que tengas un buen día!";
      nextQuestionType = null;
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
