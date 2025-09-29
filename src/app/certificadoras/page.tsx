"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Star,
  BookOpen,
} from "lucide-react";
import { companies as DATA } from "@/data/companies";
import type { Company } from "@/data/companies";

/* ====== Motion ====== */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const gridWrap: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.045 } },
};
const gridItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: EASE },
  },
};

/* ====== BG global (sutil) ====== */
const Background = React.memo(function Background() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_70%_-10%,rgba(124,58,237,0.10),transparent)]" />
      <div className="absolute left-1/2 top-0 h-[110vh] w-[130vw] -translate-x-1/2 -rotate-[8deg] bg-[conic-gradient(from_220deg_at_50%_50%,rgba(34,211,238,0.10),rgba(168,85,247,0.12),rgba(34,211,238,0.10))] opacity-30" />
    </div>
  );
});

/* ====== Shimmer util ====== */
function Cover({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const shimmerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={shimmerRef}
        className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#101010_0%,#1a1a1a_40%,#101010_60%)] bg-[length:200%_100%]"
        aria-hidden
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        decoding="async"
        sizes={sizes}
        className={className}
        onLoadingComplete={() => {
          const el = shimmerRef.current;
          if (el) {
            el.style.transition = "opacity .28s ease";
            el.style.opacity = "0";
            setTimeout(() => el.remove(), 360);
          }
        }}
      />
    </div>
  );
}

