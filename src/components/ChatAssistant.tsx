import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

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
  const handleSendRef = useRef<any>(null);

  useEffect(() => {
    handleSendRef.current = handleSend;
  });

  useEffect(() => {
    const handleCustomSearch = (event: any) => {
      console.log("ChatAssistant: Event caught", event.detail);
      const query = event.detail;
      setIsOpen(true);
      if (handleSendRef.current) {
        handleSendRef.current(query);
      }
    };

    console.log("ChatAssistant: Event listener added");
    window.addEventListener('open-chat-with-query', handleCustomSearch as EventListener);
    return () => window.removeEventListener('open-chat-with-query', handleCustomSearch as EventListener);
  }, []);

  const simulateBotResponse = (userText: string) => {
    setIsTyping(true);

    // Simulate specialized responses based on common keywords
    let responseText = "Buscando información oficial... Encontrado. Para completar ese trámite necesitas entrar en la sede electrónica oficial. ¿Te gustaría que te envíe el enlace directo?";

    const lowers = userText.toLowerCase();
    if (lowers.includes("dni")) {
      responseText = "📍 Renovar DNI: Necesitas cita previa en citapreviadnie.es. Debes llevar: Foto reciente, el DNI antiguo y 12€ (en efectivo o pago telemático). ¿Quieres el link de cita?";
    } else if (lowers.includes("padron") || lowers.includes("empadronamiento")) {
      responseText = "🏠 Padrón: Ve a la web de tu Ayuntamiento. Si tienes Cl@ve o Certificado Digital, puedes descargar el 'Volante' al instante. ¿Sabes si tu Ayuntamiento tiene sede online?";
    } else if (lowers.includes("vida laboral")) {
      responseText = "👷 Vida Laboral: El método más rápido es vía SMS en el portal Import@ss. Recibes un código en el móvil y descargas el PDF al momento. ¿Te paso el enlace?";
    } else if (lowers.includes("madrid") || lowers.includes("catalunya") || lowers.includes("andalucía") || lowers.includes("valenciana") || lowers.includes("vasco")) {
      responseText = `🏢 He encontrado acceso directo a los trámites de la administración que buscas. ¿Qué gestión en concreto necesitas realizar allí?`;
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + Math.random(),
        text: responseText,
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
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
                {message.text}
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
