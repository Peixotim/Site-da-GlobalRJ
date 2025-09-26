"use client";

import Image from "next/image";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const TIPS = [
  "Otimizando imagens e fontes…",
  "Sincronizando dados de desempenho…",
  "Preparando experiência personalizada…",
  "Verificando conformidade e segurança…",
  "Carregando componentes inteligentes…",
] as const;

export default function GlobalLoading() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main
        role="status"
        aria-live="polite"
        className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-zinc-950 text-white"
      >
        {/* Aurora / Glow — leve e só com opacidade/transform */}
        <BackdropAurora />

        {/* Conteúdo central */}
        <section className="relative z-10 mx-auto w-full max-w-4xl px-6">
          <HeaderBrand />

          <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_1fr]">
            {/* Lado esquerdo: barra + dicas + microcards */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10">
              <ProgressFancy />
              <TipsRotating />
              <MiniStats />
            </div>

            {/* Lado direito: skeletons no estilo do site */}
            <SkeletonShowcase />
          </div>

          <FooterNote />
        </section>

        {/* estilos locais para animações CSS puras */}
        <style jsx global>{`
          @keyframes sweep {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(200%);
            }
          }
          @keyframes floaty {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          @keyframes auroraRotate {
            0% {
              transform: translate(-50%, -10%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -10%) rotate(360deg);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-sweep,
            .anim-floaty,
            .anim-aurora {
              animation: none !important;
            }
          }
        `}</style>
      </main>
    </LazyMotion>
  );
}

/* =================== Subcomponentes =================== */

function BackdropAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_90%_-10%,rgba(56,189,248,0.14),transparent)]" />
      <div
        className="anim-aurora absolute left-1/2 top-0 h-[150vh] w-[160vw] -translate-x-1/2 -translate-y-[10%] rounded-[50%] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40"
        style={{ animation: "auroraRotate 40s linear infinite" }}
      />
    </div>
  );
}

function HeaderBrand() {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl ring-1 ring-white/15">
          <Image
            src="/rjglobalHorizontal.webp"
            alt="RJGLOBAL"
            fill
            sizes="48px"
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">
            Iniciando experiência
          </h1>
          <p className="text-xs text-white/70">
            Isso deve levar apenas alguns instantes.
          </p>
        </div>
      </div>

      {!reduce && (
        <m.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15 sm:inline-flex"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          Otimizando para seu dispositivo
        </m.span>
      )}
    </div>
  );
}

function ProgressFancy() {
  return (
    <div aria-label="Barra de progresso" className="mt-1">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2 ring-1 ring-white/10">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
          {/* trilha */}
          <div className="absolute inset-0 opacity-40 [background:linear-gradient(90deg,rgba(255,255,255,.12)_0,transparent_18%,rgba(255,255,255,.12)_36%,transparent_54%,rgba(255,255,255,.12)_72%,transparent_90%)] bg-[length:280px_100%] animate-[pulse_2.6s_ease-in-out_infinite]" />
          {/* barra “infinita” */}
          <div
            className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 anim-sweep"
            style={{ animation: "sweep 1.8s ease-in-out infinite" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-white/70">
          <span>Carregando recursos</span>
          <span aria-hidden>•</span>
          <span>Preparando interface</span>
        </div>
      </div>
    </div>
  );
}

function TipsRotating() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TIPS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4 min-h-[28px]" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={i}
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/85 ring-1 ring-white/15"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {TIPS[i]}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function MiniStats() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      {[
        { k: "94%", l: "Empreg." },
        { k: "60+", l: "Cursos" },
        { k: "250k", l: "Alunos" },
      ].map((n) => (
        <div
          key={n.l}
          className="anim-floaty rounded-xl border border-white/10 bg-white/5 p-3 text-center ring-1 ring-white/10"
          style={{ animation: "floaty 3.2s ease-in-out infinite" }}
        >
          <div className="text-base font-extrabold">{n.k}</div>
          <div className="text-[10px] text-white/70">{n.l}</div>
        </div>
      ))}
    </div>
  );
}

function SkeletonShowcase() {
  return (
    <div className="grid gap-4">
      {/* hero skeleton */}
      <div className="overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/10">
        <div className="relative h-40 w-full bg-white/[0.06]">
          <div
            className="anim-sweep absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,.06)_0%,rgba(255,255,255,.14)_40%,rgba(255,255,255,.06)_60%)] bg-[length:200%_100%]"
            style={{ animation: "sweep 1.8s ease-in-out infinite" }}
          />
        </div>
        <div className="grid grid-cols-[auto,1fr] items-center gap-3 p-4">
          <div className="h-8 w-20 rounded bg-white/10" />
          <div className="h-4 w-2/3 rounded bg-white/10" />
        </div>
      </div>

      {/* cards skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/10"
          >
            <div className="h-20 bg-white/[0.06]" />
            <div className="p-3">
              <div className="mb-2 h-3 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterNote() {
  return (
    <div className="mx-auto mt-6 w-full max-w-4xl text-center">
      <p className="text-xs text-white/60">
        Dica: você pode navegar enquanto carregamos partes secundárias em
        segundo plano.
      </p>
    </div>
  );
}
