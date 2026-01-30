import { useState } from "react";
import { Building2, ChevronDown, ChevronUp, ExternalLink, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const administrations = [
  {
    name: "Administración General del Estado",
    description: "Ministerios, Agencia Tributaria, Seguridad Social, SEPE...",
    type: "Estatal",
    procedures: "+200",
    subAdmins: [
      { name: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/" },
      { name: "Seguridad Social", url: "https://sede.seg-social.gob.es/" },
      { name: "SEPE (Empleo)", url: "https://sede.sepe.gob.es/" },
      { name: "DGT (Tráfico)", url: "https://sede.dgt.gob.es/" },
      { name: "Catastro", url: "https://www.sedecatastro.gob.es/" },
      { name: "Justicia", url: "https://sede.mjusticia.gob.es/" }
    ]
  },
  {
    name: "Comunidad de Madrid",
    description: "Sanidad, educación, empleo, vivienda y servicios sociales.",
    type: "Autonómica",
    procedures: "+150",
    subAdmins: [
      { name: "Portal Ciudadano", url: "https://sede.comunidad.madrid/" },
      { name: "Salud (Cita Sanitaria)", url: "https://www.comunidad.madrid/servicios/salud/cita-sanitaria" },
      { name: "Empleo", url: "https://www.comunidad.madrid/servicios/empleo" },
      { name: "Tributos", url: "https://www.comunidad.madrid/servicios/tributos" }
    ]
  },
  {
    name: "Generalitat de Catalunya",
    description: "Trámites de la Generalitat, salud, trabajo y familia.",
    type: "Autonómica",
    procedures: "+180",
    subAdmins: [
      { name: "Gencat Serveis", url: "https://web.gencat.cat/es/tramits" },
      { name: "La Meva Salut", url: "https://lamevasalut.gencat.cat/" },
      { name: "SOC (Ocupació)", url: "https://serveiocupacio.gencat.cat/" },
      { name: "Agència Tributària", url: "https://atc.gencat.cat/" }
    ]
  },
  {
    name: "Junta de Andalucía",
    description: "Empleo, sanidad, educación y servicios ciudadanos.",
    type: "Autonómica",
    procedures: "+160",
    subAdmins: [
      { name: "Servicios Junta", url: "https://www.juntadeandalucia.es/servicios.html" },
      { name: "SAS (Salud)", url: "https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/" },
      { name: "SAE (Empleo)", url: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/servicios/sae.html" },
      { name: "ATRIAN (Tributos)", url: "https://www.juntadeandalucia.es/agenciatributariadeandalucia/" }
    ]
  },
  {
    name: "Generalitat Valenciana",
    description: "Gestiones de salud, empleo, vivienda y ayudas sociales.",
    type: "Autonómica",
    procedures: "+140",
    subAdmins: [
      { name: "Sede Electrónica", url: "https://sede.gva.es" },
      { name: "Sanitat", url: "https://www.san.gva.es/" },
      { name: "LABORA (Empleo)", url: "https://labora.gva.es/" },
      { name: "ATV (Tributos)", url: "https://atv.gva.es/" }
    ]
  },
  {
    name: "Gobierno Vasco",
    description: "Lanbide, Osakidetza, educación y prestaciones.",
    type: "Autonómica",
    procedures: "+120",
    subAdmins: [
      { name: "Euskadi.eus", url: "https://www.euskadi.eus/sede" },
      { name: "Osakidetza (Salud)", url: "https://www.osakidetza.euskadi.eus/" },
      { name: "Lanbide (Empleo)", url: "https://www.lanbide.euskadi.eus/" }
    ]
  },
  {
    name: "Xunta de Galicia",
    description: "Trámites de salud (Sergas), educación y servicios sociales.",
    type: "Autonómica",
    procedures: "+110",
    subAdmins: [
      { name: "Sede Xunta", url: "https://sede.xunta.gal/" },
      { name: "SERGAS (Saúde)", url: "https://esaude.sergas.es/" },
      { name: "Emprego Galicia", url: "https://emprego.xunta.gal/" }
    ]
  },
  {
    name: "Canarias (Gobierno)",
    description: "Turismo, empleo, salud y servicios para residentes.",
    type: "Autonómica",
    procedures: "+105",
    subAdmins: [
      { name: "Sede Canarias", url: "https://sede.gobiernodecanarias.org/" },
      { name: "SCS (Salud)", url: "https://www3.gobiernodecanarias.org/sanidad/scs/" },
      { name: "SCE (Empleo)", url: "https://www3.gobiernodecanarias.org/empleo/portal/web/sce/" }
    ]
  },
  {
    name: "Castilla y León",
    description: "Sacyl, educación, medio ambiente y servicios rurales.",
    type: "Autonómica",
    procedures: "+115",
    subAdmins: [
      { name: "Tramita CyL", url: "https://www.tramitacastillayleon.jcyl.es/" },
      { name: "Sacyl (Salud)", url: "https://www.saludcastillayleon.es/" },
      { name: "ECyL (Empleo)", url: "https://empleocastillayleon.jcyl.es/" }
    ]
  },
  {
    name: "Región de Murcia",
    description: "Gestiones de vivienda, empleo y administración local.",
    type: "Autonómica",
    procedures: "+95",
    subAdmins: [
      { name: "Sede CARM", url: "https://sede.carm.es/" },
      { name: "MurciaSalud", url: "https://www.murciasalud.es/" },
      { name: "SEF (Empleo)", url: "https://www.sefcarm.es/" }
    ]
  },
  {
    name: "Gobierno de Aragón",
    description: "Salud, desarrollo rural y trámites ciudadanos.",
    type: "Autonómica",
    procedures: "+90",
    subAdmins: [
      { name: "Aragon.es", url: "https://www.aragon.es/tramites" },
      { name: "SaludInforma", url: "https://www.saludinforma.es/" },
      { name: "INAEM (Empleo)", url: "https://inaem.aragon.es/" }
    ]
  },
  {
    name: "Castilla-La Mancha",
    description: "Sescam, agricultura, empleo y bienestar social.",
    type: "Autonómica",
    procedures: "+100",
    subAdmins: [
      { name: "Sede JCCM", url: "https://www.jccm.es/sede" },
      { name: "SESCAM (Salud)", url: "https://sanidad.castillalamancha.es/" },
      { name: "Empleo", url: "https://empleopublico.castillalamancha.es/" }
    ]
  },
];

const AdministrationsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openAdminIndex, setOpenAdminIndex] = useState<number | null>(null);

  const displayedAdmins = isExpanded ? administrations : administrations.slice(0, 6);

  const toggleAdmin = (index: number) => {
    if (openAdminIndex === index) {
      setOpenAdminIndex(null);
    } else {
      setOpenAdminIndex(index);
    }
  };

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
          {displayedAdmins.map((admin, index) => (
            <div
              key={index}
              className={`group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20 animate-fade-up ${openAdminIndex === index ? 'ring-2 ring-primary/20' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
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

              {/* Sub-Administrations Dropdown */}
              {openAdminIndex === index && (
                <div className="mb-4 pt-4 border-t border-border animate-fade-in">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Dependencias y Organismos:</p>
                  <ul className="space-y-2">
                    {admin.subAdmins?.map((sub, idx) => (
                      <li key={idx}>
                        <a
                          href={sub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary/50 group/link"
                        >
                          <LinkIcon className="h-3 w-3 mr-2 opacity-50 group-hover/link:opacity-100" />
                          {sub.name}
                          <ExternalLink className="ml-auto h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {admin.procedures} trámites
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-primary hover:text-primary transition-transform ${openAdminIndex === index ? 'bg-primary/10' : ''}`}
                  onClick={() => toggleAdmin(index)}
                >
                  {openAdminIndex === index ? 'Cerrar' : 'Ver organismos'}
                  {openAdminIndex === index ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="min-w-[240px]"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Ver menos administraciones
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Ver todas las administraciones
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdministrationsSection;
