export type Topic = 'discapacidad' | 'desempleo' | 'familia' | 'salud' | 'generic';

export interface RegionData {
    name: string;
    keywords: string[];
    searchTemplate: string;
    links: {
        [key in Topic]?: string;
    };
}

export const knowledgeBase: Record<string, RegionData> = {
    andalucia: {
        name: "Andalucía",
        keywords: ["andalucia", "andalucía", "junta de andalucia", "sur", "sevilla", "malaga", "málaga", "cadiz", "cádiz", "huelva", "cordoba", "córdoba", "jaen", "jaén", "granada", "almeria", "almería"],
        searchTemplate: "https://www.juntadeandalucia.es/servicios/busqueda.html?q={query}",
        links: {
            generic: "https://www.juntadeandalucia.es/servicios.html",
            discapacidad: "https://www.juntadeandalucia.es/servicios/sede/tramites/procedimientos/detalle/69.html",
            desempleo: "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/servicios/sae.html",
            salud: "https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/"
        }
    },
    madrid: {
        name: "Comunidad de Madrid",
        keywords: ["madrid", "comunidad de madrid", "cam"],
        searchTemplate: "https://sede.comunidad.madrid/buscador?term={query}",
        links: {
            generic: "https://sede.comunidad.madrid/",
            discapacidad: "https://sede.comunidad.madrid/asuntos-sociales/grado-discapacidad",
            desempleo: "https://www.comunidad.madrid/servicios/empleo/gestion-telematica-demanda-empleo",
            salud: "https://www.comunidad.madrid/servicios/salud/cita-sanitaria"
        }
    },
    catalunya: {
        name: "Catalunya",
        keywords: ["catalunya", "cataluña", "gencat", "barcelona", "tarragona", "lleida", "girona", "gerona"],
        searchTemplate: "https://web.gencat.cat/es/cercador/?q={query}",
        links: {
            generic: "https://web.gencat.cat/es/tramits",
            discapacidad: "https://web.gencat.cat/es/tramits/tramits-temes/Reconeixement-del-grau-de-discapacitat",
            desempleo: "https://serveiocupacio.gencat.cat/es/inici/",
            salud: "https://lamevasalut.gencat.cat/"
        }
    },
    valencia: {
        name: "Comunitat Valenciana",
        keywords: ["valencia", "valenciana", "gva", "alicante", "castellon", "castelló"],
        searchTemplate: "https://www.gva.es/es/inicio/atencion_ciudadano/buscadores/buscador_general?p_p_id=BuscadorGeneral_WAR_Buscadoresportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_BuscadorGeneral_WAR_Buscadoresportlet_cadena={query}",
        links: {
            generic: "https://sede.gva.es",
            discapacidad: "https://www.gva.es/es/inicio/procedimientos?id_proc=364",
            desempleo: "https://labora.gva.es/es/ciutadania",
            salud: "https://www.san.gva.es/es/cita-previa"
        }
    },
    galicia: {
        name: "Galicia",
        keywords: ["galicia", "xunta", "coruña", "lugo", "ourense", "orense", "pontevedra"],
        searchTemplate: "https://sede.xunta.gal/resultados-da-busca?_brwsrcp_WAR_brwsrcpportlet_query={query}",
        links: {
            generic: "https://sede.xunta.gal/portada",
            discapacidad: "https://sede.xunta.gal/detalle-procedemento?codtram=BS611A",
            salud: "https://esaude.sergas.es/"
        }
    },
    euskadi: {
        name: "País Vasco / Euskadi",
        keywords: ["euskadi", "pais vasco", "país vasco", "gobierno vasco", "alava", "álava", "bizkaia", "vizcaya", "gipuzkoa", "guipuzcoa"],
        searchTemplate: "https://www.euskadi.eus/buscado_r01h?w={query}",
        links: {
            generic: "https://www.euskadi.eus/sede",
            discapacidad: "https://www.euskadi.eus/procedimiento/reconocimiento-grado-discapacidad/web01-tramite/es/",
            salud: "https://www.osakidetza.euskadi.eus/"
        }
    },
    castillayleon: {
        name: "Castilla y León",
        keywords: ["castilla y leon", "castilla y león", "cyl", "jcyl", "valladolid", "leon", "león", "burgos", "salamanca", "zamora", "palencia", "avila", "ávila", "segovia", "soria"],
        searchTemplate: "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100/1251181054765/_/_/_?criterio={query}",
        links: {
            generic: "https://www.tramitacastillayleon.jcyl.es/",
            discapacidad: "https://www.tramitacastillayleon.jcyl.es/web/jcyl/AdministracionElectronica/es/Plantilla100Detalle/1251181050732/Tramite/1202865963462/Tramite",
        }
    },
    castillalamancha: {
        name: "Castilla-La Mancha",
        keywords: ["castilla la mancha", "castilla-la mancha", "clm", "toledo", "ciudad real", "albacete", "guadalajara", "cuenca"],
        searchTemplate: "https://www.jccm.es/busqueda?search_api_views_fulltext={query}",
        links: {
            generic: "https://www.jccm.es/sede",
            discapacidad: "https://www.jccm.es/tramites/626"
        }
    },
    canarias: {
        name: "Canarias",
        keywords: ["canarias", "islas canarias", "gobierno de canarias", "tenerife", "las palmas", "gran canaria"],
        searchTemplate: "https://sede.gobiernodecanarias.org/sede/buscador?q={query}",
        links: {
            generic: "https://sede.gobiernodecanarias.org/",
            discapacidad: "https://sede.gobiernodecanarias.org/sede/tramites/3727"
        }
    },
    murcia: {
        name: "Región de Murcia",
        keywords: ["murcia", "region de murcia", "región de murcia", "carm"],
        searchTemplate: "https://sede.carm.es/web/guest/buscador-general?p_p_id=BuscadorGeneral_WAR_carmbuscadorgeneralportlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_BuscadorGeneral_WAR_carmbuscadorgeneralportlet_texto={query}",
        links: {
            generic: "https://sede.carm.es/",
            discapacidad: "https://sede.carm.es/web/guest/tramites/383"
        }
    },
    aragon: {
        name: "Aragón",
        keywords: ["aragon", "aragón", "zaragoza", "huesca", "teruel"],
        searchTemplate: "https://www.aragon.es/buscador?q={query}",
        links: {
            generic: "https://www.aragon.es/tramites",
            discapacidad: "https://www.aragon.es/tramitador/-/tramite/reconocimiento-declaracion-calificacion-grado-discapacidad"
        }
    },
    extremadura: {
        name: "Extremadura",
        keywords: ["extremadura", "junta de extremadura", "badajoz", "caceres", "cáceres"],
        searchTemplate: "https://ciudadano.juntaex.es/buscador?q={query}",
        links: {
            generic: "https://sede.juntaex.es/",
            discapacidad: "https://ciudadano.juntaex.es/web/salud-y-servicios-sociales/discapacidad"
        }
    },
    baleares: {
        name: "Illes Balears",
        keywords: ["baleares", "balears", "illes balears", "mallorca", "menorca", "ibiza", "eivissa", "formentera"],
        searchTemplate: "https://www.caib.es/seucaib/es/cercar?q={query}",
        links: {
            generic: "https://www.caib.es/seucaib/",
            discapacidad: "https://www.caib.es/sites/discapacitat/es/reconocimiento_del_grado_de_discapacidad-24151/"
        }
    },
    asturias: {
        name: "Principado de Asturias",
        keywords: ["asturias", "principado de asturias", "oviedo", "gijon", "gijón"],
        searchTemplate: "https://sede.asturias.es/resultados-busqueda?q={query}",
        links: {
            generic: "https://sede.asturias.es/",
            discapacidad: "https://sede.asturias.es/-/reconocimiento-declaracion-y-calificacion-del-grado-de-discapacidad"
        }
    },
    navarra: {
        name: "Comunidad Foral de Navarra",
        keywords: ["navarra", "nafarroa", "pamplona"],
        searchTemplate: "https://www.navarra.es/es/buscador?q={query}",
        links: {
            generic: "https://www.navarra.es/tramites",
            discapacidad: "https://www.navarra.es/es/tramites/on/-/line/Reconocimiento-del-grado-de-discapacidad"
        }
    },
    cantabria: {
        name: "Cantabria",
        keywords: ["cantabria", "santander"],
        searchTemplate: "https://sede.cantabria.es/buscador?q={query}",
        links: {
            generic: "https://sede.cantabria.es/",
            discapacidad: "https://www.serviciossocialescantabria.org/index.php?page=grado-de-discapacidad"
        }
    },
    larioja: {
        name: "La Rioja",
        keywords: ["rioja", "la rioja", "logroño"],
        searchTemplate: "https://www.larioja.org/buscador?q={query}",
        links: {
            generic: "https://www.larioja.org/",
            discapacidad: "https://www.larioja.org/servicios-sociales/es/discapacidad/valoracion-grado-discapacidad"
        }
    },
    ceuta: {
        name: "Ceuta",
        keywords: ["ceuta"],
        searchTemplate: "https://sede.ceuta.es/controlador/controlador?cmd=busqueda&texto={query}",
        links: {
            generic: "https://sede.ceuta.es/",
            discapacidad: "https://sede.ceuta.es/controlador/controlador?cmd=tramite&id=138"
        }
    },
    melilla: {
        name: "Melilla",
        keywords: ["melilla"],
        searchTemplate: "https://sede.melilla.es/sede/buscador_tramites.do?texto={query}",
        links: {
            generic: "https://sede.melilla.es/",
            discapacidad: "https://sede.melilla.es/sede/tramites/index.do?entidad=1"
        }
    }
};

export const identifyRegion = (text: string): string | null => {
    const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    for (const [key, data] of Object.entries(knowledgeBase)) {
        if (data.keywords.some(k => normalized.includes(k))) {
            return key;
        }
    }
    return null;
};

export const identifyTopic = (text: string): Topic | null => {
    const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (normalized.includes("discapacidad") || normalized.includes("minusvalia") || normalized.includes("diversidad funcional")) return 'discapacidad';
    if (normalized.includes("desempleo") || normalized.includes("paro") || normalized.includes("demanda de empleo") || normalized.includes("sepe") || normalized.includes("sae") || normalized.includes("labora")) return 'desempleo';
    if (normalized.includes("familia") || normalized.includes("numerosa") || normalized.includes("nacimiento")) return 'familia';
    if (normalized.includes("salud") || normalized.includes("medico") || normalized.includes("cita") || normalized.includes("doctor")) return 'salud';

    return null;
};
