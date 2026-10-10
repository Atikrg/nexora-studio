import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ComponentType } from "react";

/**
 * Local MDX blog, rendered at build time (static export).
 * To add a post: create content/blog/<slug>.mdx with `export const metadata = { ... }`.
 * Nothing else to register: the list, routes, sitemap and RSS-style JSON-LD pick it up.
 */
export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, e.g. "2026-09-18". */
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  /** DUMMY flag for sample posts. */
  isPlaceholder?: boolean;
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

const DIR = join(process.cwd(), "content", "blog");

function readingMinutes(slug: string): number {
  const text = readFileSync(join(DIR, `${slug}.mdx`), "utf8")
    .replace(/export const metadata[\s\S]*?\n};?\n/, "")
    .replace(/[#>*_`|[\]()-]/g, " ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

export function getPostSlugs(): string[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<{ meta: Post; Content: ComponentType } | null> {
  if (!getPostSlugs().includes(slug)) return null;
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return { meta: { ...mod.metadata, slug, readingMinutes: readingMinutes(slug) }, Content: mod.default };
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(getPostSlugs().map(async (slug) => (await getPost(slug))!.meta));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
