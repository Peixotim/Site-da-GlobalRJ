// app/solucoes/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Rocket,
  GraduationCap,
  Wrench,
  Sparkles,
  CheckCircle2,
  ChartLine,
  ShieldCheck,
  Users2,
  ArrowRight,
  Building2,
  Cpu,
  Handshake,
} from "lucide-react";
import { useMemo } from "react";

/* ========= helpers ========= */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const solutionBlocks = [
  {
    key: "pos",
    title: "Pós-Graduação de Alta Performance",
    desc: "Desenho de portfólio, curadoria docente, modelo de captação e operação enxuta para escalar com margem.",
    icon: <GraduationCap className="h-5 w-5 text-emerald-300" />,
    bullets: [
      "Arquitetura de cursos e esteira de lançamentos",
      "Marketing de captação orientado a dados",
      "Playbooks de tutoria e retenção",
    ],
    href: "/empresas?tab=pos",
  },
  {
    key: "tecnico",
    title: "Formação Técnica orientada ao emprego",
    desc: "Currículos conectados à indústria, parcerias locais e acompanhamento ativo de empregabilidade.",
    icon: <Wrench className="h-5 w-5 text-cyan-300" />,
    bullets: [
      "Projetos práticos com empresas",
      "Trilhas de estágio e 1º emprego",
      "Indicadores de egressos em tempo real",
    ],
    href: "/empresas?tab=tecnico",
  },
  {
    key: "parcerias",
    title: "Parcerias & Ecosistema",
    desc: "Integrações com IES, redes técnicas e mercado para ampliar alcance, qualidade e eficiência.",
    icon: <Handshake className="h-5 w-5 text-fuchsia-300" />,
    bullets: [
      "Convênios e co-marca",
      "Catálogo compartilhado",
      "SLA e governança",
    ],
    href: "/empresas#parcerias",
  },
  {
    key: "plataforma",
    title: "Plataforma & Analytics",
    desc: "Painéis e automações para tomada de decisão — do funil de captação até o sucesso do aluno.",
    icon: <ChartLine className="h-5 w-5 text-blue-300" />,
    bullets: [
      "BI de captação e CAC/LTV",
      "Alertas de evasão",
      "Orquestração de processos",
    ],
    href: "/contato",
  },
] as const;

const steps = [
  {
    k: "Descoberta",
    d: "Diagnóstico rápido do seu contexto e metas. Sem custo.",
    i: <Sparkles className="h-4 w-4 text-cyan-300" />,
  },
  {
    k: "Blueprint",
    d: "Plano de ação com metas, prazos e responsáveis.",
    i: <Cpu className="h-4 w-4 text-emerald-300" />,
  },
  {
    k: "Implantação",
    d: "Execução em sprints, ritos semanais e indicadores claros.",
    i: <Rocket className="h-4 w-4 text-fuchsia-300" />,
  },
  {
    k: "Scale",
    d: "Otimização contínua com BI e automações.",
    i: <ChartLine className="h-4 w-4 text-blue-300" />,
  },
] as const;

