"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Accessibility,
  Keyboard,
  Contrast,
  MonitorSmartphone,
  Router as Landmark,
  Captions,
  Bug,
  Info,
  CheckCircle2,
} from "lucide-react";
import React from "react";

/* âncoras para navegação rápida */
const sections = [
  { id: "compromisso", label: "1. Nosso compromisso" },
  { id: "padrões", label: "2. Padrões & escopo" },
  { id: "navegacao-teclado", label: "3. Navegação por teclado" },
  { id: "contraste-tipografia", label: "4. Contraste & tipografia" },
  { id: "midia", label: "5. Mídia (alt, legendas, transcrições)" },
  { id: "landmarks-aria", label: "6. Landmarks & ARIA" },
  { id: "compatibilidade", label: "7. Compatibilidade & testes" },
  { id: "atalhos", label: "8. Atalhos do site" },
  { id: "reporte", label: "9. Reporte um problema" },
] as const;

/* ---------------- Page ---------------- */
export default function AcessibilidadePage() {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* Skip link (fica visível ao focar com TAB) */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-black/80 focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-cyan-400/60"
      >
        Pular para o conteúdo
      </a>

      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* fundo aurora leve para manter identidade visual */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_92%_-10%,rgba(56,189,248,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 rotate-[10deg] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 ring-1 ring-white/10 sm:p-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              <Accessibility className="h-3.5 w-3.5 text-teal-300" />
              Acessibilidade
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Inclusão por padrão
            </h1>
            <p className="mt-2 max-w-3xl text-white/80">
              Nosso objetivo é que todas as pessoas possam usar o site com
              autonomia. Esta página descreve como projetamos, implementamos e
              melhoramos continuamente a acessibilidade, alinhados à{" "}
              <b>WCAG 2.1 nível AA</b>.
            </p>
            <p className="mt-2 text-xs text-white/60">
              Declaração atualizada em {new Date().toLocaleDateString("pt-BR")}.
            </p>
          </m.div>
        </section>

        {/* CONTEÚDO + SUMÁRIO */}
        <section id="conteudo" className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            {/* Conteúdo */}
            <div className="space-y-8">
              <CardSection
                id="compromisso"
                icon={<Accessibility className="h-5 w-5 text-teal-300" />}
                title="1. Nosso compromisso"
              >
                <p>
                  A acessibilidade é um requisito de qualidade. Aplicamos
                  práticas de design inclusivo, testes com teclado e leitores de
                  tela, e revisões contínuas de contraste e semântica. Feedback
                  da comunidade é bem-vindo.
                </p>
              </CardSection>

              <CardSection
                id="padrões"
                icon={<Info className="h-5 w-5 text-cyan-300" />}
                title="2. Padrões & escopo"
              >
                <ul className="list-inside list-disc space-y-1 text-sm text-white/80">
                  <li>Conformidade alvo: WCAG 2.1 AA</li>
                  <li>
                    Marcação semântica HTML5 e atributos ARIA quando necessários
                  </li>
                  <li>
                    Suporte a navegadores modernos e tecnologias assistivas
                    populares
                  </li>
                </ul>
              </CardSection>

              <CardSection
                id="navegacao-teclado"
                icon={<Keyboard className="h-5 w-5 text-fuchsia-300" />}
                title="3. Navegação por teclado"
              >
                <p>
                  O site é totalmente operável via teclado. Foco visível, ordem
                  lógica de tabulação e “skip link” estão presentes.
                </p>
                <Checklist
                  items={[
                    "Foco sempre visível",
                    "Ordem de foco consistente",
                    "Menus e diálogos acessíveis",
                    "Sem armadilhas de teclado",
                  ]}
                />
              </CardSection>

              <CardSection
                id="contraste-tipografia"
                icon={<Contrast className="h-5 w-5 text-yellow-300" />}
                title="4. Contraste & tipografia"
              >
                <p>
                  Componentes e textos respeitam contraste mínimo AA (4.5:1
                  texto normal; 3:1 títulos grandes). Tamanhos são responsivos e
                  suportam zoom do navegador.
                </p>
              </CardSection>

              <CardSection
                id="midia"
                icon={<Captions className="h-5 w-5 text-emerald-300" />}
                title="5. Mídia (alt, legendas, transcrições)"
              >
                <ul className="list-inside list-disc space-y-1 text-sm text-white/80">
                  <li>Imagens com textos alternativos descritivos</li>
                  <li>Vídeos com legendas; quando aplicável, transcrição</li>
                  <li>
                    Evito conteúdo piscante ou com efeito potencialmente
                    fotossensível
                  </li>
                </ul>
              </CardSection>

              <CardSection
                id="landmarks-aria"
                icon={<Landmark className="h-5 w-5 text-indigo-300" />}
                title="6. Landmarks & ARIA"
              >
                <p>
                  Uso de <code>header</code>, <code>nav</code>,{" "}
                  <code>main</code>, <code>section</code> e <code>footer</code>{" "}
                  para estruturar a página. ARIA é aplicada somente quando
                  melhora a experiência semântica (por exemplo, rótulos, estados
                  e alertas).
                </p>
              </CardSection>

              <CardSection
                id="compatibilidade"
                icon={<MonitorSmartphone className="h-5 w-5 text-blue-300" />}
                title="7. Compatibilidade & testes"
              >
                <p className="mb-2">
                  Fazemos testes contínuos com navegação por teclado e leitores
                  de tela. Cenários principais avaliados:
                </p>
                <Checklist
                  items={[
                    "NVDA / JAWS (Windows) + Chrome/Edge",
                    "VoiceOver (macOS/iOS) + Safari",
                    "TalkBack (Android) + Chrome",
                    "Zoom 200% / 400% e alto contraste do SO",
                  ]}
                />
              </CardSection>

              <CardSection
                id="atalhos"
                icon={<Keyboard className="h-5 w-5 text-cyan-300" />}
                title="8. Atalhos do site"
              >
                <ShortcutTable
                  rows={[
                    {
                      key: "Tab / Shift + Tab",
                      desc: "Mover foco adiante/atrás",
                    },
                    { key: "Enter / Space", desc: "Ativar link/botão" },
                    { key: "Esc", desc: "Fechar modais/menus" },
                    { key: "/", desc: "Foco em busca (se disponível)" },
                  ]}
                />
              </CardSection>

              <CardSection
                id="reporte"
                icon={<Bug className="h-5 w-5 text-red-300" />}
                title="9. Reporte um problema"
              >
                <p className="mb-3">
                  Encontrou uma barreira? Conte pra gente — respondemos em até 5
                  dias úteis. Descreva o problema, a página e seu dispositivo.
                </p>
                <ReportForm />
                <p className="mt-3 text-sm text-white/70">
                  Se preferir, envie um e-mail para{" "}
                  <Link
                    href="/contato"
                    className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                  >
                    nosso canal de suporte
                  </Link>
                  .
                </p>
              </CardSection>
            </div>

            {/* Sumário lateral */}
            <aside className="lg:sticky lg:top-20 h-max space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 ring-1 ring-white/10">
                <div className="mb-2 text-sm font-semibold text-white/80">
                  Navegação rápida
                </div>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10">
                <div className="mb-2 text-sm font-semibold text-white">
                  Conformidade alvo
                </div>
                <div className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="h-4 w-4 text-teal-300" />
                  WCAG 2.1 nível AA
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* rodapé simples */}
        <section className="mx-auto my-10 w-full max-w-6xl text-sm text-white/70">
          <p>
            Trabalhamos para que todo conteúdo seja acessível. Caso alguma área
            apresente barreiras, por favor, nos avise para priorizarmos o
            ajuste.
          </p>
        </section>
      </main>
    </LazyMotion>
  );
}

