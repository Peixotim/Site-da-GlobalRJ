"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Building2,
  Globe2,
  Mail,
  Phone,
  MessageSquareMore,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  MapPin,
  BadgeCheck,
  Link2,
  Users2,
} from "lucide-react";
import type { Company } from "@/data/companies";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ClientCompanyDetail({
  company: c,
}: {
  company: Company;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8">
        {/* Aurora sutil */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_90%_-10%,rgba(56,189,248,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 -rotate-[6deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-6 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
          >
            <div className="relative aspect-[16/7] w-full">
              <Image
                src={c.cover}
                alt={c.name}
                fill
                priority
                sizes="(min-width:1024px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={84}
                    height={28}
                    className="h-7 w-auto"
                  />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {c.name}
                    </h1>
                    <p className="text-sm text-white/80">{c.tagline}</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white ring-1 ring-white/15">
                  <Building2 className="mr-1 h-3.5 w-3.5" />
                  {c.category === "pos" ? "Pós-Graduação" : "Técnico"}
                </span>
              </div>
            </div>
          </m.div>
        </section>

        {/* KPIs + Metadados principais */}
        <section className="mx-auto mt-6 w-full max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {(c.metrics ?? []).slice(0, 3).map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 ring-1 ring-white/10"
              >
                <div className="text-xl font-extrabold text-white">
                  {k.value}
                </div>
                <div className="text-xs font-semibold text-white/70">
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conteúdo 2 colunas */}
        <section className="mx-auto mt-6 w-full max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Coluna principal */}
            <div className="space-y-6">
              {c.about && (
                <Block title="Sobre a empresa">
                  <p className="text-white/80">{c.about}</p>
                </Block>
              )}

              {c.products?.length ? (
                <Block title="Ofertas & Produtos">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {c.products.map((p) => (
                      <li
                        key={p.title}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 ring-1 ring-white/10"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {p.title}
                          </div>
                          {p.badge && (
                            <span className="mt-0.5 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 ring-1 ring-white/15">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        {p.url ? (
                          <Link
                            href={p.url}
                            className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white"
                          >
                            Ver <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {c.partners?.length ? (
                <Block title="Parcerias & Ecossistema">
                  <div className="flex flex-wrap gap-3">
                    {c.partners.map((p) => (
                      <div
                        key={p.name}
                        className="flex h-10 items-center justify-center rounded-xl bg-white/8 px-3 ring-1 ring-white/10"
                      >
                        <Image
                          src={p.logo}
                          alt={p.name}
                          width={110}
                          height={24}
                          className="h-6 w-auto opacity-90"
                        />
                      </div>
                    ))}
                  </div>
                </Block>
              ) : null}

              {c.gallery?.length ? (
                <Block title="Galeria">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {c.gallery.map((g, i) => (
                      <div
                        key={g + i}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 ring-1 ring-white/10"
                      >
                        <Image
                          src={g}
                          alt={`${c.name} ${i + 1}`}
                          fill
                          sizes="(min-width:1024px) 360px, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </Block>
              ) : null}
            </div>

            {/* Lateral */}
            <aside className="space-y-6">
              {(c.contacts || c.socials) && (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10">
                  <div className="mb-3 text-sm font-semibold text-white">
                    Contato & canais
                  </div>
                  <div className="space-y-2 text-sm">
                    {c.contacts?.email && (
                      <Line
                        icon={<Mail className="h-4 w-4 text-cyan-300" />}
                        text={c.contacts.email}
                        href={`mailto:${c.contacts.email}`}
                      />
                    )}
                    {c.contacts?.phone && (
                      <Line
                        icon={<Phone className="h-4 w-4 text-cyan-300" />}
                        text={c.contacts.phone}
                        href={`tel:${c.contacts.phone}`}
                      />
                    )}
                    {c.contacts?.whatsapp && (
                      <Line
                        icon={
                          <MessageSquareMore className="h-4 w-4 text-emerald-300" />
                        }
                        text="WhatsApp"
                        href={c.contacts.whatsapp}
                        external
                      />
                    )}
                    {c.contacts?.site && (
                      <Line
                        icon={<Globe2 className="h-4 w-4 text-fuchsia-300" />}
                        text={c.contacts.site.replace(/^https?:\/\//, "")}
                        href={c.contacts.site}
                        external
                      />
                    )}
                  </div>

                  {c.socials && (
                    <>
                      <div className="mt-4 text-xs font-semibold text-white/70">
                        Redes
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        {Object.entries(c.socials)
                          .filter(([, v]) => !!v)
                          .map(([k, v]) => (
                            <Link
                              key={k}
                              href={String(v)}
                              target="_blank"
                              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/15 hover:bg-white/15"
                            >
                              <Link2 className="h-3.5 w-3.5" />
                              {k}
                            </Link>
                          ))}
                      </div>
                    </>
                  )}

                  <div className="mt-4">
                    <Link
                      href="/contato"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                    >
                      Falar com um consultor{" "}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
                  Conformidade & qualidade
                </div>
                <p className="text-sm text-white/80">
                  Mantemos critérios rigorosos de segurança, governança e
                  indicadores de desempenho para garantir excelência acadêmica e
                  operacional.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto my-10 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8"
          >
            <div className="grid items-center gap-6 md:grid-cols-[1.6fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
                  <Users2 className="h-3.5 w-3.5 text-cyan-300" />
                  Quer integrar com {c.name}?
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Vamos acelerar seus resultados
                </h2>
                <p className="mt-2 max-w-[60ch] text-white/80">
                  Integração ágil, rituais claros e foco em métricas que
                  importam.
                </p>
                <div className="mt-4">
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35"
                  >
                    Falar com a RJGLOBAL <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80 ring-1 ring-white/10">
                <p>
                  Páginas de dados são atualizadas conforme novas parcerias e
                  indicadores. Alguns números podem ser estimativas públicas.
                </p>
              </div>
            </div>
          </m.div>
        </section>
      </main>
    </LazyMotion>
  );
}

/* ------- Componentes locais ------- */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10">
      <div className="mb-2 text-sm font-semibold text-white">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function Line({
  icon,
  text,
  href,
  external,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <span className="inline-flex items-center gap-2">
      {icon} <span>{text}</span>
      {href && external ? <ExternalLink className="h-3.5 w-3.5" /> : null}
    </span>
  );
  return href ? (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="inline-flex items-center rounded-lg bg-white/10 px-3 py-2 text-white/85 ring-1 ring-white/15 hover:bg-white/15"
    >
      {content}
    </Link>
  ) : (
    <div className="inline-flex items-center rounded-lg bg-white/10 px-3 py-2 text-white/85 ring-1 ring-white/15">
      {content}
    </div>
  );
}
