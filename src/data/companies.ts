// @/data/companies.ts
export type CompanyCategory = "pos" | "tecnico";

export type Company = {
  slug: string;
  name: string;
  category: CompanyCategory;
  logo: string;
  cover: string;
  tagline: string;
  highlights?: string[];
  // --- Novos campos (opcionais, use os que fizer sentido) ---
  about?: string;
  founded?: string;            // ex: "2014"
  hq?: string;                 // ex: "BH, MG"
  employeesRange?: string;     // ex: "51–200"
  accreditations?: string[];   // ex: ["MEC", "ABED"]
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
  products?: Array<{ title: string; url?: string; badge?: string }>;
  partners?: Array<{ name: string; logo: string }>;
  gallery?: string[]; // urls
};

export const companies: Company[] = [
  /* ...suas empresas atuais... */

  {
    slug: "globaltec",
    name: "GLOBALTEC",
    category: "tecnico",
    // logo e cover remotos
    logo:
      "https://placehold.co/300x90/png?text=GLOBALTEC&font=source-sans-pro&fontweight=700",
    cover:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop",
    tagline: "Cursos técnicos com foco em empregabilidade.",
    highlights: ["Infra moderna", "Parcerias com empresas", "Job-ready"],
    about:
      "A GLOBALTEC conecta formação técnica e mercado com currículos atualizados e projetos reais.",
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
    products: [
      { title: "Técnico em Enfermagem", url: "/cursos/te-enfermagem", badge: "Carro-chefe" },
      { title: "Técnico em Informática", url: "/cursos/te-informatica" },
      { title: "Técnico em Administração", url: "/cursos/te-adm" },
    ],
    partners: [
      { name: "FAME", logo: "/Certificadoras/fame.webp" },
      { name: "Faculdade Iguacu", logo: "/Certificadoras/iguacu.webp" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523246191598-490e69d62b5c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    slug: "fame-educacao",
    name: "FAME Educação",
    category: "pos",
    logo:
      "https://placehold.co/300x90/png?text=FAME+Educa%C3%A7%C3%A3o&font=source-sans-pro&fontweight=700",
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    tagline: "Pós-graduação orientada a resultados e mercado.",
    highlights: ["Corpo docente de ponta", "Pesquisa aplicada", "Networking"],
    about:
      "A FAME Educação entrega programas de pós-graduação focados em performance, com currículos atualizados e forte conexão com desafios reais de mercado.",
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
    products: [
      { title: "MBA em Gestão de Projetos", url: "/pos/mba-gp", badge: "Top 1" },
      { title: "Especialização em Data Science", url: "/pos/data-science" },
      { title: "MBA em Finanças & Controladoria", url: "/pos/financas" },
    ],
    partners: [
      { name: "GLOBALTEC", logo: "https://placehold.co/180x50/png?text=GLOBALTEC" },
      { name: "RJGLOBAL", logo: "https://placehold.co/180x50/png?text=RJGLOBAL" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  // ...demais empresas
];

// Helpers
export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
export function getAllCompanySlugs(): string[] {
  return companies.map((c) => c.slug);
}