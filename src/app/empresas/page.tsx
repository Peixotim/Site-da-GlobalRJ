"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import {
  Building2,
  GraduationCap,
  Wrench,
  Filter,
  ShieldCheck,
  LucideIcon,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { companies as DATA } from "@/data/companies";
import type { Company, CompanyCategory } from "@/data/companies";

/* ============== UI: tabs e animações ============== */
const TABS: ReadonlyArray<{
  key: "all" | CompanyCategory;
  label: string;
  Icon: LucideIcon;
}> = [
  { key: "all", label: "Todos", Icon: Filter },
  { key: "pos", label: "Pós-Graduação", Icon: GraduationCap },
  { key: "tecnico", label: "Técnicos", Icon: Wrench },
];

const gridWrap: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};
const gridItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(124,58,237,0.18),transparent)]" />
      <div className="absolute left-1/2 top-0 h-[120vh] w-[140vw] -translate-x-1/2 -rotate-[8deg] bg-[conic-gradient(from_220deg_at_50%_50%,rgba(34,211,238,0.12),rgba(168,85,247,0.16),rgba(34,211,238,0.12))] blur-3xl opacity-50" />
    </div>
  );
}

function SegmentedTabs({
  active,
  onChange,
}: {
  active: "all" | CompanyCategory;
  onChange: (k: "all" | CompanyCategory) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={trackRef}
      className="relative inline-flex items-center gap-2 rounded-full bg-white/5 p-1 ring-1 ring-white/10"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={active}
          layoutId="tab-underline"
          className="absolute bottom-1 top-1 z-0 rounded-full bg-white/10"
          transition={{ type: "spring", stiffness: 500, damping: 44 }}
          style={{ width: "var(--w, 110px)", left: "var(--x, 4px)" }}
        />
      </AnimatePresence>
      {TABS.map(({ key, label, Icon }) => (
        <button
          key={key}
          onClick={(e) => {
            onChange(key);
            const t = e.currentTarget;
            const wrap = trackRef.current!;
            const w = t.getBoundingClientRect().width;
            const l =
              t.getBoundingClientRect().left -
              wrap.getBoundingClientRect().left;
            wrap.style.setProperty("--w", `${w}px`);
            wrap.style.setProperty("--x", `${l}px`);
          }}
          className={`relative z-10 flex h-9 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors ${
            active === key ? "text-white" : "text-white/80 hover:text-white"
          }`}
          aria-pressed={active === key}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

/* ============== Destaque (hero) ============== */
function HeroSpotlight({ c }: { c: Company }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -2 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] ring-1 ring-white/5 shadow-[0_18px_60px_rgba(0,0,0,.45)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl">
        <div className="h-full w-full rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,.40),rgba(168,85,247,.45),rgba(34,211,238,.40))] opacity-60 blur-[8px]" />
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={c.cover}
          alt={c.name}
          fill
          sizes="(min-width:1024px) 720px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between rounded-2xl bg-black/35 p-3 ring-1 ring-white/10 backdrop-blur">
        <div className="flex items-center gap-3">
          <Image
            src={c.logo}
            alt={c.name}
            width={72}
            height={24}
            className="h-6 w-auto"
            sizes="72px"
          />
          <div>
            <h4 className="text-sm font-semibold text-white">{c.name}</h4>
            <p className="line-clamp-1 text-xs text-white/75">{c.tagline}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white ring-1 ring-white/15">
          Destaque
        </span>
      </div>
    </motion.div>
  );
}

/* ============== Divider + Trust ============== */
function BladeDivider() {
  return (
    <div className="relative my-12">
      <div className="mx-auto h-10 w-full max-w-[1200px] -skew-y-1 rounded-[22px] bg-gradient-to-r from-cyan-400/18 via-fuchsia-500/22 to-cyan-400/18 ring-1 ring-white/10" />
      <div className="pointer-events-none mx-auto -mt-2 h-px w-[92%] bg-white/10" />
    </div>
  );
}

function TrustBar({ logos }: { logos: { src: string; alt: string }[] }) {
  return (
    <div className="mx-auto -mt-2 mb-10 w-full max-w-[1200px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 ring-1 ring-white/10">
      <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
        <ShieldCheck className="h-4 w-4 text-teal-300" />
        Parceria & confiança
      </div>
      <div className="flex flex-wrap gap-3">
        {logos.slice(0, 12).map((l) => (
          <div
            key={`${l.alt}-logo`}
            className="flex h-10 items-center justify-center rounded-xl bg-white/8 px-3 ring-1 ring-white/10"
          >
            <Image
              src={l.src}
              alt={l.alt}
              width={110}
              height={24}
              className="h-6 w-auto opacity-90"
              sizes="110px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============== Card da grade ============== */
function CompanyCard({ c }: { c: Company }) {
  return (
    <motion.article variants={gridItem}>
      <div className="group relative overflow-hidden rounded-2xl bg-white/[0.06] p-[1px] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1">
        <div className="pointer-events-none absolute inset-0 rounded-2xl [mask:linear-gradient(#000,transparent_80%)]">
          <div className="h-full w-full rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,.55),rgba(168,85,247,.6),rgba(34,211,238,.55))] opacity-60 blur-[6px]" />
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-zinc-950/60 ring-1 ring-white/5 shadow-[0_18px_60px_rgba(0,0,0,.45)]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={c.cover}
              alt={c.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
            />
            <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white ring-1 ring-white/15 backdrop-blur">
              <Image
                src={c.logo}
                alt={c.name}
                width={64}
                height={16}
                className="h-4 w-auto"
                sizes="64px"
              />
              {c.category === "pos" ? "Pós-Graduação" : "Técnico"}
            </div>
          </div>

          <div className="space-y-3 px-5 py-4">
            <h3 className="text-lg font-semibold text-white">{c.name}</h3>
            <p className="line-clamp-2 text-sm text-white/70">{c.tagline}</p>

            {c.highlights?.length ? (
              <ul className="flex flex-wrap gap-2">
                {c.highlights.slice(0, 3).map((h, i) => (
                  <li
                    key={`${c.slug}-hl-${i}`}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70 ring-1 ring-white/10"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto my-16 w-full max-w-[1200px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10 md:p-10">
        {/* Glow suave e linha correndo */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_85%_-10%,rgba(168,85,247,.18),transparent_60%)]" />
          <motion.span
            initial={{ x: "-30%" }}
            animate={{ x: "130%" }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "linear" }}
            className="absolute left-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>

        <div className="grid items-center gap-8 md:grid-cols-[1.35fr_1fr]">
          {/* Texto */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Evolua seu ecossistema educacional
            </span>

            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Conecte Pós-Graduação e Cursos Técnicos a um{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                padrão de performance
              </span>
              .
            </h3>

            <p className="mt-2 max-w-[56ch] text-white/75">
              Integração rápida, suporte humano e indicadores que importam.
              Comece com um diagnóstico gratuito — sem compromisso.
            </p>

            {/* Bullets compactas */}
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-2">
              {[
                "Onboarding em dias, não meses",
                "Relatórios e métricas claros",
                "Segurança e conformidade",
                "Equipe dedicada de suporte",
              ].map((b) => (
                <li key={b} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-300" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Botões */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
              >
                Fale com a RJGLOBAL <ArrowRight size={16} />
              </Link>
              <Link
                href="/solucoes"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
              >
                Ver soluções
              </Link>
            </div>
          </div>

          {/* Prova social + números */}
          <div className="relative">
            {/* Depoimento */}
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="relative h-18 w-18 overflow-hidden rounded-full ring-white/10">
                  <Image
                    src="/homem.jpg"
                    alt="Depoimento"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-white/85">
                    “A parceria com a RJGLOBAL elevou nosso nível de entrega. O
                    onboarding foi rápido e os relatórios, cirúrgicos.”
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Roberto Duarte — Coordenação Acadêmica
                  </p>
                </div>
              </div>
            </div>

            {/* Números */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "+60", l: "Cursos lançados" },
                { k: "94%", l: "Empregabilidade" },
                { k: "250k", l: "Alunos formados" },
              ].map((n) => (
                <div
                  key={n.l}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center ring-1 ring-white/10"
                >
                  <div className="text-lg font-extrabold text-white">{n.k}</div>
                  <div className="text-[11px] font-semibold text-white/65">
                    {n.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Selo */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/75 ring-1 ring-white/15">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
              Atendimento próximo • SLA claro
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Página ============== */
export default function PageEmpresas() {
  const [active, setActive] = useState<"all" | CompanyCategory>("all");

  const filtered = useMemo(
    () => (active === "all" ? DATA : DATA.filter((c) => c.category === active)),
    [active]
  );

  // Destaque acompanha o filtro (fallback para o primeiro da lista completa)
  const featured = filtered[0] ?? DATA[0];

  const trust = useMemo(
    () => DATA.map((c) => ({ src: c.logo, alt: c.name })),
    []
  );

  return (
    <main className="relative px-4 sm:px-6 lg:px-8">
      <Aurora />

      {/* Hero */}
      <div className="mx-auto w-full max-w-[1200px] py-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_1.35fr]">
          {/* Texto + tabs */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-400/15 ring-1 ring-emerald-400/30">
                <Building2 className="h-4 w-4 text-emerald-300" />
              </span>
              <span className="text-base font-semibold tracking-tight text-emerald-300">
                RJGLOBAL
              </span>
            </div>

            <h1 className="text-[38px] font-extrabold leading-[1.05] text-white sm:text-6xl">
              Empresas
            </h1>
            <p className="mt-3 max-w-xl text-white/75">
              Conheça nosso ecossistema de <b>Pós-Graduação</b> e{" "}
              <b>Cursos Técnicos</b> — tecnologia, educação e resultados
              concretos.
            </p>

            <div className="mt-6">
              <SegmentedTabs active={active} onChange={setActive} />
            </div>
          </div>

          <HeroSpotlight c={featured} />
        </div>
      </div>

      {/* Divisor + parceiros */}
      <BladeDivider />
      <TrustBar logos={trust} />

      {/* Grid (corrigida) */}
      <motion.div
        key={active}
        variants={gridWrap}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((c) => (
          <CompanyCard key={c.slug} c={c} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="mx-auto mt-6 w-full max-w-[1200px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-white/70 ring-1 ring-white/10">
          Nenhuma empresa encontrada para este filtro.
        </div>
      )}

      {/* >>> NOVO: Mega CTA no final */}
      <FinalCTA />
    </main>
  );
}
