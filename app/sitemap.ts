import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { getPostSlugs } from "@/lib/blog";

export const dynamic = "force-static";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy/", priority: 0.3, changeFrequency: "yearly" },
];

const url = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: url(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: url(`/services/${s.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: url(`/work/${c.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((i) => ({
      url: url(`/industries/${i.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getPostSlugs().map((slug) => ({
      url: url(`/blog/${slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
