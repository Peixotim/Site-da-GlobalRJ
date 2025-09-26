"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

export default function FooterPremium() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative mt-24 overflow-x-clip">
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 h-48 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,58,237,0.25),rgba(34,211,238,0.18),transparent)] blur-2xl" />

      {/* FULL-BLEED REAL (sem depender de dvw): ocupa 100vw e ignora containers/padding do pai */}
      <div
        className="
          relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-[100vw]
          overflow-hidden border border-white/10 bg-black/40
          rounded-none
        "
      >
        {/* conteúdo */}
        <div
          className="
            grid grid-cols-1 gap-y-10
            px-[max(16px,env(safe-area-inset-left))]
            pr-[max(16px,env(safe-area-inset-right))]
            py-10
            sm:px-10 sm:py-12
            lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]
            max-w-[1500px] mx-auto
          "
        >
          {/* Marca */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
                <GraduationCap className="h-5 w-5 text-teal-300" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                RJGLOBAL
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Educação & Tecnologia em alto nível. Plataformas robustas, seguras
              e pensadas para a jornada completa do aluno.
            </p>

            {/* redes */}
            <div className="mt-6 flex items-center gap-3">
              <Social href="#" label="LinkedIn">
                <Linkedin className="h-4.5 w-4.5" />
              </Social>
              <Social href="#" label="Instagram">
                <Instagram className="h-4.5 w-4.5" />
              </Social>
              <Social href="#" label="YouTube">
                <Youtube className="h-4.5 w-4.5" />
              </Social>
              <Social href="#" label="Facebook">
                <Facebook className="h-4.5 w-4.5" />
              </Social>
            </div>
          </div>

          {/* Nav 1 */}
          <NavColumn
            title="Produtos"
            links={[
              { label: "Plataforma EAD", href: "#" },
              { label: "Ambiente do Aluno", href: "#" },
              { label: "Gestão Acadêmica", href: "#" },
              { label: "Relatórios & Dados", href: "#" },
            ]}
          />

          {/* Nav 2 */}
          <NavColumn
            title="Empresas"
            links={[
              { label: "Pós-Graduação", href: "/empresas" },
              { label: "Cursos Técnicos", href: "/empresas" },
              { label: "Parceiros", href: "#" },
              { label: "Carreiras", href: "#" },
            ]}
          />

          {/* Newsletter + contatos */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white/90">
                Receba novidades
              </h4>

              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center"
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Seu e-mail
                  </label>
                  <div className="relative w-full">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      id="footer-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      placeholder="globalrj@gmail.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-9 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:border-cyan-300/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-[1.05]"
                    aria-label="Inscrever"
                  >
                    Inscrever
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              ) : (
                <p className="mt-3 text-sm text-teal-300">
                  Obrigado! Em breve enviaremos novidades.
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white/50" />
                <span>+55 (11) 99999-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/50" />
                <span>contato@rjglobal.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-white/50" />
                <span>
                  Rua Seminário Bethânia , nº 44 - Todos os Santos, Cel.
                  Fabriciano - MG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Direitos */}
        <div
          className="
            border-t border-white/10
            px-[max(16px,env(safe-area-inset-left))]
            pr-[max(16px,env(safe-area-inset-right))]
            py-5 sm:px-10
          "
        >
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/60 sm:flex-row">
            <span>
              © {new Date().getFullYear()} RJGLOBAL. Todos os direitos
              reservados.
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/termos"
                className="hover:text-white transition-colors"
                aria-label="Termos de uso"
              >
                Termos
              </Link>
              <span className="hidden text-white/20 sm:inline">•</span>
              <Link
                href="/politica-de-privacidade"
                className="hover:text-white transition-colors"
                aria-label="Política de privacidade"
              >
                Privacidade
              </Link>
              <span className="hidden text-white/20 sm:inline">•</span>
              <Link
                href="/acessibilidade"
                className="hover:text-white transition-colors"
                aria-label="Acessibilidade"
              >
                Acessibilidade
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </footer>
  );
}

/* Subcomponentes */
function NavColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav>
      <h4 className="text-sm font-semibold tracking-wide text-white/90">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
              aria-label={l.label}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/15 transition hover:bg-white/12"
    >
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.15 }}
        className="text-white/80 group-hover:text-white"
      >
        {children}
      </motion.span>
    </Link>
  );
}
