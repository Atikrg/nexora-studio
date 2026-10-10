import { founder } from "@/data/founder";
import { site } from "@/data/site";

/** Organization + WebSite structured data, rendered once in the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  logo: {
    "@type": "ImageObject",
    url: new URL("/icon.svg", site.url).toString(),
  },
  email: site.contact.email,
  founder: { "@type": "Person", name: founder.name, jobTitle: founder.role },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  sameAs: site.social.map((s) => s.href),
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
} as const;
