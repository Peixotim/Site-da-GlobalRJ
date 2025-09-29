// components/SaibaMais.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { memo, useRef, useEffect, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Building2, Sparkles } from "lucide-react";

/* =====================================================
   Tipos & Config (mantidos)
===================================================== */
type SaibaMaisImages = { mainImage: string; thumbLeft: string };

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
  cta: { label: "Conheça nossas soluções", href: "/solucoes" },
  companyName: "RJGLOBAL",
  companyTag: "Educação & Tecnologia",
  mainImage: "/college.webp",
  thumbLeft: "/cardsHome/card.webp",
};

/* =====================================================
   Helpers
===================================================== */
function mvOr<T extends number | string>(
  mv: MotionValue<T>,
  fallback: T,
  disabled: boolean
): MotionValue<T> | T {
  return disabled ? fallback : mv;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const listener = () => setMatches(m.matches);
    setMatches(m.matches);
    m.addEventListener("change", listener);
    return () => m.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

/* =====================================================
   Componente (desktop com scroll; mobile estático)
===================================================== */
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
  const isDesktop = useMediaQuery("(min-width: 1024px)"); // lg breakpoint
  const motionOff = !isDesktop || !!prefersReduce; // \-> MOBILE: desliga animações/scroll

  const ref = useRef<HTMLDivElement>(null);

  // Scroll progress suavizado (só relevante em desktop)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 25%"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 18,
    mass: 0.2,
  });

  // Transforms controlados por motionOff
  const textX = useTransform(p, [0, 1], [-40, 0]);
  const textO = useTransform(p, [0, 0.2, 1], [0, 1, 1]);
  const underlineScale = useTransform(p, [0.15, 0.45], [0, 1]);
  const para1Y = useTransform(p, [0.1, 0.35], [24, 0]);
  const para1O = useTransform(p, [0.1, 0.35], [0, 1]);
  const para2Y = useTransform(p, [0.18, 0.43], [24, 0]);
  const para2O = useTransform(p, [0.18, 0.43], [0, 1]);
  const ctaY = useTransform(p, [0.25, 0.55], [18, 0]);
  const ctaO = useTransform(p, [0.25, 0.55], [0, 1]);
  const shineX = useTransform(p, [0.35, 0.75], ["-130%", "130%"]);
  const cardY = useTransform(p, [0, 1], [120, 0]);
  const cardR = useTransform(p, [0, 1], [6, 0]);
  const cardS = useTransform(p, [0, 1], [0.98, 1]);
  const cardO = useTransform(p, [0.05, 0.35], [0, 1]);
  const tlY = useTransform(p, [0.25, 0.75], [80, -8]);
  const tlR = useTransform(p, [0.25, 0.75], [-12, -6]);
  const tlO = useTransform(p, [0.25, 0.75], [0, 1]);

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="saiba-mais" className="rj-saibamais px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative mx-auto mt-8 sm:mt-10 w-full max-w-[1400px] overflow-hidden content-visibility-auto [contain:layout_paint] [contain-intrinsic-size:780px]"
        >
          {/* BG / Glow — intensidade reduzida em mobile */}

          {/* Grid */}
          <div className="relative grid grid-cols-1 items-center gap-6 sm:gap-10 px-4 sm:px-8 py-8 sm:py-14 lg:grid-cols-[1.1fr_1.3fr] lg:py-16">
            {/* Texto */}
            <m.div
              style={{
                x: mvOr(textX, 0, motionOff),
                opacity: mvOr(textO, 1, motionOff),
              }}
              className="max-w-xl transform-gpu"
            >
              <HeaderBadge text={eyebrow} motionOff={motionOff} />
              <Title
                title={title}
                underlineScale={mvOr(underlineScale, 1, motionOff)}
              />
              <Paragraphs
                p1={{
                  y: mvOr(para1Y, 0, motionOff),
                  o: mvOr(para1O, 1, motionOff),
                }}
                p2={{
                  y: mvOr(para2Y, 0, motionOff),
                  o: mvOr(para2O, 1, motionOff),
                }}
                paragraphs={paragraphs}
                motionOff={motionOff}
              />
              <PrimaryCta
                href={cta.href}
                label={cta.label}
                y={mvOr(ctaY, 0, motionOff)}
                o={mvOr(ctaO, 1, motionOff)}
                shineX={mvOr(shineX, "120%", motionOff)}
                motionOff={motionOff}
              />
            </m.div>

            {/* Visual */}
            <div className="relative">
              {/* Thumb: só em >= md */}
              <m.div
                style={{
                  opacity: mvOr(tlO, 1, motionOff),
                  y: mvOr(tlY, -8, motionOff),
                  rotate: mvOr(tlR, -6, motionOff),
                }}
                className="absolute -left-2 top-6 hidden w-[38%] origin-bottom-right overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70 ring-1 ring-white/5 drop-shadow-xl md:block transform-gpu will-change-[transform,opacity]"
              >
                <Image
                  src={thumbLeft}
                  alt=""
                  width={640}
                  height={400}
                  sizes="(min-width: 1024px) 280px, 33vw"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </m.div>

              {/* Card principal */}
              <m.div
                style={{
                  opacity: mvOr(cardO, 1, motionOff),
                  y: mvOr(cardY, 0, motionOff),
                  rotate: mvOr(cardR, 0, motionOff),
                  scale: mvOr(cardS, 1, motionOff),
                }}
                className="relative mx-auto w-full max-w-[460px] sm:max-w-[620px] lg:max-w-[720px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 ring-1 ring-white/5 shadow-xl transform-gpu will-change-[transform,opacity]"
              >
                <div className="flex items-center justify-between px-4 pt-4 sm:px-5">
                  <div>
                    <div className="text-[11px] font-semibold tracking-wide text-white/60 sm:text-xs">
                      {companyTag}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white">
                      {companyName}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-teal-300/20 to-fuchsia-400/20 px-2.5 py-1 text-[11px] font-semibold text-teal-200 ring-1 ring-teal-300/25 sm:px-3">
                    <Sparkles className="h-3.5 w-3.5" />
                    Destaque
                  </span>
                </div>

                <div className="relative mt-3 aspect-[16/9] w-full sm:mt-4">
                  <m.div
                    whileHover={motionOff ? undefined : { scale: 1.03 }}
                    transition={{ duration: 0.45 }}
                    className="h-full w-full transform-gpu will-change-transform"
                  >
                    <Image
                      src={mainImage}
                      alt={companyName}
                      fill
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="select-none object-cover"
                      priority
                      draggable={false}
                    />
                  </m.div>
                </div>

                <div className="flex items-center justify-between px-4 py-4 sm:px-5">
                  <div className="text-[11px] sm:text-xs text-white/60">
                    Infra moderna • Segurança • Escalabilidade
                  </div>
                  <div
                    className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                    aria-hidden
                  />
                </div>

                <div
                  className="pointer-events-none absolute -inset-x-10 -bottom-8 h-14 sm:h-24 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 blur-lg sm:blur-xl"
                  aria-hidden
                />
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

