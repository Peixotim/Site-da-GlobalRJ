"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100dvh-0px)] overflow-hidden bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(124,58,237,0.22),transparent)]">
      {/* véu escuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* brilho inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cyan-500/20 via-fuchsia-500/20 to-transparent blur-2xl" />

      {/* partículas discretas */}
      <Stars />

      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center sm:py-28">
        {/* selo */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10 backdrop-blur"
        >
          <span className="block h-2 w-2 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400" />
          RJGLOBAL
        </motion.span>

        {/* número 404 com efeito vidro/gradiente */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="relative mt-6 flex items-center justify-center"
        >
          <div className="relative rounded-[32px] p-[2px]">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-r from-cyan-400/60 via-fuchsia-500/60 to-cyan-400/60 blur-md" />
            <div className="rounded-[32px] bg-white/10 p-10 ring-1 ring-white/10 backdrop-blur-xl">
              <h1 className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-7xl font-extrabold leading-none text-transparent sm:text-8xl">
                404
              </h1>
            </div>
          </div>
        </motion.div>

        {/* título + texto */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="mt-8 text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Página não encontrada
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="mt-3 max-w-2xl text-base text-white/70"
        >
          O link pode ter sido movido, renomeado ou nunca existiu. Você pode
          voltar para a página inicial ou explorar nossas empresas e soluções.
        </motion.p>

        {/* busca fake */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.35 }}
          className="mt-8 w-full max-w-xl"
        >
          <div className="group relative rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur transition-[background] hover:bg-white/7.5">
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(280px 150px at 20% 50%, rgba(34,211,238,.20), rgba(168,85,247,.15) 55%, transparent 70%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <Search className="h-5 w-5 text-white/60" />
              <input
                disabled
                aria-label="Pesquisar (desabilitado)"
                placeholder="Pesquisar no site…"
                className="w-full bg-transparent text-sm text-white/80 placeholder-white/40 outline-none disabled:cursor-not-allowed"
              />
              <span className="text-[10px] font-semibold text-white/50">
                Em breve
              </span>
            </div>
          </div>
        </motion.div>

        {/* ações */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.35 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-fuchsia-500/20 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/30 hover:to-fuchsia-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            <Home className="h-4 w-4" />
            Voltar ao início
          </Link>
          <Link
            href="/empresas"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            Nossas Empresas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

/* ———— partículas: leves e elegantes ———— */
function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.10] [mask-image:radial-gradient(closest-side,white,transparent)]">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white"
          style={{
            left: `${(i * 127) % 100}%`,
            top: `${(i * 79) % 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 2.4 + (i % 5) * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}
