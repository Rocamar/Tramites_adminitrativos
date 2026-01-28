import { Search, FileCheck, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Busca tu trámite",
    description: "Encuentra el trámite que necesitas entre las administraciones estatales y autonómicas.",
    color: "bg-olive-light",
  },
  {
    icon: FileCheck,
    title: "Revisa los requisitos",
    description: "Te explicamos paso a paso qué documentos necesitas y cómo obtenerlos.",
    color: "bg-terracotta",
  },
  {
    icon: Send,
    title: "Accede a la sede electrónica",
    description: "Te llevamos directamente al formulario oficial de la administración correspondiente.",
    color: "bg-olive",
  },
  {
    icon: CheckCircle,
    title: "Completa tu gestión",
    description: "Recibe confirmación y guarda el justificante de tu trámite realizado.",
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
                
                <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border h-full">
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