/* =====================================================
   Subcomponentes (memoizados, com prop motionOff)
===================================================== */
const HeaderBadge = memo(function HeaderBadge({
  text,
  motionOff,
}: {
  text: string;
  motionOff: boolean;
}) {
  return (
    <m.div
      initial={motionOff ? undefined : { opacity: 0, y: 10 }}
      whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
      viewport={motionOff ? undefined : { once: true }}
      transition={motionOff ? undefined : { duration: 0.45 }}
      className="mb-4 sm:mb-5 flex items-center gap-3"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-teal-400/15 ring-1 ring-teal-300/30">
        <Building2 className="h-4 w-4 text-teal-300" />
      </span>
      <span className="text-sm sm:text-base font-semibold tracking-tight text-teal-300">
        {text}
      </span>
    </m.div>
  );
});

const Title = memo(function Title({
  title,
  underlineScale,
}: {
  title: string;
  underlineScale: MotionValue<number> | number;
}) {
  return (
    <h2 className="relative text-[30px] sm:text-[36px] md:text-5xl font-extrabold leading-[1.08] sm:leading-[1.08] text-white">
      {title}
      <m.span
        style={{ scaleX: underlineScale as MotionValue<number> }}
        className="absolute -bottom-2 left-0 block h-[3px] w-28 origin-left rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 will-change-transform"
        aria-hidden
      />
    </h2>
  );
});

const Paragraphs = memo(function Paragraphs({
  paragraphs,
  p1,
  p2,
  motionOff,
}: {
  paragraphs: readonly string[];
  p1: { y: MotionValue<number> | number; o: MotionValue<number> | number };
  p2: { y: MotionValue<number> | number; o: MotionValue<number> | number };
  motionOff: boolean;
}) {
  return (
    <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
      <m.p
        style={{
          y: p1.y as MotionValue<number>,
          opacity: p1.o as MotionValue<number>,
        }}
        initial={motionOff ? undefined : { opacity: 0, y: 12 }}
        whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
        transition={motionOff ? undefined : { duration: 0.5, delay: 0.1 }}
        viewport={motionOff ? undefined : { once: true }}
        className="text-white/75 transform-gpu will-change-[transform,opacity]"
      >
        {paragraphs[0]}
      </m.p>
      <m.p
        style={{
          y: p2.y as MotionValue<number>,
          opacity: p2.o as MotionValue<number>,
        }}
        initial={motionOff ? undefined : { opacity: 0, y: 12 }}
        whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
        transition={motionOff ? undefined : { duration: 0.5, delay: 0.12 }}
        viewport={motionOff ? undefined : { once: true }}
        className="text-white/75 transform-gpu will-change-[transform,opacity]"
      >
        {paragraphs[1]}
      </m.p>
    </div>
  );
});

const PrimaryCta = memo(function PrimaryCta({
  href,
  label,
  y,
  o,
  shineX,
  motionOff,
}: {
  href: string;
  label: string;
  y: MotionValue<number> | number;
  o: MotionValue<number> | number;
  shineX: MotionValue<string> | string;
  motionOff: boolean;
}) {
  return (
    <m.div
      style={{ y: y as MotionValue<number>, opacity: o as MotionValue<number> }}
      initial={motionOff ? undefined : { opacity: 0, y: 12 }}
      whileInView={motionOff ? undefined : { opacity: 1, y: 0 }}
      transition={motionOff ? undefined : { duration: 0.5, delay: 0.2 }}
      viewport={motionOff ? undefined : { once: true }}
      className="mt-6 sm:mt-8 transform-gpu will-change-[transform,opacity]"
    >
      <Link
        href={href}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-green-500 via-cyan-500 to-cyan-600 px-5 sm:px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-400/30"
      >
        <span className="pointer-events-none absolute inset-0" aria-hidden>
          <m.span
            style={{ x: shineX as MotionValue<string> }}
            className="block h-full w-24 -skew-x-12 bg-white/25 blur-md will-change-transform"
          />
        </span>
        {label}
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </m.div>
  );
});