const CleanHero = React.memo(function CleanHero({ count }: { count: number }) {
  return (
    <section className="mx-auto mt-6 w-full max-w-[1200px]">
      <div className="relative overflow-hidden rounded-[28px] sm:p-6 md:p-8 my-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 top-[-25%] h-[420px] w-[520px] rounded-[36px]" />
        </div>

        <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
          {/* Texto */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
              Certificações Premium
            </span>

            <h1 className="mt-3 text-[34px] sm:text-[42px] md:text-[48px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
              Suas{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                certificadoras
              </span>
            </h1>

            <p className="mt-3 max-w-[62ch] text-white/75">
              Seleção enxuta de certificadoras com padrão alto de governança e
              entrega. Transparência, agilidade e foco em resultado — para você
              decidir com confiança.
            </p>

            {/* métricas curtas */}
            <div className="mt-6 grid w-full grid-cols-3 gap-3 text-center sm:max-w-[520px]">
              <div className="rounded-xl bg-white/5 py-3 ring-1 ring-white/10">
                <div className="text-lg font-extrabold text-white">{count}</div>
                <div className="text-[11px] font-semibold text-white/65">
                  Certificadoras
                </div>
              </div>
              <div className="rounded-xl bg-white/5 py-3 ring-1 ring-white/10">
                <div className="inline-flex items-center gap-1 text-lg font-extrabold text-white">
                  <BookOpen className="h-4 w-4" /> 900+
                </div>
                <div className="text-[11px] font-semibold text-white/65">
                  Certificados
                </div>
              </div>
              <div className="rounded-xl bg-white/5 py-3 ring-1 ring-white/10">
                <div className="inline-flex items-center gap-1 text-lg font-extrabold text-white">
                  <Star className="h-4 w-4" /> 5.0
                </div>
                <div className="text-[11px] font-semibold text-white/65">
                  Avaliação
                </div>
              </div>
            </div>
          </div>

          {/* Imagem à direita (hero art) */}
          <div className="relative mx-auto h-[220px] w-full max-w-[520px] sm:h-[260px] md:h-[300px]">
            <div className="absolute inset-0 overflow-hidden rounded-[22px] ring-1 ring-white/10">
              <Cover
                src="/enterprise.jpg" // troque se quiser
                alt="Certificadoras"
                sizes="(min-width:1024px) 520px, 100vw"
                priority
                className="object-cover"
              />
              {/* máscara de vinheta */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(180%_120%_at_50%_80%,transparent,rgba(0,0,0,.35))]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ====== Botão do card – “Saiba mais” (único local com botão) ====== */
function SaibaMaisBtn() {
  return (
    <span className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] sm:text-sm font-semibold text-white ring-1 ring-white/15 bg-gradient-to-r from-teal-500/30 via-cyan-400/18 to-fuchsia-500/28 shadow-[0_10px_28px_rgba(0,0,0,.35)] transition-all hover:from-teal-500/45 hover:to-fuchsia-500/40 hover:shadow-[0_16px_40px_rgba(0,0,0,.45)]">
      Saiba mais <ArrowRight size={16} />
    </span>
  );
}

/* ====== Card ====== */
function CompanyCard({ c }: { c: Company }) {
  const reduce = useReducedMotion();
  return (
    <m.article variants={gridItem}>
      <Link
        href={`/certificadoras/${c.slug}`}
        prefetch={false}
        aria-label={`Abrir ${c.name}`}
        className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform duration-300 will-change-transform hover:-translate-y-1"
      >
        {/* moldura sutil */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl [mask:linear-gradient(#000,transparent_90%)]">
          <div className="h-full w-full rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,211,238,.28),rgba(168,85,247,.34),rgba(34,211,238,.28))] opacity-60" />
        </div>

        {/* cover */}
        <div className="relative aspect-[16/10] w-full">
          <Cover
            src={c.cover}
            alt={c.name}
            sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw"
          />
          <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white ring-1 ring-white/15 backdrop-blur-sm">
            <Image
              src={c.logo}
              alt={c.name}
              width={64}
              height={16}
              sizes="64px"
              className="h-4 w-auto"
            />
            Certificadora
          </div>
        </div>

        {/* body */}
        <div className="px-4 sm:px-5 py-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {c.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/70">{c.tagline}</p>

          {c.highlights?.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.highlights.slice(0, 3).map((h, i) => (
                <li
                  key={`${c.slug}-h-${i}`}
                  className="rounded-full bg-white/7 px-2.5 py-1 text-[11px] text-white/75 ring-1 ring-white/10"
                >
                  {h}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-4">
            <SaibaMaisBtn />
          </div>
        </div>

        {!reduce && (
          <m.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 via-white/0 to-white/[0.02]"
          />
        )}
      </Link>
    </m.article>
  );
}

/* ====== CTA final (mantido) ====== */
const FinalCTA = React.memo(function FinalCTA() {
  return (
    <section className="mx-auto my-14 w-full max-w-[1100px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 md:p-8 ring-1 ring-white/10">
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_85%_-10%,rgba(168,85,247,.16),transparent_60%)]" />
        </div>

        <div className="grid items-center gap-6 md:grid-cols-[1.35fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Atendimento próximo
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Quer ajuda para escolher a certificadora ideal?
            </h3>
            <p className="mt-2 max-w-[56ch] text-white/75">
              Fazemos um diagnóstico rápido e indicamos a melhor parceira para
              seu contexto.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
              >
                Falar com a equipe
              </Link>
              <Link
                href="/solucoes"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
              >
                Ver soluções
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-4 ring-1 ring-white/10 backdrop-blur-sm">
            <p className="text-sm text-white/85">
              “A curadoria encurtou semanas de análise — fomos direto ao ponto.”
            </p>
            <p className="mt-1 text-xs text-white/60">Coordenação Acadêmica</p>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ====== Página ====== */
export default function PageCertificadoras() {
  const list = useMemo<Company[]>(
    () => [...DATA].sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    []
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative px-4 sm:px-6 lg:px-8">
        <Background />
        <CleanHero count={list.length} />

        {/* GRID */}
        <section className="mx-auto w-full max-w-[1100px]">
          <m.div
            variants={gridWrap}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((c) => (
              <CompanyCard key={c.slug} c={c} />
            ))}
          </m.div>

          {list.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-white/70 ring-1 ring-white/10">
              Nenhuma certificadora cadastrada.
            </div>
          )}
        </section>

        <FinalCTA />
      </main>
    </LazyMotion>
  );
}