/* ========= page ========= */
export default function SolutionsPage() {
  const logos = useMemo(
    () => [
      { src: "/Certificadoras/fame.webp", alt: "FAME" },
      { src: "/Certificadoras/iguacu.webp", alt: "Faculdade Iguaçu" },
      { src: "/globalrj.webp", alt: "GLOBALTEC" },
    ],
    []
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* Aurora */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_90%_-10%,rgba(56,189,248,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 -rotate-[6deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 ring-1 ring-white/10 sm:p-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
              Soluções RJGLOBAL
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Cresça com um{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                padrão de performance
              </span>
              .
            </h1>
            <p className="mt-3 max-w-3xl text-white/80">
              Da estratégia ao “go-live”: portfólio, captação, operação e
              analytics — tudo conectado para acelerar resultado acadêmico e
              financeiro.
            </p>

            {/* trust strip */}
            <div className="mt-6 flex flex-wrap gap-3">
              {logos.map((l) => (
                <div
                  key={l.alt}
                  className="flex h-10 items-center justify-center rounded-xl bg-white/8 px-3 ring-1 ring-white/10"
                >
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={110}
                    height={24}
                    className="h-6 w-auto opacity-90"
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
              >
                Falar com um consultor <ArrowRight size={16} />
              </Link>
              <Link
                href="/certificadoras"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
              >
                Ver nossas certificadoras
              </Link>
            </div>
          </m.div>
        </section>

        {/* QUADROS DE SOLUÇÃO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solutionBlocks.map((s, i) => (
              <m.article
                key={s.key}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.03 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                      {s.icon}
                    </span>
                    <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  </div>
                  <Link
                    href={s.href}
                    className="hidden rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 transition group-hover:bg-white/15 md:inline-flex"
                  >
                    Detalhes
                  </Link>
                </div>
                <p className="mt-2 text-white/75">{s.desc}</p>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-300" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-white ring-1 ring-white/15 transition hover:bg-white/15 md:hidden"
                >
                  Detalhes
                </Link>
              </m.article>
            ))}
          </div>
        </section>

        {/* PROVA DE VALOR */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid items-stretch gap-6 md:grid-cols-[1.3fr_1fr]">
            <m.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
            >
              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                  <Building2 className="h-3.5 w-3.5 text-cyan-300" />
                  Casos de impacto
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">
                  Crescimento previsível com eficiência
                </h3>
                <ul className="grid grid-cols-1 gap-3 text-sm text-white/85 md:grid-cols-2">
                  {[
                    "CAC reduzido em 32% com otimização de funil",
                    "Evasão -18% após ritos de tutoria",
                    "Time-to-launch 45 dias por curso",
                    "Satisfação de alunos acima de 95%",
                  ].map((b) => (
                    <li key={b} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-300" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"
                    alt="Operação e dados"
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 720px, 100vw"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30" />
                </div>
              </div>
            </m.div>

            <m.aside
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                  <Users2 className="h-3.5 w-3.5 text-fuchsia-300" />
                  Processo
                </div>
                <h4 className="mt-3 text-lg font-bold text-white">
                  Como trabalhamos
                </h4>
                <ol className="mt-2 space-y-3">
                  {steps.map((s) => (
                    <li
                      key={s.k}
                      className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/85 ring-1 ring-white/10"
                    >
                      <div className="mb-1 inline-flex items-center gap-2 font-semibold text-white">
                        {s.i}
                        {s.k}
                      </div>
                      <p className="text-white/75">{s.d}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <Link
                href="/contato"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
              >
                Quero começar <ArrowRight size={16} />
              </Link>
            </m.aside>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                i: <ShieldCheck className="h-4 w-4 text-teal-300" />,
                t: "Conformidade & segurança",
                d: "Processos auditáveis e proteção de dados em todas as camadas.",
              },
              {
                i: <Cpu className="h-4 w-4 text-cyan-300" />,
                t: "Tech + pessoas",
                d: "Automação onde importa, proximidade humana onde faz diferença.",
              },
              {
                i: <ChartLine className="h-4 w-4 text-blue-300" />,
                t: "Métricas de negócio",
                d: "Foco em CAC, LTV, retenção e NPS — sem ruído.",
              },
              {
                i: <Rocket className="h-4 w-4 text-fuchsia-300" />,
                t: "Go-live rápido",
                d: "Sprints curtos, entregas semanais e time à disposição.",
              },
            ].map((b) => (
              <div
                key={b.t}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10"
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  {b.i}
                </div>
                <div className="text-sm font-semibold text-white">{b.t}</div>
                <p className="text-xs text-white/70">{b.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto my-12 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8"
          >
            <div className="grid items-center gap-6 md:grid-cols-[1.35fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                  Acelere agora
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Vamos construir seus próximos cases
                </h2>
                <p className="mt-2 max-w-[60ch] text-white/80">
                  Integração ágil, rituais claros e foco no que o conselho
                  cobra: crescimento, margem e experiência do aluno.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
                  >
                    Fale com a RJGLOBAL <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/certificadoras"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
                  >
                    Ver certificadoras
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80 ring-1 ring-white/10">
                <p>
                  “A parceria com a RJGLOBAL elevou nosso nível de entrega. O
                  onboarding foi rápido e os relatórios, cirúrgicos.”
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Roberto Duarte — Coordenação Acadêmica
                </p>
              </div>
            </div>
          </m.div>
        </section>
      </main>
    </LazyMotion>
  );
}
