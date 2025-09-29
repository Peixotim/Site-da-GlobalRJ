// app/sitemap.ts
import type { MetadataRoute } from "next";
import { certificadoras } from "@/data/certificadoras";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gruporjglobal.com.br"; //Trocar depois
  const now  = new Date();

  const companyUrls = certificadoras.map((c) => ({
    url: `${base}/certificadoras/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/certificadoras`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contato`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...companyUrls,
  ];
}