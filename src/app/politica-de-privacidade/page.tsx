"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Shield,
  Lock,
  Database,
  Users,
  RefreshCw,
  Info,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const sections = [
  { id: "dados", label: "1. Dados coletados" },
  { id: "uso", label: "2. Como utilizamos" },
  { id: "compartilhamento", label: "3. Compartilhamento" },
  { id: "direitos", label: "4. Seus direitos (LGPD)" },
  { id: "seguranca", label: "5. Segurança" },
  { id: "retencao", label: "6. Retenção & descarte" },
  { id: "alteracoes", label: "7. Alterações nesta política" },
  { id: "contato", label: "8. Contato" },
] as const;

export default function PoliticaPrivacidadePage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* bg aurora inovador */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_90%_-10%,rgba(56,189,248,0.15),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[160vw] -translate-x-1/2 rotate-[12deg] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
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
              <Shield className="h-3.5 w-3.5 text-teal-300" />
              Política de Privacidade
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Transparência & Confiança
            </h1>
            <p className="mt-2 max-w-3xl text-white/80">
              Nós valorizamos sua privacidade. Aqui explicamos de forma clara
              como coletamos, utilizamos e protegemos seus dados, em
              conformidade com a <b>LGPD</b> e demais legislações aplicáveis.
            </p>
            <p className="mt-2 text-xs text-white/60">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </m.div>
        </section>

        {/* CONTEÚDO PRINCIPAL */}
        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            {/* Conteúdo */}
            <div className="space-y-8">
              <CardSection
                id="dados"
                icon={<Database className="h-5 w-5 text-cyan-300" />}
                title="1. Dados coletados"
              >
                <p>Podemos coletar:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/80">
                  <li>Dados cadastrais (nome, e-mail, telefone)</li>
                  <li>Dados de navegação (IP, dispositivo, cookies)</li>
                  <li>Histórico de interações e preferências</li>
                </ul>
              </CardSection>

              <CardSection
                id="uso"
                icon={<Users className="h-5 w-5 text-fuchsia-300" />}
                title="2. Como utilizamos"
              >
                <ul className="list-inside list-disc space-y-1 text-sm text-white/80">
                  <li>Prestar e personalizar serviços</li>
                  <li>Enviar comunicações relevantes</li>
                  <li>Realizar análises de desempenho</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </CardSection>

              <CardSection
                id="compartilhamento"
                icon={<ExternalLink className="h-5 w-5 text-emerald-300" />}
                title="3. Compartilhamento"
              >
                <p>
                  Compartilhamos dados apenas com parceiros essenciais (ex.:
                  provedores de pagamento, analytics), sempre sob contratos que
                  garantam confidencialidade e segurança.
                </p>
              </CardSection>

              <CardSection
                id="direitos"
                icon={<Sparkles className="h-5 w-5 text-yellow-300" />}
                title="4. Seus direitos (LGPD)"
              >
                <p>Você pode, a qualquer momento:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/80">
                  <li>Acessar e corrigir seus dados</li>
                  <li>Solicitar exclusão ou portabilidade</li>
                  <li>Revogar consentimentos</li>
                  <li>Reclamar junto à ANPD</li>
                </ul>
              </CardSection>

              <CardSection
                id="seguranca"
                icon={<Lock className="h-5 w-5 text-red-300" />}
                title="5. Segurança"
              >
                <p>
                  Adotamos medidas técnicas e organizacionais robustas
                  (criptografia, controle de acesso, monitoramento) para
                  proteger seus dados contra acessos não autorizados, perda ou
                  destruição.
                </p>
              </CardSection>

              <CardSection
                id="retencao"
                icon={<RefreshCw className="h-5 w-5 text-blue-300" />}
                title="6. Retenção & descarte"
              >
                <p>
                  Mantemos seus dados apenas pelo tempo necessário ao
                  cumprimento das finalidades ou exigências legais. Após esse
                  período, os dados são excluídos ou anonimizados de forma
                  segura.
                </p>
              </CardSection>

              <CardSection
                id="alteracoes"
                icon={<Info className="h-5 w-5 text-indigo-300" />}
                title="7. Alterações nesta política"
              >
                <p>
                  Podemos atualizar esta Política periodicamente. Avisaremos por
                  meio de nosso site ou contato direto em caso de alterações
                  relevantes.
                </p>
              </CardSection>

              <CardSection
                id="contato"
                icon={<Users className="h-5 w-5 text-cyan-400" />}
                title="8. Contato"
              >
                <p>
                  Em caso de dúvidas, entre em contato pelo{" "}
                  <Link
                    href="/contato"
                    className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                  >
                    nosso canal de suporte
                  </Link>
                  .
                </p>
              </CardSection>

              {/* timeline visual: ciclo de vida dos dados */}
              <div className="mt-12 rounded-3xl border border-white/10 bg-black/30 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-bold text-white">
                  Ciclo de vida dos dados
                </h3>
                <div className="mt-6 flex flex-col gap-6">
                  {[
                    "Coleta",
                    "Uso",
                    "Armazenamento",
                    "Compartilhamento",
                    "Retenção",
                    "Exclusão",
                  ].map((etapa, i) => (
                    <m.div
                      key={etapa}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="relative flex items-center gap-3"
                    >
                      <div className="h-3 w-3 rounded-full bg-cyan-300 ring-2 ring-white/20" />
                      <span className="text-sm text-white/80">{etapa}</span>
                      {i < 5 && (
                        <div className="ml-2 h-px flex-1 bg-white/10" />
                      )}
                    </m.div>
                  ))}
                </div>
              </div>
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
            </aside>
          </div>
        </section>

        {/* rodapé simples */}
        <section className="mx-auto my-10 w-full max-w-6xl text-sm text-white/70">
          <p>
            Esta Política de Privacidade visa a transparência. Caso haja
            conflito com outras políticas, prevalece a versão mais atual
            disponível aqui.
          </p>
        </section>
      </main>
    </LazyMotion>
  );
}

/* --------- Subcomponentes --------- */
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
