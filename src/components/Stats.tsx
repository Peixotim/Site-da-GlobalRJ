"use client";

import React, { memo, useEffect, useMemo, useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

/* ===========================
   Tipos
=========================== */
type StatCount = Readonly<{
  icon: React.ReactNode;
  label: string;
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
}>;

type StatTitle = Readonly<{
  icon: React.ReactNode;
  label: string; // também usado como título grande
}>;

type StatItem = Readonly<StatCount | StatTitle>;

function isStatCount(item: StatItem): item is StatCount {
  return (item as Partial<StatCount>).to !== undefined;
}

/* ===========================
   Defaults (exemplo)
=========================== */
const DEFAULT_ITEMS: Readonly<StatItem[]> = [
  {
    icon: <BookOpen className="h-6 w-6 text-cyan-300" />,
    from: 0,
    to: 60,
    prefix: "+",
    label: "Técnicos e Profissionalizantes",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-fuchsia-300" />,
    from: 0,
    to: 94,
    suffix: "%",
    label: "de Empregabilidade",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-teal-300" />,
    from: 0,
    to: 100000,
    label: "Alunos Formados",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-teal-300" />,
    from: 0,
    to: 100000,
    label: "Alunos Formados",
  },
];

/* ===========================
   CountUp leve (rAF, sem springs)
   - Atualiza o DOM só quando o inteiro muda
   - Só roda quando entra em viewport
=========================== */
const CountUp = memo(function CountUp({
  from,
  to,
  prefix = "",
  suffix = "",
  duration = 1000,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !hostRef.current) return;
    const start = performance.now();
    const delta = to - from;
    let raf = 0;
    let lastShown = Number.NaN;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const value = from + delta * p;
      const shown = delta >= 1000 ? Math.round(value) : Math.floor(value);
      if (shown !== lastShown) {
        hostRef.current!.textContent = `${prefix}${shown.toLocaleString(
          "pt-BR"
        )}${suffix}`;
        lastShown = shown;
      }
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, prefix, suffix, duration]);

  return (
    <div ref={wrapperRef} aria-live="polite">
      <span ref={hostRef}>{`${prefix}${from.toLocaleString(
        "pt-BR"
      )}${suffix}`}</span>
    </div>
  );
});

/* ===========================
   Cartão de estatística (memoizado)
   - Hover só em md+ para evitar custo em mobile
   - Sem animações infinitas
=========================== */
const StatCard = memo(function StatCard({ item }: { item: StatItem }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.40)] px-4 sm:px-5 py-5 flex flex-col items-center text-center md:transition-transform md:will-change-transform md:hover:-translate-y-1">
      {/* Borda "viva" leve (sem animação) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-55"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,.40), rgba(168,85,247,.45), rgba(34,211,238,.40))",
          filter: "blur(8px)",
        }}
      />
      {/* brilho radial interno (leve) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(120% 110% at 50% -10%, rgba(34,211,238,.10), rgba(168,85,247,.08) 45%, transparent 70%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/30 ring-1 ring-white/10">
          {item.icon}
        </div>

        <div className="text-[34px] sm:text-[40px] lg:text-[44px] font-extrabold leading-none tracking-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
          {isStatCount(item) ? (
            <CountUp
              from={item.from}
              to={item.to}
              prefix={item.prefix}
              suffix={item.suffix}
            />
          ) : (
            item.label
          )}
        </div>

        <p className="mt-2 max-w-[22ch] text-[13px] sm:text-sm font-semibold text-white/75">
          {item.label}
        </p>
      </div>
    </div>
  );
});

/* ===========================
   Componente principal
   - LazyMotion/domAnimation para bundle menor
   - Sem whileInView por item (apenas container faz fade-in)
   - Mobile-first com grid simples
=========================== */
export default function Stats({
  items = DEFAULT_ITEMS,
  className = "",
  scale = 1,
}: {
  items?: Readonly<StatItem[]>;
  className?: string;
  scale?: number;
}) {
  const safeItems = useMemo(
    () => (items && items.length ? items : DEFAULT_ITEMS),
    [items]
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <section className={`px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="relative mx-auto w-full max-w-[1400px]">
          {/* Glow de fundo (mais leve) */}
          <div className="pointer-events-none absolute -inset-x-16 -top-6 h-20 rounded-[44px] bg-[radial-gradient(60%_120%_at_50%_0%,rgba(124,58,237,0.18),rgba(34,211,238,0.14),transparent)] blur-xl" />

          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            style={{ scale }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
              {safeItems.map((item, idx) => (
                <StatCard key={idx} item={item} />
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
