import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/shared/legal-page";
import { site } from "@/data/site";
import { mailtoUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How deposits, milestone payments and cancellations are handled for projects with ${site.name}.`,
  alternates: { canonical: "/refund-policy/" },
  openGraph: { url: "/refund-policy/" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      subtitle={`How deposits, milestone payments and cancellations are handled at ${site.name}.`}
      updated="10 October 2026"
      breadcrumbs={[{ label: "Refund Policy", href: "/refund-policy/" }]}
    >
      <LegalSection n="01" id="overview" title="Overview">
        <p>
          We keep pricing transparent and scopes tight so refunds are rarely needed. This policy explains what happens to
          money paid to {site.legalName} (&ldquo;{site.name}&rdquo;) if a project is cancelled or changed. It should be
          read together with our <a href="/terms/">Terms of Service</a>.
        </p>
      </LegalSection>

      <LegalSection n="02" id="deposits" title="Booking deposits">
        <p>
          A booking deposit reserves your place in our schedule and covers discovery, planning and the first phase of
          work. Once work has started, the deposit is generally non-refundable because it pays for time and capacity we
          have already committed.
        </p>
      </LegalSection>

      <LegalSection n="03" id="milestones" title="Milestone payments">
        <p>
          Milestone payments cover work delivered up to that stage. If a project is cancelled after a milestone has been
          paid, we will assess the work completed beyond that milestone and may issue a partial refund for the
          undelivered portion, less any committed third-party costs.
        </p>
      </LegalSection>

      <LegalSection n="04" id="client-cancellation" title="Cancelling a project">
        <p>If you cancel:</p>
        <ul>
          <li>Before work starts, we refund the deposit in full, minus payment-gateway charges actually incurred.</li>
          <li>
            After work starts, we invoice for completed and in-progress work up to the cancellation date and refund any
            balance of payments received.
          </li>
          <li>Approved, non-recoverable third-party costs (domains, licences, ad spend) are not refundable.</li>
        </ul>
      </LegalSection>

      <LegalSection n="05" id="our-cancellation" title="If we cancel">
        <p>
          If we cannot complete a project for reasons within our control, we refund all fees paid for work not yet
          delivered and, where possible, help transition the work to another provider.
        </p>
      </LegalSection>

      <LegalSection n="06" id="non-refundable" title="Non-refundable items">
        <ul>
          <li>Payments for completed and approved milestones or delivered files.</li>
          <li>Third-party costs already purchased on your behalf.</li>
          <li>Consultation or audit sessions that have already taken place.</li>
          <li>Payments for services delivered under a separate written agreement with its own refund terms.</li>
        </ul>
      </LegalSection>

      <LegalSection n="07" id="how-to-request" title="How to request a refund">
        <p>
          Email <a href={mailtoUrl("Refund request")}>{site.contact.email}</a> with your project name, invoice reference
          and the reason for your request. We will acknowledge your request within 3 business days and complete our
          assessment within 14 days. Approved refunds are returned to the original payment method within 7&ndash;10
          business days of approval.
        </p>
      </LegalSection>

      <LegalSection n="08" id="chargebacks" title="Chargebacks">
        <p>
          Please contact us before raising a chargeback, so we can resolve the issue directly. Raising a chargeback
          without contacting us may pause active work and affect any goodwill arrangement.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
