// app/anticorrupcao/page.tsx
"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ShieldCheck,
  Scale,
  HandCoins,
  Gift,
  Landmark,
  UserX,
  Users2,
  FileSpreadsheet,
  CircleHelp,
  Megaphone,
  TriangleAlert,
  ClipboardCheck,
  BookOpenCheck,
  ArrowRight,
  Check,
} from "lucide-react";

/* =========================
   Helpers
========================= */
const ease = [0.22, 1, 0.36, 1] as const;

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
    {children}
  </span>
);

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <m.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.45, ease }}
    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10"
  >
    <div className="mb-2 flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
        {icon}
      </span>
      <h3 className="text-base font-bold text-white">{title}</h3>
    </div>
    <div className="space-y-2 text-sm text-white/80">{children}</div>
  </m.div>
);

/* =========================
   Página
========================= */
export default function PoliticaAnticorrupcaoPage() {
  const lastUpdate = new Date().toLocaleDateString("pt-BR");

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* Aurora sutil */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_90%_-10%,rgba(56,189,248,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 -rotate-[6deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 ring-1 ring-white/10 sm:p-12"
          >
            <Pill>
              <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
              Política Anticorrupção
            </Pill>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Integridade sem atalhos
            </h1>
            <p className="mt-2 max-w-3xl text-white/80">
              Reafirmamos nosso compromisso com a legislação anticorrupção e com
              padrões éticos elevados. Esta política se aplica a todos os
              colaboradores, executivos, parceiros, fornecedores e terceiros que
              atuem em nome do grupo.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="rounded-full bg-white/10 px-2 py-0.5 ring-1 ring-white/15">
                Última atualização: {lastUpdate}
              </span>
              <Link
                href="/diretrizes"
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-white/80 ring-1 ring-white/15 hover:bg-white/15"
              >
                Diretrizes do Grupo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </m.div>
        </section>

        {/* PRINCÍPIOS & ESCOPO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Card
              title="Princípios"
              icon={<BookOpenCheck className="h-5 w-5 text-cyan-300" />}
            >
              <p>
                Tolerância zero a corrupção, suborno, fraude e lavagem de
                dinheiro. Atuação sempre alinhada a leis como a Lei
                Anticorrupção (Lei 12.846/2013), Decreto 8.420/2015 e demais
                normas aplicáveis.
              </p>
              <ul className="space-y-1 text-white/75">
                {[
                  "Legalidade e conformidade",
                  "Transparência e registro fidedigno",
                  "Imparcialidade em decisões e contratos",
                  "Responsabilização e melhoria contínua",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-300" /> {t}
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              title="Escopo"
              icon={<Scale className="h-5 w-5 text-emerald-300" />}
            >
              <p>
                Abrange todas as unidades do grupo, controladas ou coligadas, e
                terceiros que ajam em nosso nome, no Brasil e exterior.
              </p>
              <p>
                Aplica-se a interações com agentes públicos e privados,
                incluindo licitações, contratos, patrocínios, doações e
                parcerias.
              </p>
            </Card>
          </div>
        </section>

        {/* CONDUTAS PROIBIDAS */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Suborno e vantagem indevida"
              icon={<HandCoins className="h-5 w-5 text-fuchsia-300" />}
            >
              <p>
                É proibido oferecer, prometer, autorizar, solicitar ou receber
                qualquer vantagem indevida, direta ou indiretamente, para obter
                benefício impróprio.
              </p>
            </Card>
            <Card
              title="Presentes & hospitalidades"
              icon={<Gift className="h-5 w-5 text-cyan-300" />}
            >
              <p>
                Permitidos apenas quando modestos, ocasionais, transparentes e
                sem intenção de influenciar decisões. Presentes em dinheiro são
                proibidos.
              </p>
              <p>Consulte limites internos e registre quando exigido.</p>
            </Card>
            <Card
              title="Conflitos de interesse"
              icon={<UserX className="h-5 w-5 text-rose-300" />}
            >
              <p>
                Situações pessoais ou profissionais que possam afetar a
                imparcialidade devem ser declaradas e gerenciadas.
              </p>
            </Card>
            <Card
              title="Interação com agentes públicos"
              icon={<Landmark className="h-5 w-5 text-amber-300" />}
            >
              <p>
                Exige rigor adicional: cumpra leis, mantenha registros e submeta
                interações sensíveis à área de Compliance.
              </p>
            </Card>
            <Card
              title="Terceiros & parceiros"
              icon={<Users2 className="h-5 w-5 text-indigo-300" />}
            >
              <p>
                Devem seguir esta política. Realizamos due diligence
                proporcional ao risco e cláusulas anticorrupção em contratos.
              </p>
            </Card>
            <Card
              title="Controles financeiros"
              icon={<FileSpreadsheet className="h-5 w-5 text-teal-300" />}
            >
              <p>
                Todas as transações devem ser registradas de forma precisa, com
                documentação de suporte, aprovações e trilha de auditoria.
              </p>
            </Card>
          </div>
        </section>

        {/* CANAIS & RESPONSABILIDADES */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <Card
              title="Canal de denúncia"
              icon={<Megaphone className="h-5 w-5 text-rose-300" />}
            >
              <p>
                Denúncias podem ser feitas de forma identificada ou anônima, com
                proteção contra retaliação. Use o{" "}
                <Link
                  href="/contato"
                  className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                >
                  canal de contato
                </Link>{" "}
                ou endereço dedicado (quando disponível).
              </p>
              <p className="text-xs text-white/60">
                Ex.: denuncia@seudominio.com (substituir quando configurar)
              </p>
            </Card>

            <Card
              title="Apuração & sanções"
              icon={<TriangleAlert className="h-5 w-5 text-amber-300" />}
            >
              <p>
                Fatos reportados são analisados com confidencialidade. Violações
                podem resultar em medidas disciplinares, cíveis e criminais,
                além de rescisão contratual com terceiros.
              </p>
            </Card>
          </div>
        </section>

        {/* TREINAMENTO & GOVERNANÇA */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Treinamento & comunicação"
              icon={<ClipboardCheck className="h-5 w-5 text-cyan-300" />}
            >
              <p>
                Programas periódicos, trilhas por função/risco e campanhas de
                conscientização mantêm a cultura de integridade ativa.
              </p>
            </Card>
            <Card
              title="Monitoramento contínuo"
              icon={<ShieldCheck className="h-5 w-5 text-emerald-300" />}
            >
              <p>
                Auditorias, KPIs de compliance e revisões anuais desta política
                garantem melhoria contínua.
              </p>
            </Card>
            <Card
              title="Padrões relacionados"
              icon={<BookOpenCheck className="h-5 w-5 text-purple-300" />}
            >
              <ul className="space-y-1 text-white/75">
                <li>
                  <Link
                    href="/termos-de-privacidade"
                    className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politica-de-cookies"
                    className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                  >
                    Política de Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/diretrizes"
                    className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                  >
                    Diretrizes do Grupo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termos"
                    className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                  >
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="mx-auto my-10 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8"
          >
            <div className="grid items-center gap-6 md:grid-cols-[1.6fr_1fr]">
              <div>
                <Pill>
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
                  Compromisso permanente
                </Pill>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Integridade é a base do nosso crescimento
                </h2>
                <p className="mt-2 max-w-[60ch] text-white/80">
                  Dúvidas sobre a aplicação desta política no seu caso? Nosso
                  time pode orientar você com rapidez.
                </p>
                <div className="mt-4">
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
                  >
                    Fale Conosco <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80 ring-1 ring-white/10">
                <p>
                  Esta política é vinculante e integra nossos contratos quando
                  aplicável. Em caso de conflito entre versões, prevalece a
                  versão mais recente publicada neste site.
                </p>
              </div>
            </div>
          </m.div>
        </section>
      </main>
    </LazyMotion>
  );
}
