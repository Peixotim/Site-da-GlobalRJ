// types
export type CompanyCategory = "pos" | "tecnico";

export type CompanyStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export type Company = {
  slug: string;              // use kebab-case (sem espaços)
  name: string;
  tagline: string;
  category: CompanyCategory; // "pos" | "tecnico"
  logo: string;              // caminho do /public ou URL
  cover: string;             // imagem principal
  color: string;             // cor de destaque (hex)
  website?: string;
  socials?: Partial<{
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook: string;
  }>;
  stats?: CompanyStat[];
  highlights?: string[];
  gallery?: string[];        // imagens extras
};

// dados: deixe os próximos no mesmo padrão
export const companies: Readonly<Company[]> = [
  {
    slug: "educavale",
    name: "EducaVale",
    tagline: "Transformando carreiras com inovação e qualidade acadêmica.",
    category: "pos",
    logo: "/college.webp",
    cover:
      "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1600",
    color: "#9333ea",
    website: "https://exemplo.com/universidade",
    socials: {
      linkedin: "https://linkedin.com/company/exemplo",
      instagram: "https://instagram.com/exemplo",
      youtube: "https://youtube.com/@exemplo",
      facebook: "https://facebook.com/exemplo",
    },
    stats: [
      { label: "Cursos Oferecidos", value: 85, prefix: "+" },
      { label: "Taxa de Empregabilidade", value: 92, suffix: "%" },
      { label: "Alunos Formados", value: 250000 },
      { label: "Anos de Experiência", value: 25 },
    ],
    highlights: [
      "Certificação reconhecida pelo MEC.",
      "Professores atuantes no mercado.",
      "Metodologias ativas de aprendizagem.",
      "Apoio personalizado de carreira.",
    ],
    gallery: [
      "https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];