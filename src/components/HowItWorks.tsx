import { Search, FileCheck, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Escribe tu duda",
    description: "Nuestro buscador conoce cada rincón de la administración estatal y autonómica.",
    color: "bg-olive-light",
  },
  {
    icon: FileCheck,
    title: "Entiende los pasos",
    description: "Te explicamos qué papeles necesitas tener en la mano antes de empezar.",
    color: "bg-terracotta",
  },
  {
    icon: Send,
    title: "Accede al instante",
    description: "Te llevamos a la página oficial exacta. Sin publicidad, sin rodeos.",
    color: "bg-olive",
  },
  {
    icon: CheckCircle,
    title: "Trámite hecho",
    description: "Descarga tu justificante y sigue disfrutando de tu tiempo libre.",
    color: "bg-terracotta-light",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Así de fácil
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En cuatro sencillos pasos, podrás completar cualquier trámite administrativo sin complicaciones
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
                )}

                <div
                  className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border h-full cursor-pointer hover:border-primary/20"
                  onClick={() => {
                    const queries: Record<string, string> = {
                      "Escribe tu duda": "Quiero buscar un trámite",
                      "Entiendo los pasos": "Qué documentos necesito",
                      "Accede al instante": "Enlace oficial de trámites",
                      "Trámite hecho": "Cómo descargar justificante"
                    };
                    const event = new CustomEvent('open-chat-with-query', { detail: queries[step.title] || step.title });
                    window.dispatchEvent(event);
                  }}
                >
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shadow-accent">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
