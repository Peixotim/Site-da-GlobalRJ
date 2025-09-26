// app/boot/page.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BootPage() {
  const router = useRouter();
  const qs = useSearchParams();
  const to = useMemo(() => qs.get("to") || "/", [qs]);

  useEffect(() => {
    // tempo mínimo de tela (ex.: 1400ms)
    const t = setTimeout(() => {
      // seta cookie por 12h (ajuste à sua necessidade)
      document.cookie = `rj_boot=1; Max-Age=${
        60 * 60 * 12
      }; Path=/; SameSite=Lax`;
      router.replace(to);
    }, 1400);

    return () => clearTimeout(t);
  }, [router, to]);

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden">
        {/* aurora suave */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_90%_-10%,rgba(56,189,248,0.14),transparent)]" />
          <div className="absolute left-1/2 top-0 h-[120vh] w-[150vw] -translate-x-1/2 -rotate-[6deg] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(168,85,247,0.12),rgba(56,189,248,0.12),rgba(168,85,247,0.12))] opacity-40" />
        </div>

        {/* core do loading */}
        <div className="flex flex-col items-center gap-6">
          <m.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative h-20 w-20"
          >
            {/* orb */}
            <m.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,.6),rgba(168,85,247,.6),rgba(34,211,238,.6))]"
            />
            <div className="absolute inset-[6px] rounded-full bg-black/80 ring-1 ring-white/10" />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="text-sm font-semibold tracking-wide text-white/85"
          >
            preparando sua experiência…
          </m.div>
        </div>
      </main>
    </LazyMotion>
  );
}
