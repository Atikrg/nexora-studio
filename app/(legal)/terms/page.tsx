import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/shared/legal-page";
import { site } from "@/data/site";
import { mailtoUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern projects and engagements with ${site.name}: scope, payment, revisions, ownership and liability.`,
  alternates: { canonical: "/terms/" },
  openGraph: { url: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle={`The terms that govern your engagement with ${site.name}.`}
      updated="10 October 2026"
      breadcrumbs={[{ label: "Terms of Service", href: "/terms/" }]}
    >
      <LegalSection n="01" id="agreement" title="Agreement">
        <p>
          These terms apply to services provided by {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;). By engaging us, signing a proposal or paying an invoice, you (&ldquo;the client&rdquo;)
          agree to these terms. Where a signed proposal or statement of work conflicts with these terms, the signed
          document prevails.
        </p>
      </LegalSection>

      <LegalSection n="02" id="services" title="Services and proposals">
        <p>
          We provide design and development services for websites, mobile apps, social media and automation. Every
          project starts from a written proposal that sets out the scope, deliverables, timeline and price. Quotations
          are valid for 14 days unless stated otherwise. Work outside the agreed scope is handled as a change request.
        </p>
      </LegalSection>

      <LegalSection n="03" id="fees" title="Fees and payment">
        <ul>
          <li>Projects typically begin with a booking deposit (commonly 50%), with the balance payable at defined milestones or on delivery.</li>
          <li>Fees are exclusive of applicable taxes, including GST, which are added where required.</li>
          <li>Invoices are due within 7 days unless the proposal says otherwise. We may pause work on overdue invoices.</li>
          <li>Third-party costs (domains, hosting, licences, paid APIs) are billed at cost plus any stated handling fee.</li>
        </ul>
      </LegalSection>

      <LegalSection n="04" id="client-responsibilities" title="Client responsibilities">
        <p>To keep projects on schedule, the client agrees to:</p>
        <ul>
          <li>Provide content, brand assets, access and feedback within the agreed timeframes.</li>
          <li>Nominate a single decision-maker for approvals.</li>
          <li>Ensure that any material supplied to us does not infringe third-party rights.</li>
        </ul>
        <p>Delays in these responsibilities may extend the timeline and, where significant, may incur rescheduling fees.</p>
      </LegalSection>

      <LegalSection n="05" id="revisions" title="Revisions and change requests">
        <p>
          Each project includes a defined number of revision rounds. Additional changes, new features or rework caused by
          a change in direction are quoted separately and may affect the timeline. We will always confirm the impact in
          writing before starting out-of-scope work.
        </p>
      </LegalSection>

      <LegalSection n="06" id="timelines" title="Timelines">
        <p>
          Timelines are estimates made in good faith and depend on timely feedback and approvals from the client. We are
          not liable for delays caused by factors outside our reasonable control.
        </p>
      </LegalSection>

      <LegalSection n="07" id="intellectual-property" title="Intellectual property">
        <p>
          On full payment, ownership of the final deliverables created specifically for the client transfers to the
          client. We retain ownership of our pre-existing tools, frameworks, components and know-how, and we grant the
          client a licence to use them as embedded in the deliverables. Unless the client asks otherwise in writing, we
          may show the work in our portfolio and marketing.
        </p>
      </LegalSection>

      <LegalSection n="08" id="confidentiality" title="Confidentiality">
        <p>
          Each party will keep the other&rsquo;s confidential information private and use it only to perform the
          engagement. We are happy to sign a mutual NDA on request.
        </p>
      </LegalSection>

      <LegalSection n="09" id="warranty" title="Warranty and support">
        <p>
          We warrant that deliverables will substantially conform to the agreed scope. Unless the proposal states
          otherwise, we provide 30 days of bug-fix support after launch for issues arising from our work. Support does
          not cover new features, content changes, third-party outages or changes made by others.
        </p>
      </LegalSection>

      <LegalSection n="10" id="liability" title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, our total liability arising from the engagement is limited to the fees
          paid by the client for the affected project. We are not liable for indirect or consequential losses, including
          lost profits, data or business opportunity.
        </p>
      </LegalSection>

      <LegalSection n="11" id="termination" title="Termination">
        <p>
          Either party may terminate an engagement in writing. On termination, the client pays for work completed and
          costs committed up to that date, and we hand over the work completed so far. Deposits are governed by our{" "}
          <a href="/refund-policy/">Refund Policy</a>.
        </p>
      </LegalSection>

      <LegalSection n="12" id="law" title="Governing law and disputes">
        <p>
          These terms are governed by the laws of India. The courts at {site.location.city}, {site.location.region}{" "}
          have exclusive jurisdiction. The parties will first try to resolve any dispute amicably before starting legal
          proceedings.
        </p>
        <p>
          Questions about these terms? Email <a href={mailtoUrl("Terms question")}>{site.contact.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
