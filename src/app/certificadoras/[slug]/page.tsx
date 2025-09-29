import { notFound } from "next/navigation";
import ClientCertDetail from "./ClientCompanyDetail";
import { getCertificadoraBySlug, getAllCertSlugs } from "@/data/certificadoras";

export async function generateStaticParams() {
  return getAllCertSlugs().map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const cert = getCertificadoraBySlug(params.slug);
  if (!cert) return notFound();
  return <ClientCertDetail cert={cert} />; // ✅ passa 'cert' definido
}
