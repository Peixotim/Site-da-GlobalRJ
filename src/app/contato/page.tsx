"use client";

import { useRef, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MessageSquareMore,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Send,
  CheckCircle2,
  Info,
  User,
  Briefcase,
  Globe2,
  Linkedin,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Wrench,
  GraduationCap,
  Loader2,
} from "lucide-react";

/* =========================
   Dados
========================= */
const CONSULTANTS = [
  {
    name: "Marcos Silva",
    role: "Consultor Técnico",
    photo: "/consultores/marcos.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Paula Duarte",
    role: "Parcerias & Growth",
    photo: "/consultores/p.png",
    linkedin: "https://www.linkedin.com/",
  },
] as const;

/* =========================
   Helpers
========================= */
const ease = [0.22, 1, 0.36, 1] as const;

// value = ENUM aceito pelo backend | label = texto da UI
const topics = [
  { label: "Pós-Graduação", value: "POSGRADUCAO" },
  { label: "Cursos Técnicos", value: "TECNICOS" },
  { label: "Parcerias", value: "PARCERIAS" },
  { label: "Imprensa", value: "IMPRENSA" },
  { label: "Outros", value: "OUTROS" },
] as const;

type Toast = null | {
  type: "success" | "error";
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

/* =========================
   Página
========================= */
export default function ContatoPage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-[100dvh] overflow-x-clip px-4 sm:px-6 lg:px-8">
        {/* Aurora */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_90%_-10%,rgba(56,189,248,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[140%] -translate-x-1/2 -rotate-[6deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
        </div>

        {/* HERO */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-8 ring-1 ring-white/10 sm:p-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Vamos conversar
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Fale com a{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                RJGLOBAL
              </span>
            </h1>
            <p className="mt-2 max-w-3xl text-white/80">
              Conte sobre seu contexto — respondemos rápido com um diagnóstico
              inicial e próximos passos claros.
            </p>

            {/* Ações rápidas */}
            <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-3">
              <QuickAction
                href="mailto:contato@rjglobal.com"
                Icon={Mail}
                label="contato@rjglobal.com"
                sub="E-mail"
              />
              <QuickAction
                href="tel:+550000000000"
                Icon={Phone}
                label="+55 (00) 0000-0000"
                sub="Telefone"
              />
              <QuickAction
                href="https://wa.me/550000000000"
                Icon={MessageSquareMore}
                label="Falar no WhatsApp"
                sub="Atendimento rápido"
                external
              />
            </div>
          </m.div>
        </section>

        {/* GRID principal: form + info */}
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <ContactForm />
            <aside className="space-y-6">
              <AreasCards />
              <Consultants />
              <HoursAddress />
              <Faq />
            </aside>
          </div>
        </section>

        <section className="mx-auto my-10 w-full max-w-6xl text-sm text-white/70">
          <p>
            Precisa de algo específico?{" "}
            <Link
              href="/solucoes"
              className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
            >
              Conheça nossas soluções
            </Link>{" "}
            ou fale direto com um consultor.
          </p>
        </section>
      </main>
    </LazyMotion>
  );
}

/* =========================
   Subcomponentes
========================= */

function QuickAction({
  href,
  Icon,
  label,
  sub,
  external = false,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex min-w-0 items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10 transition hover:bg-white/10"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
          <Icon className="h-5 w-5 text-cyan-300" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">
            {label}
          </div>
          <div className="text-xs text-white/70">{sub}</div>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ---- Formulário ---- */
function ContactForm() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const botRef = useRef<HTMLInputElement>(null); // honeypot

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (botRef.current?.value) return; // honeypot

    const fd = new FormData(e.currentTarget);

    // vem como value do option (enum)
    const focoEnum = String(fd.get("foco") || "OUTROS");
    // label para WhatsApp
    const focoLabel =
      topics.find((t) => t.value === focoEnum)?.label ?? "Outros";

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      enterprise: String(fd.get("enterprise") || ""),
      foco: focoEnum, // <-- ENUM aceito pelo backend
      body: String(fd.get("body") || ""),
    };

    const WHATS_URL = `https://wa.me/550000000000?text=${encodeURIComponent(
      `Olá! Vim pelo site e não consegui enviar o formulário.\n\nNome: ${payload.name}\nE-mail: ${payload.email}\nTelefone: ${payload.phone}\nEmpresa: ${payload.enterprise}\nAssunto: ${focoLabel}\n\nMensagem:\n${payload.body}`
    )}`;

    setSending(true);
    setToast(null);

    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 12000);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(to);

      (e.currentTarget as HTMLFormElement).reset();
      setToast({
        type: "success",
        message: "Mensagem enviada! Em breve entraremos em contato.",
      });
    } catch {
    } finally {
      setSending(false);
      setTimeout(() => {
        setToast((t) => (t?.type === "success" ? null : t));
      }, 3500);
    }
  }

  return (
    <m.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10"
      aria-labelledby="contato-form"
    >
      <div className="grid gap-6 p-6 sm:p-8">
        <div>
          <h2 id="contato-form" className="text-xl font-extrabold text-white">
            Envie uma mensagem
          </h2>
          <p className="text-sm text-white/75">
            Responderemos em até 1 dia útil.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* honeypot hidden */}
          <input
            ref={botRef}
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <Field
            icon={<User className="h-4 w-4 text-white/70" />}
            label="Seu nome"
            name="name"
            autoComplete="name"
            required
          />
          <Field
            icon={<Mail className="h-4 w-4 text-white/70" />}
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Field
            icon={<Phone className="h-4 w-4 text-white/70" />}
            label="Telefone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
          <Field
            icon={<Briefcase className="h-4 w-4 text-white/70" />}
            label="Empresa (opcional)"
            name="enterprise"
            autoComplete="organization"
          />

          <Select
            label="Assunto"
            name="foco"
            options={topics}
            className="sm:col-span-2"
          />

          <Textarea
            label="Mensagem"
            name="body"
            placeholder="Conte brevemente sua necessidade, prazos e objetivos."
            rows={5}
            className="sm:col-span-2"
            required
          />

          <div className="sm:col-span-2 flex items-start gap-2">
            <input
              id="consent"
              required
              type="checkbox"
              name="consent"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/60"
            />
            <label htmlFor="consent" className="text-xs text-white/80">
              Concordo com a{" "}
              <Link
                href="/privacidade"
                className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
              >
                Política de Privacidade
              </Link>
              .
            </label>
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/15 to-fuchsia-500/25 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:from-cyan-500/35 hover:to-fuchsia-500/35 disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </>
              )}
            </button>
          </div>

          <p className="sm:col-span-2 text-xs text-white/60">
            Ao enviar, você concorda com o processamento dos dados para retorno
            do contato. Guardamos somente o necessário.
          </p>
        </form>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <m.div
            role={toast.type === "error" ? "alert" : "status"}
            aria-live={toast.type === "error" ? "assertive" : "polite"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-white shadow-lg backdrop-blur ring-1 ${
              toast.type === "success"
                ? "bg-emerald-500/90 ring-emerald-300/40"
                : "bg-red-500/90 ring-red-300/40"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Info className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
            {toast.actionHref && toast.actionLabel && (
              <a
                href={toast.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center rounded-lg bg-white/20 px-2 py-1 text-xs font-semibold hover:bg-white/30"
              >
                {toast.actionLabel}
              </a>
            )}
            <button
              onClick={() => setToast(null)}
              className="ml-1 text-xs/none opacity-80 hover:opacity-100"
              aria-label="Fechar"
            >
              ✕
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </m.section>
  );
}

/* =========================
   Campos
========================= */
function Field({
  label,
  name,
  icon,
  type = "text",
  autoComplete,
  required,
  className = "",
}: {
  label: string;
  name: string;
  icon?: React.ReactNode;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`relative ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-white/80">
        {label}
      </span>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        ) : null}
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          required={required}
          className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 ${
            icon ? "pl-9" : "pl-3"
          } text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/60`}
          placeholder=""
        />
      </div>
    </label>
  );
}

