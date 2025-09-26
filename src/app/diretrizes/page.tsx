"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Users2,
  Handshake,
  Globe2,
  BookOpenCheck,
  Target,
  Rocket,
  HeartHandshake,
  Scale,
  Recycle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileText,
  Cookie,
  Accessibility,
} from "lucide-react";

/* =========================
   Helpers / UI
========================= */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Chip({
  icon,
  text,
  tone = "default",
}: {
  icon?: React.ReactNode;
  text: string;
  tone?: "default" | "ok" | "warn";
}) {
  const tones = {
    default: "bg-white/10 text-white ring-white/15",
    ok: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/25",
    warn: "bg-fuchsia-400/15 text-fuchsia-200 ring-fuchsia-300/25",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${tones[tone]}`}
    >
      {icon}
      {text}
    </span>
  );
}

function Pill({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.08]">
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
        {icon}
      </div>
      <div className="text-sm font-bold text-white">{title}</div>
      <p className="mt-1 text-sm text-white/75">{desc}</p>
    </div>
  );
}

/* =========================
   Page
========================= */
export default function DiretrizesPage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* Aurora */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(56,189,248,0.12),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 -rotate-[8deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.14),rgba(56,189,248,0.14),rgba(168,85,247,0.14))] opacity-45" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-10 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 ring-1 ring-white/10 sm:p-12"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Chip
                icon={<Sparkles className="h-3.5 w-3.5 text-cyan-300" />}
                text="RJGLOBAL"
              />
              <Chip
                icon={<ShieldCheck className="h-3.5 w-3.5 text-teal-300" />}
                text="Diretrizes do Grupo"
                tone="ok"
              />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Nossas diretrizes para construir valor — com ética, inovação e
              impacto
            </h1>
            <p className="mt-3 max-w-3xl text-white/80">
              Este hub reúne valores, princípios e práticas que orientam
              decisões, produtos e relações com alunos, parceiros e
              colaboradores.
            </p>
          </m.div>
        </section>

        {/* VALORES / PRINCÍPIOS */}
        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Pill
              icon={<Users2 className="h-5 w-5 text-emerald-300" />}
              title="Foco nas pessoas"
              desc="Colocamos alunos, parceiros e time no centro. Decisões começam pela experiência humana."
            />
            <Pill
              icon={<Lightbulb className="h-5 w-5 text-cyan-300" />}
              title="Inovação responsável"
              desc="Tecnologia e dados para acelerar carreiras, sempre com transparência e segurança."
            />
            <Pill
              icon={<Scale className="h-5 w-5 text-fuchsia-300" />}
              title="Ética & conformidade"
              desc="Cumprimos leis e políticas; fomentamos um ambiente seguro, inclusivo e honesto."
            />
            <Pill
              icon={<Target className="h-5 w-5 text-teal-300" />}
              title="Resultados reais"
              desc="Metas claras, métricas de aprendizado e empregabilidade que importam."
            />
            <Pill
              icon={<Recycle className="h-5 w-5 text-emerald-300" />}
              title="Sustentabilidade"
              desc="Eficiência, respeito ao meio ambiente e governança na tomada de decisão."
            />
            <Pill
              icon={<Handshake className="h-5 w-5 text-purple-300" />}
              title="Parcerias de valor"
              desc="Relações de longo prazo, comunicação aberta e compromissos bem definidos."
            />
          </div>
        </section>

        {/* PILARES (cards maiores) */}
        <section className="mx-auto mt-10 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease }}
            className="grid gap-6 lg:grid-cols-3"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10">
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Rocket className="h-6 w-6 text-cyan-300" />
                </div>
                <div className="text-lg font-extrabold text-white">
                  Excelência
                </div>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  • Padrões claros de qualidade e segurança em plataformas.
                </li>
                <li>• Documentação e revisões técnicas contínuas.</li>
                <li>• Acesso e experiência do aluno sem fricção.</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10">
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <HeartHandshake className="h-6 w-6 text-emerald-300" />
                </div>
                <div className="text-lg font-extrabold text-white">
                  Respeito & DEI
                </div>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Diversidade como força para inovação.</li>
                <li>
                  • Zero tolerância a assédio, discriminação e preconceito.
                </li>
                <li>• Acessibilidade em produtos, comunicação e espaços.</li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10">
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Globe2 className="h-6 w-6 text-fuchsia-300" />
                </div>
                <div className="text-lg font-extrabold text-white">Impacto</div>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Educação que gera empregabilidade e progresso social.</li>
                <li>• Parcerias locais e nacionais com propósito.</li>
                <li>• Indicadores públicos e mensuráveis.</li>
              </ul>
            </div>
          </m.div>
        </section>

        {/* CONDUTA: Do / Don’t */}
        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <div className="text-lg font-extrabold text-white">Faça</div>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Seja claro, gentil e objetivo na comunicação.</li>
                <li>• Proteja dados pessoais e informações sensíveis.</li>
                <li>• Ouça feedbacks e reporte riscos e incidentes.</li>
                <li>• Priorize acessibilidade e inclusão nas entregas.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10">
              <div className="mb-3 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-fuchsia-300" />
                <div className="text-lg font-extrabold text-white">Evite</div>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• Compartilhar acessos ou dados sem autorização.</li>
                <li>• Conteúdos ou condutas que promovam exclusão.</li>
                <li>• Assumir riscos de segurança sem plano/validação.</li>
                <li>• Falta de transparência em métricas e resultados.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance / Links úteis */}
        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <Link
              href="/politica-de-privacidade"
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.08]"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <FileText className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="text-sm font-bold text-white">Privacidade</div>
              <p className="text-sm text-white/75">
                Tratamento de dados, direitos dos titulares e canais.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-300">
                Acessar <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/politica-de-cookies"
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.08]"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Cookie className="h-5 w-5 text-fuchsia-300" />
              </div>
              <div className="text-sm font-bold text-white">Cookies</div>
              <p className="text-sm text-white/75">
                Preferências, categorias e painel de consentimento.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-300">
                Acessar <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/acessibilidade"
              className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.08]"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Accessibility className="h-5 w-5 text-teal-300" />
              </div>
              <div className="text-sm font-bold text-white">Acessibilidade</div>
              <p className="text-sm text-white/75">
                Compromissos WCAG, atalhos e canal de feedback.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-300">
                Acessar <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* Timeline / Roadmap de Compliance */}
        <section className="mx-auto mt-12 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10"
          >
            <div className="mb-4 flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-emerald-300" />
              <div className="text-lg font-extrabold text-white">
                Roadmap de Conformidade
              </div>
            </div>
            <ol className="relative ml-1 border-l border-white/10 pl-5">
              {[
                {
                  title: "Políticas públicas & consentimento",
                  desc: "Páginas dedicadas + banner de cookies conforme LGPD.",
                },
                {
                  title: "Treinamento interno contínuo",
                  desc: "Privacidade, segurança, DEI e acessibilidade.",
                },
                {
                  title: "Métricas & auditorias",
                  desc: "Relatórios trimestrais e planos de melhoria.",
                },
                {
                  title: "Governança de dados",
                  desc: "Mapeamento de dados, DSRs e retenção mínima.",
                },
              ].map((s) => (
                <li key={s.title} className="mb-5">
                  <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-white/20 ring-2 ring-white/20" />
                  <div className="text-sm font-bold text-white">{s.title}</div>
                  <div className="text-sm text-white/75">{s.desc}</div>
                </li>
              ))}
            </ol>
          </m.div>
        </section>

        {/* CTA final */}
        <section className="mx-auto my-12 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_85%_-10%,rgba(168,85,247,.16),transparent_60%)]" />
              <m.span
                initial={{ x: "-30%" }}
                animate={{ x: "130%" }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "linear" }}
                className="absolute left-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Diretrizes vivas — evoluindo com você
                </h3>
                <p className="mt-2 max-w-[56ch] text-white/80">
                  Feedbacks e sugestões são bem-vindos. Nosso compromisso é
                  manter um padrão alto, prático e humano.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
                  >
                    Enviar feedback <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/politicas"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
                  >
                    Ver hub de políticas
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center ring-1 ring-white/10">
                  <div className="text-lg font-extrabold text-white">LGPD</div>
                  <div className="text-[11px] font-semibold text-white/65">
                    Privacidade by design
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center ring-1 ring-white/10">
                  <div className="text-lg font-extrabold text-white">DEI</div>
                  <div className="text-[11px] font-semibold text-white/65">
                    Diversidade e inclusão
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center ring-1 ring-white/10">
                  <div className="text-lg font-extrabold text-white">WCAG</div>
                  <div className="text-[11px] font-semibold text-white/65">
                    Acessibilidade ativa
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center ring-1 ring-white/10">
                  <div className="text-lg font-extrabold text-white">ESG</div>
                  <div className="text-[11px] font-semibold text-white/65">
                    Sustentabilidade real
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </section>
      </main>
    </LazyMotion>
  );
}
