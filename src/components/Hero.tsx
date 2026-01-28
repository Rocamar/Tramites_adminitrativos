import { Search, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-terracotta/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-olive-light/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">Tu guía para trámites públicos</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Domina la burocracia
            <span className="block mt-2 text-terracotta-light">sin perder los nervios</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Gestionar el DNI, la Vida Laboral o tu Empadronamiento ya no tiene por qué ser un laberinto. Te guiamos directo al punto exacto, paso a paso.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" className="group">
              <Search className="mr-2 h-5 w-5" />
              Buscar trámites
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar con el asistente
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-primary-foreground/60 mb-4">Más de 2.500 organismos públicos disponibles</p>
            <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/80">
              <div className="text-center">
                <div className="text-2xl font-display font-bold">17</div>
                <div className="text-xs">Comunidades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold">+500</div>
                <div className="text-xs">Trámites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold">24/7</div>
                <div className="text-xs">Disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
