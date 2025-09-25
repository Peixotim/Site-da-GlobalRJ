"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

/* ---------- Tipos ---------- */
type StatCount = {
  icon: ReactNode;
  label: string;
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
};

type StatTitle = {
  icon: ReactNode;
  label: string;
  title: string;
  from?: never;
  to?: never;
  prefix?: never;
  suffix?: never;
};

type StatItem = Readonly<StatCount | StatTitle>;

type Props = {
  items?: Readonly<StatItem[]>;
  className?: string;
  /** escala geral (1 = padrão, 1.1 = 10% maior) */
  scale?: number;
};

/* ---------- Type Guard ---------- */
function isStatCount(item: StatItem): item is StatCount {
  return typeof (item as Partial<StatCount>).to === "number";
}

/* ---------- Contador ---------- */
function CountUp({
  from,
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInView(hostRef, { once: true, amount: 0.6 });

  const base = useMotionValue(from);
  const smooth = useSpring(base, { stiffness: 120, damping: 20, mass: 0.45 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const delta = to - from;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      base.set(from + delta * p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, base, from, to, duration]);

  useEffect(() => {
    const unsub = smooth.on("change", (v) => {
      if (!spanRef.current) return;
      const isBig = Math.abs(to) >= 1000;
      const text = isBig
        ? Math.round(v).toLocaleString("pt-BR")
        : Math.floor(v).toString();
      spanRef.current.textContent = `${prefix}${text}${suffix}`;
    });
    return () => unsub();
  }, [smooth, prefix, suffix, to]);

  return (
    <div ref={hostRef}>
      <span ref={spanRef} />
    </div>
  );
}

/* ---------- Defaults (exemplo) ---------- */
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

/* ---------- Componente ---------- */
export default function StatsBarPremium({
  items = DEFAULT_ITEMS,
  className = "",
  scale = 1,
}: Props) {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* Glow de fundo */}
        <div className="pointer-events-none absolute -inset-x-16 -top-6 h-24 rounded-[44px] bg-[radial-gradient(65%_120%_at_50%_0%,rgba(124,58,237,0.24),rgba(34,211,238,0.18),transparent)] blur-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ scale }}
        >
          {/* GRID em cartões “glass” */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="
                  relative overflow-hidden rounded-2xl
                  bg-white/[0.06] ring-1 ring-white/10 backdrop-blur
                  shadow-[0_18px_60px_rgba(0,0,0,0.40)]
                  px-4 sm:px-5 py-5
                  flex flex-col items-center text-center
                "
              >
                {/* Borda animada sutil */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,.40), rgba(168,85,247,.45), rgba(34,211,238,.40))",
                    filter: "blur(8px)",
                    opacity: 0.55,
                  }}
                />
                {/* brilho radial interno */}
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
                  {/* Ícone com micro-pulse */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/30 ring-1 ring-white/10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.4,
                        ease: "easeInOut",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>

                  {/* Número grande / título */}
                  <div
                    className="
                      text-[34px] sm:text-[40px] lg:text-[44px]
                      font-extrabold leading-none tracking-tight
                      bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300
                      bg-clip-text text-transparent
                    "
                  >
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

                  {/* Label */}
                  <p className="mt-2 max-w-[22ch] text-[13px] sm:text-sm font-semibold text-white/75">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
