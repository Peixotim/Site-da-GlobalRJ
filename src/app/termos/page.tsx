// app/termos/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ShieldCheck,
  Gavel,
  Info,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

/** utilzinho só pra data bonita */
const formatBR = (d = new Date()) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(d);

export default function TermosPage() {
  const updatedAt = useMemo(() => formatBR(), []);
  const sections = [
    { id: "aceite", label: "1. Aceite e atualização" },
    { id: "conta", label: "2. Conta & elegibilidade" },
    { id: "uso-permitido", label: "3. Uso permitido" },
    { id: "pagamentos", label: "4. Pagamentos & assinaturas" },
    { id: "conteudo", label: "5. Conteúdos do usuário" },
    { id: "propriedade", label: "6. Propriedade intelectual" },
    { id: "terceiros", label: "7. Serviços de terceiros" },
    { id: "garantias", label: "8. Isenções de garantia" },
    { id: "responsabilidade", label: "9. Limitação de responsabilidade" },
    { id: "indenizacao", label: "10. Indenização" },
    { id: "encerramento", label: "11. Suspensão/encerramento" },
    { id: "lei", label: "12. Lei aplicável & foro" },
    { id: "alteracoes", label: "13. Mudanças nestes termos" },
    { id: "contato", label: "14. Contato" },
  ] as const;

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* bg temático leve */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(124,58,237,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[140vw] -translate-x-1/2 -rotate-[8deg] bg-[conic-gradient(from_220deg_at_50%_50%,rgba(34,211,238,0.10),rgba(168,85,247,0.12),rgba(34,211,238,0.10))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
          >
            <div className="flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-12">
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                <Gavel className="h-3.5 w-3.5 text-cyan-300" />
                Termos de Uso
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Termos de Uso do ecossistema{" "}
                <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                  RJGLOBAL
                </span>
              </h1>
              <p className="max-w-3xl text-white/80">
                Estes Termos regulam o uso de nossos sites, plataformas e
                serviços. Ao acessar, você concorda com as condições abaixo.
                Leia com atenção.
              </p>
              <p className="text-xs text-white/60">
                Última atualização: {updatedAt}
              </p>
            </div>
          </m.div>
        </section>

        {/* CONTEÚDO + SUMÁRIO LATERAL */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            {/* Conteúdo */}
            <m.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
            >
              <div className="space-y-10 p-6 sm:p-10">
                <WarnCard />
                <Section id="aceite" title="1. Aceite e atualização">
                  <p>
                    Ao usar qualquer produto/serviço da RJGLOBAL (“Serviços”),
                    você declara ter lido e concordado com estes Termos e com a{" "}
                    <Link
                      href="/politica-de-privacidade"
                      className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                    >
                      Política de Privacidade
                    </Link>
                    . Podemos atualizar os Termos periodicamente para refletir
                    mudanças legais ou operacionais. As alterações passam a
                    valer a partir da publicação, com indicação de data.
                  </p>
                </Section>

                <Section id="conta" title="2. Conta & elegibilidade">
                  <ul className="list-inside list-disc space-y-2">
                    <li>
                      Você deve ter a idade mínima prevista em lei em sua
                      jurisdição.
                    </li>
                    <li>
                      Informações de cadastro devem ser verdadeiras, completas e
                      atualizadas.
                    </li>
                    <li>
                      Você é responsável por manter a confidencialidade das
                      credenciais.
                    </li>
                  </ul>
                </Section>

                <Section id="uso-permitido" title="3. Uso permitido">
                  <p>Você concorda em não:</p>
                  <ul className="mt-2 list-inside list-disc space-y-2">
                    <li>
                      Violar leis, direitos de terceiros ou políticas internas.
                    </li>
                    <li>
                      Realizar engenharia reversa, scraping massivo ou
                      exploração de falhas.
                    </li>
                    <li>
                      Enviar conteúdo ilegal, difamatório, discriminatório ou
                      malicioso.
                    </li>
                  </ul>
                </Section>

                <Section id="pagamentos" title="4. Pagamentos & assinaturas">
                  <p>
                    Serviços pagos podem exigir cadastro de método de pagamento.
                    As cobranças são processadas por provedores terceirizados.
                    Planos com renovação automática serão cobrados até o
                    cancelamento, que pode ser feito a qualquer momento nas
                    configurações do serviço, com efeitos no próximo ciclo.
                  </p>
                </Section>

                <Section id="conteudo" title="5. Conteúdos do usuário">
                  <p>
                    Você mantém a titularidade do conteúdo que enviar,
                    concedendo à RJGLOBAL licença mundial, não exclusiva e
                    gratuita para hospedar, reproduzir e exibir o conteúdo com a
                    finalidade de operação dos Serviços. Podemos remover
                    conteúdos que violem estes Termos.
                  </p>
                </Section>

                <Section id="propriedade" title="6. Propriedade intelectual">
                  <p>
                    O material da RJGLOBAL (marcas, logotipos, cursos, código,
                    layouts e textos) é protegido por direitos autorais e de
                    marca. Não é permitido copiar, distribuir ou criar obras
                    derivadas sem autorização expressa.
                  </p>
                </Section>

                <Section id="terceiros" title="7. Serviços de terceiros">
                  <p>
                    Nossos Serviços podem conter links ou integrações de
                    terceiros. A RJGLOBAL não se responsabiliza por conteúdo,
                    políticas ou práticas de terceiros. Recomendamos revisar os
                    termos dessas plataformas antes de utilizá-las.
                  </p>
                </Section>

                <Section id="garantias" title="8. Isenções de garantia">
                  <p>
                    Fornecemos os Serviços “no estado em que se encontram” e
                    “conforme disponíveis”. Empregamos medidas técnicas e
                    organizacionais razoáveis, mas não garantimos
                    disponibilidade ininterrupta, ausência de erros ou adequação
                    a propósitos específicos.
                  </p>
                </Section>

                <Section
                  id="responsabilidade"
                  title="9. Limitação de responsabilidade"
                >
                  <p>
                    Na extensão máxima permitida por lei, a RJGLOBAL não se
                    responsabiliza por lucros cessantes, perda de dados, danos
                    indiretos ou consequenciais decorrentes do uso ou
                    impossibilidade de uso dos Serviços. A responsabilidade
                    total, quando aplicável, limita-se ao valor pago nos 12
                    meses anteriores ao evento.
                  </p>
                </Section>

                <Section id="indenizacao" title="10. Indenização">
                  <p>
                    Você concorda em indenizar e isentar a RJGLOBAL de
                    reclamações, perdas e despesas (incluindo honorários
                    advocatícios) decorrentes de uso indevido dos Serviços ou
                    violação destes Termos.
                  </p>
                </Section>

                <Section id="encerramento" title="11. Suspensão/encerramento">
                  <p>
                    Podemos suspender ou encerrar o acesso a qualquer momento em
                    caso de violação destes Termos, risco de segurança,
                    inadimplência, determinação legal ou descontinuidade do
                    Serviço.
                  </p>
                </Section>

                <Section id="lei" title="12. Lei aplicável & foro">
                  <p>
                    Estes Termos são regidos pelas leis do Brasil. Fica eleito o
                    foro da comarca de São Paulo/SP, com renúncia a qualquer
                    outro, por mais privilegiado que seja, salvo disposições
                    legais em contrário.
                  </p>
                </Section>

                <Section id="alteracoes" title="13. Mudanças nestes termos">
                  <p>
                    Podemos alterar estes Termos para refletir ajustes de
                    produto, requisitos legais ou melhorias. A versão vigente
                    estará sempre disponível nesta página, com a data de
                    atualização indicada no topo.
                  </p>
                </Section>

                <Section id="contato" title="14. Contato">
                  <p>
                    Dúvidas? Entre em contato pelo{" "}
                    <Link
                      href="/contato"
                      className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
                    >
                      nosso canal de suporte
                    </Link>
                    . Teremos prazer em ajudar.
                  </p>
                </Section>
              </div>
            </m.article>

            {/* Sumário lateral (sticky em desktop) */}
            <aside className="lg:sticky lg:top-20 h-max space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 ring-1 ring-white/10">
                <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
                  <ShieldCheck className="h-4 w-4 text-teal-300" />
                  Sumário rápido
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

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 ring-1 ring-white/10">
                <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
                  <Info className="h-4 w-4 text-cyan-300" />
                  Documentos relacionados
                </div>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/politica-de-privacidade"
                      className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      Política de Privacidade
                      <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      Política de Cookies
                      <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* rodapé simples */}
        <section className="mx-auto my-10 w-full max-w-6xl text-sm text-white/70">
          <p>
            Se você não concordar com estes Termos, deve cessar o uso dos
            Serviços. Este documento não substitui aconselhamento jurídico. Para
            situações específicas, consulte um profissional.
          </p>
        </section>
      </main>
    </LazyMotion>
  );
}

/* ---------- Componentes auxiliares ---------- */

function WarnCard() {
  return (
    <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 ring-1 ring-amber-400/20">
      <div className="flex items-start gap-3 text-amber-100">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
        <p className="text-sm">
          Este resumo facilita a leitura, mas <b>não substitui</b> o texto
          completo. Em caso de conflito, prevalece a versão integral destes
          Termos.
        </p>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-lg font-extrabold tracking-tight text-white">
        {title}
      </h2>
      <div className="prose prose-invert prose-sm mt-2 max-w-none leading-relaxed prose-headings:font-bold prose-a:text-cyan-300">
        {children}
      </div>
    </section>
  );
}