function Select({
  label,
  name,
  options,
  className = "",
}: {
  label: string;
  name: string;
  options: readonly { label: string; value: string }[];
  className?: string;
}) {
  return (
    <label className={`relative ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-white/80">
        {label}
      </span>
      <select
        name={name}
        className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/60"
        defaultValue={options[0]?.value}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  name,
  rows = 4,
  placeholder,
  required,
  className = "",
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`relative ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-white/80">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400/60"
      />
    </label>
  );
}

/* =========================
   Lateral
========================= */
function AreasCards() {
  const items = [
    {
      title: "Pós-Graduação",
      desc: "Implantação, captação e performance acadêmica.",
      icon: <GraduationIcon />,
      href: "/solucoes#pos",
    },
    {
      title: "Cursos Técnicos",
      desc: "Currículo, parceria com empresas e empregabilidade.",
      icon: <WrenchIcon />,
      href: "/solucoes#tecnico",
    },
    {
      title: "Parcerias",
      desc: "Acordos institucionais e projetos conjuntos.",
      icon: <HandshakeIcon />,
      href: "/empresas#parcerias",
    },
    {
      title: "Diversidade",
      desc: "Programas e iniciativas para inclusão, equidade e ambientes mais representativos.",
      icon: <HandshakeIcon />,
      href: "/empresas#parcerias",
    },
  ] as const;

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <Link
          key={it.title}
          href={it.href}
          className="group rounded-2xl border border-white/10 bg-white/[0.05] p-4 ring-1 ring-white/10 transition hover:bg-white/10"
        >
          <div className="mb-2">{it.icon}</div>
          <div className="text-sm font-semibold text-white">{it.title}</div>
          <p className="text-xs text-white/70">{it.desc}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-white/70">
            Saiba mais <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function Consultants() {
  const [i, setI] = useState(0);
  const items = CONSULTANTS;
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);
  const next = () => setI((p) => (p + 1) % items.length);

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 ring-1 ring-white/10">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-white">Consultores</div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Anterior"
            onClick={prev}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Próximo"
            onClick={next}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[520px]">
        <m.div
          key={items[i].name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 ring-1 ring-white/10"
        >
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image
              src={items[i].photo}
              alt={items[i].name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">
              {items[i].name}
            </div>
            <div className="text-xs text-white/70">{items[i].role}</div>
          </div>
          <Link
            href={items[i].linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </Link>
        </m.div>
      </div>
    </section>
  );
}

function HoursAddress() {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ring-1 ring-white/10">
      <div className="grid min-w-0 gap-0 sm:grid-cols-2">
        <div className="p-5">
          <div className="mb-2 text-sm font-semibold text-white">Horários</div>
          <div className="space-y-1 text-xs text-white/80">
            <Line
              icon={<Clock className="h-4 w-4 text-cyan-300" />}
              text="Seg a Sex • 9h às 18h"
            />
            <Line
              icon={<Clock className="h-4 w-4 text-cyan-300" />}
              text="Sáb • 9h às 13h"
            />
          </div>

          <div className="mt-4 text-sm font-semibold text-white">Endereço</div>
          <div className="mt-1 space-y-1 text-xs text-white/80">
            <Line
              icon={<MapPin className="h-4 w-4 text-fuchsia-300" />}
              text="R. Luiz Rodrigues dos Santos, 44 — Todos os Santos"
            />
            <Line
              icon={<Globe2 className="h-4 w-4 text-fuchsia-300" />}
              text="Cel. Fabriciano — MG, Brasil"
            />
          </div>

          <Link
            href="https://maps.google.com/?q=R.+Luiz+Rodrigues+dos+Santos,+44+-+Cel.+Fabriciano"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            Abrir no Maps <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="relative min-h-[280px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.435056563561!2d-42.63794622470554!3d-19.5229269817759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa55698c0177e4f%3A0xb2b39d53a0fe8dc2!2sR.%20Luiz%20Rodrigues%20dos%20Santos%2C%2044%20-%20Todos%20Os%20Santos%2C%20Cel.%20Fabriciano%20-%20MG%2C%2035170-061!5e0!3m2!1sen!2sbr!4v1758893394442!5m2!1sen!2sbr"
            className="absolute inset-0 h-full w-full rounded-br-3xl border-0 sm:rounded-tr-3xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 rounded-br-3xl bg-gradient-to-t from-black/30 sm:rounded-tr-3xl" />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const qa = [
    {
      q: "Quanto tempo até o primeiro retorno?",
      a: "Geralmente em até 24h úteis. Para assuntos urgentes, use WhatsApp.",
    },
    {
      q: "Vocês atendem instituições de todo o Brasil?",
      a: "Sim. Também operamos de forma remota com ritos e SLAs claros.",
    },
    {
      q: "Há diagnóstico gratuito?",
      a: "Sim — avaliamos seu contexto e sugerimos próximos passos sem compromisso.",
    },
  ] as const;

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 ring-1 ring-white/10">
      <div className="text-sm font-semibold text-white">
        Perguntas frequentes
      </div>
      <div className="mt-3 divide-y divide-white/10">
        {qa.map((item, idx) => (
          <details key={idx} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm text-white/85">
              {item.q}
              <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
            </summary>
            <p className="pb-3 text-sm text-white/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ==== Icons / Itens ==== */
function GraduationIcon() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
      <GraduationCap className="h-4 w-4 text-emerald-300" />
    </span>
  );
}
function WrenchIcon() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
      <Wrench className="h-4 w-4 text-cyan-300" />
    </span>
  );
}
function HandshakeIcon() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
      <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
    </span>
  );
}
function Line({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}
