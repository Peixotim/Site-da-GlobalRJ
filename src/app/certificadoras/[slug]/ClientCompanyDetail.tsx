"use client";

import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useMemo, useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";
import type { Certificadora } from "@/data/certificadoras";

/* ================== Motion ================== */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const appear = {
  hidden: { opacity: 0, scale: 0.985 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/* ================== CountUp ================== */
const CountUp = memo(function CountUp({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  duration = 1100,
}: {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const start = performance.now();
    const delta = to - from;
    let raf = 0,
      last = -1;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const v = from + delta * p;
      const shown = Math.round(v);
      if (shown !== last) {
        ref.current!.textContent = `${prefix}${shown.toLocaleString(
          "pt-BR"
        )}${suffix}`;
        last = shown;
      }
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, prefix, suffix, duration]);

  return (
    <span ref={wrap}>
      <span ref={ref}>{`${prefix}${from.toLocaleString(
        "pt-BR"
      )}${suffix}`}</span>
    </span>
  );
});

/* ================== Ícones de rede ================== */
const SocialIcon: Record<
  "instagram" | "youtube" | "linkedin" | "x" | "website",
  React.ComponentType<any>
> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  x: Twitter,
  website: Globe,
};

/* ======================================================================
   HERO — “split” editorial: banner recortado + bloco de identidade
======================================================================== */
function HeroSplit({ c }: { c: Certificadora }) {
  return (
    <section className="mx-auto mt-6 w-full max-w-[1200px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr] items-end">
        {/* banner assimétrico (sem cartão) */}
        <m.div
          variants={appear}
          initial="hidden"
          animate="show"
          className="relative h-[40vh] min-h-[280px] overflow-hidden rounded-[28px]"
        >
          <Image
            src={c.cover}
            alt={c.name}
            fill
            priority
            sizes="(min-width:1024px) 800px, 100vw"
            className="object-cover"
          />
          {/* recorte diagonal + vinheta */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
          />
          <div
            aria-hidden
            className="absolute -right-10 top-0 h-full w-24 -skew-x-6 bg-gradient-to-l from-black/35 to-transparent"
          />
        </m.div>

        {/* bloco identidade (logo + nome + baseline) */}
        <m.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="relative rounded-[28px] p-6 md:p-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-28 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                sizes="112px"
                className="object-contain p-2"
              />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {c.name}
              </h1>
              {c.tagline && (
                <p className="mt-1 line-clamp-2 text-sm text-white/70">
                  {c.tagline}
                </p>
              )}
            </div>
          </div>

          {/* faixa de métricas compacta, sem “cards” */}
          {c.metrics?.length ? (
            <div className="mt-6 grid grid-cols-3 gap-4">
              {c.metrics.slice(0, 3).map((mtr, i) => {
                const num = mtr.value.replace(/[^\d.kK%+]/g, "");
                return (
                  <div key={`m-${i}`} className="min-w-0">
                    <div className="text-xl font-extrabold text-white">
                      {/\d/.test(num) ? mtr.value : mtr.value}
                    </div>
                    <div className="text-xs font-medium text-white/70">
                      {mtr.label}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </m.div>
      </div>
    </section>
  );
}

/* ======================================================================
   LAYOUT — coluna principal + “rail” lateral fixo (ações e contatos)
======================================================================== */
function Rail({ c }: { c: Certificadora }) {
  const socials = useMemo(() => {
    const items: {
      key: "website" | "instagram" | "linkedin" | "youtube" | "x";
      href: string;
    }[] = [];
    if (c.contacts?.site) items.push({ key: "website", href: c.contacts.site });
    if (c.socials?.linkedin)
      items.push({ key: "linkedin", href: c.socials.linkedin });
    if (c.socials?.instagram)
      items.push({ key: "instagram", href: c.socials.instagram });
    if (c.socials?.youtube)
      items.push({ key: "youtube", href: c.socials.youtube });
    if (c.socials?.x) items.push({ key: "x", href: c.socials.x });
    return items;
  }, [c]);

  return (
    <aside className="top-6 h-max space-y-5 md:sticky">
      <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
          Próximos passos
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <Link
            href="/contato"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Falar com a RJGLOBAL <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          {c.contacts?.site && (
            <Link
              href={c.contacts.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/15"
            >
              Visitar site oficial <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {!!socials.length && (
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
            Canais
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {socials.map(({ key, href }) => {
              const Icon = SocialIcon[key];
              return (
                <Link
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
                >
                  <Icon className="h-4 w-4 text-white/90" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

/* ======================================================================
   SEÇÕES PRINCIPAIS — texto editorial + destaques em “chips” numerados
======================================================================== */
function About({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <m.section
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h2 className="text-sm font-semibold tracking-wide text-white/70">
        Sobre
      </h2>
      <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-white/80">
        {text}
      </p>
    </m.section>
  );
}

function HighlightsChips({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <m.section
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h2 className="text-sm font-semibold tracking-wide text-white/70">
        Diferenciais
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.slice(0, 8).map((t, i) => (
          <li
            key={`h-${i}`}
            className="group inline-flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
          >
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">
              {i + 1}
            </span>
            <span className="text-[15px] leading-relaxed text-white/85">
              {t}
            </span>
          </li>
        ))}
      </ul>
    </m.section>
  );
}

/* Faixa de números (sem cartões) */
/* Faixa de números — versão premium com ring gradiente + glass */
function MetricStrip({ metrics }: { metrics?: Certificadora["metrics"] }) {
  if (!metrics?.length) return null;

  const parse = (v: string) => {
    const n = Number(v.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(n)) return null;
    return /k/i.test(v) ? n * 1000 : n;
  };

  return (
    <m.section
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {metrics.slice(0, 3).map((mtr, i) => {
          const n = parse(mtr.value);
          const suffix = /%$/.test(mtr.value) ? "%" : "";
          const prefix = /^\+/.test(mtr.value) ? "+" : "";

          return (
            <div key={`ms-${i}`} className="relative">
              {/* Ring com conic-gradient (borda viva) */}
              <div className="rounded-2xl p-[1px] bg-[conic-gradient(at_0%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0.06)_35%,rgba(255,255,255,0.35)_70%,rgba(255,255,255,0.06)_100%)]">
                {/* Miolo em glass + sombras sutis */}
                <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_12px_28px_rgba(0,0,0,.35)] px-5 py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[28px] md:text-[32px] font-extrabold tracking-tight text-white">
                        {n !== null ? (
                          <CountUp to={n} prefix={prefix} suffix={suffix} />
                        ) : (
                          mtr.value
                        )}
                      </div>
                      <div className="mt-1 text-[12px] font-medium text-white/70">
                        {mtr.label}
                      </div>
                    </div>

                    {/* Selo numerado (decor) */}
                    <span className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 text-[11px] font-bold text-white/80">
                      {i + 1}
                    </span>
                  </div>

                  {/* Barra sutil sob o número (detalhe premium) */}
                  <div className="mt-3 h-1 rounded-full bg-white/5 ring-1 ring-white/10 overflow-hidden">
                    <div
                      className="h-full w-1/2 rounded-full bg-gradient-to-r from-white/60 via-white/80 to-white/40"
                      style={{
                        width:
                          n !== null
                            ? `${Math.max(18, Math.min(90, n % 100))}` + "%"
                            : "42%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </m.section>
  );
}

/* Galeria em masonry (colunas CSS) */
function Masonry({ images }: { images?: string[] }) {
  if (!images?.length) return null;
  const pics = images.slice(0, 6);
  return (
    <m.section
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h2 className="text-sm font-semibold tracking-wide text-white/70">
        Galeria
      </h2>
      <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {pics.map((src, i) => (
          <div
            key={`g-${i}`}
            className="mb-4 break-inside-avoid rounded-2xl overflow-hidden"
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: i % 3 === 0 ? "4/3" : "16/10" }}
            >
              <Image
                src={src}
                alt={`Imagem ${i + 1}`}
                fill
                sizes="(min-width:1024px) 360px, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </m.section>
  );
}

/* Encerramento minimalista */
function Closing({ name }: { name: string }) {
  return (
    <m.section
      variants={appear}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Pronto para avançar com{" "}
              <span className="underline decoration-white/30">{name}</span>?
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Curadoria e governança para ir do diagnóstico ao go-live com
              previsibilidade.
            </p>
          </div>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Começar agora <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </m.section>
  );
}

/* ======================================================================
   PAGE (client) — grid assimétrico + rail sticky
======================================================================== */
export default function ClientCertDetail({ cert }: { cert?: Certificadora }) {
  if (!cert) {
    return (
      <LazyMotion features={domAnimation} strict>
        <main className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto my-16 max-w-[900px] rounded-2xl bg-white/5 p-6 text-white/80 ring-1 ring-white/10">
            Não foi possível carregar a certificadora.
          </div>
        </main>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative px-4 sm:px-6 lg:px-8">
        {/* fundo bem sutil */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_80%_-10%,rgba(255,255,255,0.08),transparent)]" />
        </div>

        <HeroSplit c={cert} />

        {/* grade assimétrica: conteúdo + rail */}
        <section className="mx-auto mt-8 w-full max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_360px]">
            {/* coluna principal */}
            <div className="space-y-10">
              <MetricStrip metrics={cert.metrics} />
              <About text={cert.about} />
              <HighlightsChips items={cert.highlights} />
              <Masonry images={cert.gallery} />
              <Closing name={cert.name} />
            </div>

            {/* rail lateral */}
            <Rail c={cert} />
          </div>
        </section>
      </main>
    </LazyMotion>
  );
}
