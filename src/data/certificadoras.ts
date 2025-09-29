export type CertCategory = "pos" | "tecnico" | "multi";

export type Certificadora = {
  slug: string;
  name: string;
  category: CertCategory;
  logo: string;
  cover: string;
  tagline: string;
  highlights?: string[];

  about?: string;
  founded?: string;
  hq?: string;
  employeesRange?: string;
  accreditations?: string[];
  contacts?: {
    email?: string;
    phone?: string;
    site?: string;
    whatsapp?: string;
  };
  socials?: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    x?: string;
  };
  metrics?: Array<{ label: string; value: string }>;
  programs?: Array<{ title: string; url?: string; badge?: string }>;
  partners?: Array<{ name: string; logo: string }>;
  gallery?: string[];
};

export const certificadoras: Certificadora[] = [
  {
    slug: "global-tec",
    name: "Global Tec",
    category: "tecnico",
    logo: "/globalrj.webp",
    cover:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
    tagline:
      "Formação técnica que vira emprego — rápido, prático e no padrão da indústria.",
    highlights: [
      "Laboratórios atualizados com tecnologia de mercado",
      "Parcerias com empresas locais (vagas priorizadas)",
      "Projetos reais no portfólio do aluno (job-ready)",
      "Mentorias quinzenais com profissionais atuantes",
    ],
    about:
      "A Global Tec encurta o caminho entre sala de aula e mercado. Currículos vivos, prática guiada e rede de empresas parceiras.",
    founded: "2018",
    hq: "Cel. Fabriciano — MG",
    employeesRange: "51–200",
    accreditations: ["Catálogo Nacional de Cursos Técnicos"],
    contacts: {
      email: "contato@globaltec.edu.br",
      phone: "+55 (31) 0000-0000",
      site: "https://globaltec.edu.br",
      whatsapp: "https://wa.me/553100000000",
    },
    socials: {
      linkedin: "https://www.linkedin.com/company/globaltec",
      instagram: "https://instagram.com/globaltec",
      youtube: "https://youtube.com/@globaltec",
    },
    metrics: [
      { label: "Alunos formados", value: "25k+" },
      { label: "Cursos ativos", value: "60+" },
      { label: "Empregabilidade", value: "94%" },
    ],
    programs: [
      { title: "Técnico em Enfermagem", url: "/cursos/te-enfermagem", badge: "Carro-chefe" },
      { title: "Técnico em Informática", url: "/cursos/te-informatica" },
      { title: "Técnico em Administração", url: "/cursos/te-adm" },
    ],
    partners: [
      { name: "FAME", logo: "/Certificadoras/fame.webp" },
      { name: "Empresas do Vale", logo: "/Certificadoras/fame.webp" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523246191598-490e69d62b5c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    slug: "iguacu",
    name: "Iguaçu",
    category: "multi",
    logo: "/Certificadoras/iguacu.webp",
    cover:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1600&auto=format&fit=crop",
    tagline:
      "Titulações reconhecidas e trilhas sob medida para acelerar sua carreira.",
    highlights: [
      "Portfólio amplo (técnico, extensão e pós)",
      "Docentes convidados do mercado",
      "Certificação ágil e processo digital",
      "Calendário contínuo: turmas iniciando mensalmente",
    ],
    about:
      "A Iguaçu é referência regional em certificação acadêmica flexível. Programas que combinam base teórica com prática orientada e diplomação ágil.",
    founded: "2016",
    hq: "Foz do Iguaçu — PR",
    employeesRange: "51–200",
    accreditations: ["MEC • Lato Sensu", "Catálogo Nacional de Cursos Técnicos"],
    contacts: {
      email: "contato@iguacu.edu.br",
      phone: "+55 (45) 3000-0000",
      site: "https://iguacu.edu.br",
      whatsapp: "https://wa.me/554530000000",
    },
    socials: {
      linkedin: "https://www.linkedin.com/company/iguacu",
      instagram: "https://instagram.com/iguacu",
      youtube: "https://youtube.com/@iguacu",
    },
    metrics: [
      { label: "Cursos em portfólio", value: "140+" },
      { label: "Convênios", value: "80+" },
      { label: "NPS", value: "92%" },
    ],
    programs: [
      { title: "MBA em Gestão de Pessoas", url: "/pos/mba-gp", badge: "Alta procura" },
      { title: "Técnico em Logística", url: "/tecnico/logistica" },
      { title: "Pós em Marketing Digital", url: "/pos/mkt-digital" },
    ],
    partners: [
      { name: "Global Tec", logo: "https://placehold.co/180x50/png?text=Global+Tec" },
      { name: "Rede Hospitalar Vale", logo: "https://placehold.co/180x50/png?text=Parceiro" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    slug: "fame",
    name: "Fame",
    category: "pos",
    logo: "/Certificadoras/fame.webp",
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    tagline:
      "Pós-graduação com mentoria de líderes de mercado e networking real.",
    highlights: [
      "Professores C-level e pesquisadores",
      "Projetos aplicados com feedback",
      "Turmas enxutas (networking qualificado)",
      "Selo de qualidade com avaliações verificadas",
    ],
    about:
      "Na Fame, o currículo é co-construído com o mercado: você aprende, aplica e valida em ciclos curtos.",
    founded: "2015",
    hq: "Belo Horizonte — MG",
    employeesRange: "201–500",
    accreditations: ["MEC • Lato Sensu"],
    contacts: {
      email: "pos@fame.edu.br",
      phone: "+55 (31) 4000-0000",
      site: "https://fame.edu.br",
      whatsapp: "https://wa.me/553140000000",
    },
    socials: {
      linkedin: "https://www.linkedin.com/company/fame-educacao",
      instagram: "https://instagram.com/fame_educacao",
      youtube: "https://youtube.com/@fame-educacao",
    },
    metrics: [
      { label: "Egressos", value: "40k+" },
      { label: "Cursos de pós", value: "120+" },
      { label: "Satisfação", value: "97%" },
    ],
    programs: [
      { title: "MBA em Gestão de Projetos", url: "/pos/mba-gp", badge: "Top 1" },
      { title: "Especialização em Data Science", url: "/pos/data-science" },
      { title: "MBA em Finanças & Controladoria", url: "/pos/financas" },
    ],
    partners: [
      { name: "Global Tec", logo: "https://placehold.co/180x50/png?text=Global+Tec" },
      { name: "RJGLOBAL", logo: "https://placehold.co/180x50/png?text=RJGLOBAL" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    slug: "facuvale",
    name: "Facuvale",
    category: "multi",
    logo: "/Certificadoras/faculvale.webp",
    cover:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop",
    tagline:
      "Do primeiro emprego à liderança — trilhas que crescem com você.",
    highlights: [
      "Trilhas progressivas (técnico → extensão → pós)",
      "Carreiras orientadas por indicadores",
      "Hub de estágios e vagas exclusivas",
      "Diplomação digital com verificação pública",
    ],
    about:
      "A Facuvale integra ensino, carreira e comunidade. O estudante progride por trilhas com prática e acompanhamento de resultados.",
    founded: "2017",
    hq: "Vale do Aço — MG",
    employeesRange: "51–200",
    accreditations: ["MEC", "Catálogo Nacional de Cursos Técnicos"],
    contacts: {
      email: "contato@facuvale.edu.br",
      phone: "+55 (31) 3500-0000",
      site: "https://facuvale.edu.br",
    },
    metrics: [
      { label: "Programas ativos", value: "90+" },
      { label: "Empresas parceiras", value: "120+" },
      { label: "Alunos com emprego", value: "88%" },
    ],
    programs: [
      { title: "Pós em Gestão Estratégica", url: "/pos/gestao" },
      { title: "Técnico em Segurança do Trabalho", url: "/tecnico/seg-trabalho" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    slug: "faculeste",
    name: "Faculeste",
    category: "multi",
    logo: "/Certificadoras/faculeste.webp",
    cover:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    tagline:
      "Conteúdos atualizados + professores de campo = aprendizado que vira resultado.",
    highlights: [
      "Metodologia mão-na-massa (learning by doing)",
      "Projetos com empresas locais (briefings reais)",
      "Aulas híbridas e microcertificações",
      "Comunidade ativa de ex-alunos (mentorias)",
    ],
    about:
      "A Faculeste entrega ritmo e relevância. Turmas práticas, contexto real e certificações que comprovam domínio.",
    founded: "2014",
    hq: "Leste de Minas — MG",
    employeesRange: "51–200",
    accreditations: ["MEC"],
    contacts: {
      email: "contato@faculeste.edu.br",
      phone: "+55 (33) 3400-0000",
      site: "https://faculeste.edu.br",
    },
    metrics: [
      { label: "Projetos práticos/ano", value: "300+" },
      { label: "Microcertificações", value: "45+" },
      { label: "Satisfação geral", value: "95%" },
    ],
    programs: [
      { title: "Pós em UX Strategy", url: "/pos/ux-strategy", badge: "Turmas reduzidas" },
      { title: "Técnico em TI", url: "/tecnico/ti" },
    ],
  },

  {
    slug: "educavales",
    name: "Educavales",
    category: "tecnico",
    logo: "/Certificadoras/educavales.webp",
    cover:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
    tagline:
      "Técnicos feitos com as empresas — currículo vivo e empregabilidade.",
    highlights: [
      "Conteúdo co-criado com RHs e gestores",
      "Simulações e avaliação por competência",
      "Mentores disponíveis via comunidade",
      "Vagas com preferência para alunos ativos",
    ],
    about:
      "A Educavales nasce no chão de fábrica e do escritório. Habilidades que resolvem problemas do dia a dia, com validação de mercado.",
    founded: "2019",
    hq: "Vale do Jequitinhonha — MG",
    employeesRange: "11–50",
    accreditations: ["Catálogo Nacional de Cursos Técnicos"],
    contacts: {
      email: "contato@educavales.com.br",
      phone: "+55 (38) 3200-0000",
      site: "https://educavales.com.br",
    },
    metrics: [
      { label: "Evasão anual", value: "≤6%" },
      { label: "Parceiros ativos", value: "70+" },
      { label: "Empregabilidade", value: "90%" },
    ],
    programs: [
      { title: "Técnico em Eletromecânica", url: "/tecnico/eletromecanica" },
      { title: "Técnico em Logística", url: "/tecnico/logistica" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

/* Helpers */
export function getCertificadoraBySlug(slug: string): Certificadora | undefined {
  return certificadoras.find((c) => c.slug === slug);
}
export function getAllCertSlugs(): string[] {
  return certificadoras.map((c) => c.slug);
}