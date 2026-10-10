import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/shared/container";
import { FounderAvatar } from "@/components/shared/founder-avatar";
import { JsonLd } from "@/components/shared/json-ld";
import { founder } from "@/data/founder";
import { site } from "@/data/site";
import { formatPostDate, getAllPosts, getPost, getPostSlugs } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: meta.author }],
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}/`,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [meta.author],
      tags: meta.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;
  const others = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="pt-32 pb-12 md:pt-40">
          <Container className="flex max-w-4xl flex-col gap-8">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog/" },
                { label: meta.title, href: `/blog/${slug}/` },
              ]}
            />
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {meta.tags.map((t) => (
                <li key={t}>
                  <Badge variant="label">{t}</Badge>
                </li>
              ))}
            </ul>
            <h1 className="text-h1">{meta.title}</h1>
            <p className="text-body-lg text-muted-foreground">{meta.description}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-5 text-small">
              <span className="flex items-center gap-3">
                <FounderAvatar className="size-10 border" />
                <span className="font-medium">{meta.author}</span>
              </span>
              <time dateTime={meta.date} className="text-muted-foreground">
                {formatPostDate(meta.date)}
              </time>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock aria-hidden="true" className="size-4" /> {meta.readingMinutes} min read
              </span>
            </div>
          </Container>
        </header>

        <Container className="max-w-4xl">
          <div className="prose-width">
            <Content />
          </div>

          <aside aria-label="About the author" className="mt-16 flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:items-center md:p-8">
            <FounderAvatar />
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{founder.name}</p>
              <p className="text-small text-muted-foreground">{founder.shortBio}</p>
            </div>
          </aside>

          <nav aria-label="More posts" className="mt-16 flex flex-col gap-6">
            <Link href="/blog/" className="eyebrow inline-flex min-h-11 items-center gap-2 hover:text-foreground">
              <ArrowLeft aria-hidden="true" className="size-4" /> All posts
            </Link>
            {others.length > 0 && (
              <ul className="grid gap-4 sm:grid-cols-2">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}/`} className="flex h-full flex-col gap-2 rounded-2xl border border-border p-6 transition-colors hover:border-primary/40">
                      <span className="eyebrow">{p.readingMinutes} min read</span>
                      <span className="font-display text-h4">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </Container>
      </article>

      <CtaSection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.description,
          datePublished: meta.date,
          dateModified: meta.updated ?? meta.date,
          author: { "@type": "Person", name: meta.author, url: new URL("/about/", site.url).toString() },
          publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: new URL("/icon.svg", site.url).toString() } },
          mainEntityOfPage: new URL(`/blog/${slug}/`, site.url).toString(),
          keywords: meta.tags.join(", "),
        }}
      />
    </>
  );
}
