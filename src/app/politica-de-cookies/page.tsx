"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { Check, Info, Shield, SlidersHorizontal, X } from "lucide-react";

/* =========================
   Utils: cookies (simples)
========================= */
type Prefs = {
  essential: true; // sempre true
  performance: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "rj_cc_prefs";
const BANNER_KEY = "rj_cc"; // compatibilidade com seu banner (accepted/rejected)

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}
function setCookie(name: string, value: string, days = 365) {
  const maxAge = days * 24 * 60 * 60;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax;${secure ? " Secure;" : ""}`;
}
function parsePrefs(s: string | null): Prefs | null {
  if (!s) return null;
  try {
    const obj = JSON.parse(s);
    if (typeof obj === "object" && obj) {
      return {
        essential: true,
        performance: !!obj.performance,
        marketing: !!obj.marketing,
      };
    }
  } catch {}
  return null;
}
function defaultPrefs(): Prefs {
  return { essential: true, performance: false, marketing: false };
}

/* helper para garantir o tipo literal de essential:true */
const mkPrefs = (performance: boolean, marketing: boolean): Prefs => ({
  essential: true,
  performance,
  marketing,
});

/* =========================
   Page
========================= */
export default function PoliticaDeCookies() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs());
  const [saved, setSaved] = useState<null | "ok" | "reset">(null);

  // carrega prefs do cookie (ou migra do banner simples)
  useEffect(() => {
    const existing = parsePrefs(getCookie(COOKIE_KEY));
    if (existing) {
      setPrefs(existing);
      return;
    }
    // migração: se rj_cc = accepted => ativa tudo; rejected => só essencial
    const legacy = getCookie(BANNER_KEY);
    if (legacy === "accepted") setPrefs(mkPrefs(true, true));
    else setPrefs(defaultPrefs());
  }, []);

  const allOn = useMemo(() => prefs.performance && prefs.marketing, [prefs]);

  function save(newPrefs: Prefs) {
    setCookie(COOKIE_KEY, JSON.stringify(newPrefs));
    // mantém compatibilidade com o banner:
    setCookie(
      BANNER_KEY,
      newPrefs.performance || newPrefs.marketing ? "accepted" : "rejected"
    );
    setSaved("ok");
    setTimeout(() => setSaved(null), 2500);
  }

  function acceptAll() {
    const v = mkPrefs(true, true);
    setPrefs(v);
    save(v);
  }
  function rejectAll() {
    const v = mkPrefs(false, false);
    setPrefs(v);
    save(v);
  }
  function saveCurrent() {
    save(prefs);
  }
  function resetDefaults() {
    const v = defaultPrefs();
    setPrefs(v);
    save(v);
    setSaved("reset");
    setTimeout(() => setSaved(null), 2500);
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* fundo suave no tema */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(124,58,237,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[140vw] -translate-x-1/2 -rotate-[8deg] bg-[conic-gradient(from_220deg_at_50%_50%,rgba(34,211,238,0.10),rgba(168,85,247,0.12),rgba(34,211,238,0.10))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-8 w-full max-w-5xl">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
          >
            <div className="flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-12">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                <Shield className="h-3.5 w-3.5 text-teal-300" />
                Política de Cookies
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Transparência no uso de cookies
              </h1>
              <p className="max-w-3xl text-white/80">
                Utilizamos cookies essenciais para o funcionamento do site e,
                com o seu consentimento, cookies de desempenho e marketing para
                melhorar sua experiência. Aqui você pode entender como funcionam
                e gerenciar suas preferências a qualquer momento.
              </p>
              <p className="text-xs text-white/50">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </m.div>
        </section>

        {/* PAINEL DE PREFERÊNCIAS */}
        <section className="mx-auto mt-8 w-full max-w-5xl">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
          >
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.3fr_1fr]">
              {/* switches */}
              <div>
                <h2 className="text-xl font-bold text-white">
                  Gerenciar preferências
                </h2>
                <p className="mt-1 text-sm text-white/75">
                  Sua escolha será salva por 12 meses. Você pode alterar a
                  qualquer momento nesta página.
                </p>

                <div className="mt-5 space-y-3">
                  <PrefToggle
                    title="Essenciais"
                    desc="Necessários para o funcionamento do site (segurança, sessão, preferências básicas)."
                    checked
                    disabled
                  />
                  <PrefToggle
                    title="Desempenho"
                    desc="Nos ajudam a entender como o site é utilizado (métricas anônimas)."
                    checked={prefs.performance}
                    onChange={(v) =>
                      setPrefs((p) => ({ ...p, performance: v }))
                    }
                  />
                  <PrefToggle
                    title="Marketing"
                    desc="Permitem conteúdo e ofertas mais relevantes com base em sua interação."
                    checked={prefs.marketing}
                    onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <button
                    onClick={saveCurrent}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:from-cyan-500/35 hover:to-fuchsia-500/35"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Salvar preferências
                  </button>
                  <button
                    onClick={acceptAll}
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                  >
                    Aceitar todos
                  </button>
                  <button
                    onClick={rejectAll}
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                  >
                    Rejeitar todos
                  </button>
                  {!allOn && (
                    <button
                      onClick={resetDefaults}
                      className="ml-auto rounded-xl bg-black/30 px-3 py-2 text-xs font-semibold text-white/70 ring-1 ring-white/10 hover:bg-black/40"
                    >
                      Restaurar padrão
                    </button>
                  )}
                </div>

                {/* feedback salvo */}
                {saved && (
                  <m.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/25"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {saved === "ok"
                      ? "Preferências salvas."
                      : "Preferências restauradas."}
                  </m.div>
                )}
              </div>

              {/* resumo visual */}
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4 ring-1 ring-white/10">
                <h3 className="text-sm font-bold text-white">
                  Seu estado atual
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <StateLine label="Essenciais" on />
                  <StateLine label="Desempenho" on={prefs.performance} />
                  <StateLine label="Marketing" on={prefs.marketing} />
                </ul>
                <p className="mt-4 text-xs text-white/60">
                  Dica: aceitar todos pode melhorar recomendações e performance
                  do site.
                </p>
              </div>
            </div>
          </m.div>
        </section>

        {/* CONTEÚDO EDUCATIVO */}
        <section className="mx-auto mt-8 w-full max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              title="O que são cookies?"
              desc="Pequenos arquivos de texto armazenados no seu navegador que ajudam o site a lembrar de informações entre visitas."
            />
            <InfoCard
              title="Por que usamos?"
              desc="Para garantir segurança, lembrar suas preferências e melhorar a experiência por meio de métricas agregadas."
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10">
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">
              <CatCard
                title="Essenciais"
                bullets={[
                  "Autenticação de sessão",
                  "Preferência de idioma/tema",
                  "Segurança (fraude/abuso)",
                ]}
              />
              <CatCard
                title="Desempenho"
                bullets={[
                  "Páginas mais visitadas",
                  "Eventos e cliques (anônimo)",
                  "Erros e latência",
                ]}
              />
              <CatCard
                title="Marketing"
                bullets={[
                  "Medição de campanhas",
                  "Personalização de conteúdo",
                  "Limite de frequência de anúncios",
                ]}
              />
            </div>
          </div>

          {/* exemplos (opcional) */}
          <ExamplesTable />
        </section>

        {/* rodapé simples */}
        <section className="mx-auto my-10 w-full max-w-5xl text-sm text-white/70">
          <p>
            Você pode entrar em contato com{" "}
            <Link
              href="/contato"
              className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
            >
              nosso suporte
            </Link>{" "}
            para dúvidas adicionais sobre privacidade e cookies.
          </p>
        </section>
      </main>
    </LazyMotion>
  );
}

/* =========================
   Subcomponentes
========================= */
function PrefToggle({
  title,
  desc,
  checked = false,
  disabled = false,
  onChange,
}: {
  title: string;
  desc: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10">
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <p className="text-xs text-white/70">{desc}</p>
      </div>
      <button
        type="button"
        aria-pressed={checked}
        aria-label={checked ? "Ativado" : "Desativado"}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          "relative inline-flex h-7 w-12 items-center rounded-full transition",
          disabled ? "opacity-60" : "hover:brightness-110",
          checked
            ? "bg-emerald-500/70 ring-1 ring-emerald-300/40"
            : "bg-white/15 ring-1 ring-white/15",
        ].join(" ")}
      >
        <span
          className={[
            "absolute left-1 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function StateLine({ label, on }: { label: string; on?: boolean }) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 ring-1 ring-white/10">
      <span className="text-white/85">{label}</span>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
          on
            ? "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20"
            : "bg-white/10 text-white/70 ring-1 ring-white/15"
        }`}
      >
        {on ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
        {on ? "Ativo" : "Inativo"}
      </span>
    </li>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 ring-1 ring-white/10"
    >
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-white/80">{desc}</p>
    </m.div>
  );
}

function CatCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 ring-1 ring-white/10">
      <div className="text-sm font-bold text-white">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/75">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 text-cyan-300" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExamplesTable() {
  // exemplo estático; substitua pelos cookies reais quando quiser
  const rows = [
    {
      name: "rj_cc_prefs",
      type: "Essencial",
      duration: "12 meses",
      purpose: "Guardar preferências de cookies",
    },
    {
      name: "_ga",
      type: "Desempenho",
      duration: "2 anos",
      purpose: "Métricas agregadas de uso (Google Analytics)",
    },
    {
      name: "_fbp",
      type: "Marketing",
      duration: "3 meses",
      purpose: "Medição de campanhas e anúncios",
    },
  ];
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10">
      <div className="px-6 py-4 text-sm font-bold text-white">
        Exemplos de cookies
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-white/70">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Duração</th>
              <th className="px-6 py-3">Finalidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/85">
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="px-6 py-3 font-mono">{r.name}</td>
                <td className="px-6 py-3">{r.type}</td>
                <td className="px-6 py-3">{r.duration}</td>
                <td className="px-6 py-3">{r.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 text-xs text-white/60">
        Observação: os exemplos acima podem variar conforme integrações
        habilitadas.
      </div>
    </div>
  );
}
