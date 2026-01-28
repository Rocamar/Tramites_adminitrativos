import { useState } from "react";
import { Search, Building2, FileText, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Todos", icon: Search },
  { id: "organisms", label: "Organismos", icon: Building2 },
  { id: "procedures", label: "Trámites", icon: FileText },
  { id: "locations", label: "Oficinas", icon: MapPin },
];

const popularSearches = [
  "Certificado de empadronamiento",
  "Renovar DNI",
  "Solicitar prestación por desempleo",
  "Declaración de la renta",
  "Tarjeta sanitaria europea",
  "Vida laboral",
];

const SearchSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section id="search-section" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              ¿Qué trámite necesitas realizar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Busca entre miles de trámites y administraciones de toda España
            </p>
          </div>

          {/* Search box */}
          <div className="bg-card rounded-2xl shadow-medium p-6 md:p-8 border border-border">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-secondary-foreground hover:bg-sand-dark"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search input */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Escribe tu trámite, organismo o pregunta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base rounded-xl border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button
                variant="hero"
                size="lg"
                className="h-14 px-8"
                onClick={() => {
                  if (!searchQuery.trim()) return;
                  const event = new CustomEvent('open-chat-with-query', { detail: searchQuery });
                  window.dispatchEvent(event);
                }}
              >
                Buscar
              </Button>
            </div>

            {/* Popular searches */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search);
                      const event = new CustomEvent('open-chat-with-query', { detail: search });
                      window.dispatchEvent(event);
                    }}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-sand-dark transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
