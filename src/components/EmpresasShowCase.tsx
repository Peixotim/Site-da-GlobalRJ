"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { memo } from "react";

/* Tipos */
type Logo = Readonly<{ src: string; alt: string }>;

type RibbonProps = {
  title: string;
  logos: readonly Logo[];
  speed?: number;
  cardHeightClass?: string;
  gapClass?: string;
};

type ShowcaseProps = {
  logosPos?: readonly Logo[];
  logosTec?: readonly Logo[];
  className?: string;
};

/* Defaults (pode trocar via props) */
const LOGOS_POS_DEFAULT = [
  { src: "/logosPos/logoEducaMais.webp", alt: "Empresa POS 1" },
  { src: "/logosPos/logoNacional.webp", alt: "Empresa POS 2" },
  { src: "/logosPos/logoEducaMais.webp", alt: "Empresa POS 3" },
  { src: "/globalrj.webp", alt: "Empresa POS 4" },
] as const;

const LOGOS_TEC_DEFAULT = [
  { src: "/logosTecnico/logoEduTec.webp", alt: "Empresa TEC 1" },
  { src: "/globalrj.webp", alt: "Empresa TEC 2" },
  { src: "/globalrj.webp", alt: "Empresa TEC 3" },
  { src: "/globalrj.webp", alt: "Empresa TEC 4" },
] as const;

export default function EmpresasShowcase({
  logosPos = LOGOS_POS_DEFAULT,
  logosTec = LOGOS_TEC_DEFAULT,
  className = "",
}: ShowcaseProps) {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      {" "}
      {/* Ajustado padding horizontal */}
      <RibbonSection
        title="Empresas de Pós-Graduação"
        logos={logosPos}
        speed={42}
        cardHeightClass="h-32 md:h-36 lg:h-40" // Altura dos cards aumentada
        gapClass="gap-10 lg:gap-14 xl:gap-16" // Espaçamento entre cards aumentado
      />
      <div className="my-20 sm:my-28 lg:my-32" />{" "}
      {/* Espaço vertical entre as ribbons aumentado */}
      <RibbonSection
        title="Empresas de Cursos Técnicos"
        logos={logosTec}
        speed={42}
        cardHeightClass="h-32 md:h-36 lg:h-40" // Altura dos cards aumentada
        gapClass="gap-10 lg:gap-14 xl:gap-16" // Espaçamento entre cards aumentado
      />
    </section>
  );
}

/* Ribbon / Carrossel */
function RibbonSection({
  title,
  logos,
  speed = 60,
  cardHeightClass = "h-32 md:h-36 lg:h-40", // Default atualizado
  gapClass = "gap-10 lg:gap-14 xl:gap-16", // Default atualizado
}: RibbonProps) {
  const shouldReduce = useReducedMotion();
  const ribbon = [...logos, ...logos];
  const seconds = Math.max(8, (ribbon.length * 240) / Math.max(1, speed));
  const loopTransition: Transition = {
    ease: "linear",
    duration: seconds,
    repeat: Infinity,
  };

  return (
    <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-[32px] border border-white/10 bg-black/40">
      {" "}
      {/* Max-width aumentado e bg-black/40 para mais profundidade */}
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_78%_-10%,rgba(124,58,237,0.28),transparent)]" />{" "}
        {/* Intensidade do gradiente radial levemente ajustada */}
        <div className="absolute inset-0 bg-black/50" />{" "}
        {/* Camada de black/50 para maior contraste */}
      </div>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 sm:px-8 sm:py-7">
        {" "}
        {/* Padding do header ajustado */}
        <div className="flex items-center gap-4">
          {" "}
          {/* Gap aumentado */}
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
            {" "}
            {/* Tamanho do ícone ajustado */}
            <span className="block h-4 w-4 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400" />{" "}
            {/* Tamanho do bullet ajustado */}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {" "}
            {/* Título maior */}
            {title}
          </h3>
        </div>
        <div className="hidden sm:block text-sm font-medium text-white/70">
          {" "}
          {/* Texto do slogan maior e mais visível */}
          Parceria & confiança
        </div>
      </div>
      {/* Glow line */}
      <div className="relative h-[3px] overflow-hidden bg-gradient-to-r from-fuchsia-400/40 via-cyan-400/40 to-fuchsia-400/40">
        {" "}
        {/* Altura e opacidade da glow line ajustadas */}
        <motion.span
          initial={{ x: "-40%" }}
          animate={{ x: "140%" }}
          transition={{ repeat: Infinity, duration: 3.8, ease: "linear" }}
          className="absolute inset-y-0 w-1/4 bg-white/30" // Opacidade da glow line interna ajustada
        />
      </div>
      {/* Track */}
      <div className="group relative">
        <motion.div
          className={`flex ${gapClass} py-8 sm:py-10 lg:py-12`} // Padding vertical do track aumentado
          style={{
            width: "max-content",
            willChange: shouldReduce ? "auto" : "transform",
          }}
          animate={shouldReduce ? undefined : { x: ["0%", "-50%"] }}
          transition={shouldReduce ? undefined : loopTransition}
        >
          {ribbon.map((logo, idx) => (
            <LogoCard
              key={`${logo.src}-${idx}`}
              src={logo.src}
              alt={logo.alt}
              heightClass={cardHeightClass}
            />
          ))}
        </motion.div>
        {/* Fades nas bordas do carrossel para uma transição suave */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent" />{" "}
        {/* Largura do fade aumentada e opacidade mais forte */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent" />{" "}
        {/* Largura do fade aumentada e opacidade mais forte */}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

const LogoCard = memo(function LogoCard({
  src,
  alt,
  heightClass,
}: {
  src: string;
  alt: string;
  heightClass: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      }} // Efeito de hover mais pronunciado
      transition={{ type: "spring", stiffness: 260, damping: 22 }} // Transição padrão
      className={`
        group/card relative flex items-center justify-center
        ${heightClass} w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] // Largura dos cards aumentada e responsiva
        rounded-3xl bg-white/8 border border-white/15 // Fundo mais opaco e borda mais definida
        backdrop-blur-sm
        shadow-[0_16px_60px_rgba(0,0,0,.45)] // Sombra mais proeminente
        transform-gpu
      `}
    >
      <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[32px] opacity-0 blur-2xl transition-opacity duration-300 group-hover/card:opacity-100 bg-gradient-to-r from-fuchsia-500/25 via-cyan-400/25 to-fuchsia-500/25" />{" "}
      {/* Glow no hover mais forte */}
      <div className="relative h-[75%] w-[80%]">
        {" "}
        {/* Aumentado o espaço para o logo dentro do card */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="360px" // Ajustado sizes para corresponder à nova largura máxima
          className="object-contain"
          priority={false}
        />
      </div>
    </motion.div>
  );
});