/* ------------- Subcomponentes ------------- */
function CardSection({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <m.section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mb-3 flex items-center gap-2 text-white">
        {icon}
        <h2 className="text-base font-bold">{title}</h2>
      </div>
      <div className="prose prose-invert prose-sm max-w-none">{children}</div>
    </m.section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
      {items.map((i) => (
        <li
          key={i}
          className="rounded-lg bg-white/[0.06] px-3 py-2 text-sm text-white/85 ring-1 ring-white/10"
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

function ShortcutTable({ rows }: { rows: { key: string; desc: string }[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 ring-1 ring-white/10">
      <table className="min-w-full text-left text-sm">
        <thead className="text-white/70">
          <tr>
            <th className="px-4 py-3">Atalho</th>
            <th className="px-4 py-3">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-white/85">
          {rows.map((r) => (
            <tr key={r.key}>
              <td className="px-4 py-3 font-mono">{r.key}</td>
              <td className="px-4 py-3">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportForm() {
  return (
    <form
      className="grid gap-3 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Obrigado! Recebemos seu relato e retornaremos em breve.");
      }}
    >
      <label className="sm:col-span-1">
        <span className="mb-1 block text-xs font-semibold text-white/80">
          Seu e-mail
        </span>
        <input
          type="email"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/60"
          placeholder="voce@exemplo.com"
        />
      </label>
      <label className="sm:col-span-1">
        <span className="mb-1 block text-xs font-semibold text-white/80">
          Página / URL
        </span>
        <input
          type="text"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/60"
          placeholder="/minha-pagina"
        />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1 block text-xs font-semibold text-white/80">
          Descrição do problema
        </span>
        <textarea
          required
          rows={4}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/60"
          placeholder="Conte o que aconteceu, seu navegador, leitor de tela, etc."
        />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:from-cyan-500/35 hover:to-fuchsia-500/35"
        >
          Enviar relato de acessibilidade
        </button>
      </div>
    </form>
  );
}
