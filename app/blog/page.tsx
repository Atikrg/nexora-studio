import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog: Practical Guides for Startup Founders",
  description: "Practical guides on MVP development, startup websites, automation and launching faster, written by the people who build them.",
  alternates: { canonical: "/blog/" },
  openGraph: { url: "/blog/" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the build room."
        highlight="build room"
        subtitle="Practical, no-fluff guides on launching faster: what things cost, what works and what we'd do differently."
        breadcrumbs={[{ label: "Blog", href: "/blog/" }]}
      />
      <Section aria-label="All posts" className="pt-0 md:pt-0">
        <Stagger as="ul" className="flex flex-col border-t border-border">
          {posts.map((post) => (
            <StaggerItem as="li" key={post.slug} className="border-b border-border">
              <article className="group/post relative grid gap-4 py-10 md:grid-cols-12 md:gap-8">
                <div className="flex flex-col gap-2 md:col-span-3">
                  <time dateTime={post.date} className="eyebrow">
                    {formatPostDate(post.date)}
                  </time>
                  <span className="text-small text-muted-foreground">{post.readingMinutes} min read</span>
                </div>
                <div className="flex flex-col gap-4 md:col-span-8">
                  <h2 className="text-h3">
                    <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 group-hover/post:text-signal">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground">{post.description}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Tags">
                    {post.tags.map((t) => (
                      <li key={t}>
                        <Badge variant="label">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowUpRight aria-hidden="true" className="hidden size-7 justify-self-end transition-transform group-hover/post:translate-x-1 group-hover/post:-translate-y-1 md:col-span-1 md:block" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CtaSection />
    </>
  );
}
