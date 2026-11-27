import type { InsightArticle } from "../types";

export const websiteHandoverArticle: InsightArticle = {
  slug: "how-to-hand-over-a-client-website",
  title: "How to Hand Over a Client Website",
  seoTitle: "How to Hand Over a Client Website | Pakish Institute",
  description: "A reusable handover sheet for freelancers covering domain ownership, renewals, DNS, backups, support and a client acceptance check.",
  excerpt: "Your client can open the new website. Can they renew the domain, restore a backup and find help when your contract ends? Use this sheet to hand over those responsibilities.",
  directAnswer: "Give the client a record of each service, its owner, renewal terms, recovery route and the last check you performed together. Keep credentials in the approved password manager and give the client a copy of the handover sheet.",
  author: "Pakish.ORG Editorial",
  publishedAt: "2026-11-27",
  updatedAt: "2026-11-27",
  category: "freelancing",
  tags: ["freelancing","wordpress","dns"],
  sections: [
    {
      type: "h2",
      content: "Start with the account the client controls",
    },
    {
      type: "p",
      content: "Imagine a Karachi freelancer handing a shop back to its owner. The owner can edit products, but the renewal emails still go to the freelancer. Before sign-off, have the owner sign in to the registrar and confirm the billing and recovery contacts. Record who completed the check and when. Use a role address the client will retain.",
    },
    {
      type: "h2",
      content: "Copy this handover sheet",
    },
    {
      type: "p",
      content: "Make a copy of these fields for each client. Use account references your client recognises. Share access separately through their approved credential manager.",
    },
    {
      type: "ul",
      items: [
        "Domain and owner — name, extension, registrar, client account owner, renewal contact and expiry date.",
        "Renewal — first-term amount, renewal amount, currency, billing interval and date checked. Mark a missing rate “to confirm”.",
        "DNS and email — authoritative nameservers, DNS operator, web and mail records to preserve, and location of the saved zone copy.",
        "Hosting and backups — hosting account owner, backup schedule, restore contact and dated evidence of the last test restore.",
        "Support and acceptance — who handles updates, customer support channel, service hours if confirmed, open questions and client sign-off date.",
      ],
    },
    {
      type: "h2",
      content: "Use a different part of the sheet for each client brief",
    },
    {
      type: "p",
      content: "For a UK shop, use [Webiost’s .co.uk registration page](https://webiost.com/domains/co-uk) to identify the extension the owner wants. Ask who should control the account and receive expiry notices. For a Canadian WordPress shop, use [WebCAA’s managed WordPress scope](https://webcaa.com/hosting/managed-wordpress-hosting) to separate the host’s maintenance duties from the freelancer’s plugin and content duties. Record any ambiguous responsibility as a question for support.",
    },
    {
      type: "p",
      content: "When the DNS service is separate from the web host, read [NamePo’s DNS management description](https://namepo.com/dnspro-managment) and enter the DNS operator in its own field. Ask the account holder for a zone export or documented equivalent before a change. For the finance field, use [ApnaDomain’s domain pricing table](https://apnadomain.net/en/domain-registration/domain-registration-price.php) and record the extension, term, currency and the renewal price displayed. A promotional first-year figure alone leaves the renewal field unanswered.",
    },
    {
      type: "p",
      content: "For a Pakistani shared-hosting brief, use [Razia’s shared hosting page](https://razia.pk/shared-hosting) to identify the proposed plan and the support path. Ask how a client requests a restore and what evidence will show it worked. These are provider examples. Use the client’s own contract and account settings to complete the final sheet.",
    },
    {
      type: "p",
      content: "For a second domain and hosting comparison, check [Samina.pk](https://samina.pk/) and [Qaseem.pk](https://qaseem.pk/) for publicly listed services. For each provider, record whether you can confirm who manages domain renewals, DNS and hosting support. If a site is temporarily unavailable or a detail is missing, mark that field as pending.",
    },
    {
      type: "h2",
      content: "Rehearse the handover",
    },
    {
      type: "p",
      content: "Sample entry: “Bakery demo, client owns the domain, accounts lead checks the renewal date, freelancer manages web releases until sign-off. Last test: client opened the restored staging menu on a phone. Open item: client to confirm who receives backup alerts.” Replace each sample detail with evidence from your own handover.",
    },
    {
      type: "p",
      content: "Ask the client to find their next renewal and explain who would restore the site tomorrow. File their answers and any unresolved questions with the sheet. For DNS-specific practice, use the [portfolio infrastructure exercise](/insights/domain-infrastructure-and-women-empowerment).",
    },
  ],
};
