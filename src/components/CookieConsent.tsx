"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type ConsentValue = "accepted" | "rejected";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie =
    `${name}=${encodeURIComponent(
      value
    )}; Max-Age=${maxAge}; Path=/; SameSite=Lax;` +
    (isSecure ? " Secure;" : "");
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = getCookie("rj_cc");
    if (!v) setVisible(true);
  }, []);

  const handle = useCallback((value: ConsentValue) => {
    setCookie("rj_cc", value, 365);
    setVisible(false);
    // opcional: acione integrações aqui se "accepted"
    // if (value === "accepted") window.gtag?.("consent", "update", { ad_user_data: "granted", ... });
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 z-[9999] mx-auto max-w-6xl p-3 sm:p-4"
    >
      <div className="rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-md ring-1 ring-white/10 shadow-2xl">
        <div className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:gap-4 sm:p-5">
          <div className="text-sm text-white/90">
            <p className="font-semibold text-white">Nós usamos cookies</p>
            <p className="mt-1 text-white/80">
              Utilizamos cookies essenciais para o funcionamento do site e, com
              seu consentimento, cookies de desempenho para melhorar sua
              experiência. Veja nossa{" "}
              <Link
                href="/politica-de-cookies"
                className="underline decoration-cyan-400/60 underline-offset-2 hover:text-white"
              >
                Política de Cookies
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              onClick={() => handle("rejected")}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
            >
              Rejeitar
            </button>
            <button
              onClick={() => handle("accepted")}
              className="rounded-xl bg-gradient-to-r from-cyan-500/25 via-cyan-400/20 to-fuchsia-500/25 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:from-cyan-500/35 hover:to-fuchsia-500/35"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
