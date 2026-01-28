import { Building2, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const administrations = [
  {
    name: "Administración General del Estado",
    description: "Ministerios, Agencia Tributaria, Seguridad Social, SEPE...",
    type: "Estatal",
    procedures: "+200",
  },
  {
    name: "Comunidad de Madrid",
    description: "Sanidad, educación, empleo, vivienda y servicios sociales.",
    type: "Autonómica",
    procedures: "+150",
  },
  {
    name: "Generalitat de Catalunya",
    description: "Trámites de la Generalitat, salud, trabajo y familia.",
    type: "Autonómica",
    procedures: "+180",
  },
  {
    name: "Junta de Andalucía",
    description: "Empleo, sanidad, educación y servicios ciudadanos.",
    type: "Autonómica",
    procedures: "+160",
  },
  {
    name: "Generalitat Valenciana",
    description: "Gestiones de salud, empleo, vivienda y ayudas sociales.",
    type: "Autonómica",
    procedures: "+140",
  },
  {
    name: "Gobierno Vasco",
    description: "Lanbide, Osakidetza, educación y prestaciones.",
    type: "Autonómica",
    procedures: "+120",
  },
];

const AdministrationsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-4">
            Cobertura completa
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Administraciones disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accede a todas las administraciones públicas de España desde un único lugar
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {administrations.map((admin, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${admin.type === "Estatal"
                    ? "bg-terracotta/10 text-terracotta"
                    : "bg-olive-light/20 text-olive"
                  }`}>
                  {admin.type}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {admin.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {admin.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {admin.procedures} trámites
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary group-hover:translate-x-1 transition-transform"
                  onClick={() => {
                    const event = new CustomEvent('open-chat-with-query', { detail: `Trámites de ${admin.name}` });
                    window.dispatchEvent(event);
                  }}
                >
                  Ver trámites
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Ver todas las administraciones
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdministrationsSection;
