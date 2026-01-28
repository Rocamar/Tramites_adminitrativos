import { Shield, Lock, Clock, Award } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Fuentes oficiales",
    description: "Toda la información proviene directamente de las sedes electrónicas oficiales.",
  },
  {
    icon: Lock,
    title: "Privacidad garantizada",
    description: "No almacenamos tus datos personales. Tú controlas tu información.",
  },
  {
    icon: Clock,
    title: "Información actualizada",
    description: "Nuestro equipo revisa y actualiza los procedimientos regularmente.",
  },
  {
    icon: Award,
    title: "Sin intermediarios",
    description: "Te conectamos directamente con la administración, sin costes adicionales.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-4">
            Confianza y seguridad
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Tu tranquilidad es nuestra prioridad. Trabajamos para que gestionar tus trámites sea seguro y transparente.
          </p>
        </div>

        {/* Trust items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="h-8 w-8 text-terracotta-light" />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
