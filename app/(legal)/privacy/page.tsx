import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/shared/legal-page";
import { site } from "@/data/site";
import { mailtoUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal data when you use this website or work with us.`,
  alternates: { canonical: "/privacy/" },
  openGraph: { url: "/privacy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle={`How ${site.name} collects, uses and protects your information.`}
      updated="10 October 2026"
      breadcrumbs={[{ label: "Privacy Policy", href: "/privacy/" }]}
    >
      <LegalSection n="01" id="who-we-are" title="Who we are">
        <p>
          {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a founder-led digital
          studio based in {site.location.city}, {site.location.region}, {site.location.country}. We build websites,
          mobile apps, social media and automation for startups. For any privacy question, contact us at{" "}
          <a href={mailtoUrl("Privacy request")}>{site.contact.email}</a>.
        </p>
      </LegalSection>

      <LegalSection n="02" id="data-we-collect" title="Data we collect">
        <p>We only collect what we need to respond to you and run the studio. This includes:</p>
        <ul>
          <li>
            <strong>Contact details</strong> you submit through forms or booking links: name, email address, phone or
            WhatsApp number, company and the details of your project.
          </li>
          <li>
            <strong>Usage data</strong> collected in aggregate by our privacy-friendly analytics (pages viewed, referrer
            and a coarse location). We do not use invasive tracking or advertising cookies.
          </li>
          <li>
            <strong>Correspondence</strong> you send us by email, WhatsApp or through your client workspace.
          </li>
        </ul>
        <p>We do not knowingly collect sensitive personal data or data from children.</p>
      </LegalSection>

      <LegalSection n="03" id="how-we-use-it" title="How we use your data">
        <ul>
          <li>To reply to your enquiry and prepare a proposal or quote.</li>
          <li>To deliver the services you engage us for, and to communicate about the project.</li>
          <li>To send invoices and comply with accounting and tax obligations.</li>
          <li>To improve the website and understand which pages are useful.</li>
        </ul>
        <p>We never sell your personal data, and we do not send marketing email unless you ask us to.</p>
      </LegalSection>

      <LegalSection n="04" id="cookies" title="Cookies and analytics">
        <p>
          The site uses a small number of essential cookies to remember your choices (such as your theme and cookie
          consent). Analytics run through a privacy-friendly, cookieless service (Plausible) and load only in production
          and only after you consent. You can change or withdraw your consent at any time using the cookie controls in
          the footer.
        </p>
      </LegalSection>

      <LegalSection n="05" id="third-parties" title="Third parties we share data with">
        <p>We share the minimum necessary with trusted processors, including:</p>
        <ul>
          <li>Hosting and content delivery providers that serve this website.</li>
          <li>A scheduling tool (Cal.com) when you book a call.</li>
          <li>
            WhatsApp and email providers, when you choose to message us on those channels, subject to their own privacy
            terms.
          </li>
          <li>Our analytics provider, which processes aggregate, non-identifying usage data.</li>
        </ul>
        <p>Each processor is bound to handle your data only on our instructions.</p>
      </LegalSection>

      <LegalSection n="06" id="your-rights" title="Your rights">
        <p>
          Depending on where you live, you may have the right to access, correct, delete or restrict the processing of
          your personal data, to object to processing, and to data portability. Users in India have rights under the
          Digital Personal Data Protection Act, 2023; users in the EU/UK have rights under the GDPR. To exercise any
          right, email{" "}
          <a href={mailtoUrl("Privacy request")}>{site.contact.email}</a> and we will respond within the timeframe the
          law requires.
        </p>
      </LegalSection>

      <LegalSection n="07" id="retention" title="Retention">
        <p>
          We keep enquiries for as long as needed to deal with them, and client project records for the period required
          by tax and contract law. When data is no longer needed, we delete or anonymise it.
        </p>
      </LegalSection>

      <LegalSection n="08" id="security" title="Security">
        <p>
          We use reasonable technical and organisational measures to protect your data, including encryption in transit
          and access controls. No method of transmission or storage is completely secure, so we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection n="09" id="changes" title="Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be reflected in the &ldquo;last
          updated&rdquo; date above. Continued use of the site after an update means you accept the revised policy.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
