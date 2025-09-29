// app/empresas/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCompanySlugs, getCompanyBySlug } from "@/data/companies";
import ClientCompanyDetail from "./ClientCompanyDetail";

export async function generateStaticParams() {
  return getAllCompanySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = getCompanyBySlug(params.slug);
  if (!c) return {};
  return {
    title: `${c.name} — Empresas | RJGLOBAL`,
    description: c.tagline,
    openGraph: {
      title: c.name,
      description: c.tagline,
      images: c.cover ? [{ url: c.cover }] : [],
    },
  };
}

export default function CompanyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCompanyBySlug(params.slug);
  if (!c) return notFound();

  // Tudo que usa framer-motion fica no ClientCompanyDetail
  return <ClientCompanyDetail company={c} />;
}
