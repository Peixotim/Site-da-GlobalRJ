// components/CertifiersReveal.tsx
"use client";

import Image from "next/image";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  m as motion,
  type Variants,
  LazyMotion,
  domAnimation,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

/* ======================
 * Tipos + dados padrão
 * ====================== */
export type CertifierItem = Readonly<{
  logo: string;
  title: string;
  subtitle?: string;
}>;

type Props = {
  items?: readonly CertifierItem[];
  className?: string;
  title?: string;
  eyebrow?: string;
};

const DEFAULT_ITEMS: readonly CertifierItem[] = [
  {
    logo: "/Certificadoras/globalrj.webp",
    title: "GLOBALTEC",
    subtitle: "Certificadora",
  },
  {
    logo: "/Certificadoras/fame.webp",
    title: "FAME",
    subtitle: "Certificadora",
  },
  {
    logo: "/Certificadoras/iguacu.webp",
    title: "FACULDADE IGUAÇU",
    subtitle: "Certificadora",
  },
  {
    logo: "/Certificadoras/faculeste.webp",
    title: "FACULESTE",
    subtitle: "Certificadora",
  },
  {
    logo: "/Certificadoras/faculvale.webp",
    title: "FACUVALE",
    subtitle: "Certificadora",
  },
  {
    logo: "/Certificadoras/educavales.webp",
    title: "EDUCAVALES",
    subtitle: "Certificadora",
  },
];

/* ======================
 * Componente principal
 * ====================== */
export default function CertifiersReveal({
  items = DEFAULT_ITEMS,
  className = "",
  title = "Certificadoras",
  eyebrow = "RJGLOBAL",
}: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <section className={`px-6 sm:px-8 lg:px-10 ${className}`}>
        <div className="relative mx-auto w-full max-w-[1600px]">
          <Header eyebrow={eyebrow} title={title} />

          {/* Renderiza SEMPRE os dois, troca só via CSS -> sem flicker/hidratação */}
          <div className="hidden lg:block">
            <DesktopStage items={items} />
          </div>
          <div className="lg:hidden">
            <MobileCarousel items={items} />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

/* ======================
 * Cabeçalho
 * ====================== */
const Header = memo(function Header({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-5 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
          <GraduationCap className="block h-5 w-5  text-gradient-to-r text-teal-300" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            {eyebrow}
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
});

/* ======================
 * Variants
 * ====================== */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const cardBase: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ======================
 * DESKTOP — palco com paginação se > 3 itens
 * ====================== */
const DesktopStage = memo(function DesktopStage({
  items,
}: {
  items: readonly CertifierItem[];
}) {
  const targets = [
    { x: -360, r: -6, z: 30 },
    { x: 0, r: 0, z: 40 },
    { x: 360, r: 6, z: 30 },
  ];

  const [start, setStart] = useState(0);
  const enablePager = items.length > 3;

  // item do slot 0..2 respeitando rotação circular
  const at = (slot: number) => items[(start + slot) % items.length];

  // paginação (3 em 3)
  const go = useCallback(
    (dir: -1 | 1) => {
      if (!enablePager) return;
      setStart((s) => {
        const len = items.length;
        const step = 3 % len || 1; // segurança
        return (s + (dir === 1 ? step : len - step)) % len;
      });
    },
    [enablePager, items.length]
  );

  // key no container para re-disparar animação de entrada leve a cada página
  const pageKey = Math.floor(start / 3);

  return (
    <div className="relative px-6 py-10 sm:px-8">
      <motion.div
        key={pageKey}
        className="relative mx-auto h-[520px] w-full max-w-[1100px]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/12 to-cyan-400/10 blur-2xl" />

        {[0, 1, 2].map((slot) => {
          const item = at(slot);
          const t = targets[slot];
          const specific: Variants = {
            hidden: { ...cardBase.hidden, zIndex: t.z },
            show: {
              ...cardBase.show,
              x: t.x,
              rotate: t.r,
              zIndex: t.z,
            },
          };

          return (
            <motion.div
              key={`${item.title}-${slot}-${pageKey}`}
              variants={specific}
              initial="hidden"
              animate="show"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <NeonCard item={item} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controles (apenas se tiver mais de 3) */}
      {enablePager && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/12 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            aria-label="Próximo"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/12 active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          {/* Indicadores de página */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: Math.ceil(items.length / 3) }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full transition ${
                  i === pageKey ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

/* ======================
 * MOBILE — carrossel simples
 * ====================== */
const MobileCarousel = memo(function MobileCarousel({
  items,
}: {
  items: readonly CertifierItem[];
}) {
  const safe = items.length ? items : DEFAULT_ITEMS;
  const [i, setI] = useState(0);

  const prev = useCallback(
    () => setI((x) => (x - 1 + safe.length) % safe.length),
    [safe.length]
  );
  const next = useCallback(
    () => setI((x) => (x + 1) % safe.length),
    [safe.length]
  );

  return (
    <div className="px-4 py-6">
      <div className="mx-auto flex w-full max-w-[420px] items-center gap-3">
        <button
          aria-label="Anterior"
          onClick={prev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/5 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <div className="relative mx-auto w-full">
          <CardStatic item={safe[i]} />
        </div>

        <button
          aria-label="Próximo"
          onClick={next}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/5 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {safe.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 w-1.5 rounded-full ${
              idx === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

/* ======================
 * Card estático (mobile)
 * ====================== */
const CardStatic = memo(function CardStatic({ item }: { item: CertifierItem }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 ring-1 ring-white/5 shadow-[0_18px_60px_rgba(0,0,0,.45)]">
      <div className="relative z-10 flex h-[300px] flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="relative h-20 w-20">
          <Image
            src={item.logo}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{item.title}</h4>
          {item.subtitle ? (
            <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
});

/* ======================
 * Card com tilt/shine (desktop)
 * ====================== */
const NeonCard = memo(function NeonCard({ item }: { item: CertifierItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
      mx.set(0.5);
      my.set(0.5);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  const rotateX = useTransform(my, [0, 1], [8, -8]);
  const rotateY = useTransform(mx, [0, 1], [-10, 10]);
  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glow = useMotionTemplate`radial-gradient(420px 220px at ${shineX} ${shineY}, rgba(34,211,238,0.16), rgba(168,85,247,0.12) 50%, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.03 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="relative h-[440px] w-[360px] rounded-2xl p-[1px] [perspective:1000px] transform-gpu"
    >
      {/* Borda com glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,.55), rgba(168,85,247,.6), rgba(34,211,238,.55))",
          filter: "blur(6px)",
          opacity: 0.9,
          borderRadius: "1rem",
        }}
      />

      {/* Corpo */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 ring-1 ring-white/5 shadow-[0_18px_60px_rgba(0,0,0,.45)]">
        {/* brilho que segue o mouse */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: glow }}
        />
        {/* textura */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_30%,transparent_55%)]" />

        {/* conteúdo */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="relative h-20 w-20">
            <Image
              src={item.logo}
              alt={item.title}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">{item.title}</h4>
            {item.subtitle ? (
              <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
