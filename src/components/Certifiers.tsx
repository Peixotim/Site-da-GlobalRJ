// components/CertifiersReveal.tsx
"use client";

import Image from "next/image";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  m, // Alias para motion
  useInView,
  useAnimation,
  type Variants,
  LazyMotion,
  domAnimation,
  useMotionValue, // NOVO: para o efeito suave do mouse
  useTransform, // NOVO: para o efeito suave do mouse
  useMotionTemplate, // NOVO: para o gradiente de brilho
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  { logo: "/globalrj.webp", title: "GLOBALTEC", subtitle: "Certificadora" },
  { logo: "/fame.webp", title: "FAME", subtitle: "Certificadora" },
  {
    logo: "/Certificadoras/iguacu.webp",
    title: "FACULDADE IGUAÇU",
    subtitle: "Certificadora",
  },
];

/* ======================
 * Hook utilitário
 * ====================== */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    setMatches(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* ======================
 * Componente principal
 * ====================== */
export default function CertifiersReveal({
  items = DEFAULT_ITEMS,
  className = "",
  title = "Certificadoras & Acreditações",
  eyebrow = "RJGLOBAL",
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)"); // lg breakpoint — mantém web idêntico

  return (
    <LazyMotion features={domAnimation} strict>
      <section className={`px-6 sm:px-8 lg:px-10 ${className}`}>
        <div className="relative mx-auto w-full max-w-[1600px]">
          {/* Cabeçalho */}
          <Header eyebrow={eyebrow} title={title} />

          {/* Conteúdo responsivo */}
          {isDesktop ? (
            <DesktopStage items={items} />
          ) : (
            <MobileCarousel items={items} />
          )}
        </div>
      </section>
    </LazyMotion>
  );
}

/* ======================
 * Cabeçalho (memo)
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
          <span className="block h-3 w-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400" />
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
 * DESKTOP — palco original (intocado visualmente)
 * ====================== */
const container: Variants = {
  hidden: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardBase: Variants = {
  hidden: { x: 0, y: 0, rotate: 0, scale: 0.96, opacity: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

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

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.55 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? "show" : "hidden");
  }, [inView, controls]);

  return (
    <div className="relative px-6 py-10 sm:px-8">
      <m.div
        ref={stageRef}
        className="relative mx-auto h-[520px] w-full max-w-[1100px]"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/12 to-cyan-400/10 blur-2xl" />

        {items.slice(0, 3).map((it, i) => {
          const t = targets[i];
          const specific: Variants = {
            hidden: { ...cardBase.hidden, zIndex: t.z },
            show: { ...cardBase.show, x: t.x, rotate: t.r, zIndex: t.z },
          };
          return (
            <m.div
              key={it.title}
              variants={specific}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* NeonCard usa o item e os valores de mouse para animações suaves */}
              <NeonCard item={it} />
            </m.div>
          );
        })}
      </m.div>
    </div>
  );
});

/* ======================
 * MOBILE — carrossel básico sem animações complexas de tilt/shine
 * ====================== */
const MobileCarousel = memo(function MobileCarousel({
  items,
}: {
  items: readonly CertifierItem[];
}) {
  const safeItems = items.length ? items : DEFAULT_ITEMS;
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + safeItems.length) % safeItems.length),
    [safeItems.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % safeItems.length),
    [safeItems.length]
  );

  return (
    <div className="px-4 py-6 md:hidden">
      {" "}
      {/* Modificado para esconder em 'md' e acima */}
      <div className="mx-auto flex w-full max-w-[420px] items-center gap-3">
        <button
          aria-label="Anterior"
          onClick={prev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/5 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <div className="relative mx-auto w-full">
          {/* Card estático para mobile */}
          <CardStatic item={safeItems[index]} />
        </div>

        <button
          aria-label="Próximo"
          onClick={next}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/15 bg-white/5 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
      <Dots count={safeItems.length} active={index} />
    </div>
  );
});

const Dots = memo(function Dots({
  count,
  active,
}: {
  count: number;
  active: number;
}) {
  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i === active ? "bg-white" : "bg-white/40"
          }`}
        />
      ))}
    </div>
  );
});

/* ======================
 * Card estático (mobile) - Sem interatividade complexa
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
 * Card com tilt/shine (desktop original) - AGORA SUAVE!
 * ====================== */
const NeonCard = memo(function NeonCard({ item }: { item: CertifierItem }) {
  const ref = useRef<HTMLDivElement>(null);
  // USAMOS useMotionValue para que o Framer Motion possa interpolar esses valores
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      // Atualiza o MotionValue diretamente
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };

    const onLeave = () => {
      // Retorna para o centro suavemente
      mx.set(0.5);
      my.set(0.5);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]); // mx e my são dependências

  // useTransform para mapear os valores do mouse para os ângulos de rotação
  const rotateX = useTransform(my, [0, 1], [8, -8]); // Invertido Y para rotação intuitiva
  const rotateY = useTransform(mx, [0, 1], [-10, 10]);

  // useTransform para o brilho seguir o mouse
  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [0, 1], ["0%", "100%"]);
  // useMotionTemplate para animar o background-image (gradiente)
  const glow = useMotionTemplate`radial-gradient(420px 220px at ${shineX} ${shineY}, rgba(34,211,238,0.16), rgba(168,85,247,0.12) 50%, transparent 70%)`;

  return (
    <m.div // m.div é crucial para que os MotionValues sejam aplicados e interpolados
      ref={ref}
      whileHover={{ scale: 1.03 }} // Mantém o efeito de zoom
      // Aplica os MotionValues diretamente no estilo. Framer Motion cuidará da suavidade.
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }} // Transição para whileHover e o retorno do mouseleave
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

      {/* Corpo do card */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 ring-1 ring-white/5 shadow-[0_18px_60px_rgba(0,0,0,.45)]">
        {/* brilho que segue o mouse - AGORA TAMBÉM SUAVE */}
        <m.div // Também precisa ser um m.div para usar useMotionTemplate com suavidade
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: glow }} // Aplica o MotionTemplate
        />
        {/* textura diagonal */}
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
    </m.div>
  );
});
