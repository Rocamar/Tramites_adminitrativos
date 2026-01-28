import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl mb-4">TrámiteFácil</h3>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Tu guía para gestionar cualquier trámite con las administraciones públicas españolas de forma sencilla.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Trámites populares</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Certificado de empadronamiento</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Renovar DNI/NIE</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Vida laboral</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Declaración de la renta</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Prestación por desempleo</a></li>
            </ul>
          </div>

          {/* Administrations */}
          <div>
            <h4 className="font-semibold mb-4">Administraciones</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Gobierno de España</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Comunidades Autónomas</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Agencia Tributaria</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">Seguridad Social</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition-colors">SEPE</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">¿Necesitas ayuda?</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-terracotta-light" />
                <a href="mailto:ayuda@tramitefacil.es" className="hover:text-terracotta-light transition-colors">ayuda@tramitefacil.es</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-terracotta-light" />
                <span>900 123 456 (gratuito)</span>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <p className="text-xs text-primary-foreground/60">
                Este servicio es informativo y no sustituye a las sedes electrónicas oficiales.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2025 TrámiteFácil. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-terracotta-light transition-colors">Aviso legal</a>
            <a href="#" className="hover:text-terracotta-light transition-colors">Privacidad</a>
            <a href="#" className="hover:text-terracotta-light transition-colors">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
