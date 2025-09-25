// components/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

/* =======================
   Config & Types
======================= */
type Cta = Readonly<{ label: string; href: string }>;

type HeroConfig = Readonly<{
  eyebrow: string;
  titleLines: string[];
  subtitle: string;
  bgImage: string;
  cards: string[];
  ctaPrimary: Cta;
  ctaSecondary: Cta;
}>;

const CONFIG: HeroConfig = {
  eyebrow: "RJGLOBAL",
  titleLines: ["Grupo RJGLOBAL", "Educação & Tecnologia", "em alto nível"],
  subtitle: "Conheça as empresas e explore nossos produtos",
  bgImage: "/college.webp",
  cards: [
    "/cardsHome/card1.webp",
    "/cardsHome/card.webp",
    "/cardsHome/card2.webp",
  ],
  ctaPrimary: { label: "Nossas Empresas", href: "#empresas" },
  ctaSecondary: { label: "View Demos", href: "#demos" },
};

/* =======================
   Visual constants
======================= */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STAGE = {
  width: 1080,
  rotateDeg: -9,
  liftYrem: 4, // traduz -translate-y-16
  containerH: { base: 480, sm: 540 },
} as const;

const CARD = {
  width: [300, 330, 330, 300] as const,
  rotateDeg: [-7, -1.5, 4.5, 9] as const,
  floatY: [-2, 10, 22, 32] as const,
} as const;

/* =======================
   Animations
======================= */
const cardRise: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 140 + i * 8, scale: 0.96 }),
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: 0.24 * i, ease: EASE },
  }),
};

/* =======================
   Component
======================= */
export default function HeroSection() {
  const {
    eyebrow,
    titleLines,
    subtitle,
    bgImage,
    cards,
    ctaPrimary,
    ctaSecondary,
  } = CONFIG;

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto mt-6 w-full max-w-[1540px] overflow-hidden rounded-[32px] border border-white/30">
        <Background image={bgImage} />

        <div className="relative grid grid-cols-1 items-center gap-6 px-6 py-12 sm:gap-8 sm:px-10 sm:py-14 lg:grid-cols-[1.35fr_1.65fr] lg:py-16">
          <div className="z-10 max-w-xl">
            <Eyebrow text={eyebrow} />
            <Title lines={titleLines} />
            <Subtitle text={subtitle} />
            <Ctas primary={ctaPrimary} secondary={ctaSecondary} />
          </div>

          <CardsStage>
            {cards.slice(0, 4).map((src, i) => (
              <motion.div
                key={src}
                variants={cardRise}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="relative select-none drop-shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
                style={{ zIndex: 40 - i, marginLeft: i === 0 ? 0 : -26 }}
              >
                <CardFrame src={src} index={i} />
              </motion.div>
            ))}
            <TrianglesOverlay />
          </CardsStage>
        </div>

        <BaseRibbon />
      </div>
    </section>
  );
}

/* =======================
   Subcomponents
======================= */
function Background({ image }: { image: string }) {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover blur-xs"
      />
      <div className="absolute inset-0 bg-black/58" />
      <div className="absolute right-[-8%] top-[4%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,rgba(20,3,38,0)_48%)]" />
    </div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mb-5 flex items-center gap-3"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-400/15 ring-1 ring-emerald-400/30">
        <GraduationCap size={16} className="text-cyan-500" />
      </span>
      <span className="text-base font-semibold tracking-tight text-cyan-500">
        {text}
      </span>
    </motion.div>
  );
}

function Title({ lines }: { lines: string[] }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-[42px] font-extrabold leading-[1.05] text-white sm:text-6xl"
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </motion.h1>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-4 max-w-lg text-white/70"
    >
      {text}
    </motion.p>
  );
}

function Ctas({ primary, secondary }: { primary: Cta; secondary: Cta }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-7 flex flex-wrap items-center gap-3"
    >
      <Link
        href={primary.href}
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-[1.05]"
      >
        {primary.label}
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
      <Link
        href={secondary.href}
        className="text-sm font-semibold text-white/80 hover:text-white"
      >
        {secondary.label}
      </Link>
    </motion.div>
  );
}

function CardsStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ height: STAGE.containerH.base }}>
      <div className="absolute -inset-x-6 -bottom-6 h-28 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 blur-2xl" />
      <div
        className="absolute bottom-0 right-[-16%] isolate origin-bottom-right"
        style={{
          width: STAGE.width,
          transform: `translateY(-${STAGE.liftYrem}rem) rotate(${STAGE.rotateDeg}deg) scale(.88)`,
        }}
      >
        <div className="relative flex translate-y-2">{children}</div>
      </div>

      {/* altura responsiva sm */}
      <style jsx>{`
        @media (min-width: 640px) {
          div[style*="height: ${STAGE.containerH.base}px"] {
            height: ${STAGE.containerH.sm}px !important;
          }
        }
      `}</style>
    </div>
  );
}

function CardFrame({ src, index }: { src: string; index: number }) {
  const w = CARD.width[index] ?? CARD.width[0];
  const r = CARD.rotateDeg[index] ?? 0;
  const fy = CARD.floatY[index] ?? 0;

  return (
    <motion.div
      animate={{ y: fy }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ width: w }}
      className="relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 ring-1 ring-white/5"
        style={{ transform: `rotate(${r}deg)` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_30%,transparent_55%)]"
        />
        <Image
          src={src}
          alt={`Preview ${index + 1}`}
          width={w}
          height={200}
          sizes={`${w}px`}
          className="h-auto w-full object-cover"
          priority={index === 0}
        />
      </div>
    </motion.div>
  );
}

function BaseRibbon() {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="pointer-events-none absolute -bottom-10 left-0 right-0 h-40"
      aria-hidden
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="drop-shadow-[0_18px_56px_rgba(168,85,247,0.35)]"
      >
        <defs>
          <linearGradient id="rgRJ" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path
          d="M0,160 C300,190 900,0 1200,120 L1200,220 L0,220 Z"
          fill="url(#rgRJ)"
        />
      </svg>
    </motion.div>
  );
}

function TrianglesOverlay() {
  return (
    <div
      className="pointer-events-none absolute -bottom-8 left-0 right-0"
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 220"
        width="100%"
        height="220"
        preserveAspectRatio="none"
        className="opacity-95"
      >
        <defs>
          <linearGradient id="triA" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.22)" />
          </linearGradient>
          <linearGradient id="triB" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="triC" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(124,58,237,0.28)" />
          </linearGradient>
          <linearGradient id="fadeR" x1="0" x2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <mask id="maskR">
            <rect x="0" y="0" width="1200" height="220" fill="url(#fadeR)" />
          </mask>
        </defs>
        <g mask="url(#maskR)">
          <polygon points="-40,190 340,140 360,220 -40,220" fill="url(#triA)" />
          <polygon points="260,190 740,130 760,220 280,220" fill="url(#triC)" />
          <polygon
            points="520,188 1200,110 1200,220 540,220"
            fill="url(#triB)"
          />
        </g>
      </svg>
    </div>
  );
}
