"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, type JSX } from "react";
import { ArrowRight, Building2, Sparkles } from "lucide-react";

type SaibaMaisImages = {
  mainImage: string;
  thumbLeft: string;
};

type Config = {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  cta: { label: string; href: string };
  companyName: string;
  companyTag: string;
} & SaibaMaisImages;

const CONFIG: Config = {
  eyebrow: "RJGLOBAL",
  title: "Quem Somos",
  paragraphs: [
    "Somos um grupo focado em educação e tecnologia, criando produtos e experiências que aceleram a carreira de milhares de pessoas.",
    "Unimos design, engenharia e dados para entregar plataformas robustas, seguras e fáceis de usar — do onboarding ao sucesso do aluno.",
  ],
  cta: { label: "Conheça nossas soluções", href: "/#solucoes" },
  companyName: "RJGLOBAL",
  companyTag: "Educação & Tecnologia",
  mainImage: "/college.webp",
  thumbLeft: "/cardsHome/card.webp",
};

/* Helper: retorna MotionValue quando permitido, senão fallback estático */
function mvOr<T extends number | string>(
  mv: MotionValue<T>,
  fallback: T,
  disabled: boolean
): MotionValue<T> | T {
  return disabled ? fallback : mv;
}

export default function SaibaMais() {
  const {
    eyebrow,
    title,
    paragraphs,
    cta,
    companyName,
    companyTag,
    mainImage,
    thumbLeft,
  } = CONFIG;

  const prefersReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /* ===== Scroll progress (0 → 1) com spring p/ suavizar ===== */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 18,
    mass: 0.2,
  });

  /* ===== Transforms ===== */
  // Texto
  const textX = useTransform(p, [0, 1], [-40, 0]);
  const textO = useTransform(p, [0, 0.2, 1], [0, 1, 1]);

  // Underline
  const underlineScale = useTransform(p, [0.15, 0.45], [0, 1]);

  // Parágrafos
  const para1Y = useTransform(p, [0.1, 0.35], [24, 0]);
  const para1O = useTransform(p, [0.1, 0.35], [0, 1]);
  const para2Y = useTransform(p, [0.18, 0.43], [24, 0]);
  const para2O = useTransform(p, [0.18, 0.43], [0, 1]);

  // CTA
  const ctaY = useTransform(p, [0.25, 0.55], [18, 0]);
  const ctaO = useTransform(p, [0.25, 0.55], [0, 1]);
  const shineX = useTransform(p, [0.35, 0.75], ["-130%", "130%"]);

  // Card principal
  const cardY = useTransform(p, [0, 1], [120, 0]);
  const cardR = useTransform(p, [0, 1], [6, 0]);
  const cardS = useTransform(p, [0, 1], [0.98, 1]);
  const cardO = useTransform(p, [0.05, 0.35], [0, 1]);

  // Thumb
  const tlY = useTransform(p, [0.25, 0.75], [80, -8]);
  const tlR = useTransform(p, [0.25, 0.75], [-12, -6]);
  const tlO = useTransform(p, [0.25, 0.75], [0, 1]);

  return (
    <section id="saiba-mais" className="px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className="relative mx-auto mt-10 w-full max-w-[1400px] overflow-hidden content-visibility-auto [contain:layout_paint]"
      >
        {/* BG / Glow */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 " />
          <div className="absolute inset-0 " />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[40px]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.1fr_1.3fr]">
          {/* LADO ESQUERDO (texto) */}
          <motion.div
            style={{
              x: mvOr(textX, 0, Boolean(prefersReduce)),
              opacity: mvOr(textO, 1, Boolean(prefersReduce)),
            }}
            className="max-w-xl transform-gpu"
            /* dica de composição para GPU */
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-teal-400/15 ring-1 ring-teal-300/30">
                <Building2 className="h-4 w-4 text-teal-300" />
              </span>
              <span className="text-base font-semibold tracking-tight text-teal-300">
                {eyebrow}
              </span>
            </div>

            <h2 className="relative text-[36px] font-extrabold leading-[1.08] text-white sm:text-5xl">
              {title}
              <motion.span
                style={{
                  scaleX: mvOr(underlineScale, 1, Boolean(prefersReduce)),
                }}
                className="absolute -bottom-2 left-0 block h-[3px] w-28 origin-left rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 will-change-transform"
                aria-hidden
              />
            </h2>

            <div className="mt-6 space-y-4">
              <motion.p
                style={{
                  y: mvOr(para1Y, 0, Boolean(prefersReduce)),
                  opacity: mvOr(para1O, 1, Boolean(prefersReduce)),
                }}
                className="text-white/75 transform-gpu will-change-[transform,opacity]"
              >
                {paragraphs[0]}
              </motion.p>
              <motion.p
                style={{
                  y: mvOr(para2Y, 0, Boolean(prefersReduce)),
                  opacity: mvOr(para2O, 1, Boolean(prefersReduce)),
                }}
                className="text-white/75 transform-gpu will-change-[transform,opacity]"
              >
                {paragraphs[1]}
              </motion.p>
            </div>

            <motion.div
              style={{
                y: mvOr(ctaY, 0, Boolean(prefersReduce)),
                opacity: mvOr(ctaO, 1, Boolean(prefersReduce)),
              }}
              className="mt-8 transform-gpu will-change-[transform,opacity]"
            >
              <Link
                href={cta.href}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-green-500 via-cyan-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-400/35"
              >
                {/* brilho guiado pelo scroll */}
                <span
                  className="pointer-events-none absolute inset-0"
                  aria-hidden
                >
                  <motion.span
                    style={{
                      x: mvOr(shineX, "120%", Boolean(prefersReduce)),
                    }}
                    className="block h-full w-24 -skew-x-12 bg-white/25 blur-md will-change-transform"
                  />
                </span>
                {cta.label}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* LADO DIREITO (card + thumb) */}
          <div className="relative">
            {/* Thumb esquerda */}
            <motion.div
              style={{
                opacity: mvOr(tlO, 1, Boolean(prefersReduce)),
                y: mvOr(tlY, -8, Boolean(prefersReduce)),
                rotate: mvOr(tlR, -6, Boolean(prefersReduce)),
              }}
              className="absolute -left-10 top-10 hidden w-[36%] origin-bottom-right overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70 ring-1 ring-white/5 drop-shadow-xl md:block transform-gpu will-change-[transform,opacity]"
            >
              <Image
                src={thumbLeft}
                alt="" // decorativa
                width={640}
                height={400}
                sizes="(min-width: 1024px) 260px, 33vw"
                className="h-auto w-full object-cover"
                priority={false}
                draggable={false}
              />
            </motion.div>

            {/* Card principal */}
            <motion.div
              style={{
                opacity: mvOr(cardO, 1, Boolean(prefersReduce)),
                y: mvOr(cardY, 0, Boolean(prefersReduce)),
                rotate: mvOr(cardR, 0, Boolean(prefersReduce)),
                scale: mvOr(cardS, 1, Boolean(prefersReduce)),
              }}
              className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 ring-1 ring-white/5 shadow-xl transform-gpu will-change-[transform,opacity]"
            >
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/60">
                    {companyTag}
                  </div>
                  <div className="text-lg font-bold text-white">
                    {companyName}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-teal-300/20 to-fuchsia-400/20 px-3 py-1 text-xs font-semibold text-teal-200 ring-1 ring-teal-300/25">
                  <Sparkles className="h-3.5 w-3.5" />
                  Destaque
                </span>
              </div>

              <div className="relative mt-4 aspect-[16/9] w-full">
                <motion.div
                  whileHover={prefersReduce ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full transform-gpu will-change-transform"
                >
                  <Image
                    src={mainImage}
                    alt={companyName}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover select-none"
                    priority
                    draggable={false}
                  />
                </motion.div>
              </div>

              <div className="flex items-center justify-between px-5 py-4">
                <div className="text-xs text-white/60">
                  Infra moderna • Segurança • Escalabilidade
                </div>
                <div
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                  aria-hidden
                />
              </div>

              <div
                className="pointer-events-none absolute -inset-x-10 -bottom-8 h-24 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 blur-2xl"
                aria-hidden
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Pontinhos decorativos (memória e acessibilidade) */
export function Dots(): JSX.Element {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-white/70"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 19) % 100}%`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}
