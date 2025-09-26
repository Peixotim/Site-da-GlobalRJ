"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Shield,
  Cookie,
  FileText,
  Scale,
  Accessibility,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

/* =========================
   Dados das políticas
========================= */
const POLICIES = [
  {
    title: "Política de Privacidade",
    desc: "Saiba como protegemos seus dados pessoais e garantimos transparência.",
    icon: <Shield className="h-6 w-6 text-cyan-300" />,
    href: "/politica-de-privacidade",
  },
  {
    title: "Política de Cookies",
    desc: "Entenda como utilizamos cookies para melhorar sua experiência.",
    icon: <Cookie className="h-6 w-6 text-fuchsia-300" />,
    href: "/politica-de-cookies",
  },
  {
    title: "Termos de Uso",
    desc: "Regras de utilização de nossos serviços e responsabilidades mútuas.",
    icon: <FileText className="h-6 w-6 text-emerald-300" />,
    href: "/termos",
  },
  {
    title: "Acessibilidade",
    desc: "Compromisso em garantir inclusão e acesso universal em nossa plataforma.",
    icon: <Accessibility className="h-6 w-6 text-teal-300" />,
    href: "/acessibilidade",
  },
  {
    title: "Diretrizes do Grupo",
    desc: "Princípios e valores que norteiam nossas práticas e decisões.",
    icon: <BookOpenCheck className="h-6 w-6 text-purple-300" />,
    href: "/diretrizes",
  },
  {
    title: "Política Anticorrupção",
    desc: "Compromisso com integridade e combate a práticas ilícitas.",
    icon: <Scale className="h-6 w-6 text-emerald-300" />,
    href: "/politica-de-anticorrupcao",
  },
] as const;

/* =========================
   Página
========================= */
export default function PoliticasGeraisPage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* Aurora de fundo */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(56,189,248,0.12),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 -rotate-[8deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.14),rgba(56,189,248,0.14),rgba(168,85,247,0.14))] opacity-45" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-12 w-full max-w-5xl text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              📖 RJGLOBAL
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Políticas do Grupo
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-white/75">
              Nesta seção reunimos todas as nossas políticas e diretrizes. Aqui
              você encontrará informações essenciais sobre privacidade, cookies,
              acessibilidade e muito mais.
            </p>
          </m.div>
        </section>

        {/* GRID DE POLÍTICAS */}
        <section className="mx-auto mt-12 w-full max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POLICIES.map((p) => (
              <Link key={p.title} href={p.href}>
                <m.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                      {p.icon}
                    </span>
                    <h2 className="text-lg font-bold text-white">{p.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-white/75">{p.desc}</p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                    Acessar <ArrowRight className="h-4 w-4" />
                  </span>
                </m.div>
              </Link>
            ))}
          </div>
        </section>

        {/* rodapé simples */}
        <section className="mx-auto my-12 w-full max-w-5xl text-center text-sm text-white/70">
          <p>
            Todas as nossas políticas são pautadas em{" "}
            <span className="font-semibold text-white">transparência</span>,{" "}
            <span className="font-semibold text-white">ética</span> e{" "}
            <span className="font-semibold text-white">inovação</span>.
          </p>
        </section>
      </main>
    </LazyMotion>
  );
}
