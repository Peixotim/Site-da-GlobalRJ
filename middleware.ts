import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // evita arquivos estáticos

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // pule api, static, boot e arquivos públicos
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/boot") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasBootCookie = req.cookies.get("rj_boot")?.value === "1";
  if (hasBootCookie) return NextResponse.next();

  // ainda não passou pelo boot → envia para /boot?to=<rota atual>
  const url = req.nextUrl.clone();
  url.pathname = "/boot";
  url.search = `?to=${encodeURIComponent(pathname + search)}`;
  // use redirect para trocar a URL (ou use rewrite se preferir manter a URL original)
  return NextResponse.redirect(url);
}

// opcional: você pode restringir o matcher se quiser.
export const config = {
  matcher: "/:path*",
};