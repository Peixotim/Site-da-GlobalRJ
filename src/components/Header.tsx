"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

const NAV: Readonly<NavItem[]> = [
  { label: "Início", href: "/" },
  { label: "Empresas", href: "/empresas" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Contato", href: "/#contato" },
];

export default function HeaderBasic() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false); // Estado para controlar o menu mobile

  // Determina qual item de navegação está ativo com base na rota atual
  const activeHref = useMemo(() => {
    const base = pathname.replace(/#.*$/, "");
    const match = NAV.find((n) =>
      n.href === "/"
        ? base === "/"
        : base.startsWith(n.href.replace(/#.*$/, ""))
    );
    return match?.href ?? "/";
  }, [pathname]);

  return (
    // O header agora é um elemento estático, sem efeitos de scroll.
    // O background `bg-zinc-950/90 backdrop-blur-sm` oferece um visual "glassy" discreto.
    <header className="relative z-50 py-4 " aria-label="Barra de navegação">
      {/* Container principal para o conteúdo do header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo RJGLOBAL */}
        <Link href="/" className="relative h-14 md:h-16 aspect-square shrink-0">
          <Image
            src="/globalrj.webp"
            alt="RJGLOBAL"
            fill
            sizes="(max-width:768px) 56px, (max-width:1024px) 64px, 64px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Navegação principal para desktop */}
        {/* Usamos 'hidden md:flex flex-grow justify-center' para centralizar a navegação no desktop */}
        <div className="hidden md:flex flex-grow justify-center">
          <nav
            aria-label="Navegação principal"
            className="relative z-10 flex items-center gap-2 rounded-full bg-zinc-900/70 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm"
          >
            {NAV.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative z-10 rounded-full px-4 py-2 text-sm font-bold outline-none transition-colors duration-200 ",
                    // Estilo para o item ativo e o efeito de hover simples
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                    "focus-visible:ring-2 focus-visible:ring-cyan-400/60 font-bold",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Botão CTA (Call to Action) para desktop e botão de menu mobile */}
        <div className="flex items-center gap-2">
          <Link
            href="/contato"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-fuchsia-500/20 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/30 hover:to-fuchsia-500/30 md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          >
            Fale com a RJGLOBAL
            <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Componente do menu mobile, mantido como estava para funcionalidade e estilo */}
      <MobileSheet
        open={open}
        onClose={() => setOpen(false)}
        activeHref={activeHref}
      />
    </header>
  );
}

// O componente MobileSheet permanece inalterado, pois já é funcional e estilizado para o contexto.
function MobileSheet({
  open,
  onClose,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  activeHref: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute inset-0 bg-black/60"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto border-l border-white/10 bg-zinc-950/85 backdrop-blur-xl p-4 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <div className="relative h-9 w-9">
                  <Image
                    src="/globalrj.webp"
                    alt="RJGLOBAL"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-base font-extrabold text-transparent">
                  RJGLOBAL
                </span>
              </Link>
              <button
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="mt-1 space-y-1">
              {NAV.map((item) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={[
                        "block rounded-xl px-3 py-3 text-sm font-medium",
                        active
                          ? "bg-white/10 text-white ring-1 ring-white/10"
                          : "text-white/90 hover:bg-white/5",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 border-t border-white/10 pt-4">
              <Link
                href="/contato"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-fuchsia-500/20 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/30 hover:to-fuchsia-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                Fale com a RJGLOBAL
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
