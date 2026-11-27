import type { InsightArticle } from "../types";

export const enquiryToInvoiceArticle: InsightArticle = {
  slug: "from-customer-enquiry-to-invoice",
  title: "From Customer Enquiry to Invoice",
  seoTitle: "From Customer Enquiry to Invoice | Pakish Institute",
  description: "A classroom workflow for turning a customer enquiry into a qualified brief, an approved invoice and an independently verified payment status.",
  excerpt: "Practise handing a conversation from support to sales and billing. A price enquiry can reach a human, wait for missing details or progress to invoicing.",
  directAnswer: "Record the customer’s request, qualify the scope, and get approval before billing. Keep the agreed scope, the invoice and the payment record distinct so that a teammate can see what is outstanding.",
  author: "Pakish.ORG Editorial",
  publishedAt: "2026-11-27",
  updatedAt: "2026-11-27",
  category: "generative-ai",
  tags: ["generative-ai","freelancing","business"],
  sections: [
    {
      type: "h2",
      content: "1. Hand the enquiry to a person",
    },
    {
      type: "p",
      content: "Classroom scenario: a fictional bakery asks, “Can you build a two-language menu by Friday?” The assistant can capture the request. Delivery dates and fees need a person who can commit the team. Read [Sami’s WhatsApp agent scope](https://sami.com.pk/desk/custom-ai-sales-agent-whatsapp) and write the point where the assistant should hand the conversation to staff.",
    },
    {
      type: "p",
      content: "Sample reply: “I have noted the two languages and your Friday target. Which languages do you need, and are the menu text and photos ready? Our project lead will confirm the schedule after reviewing those details.” The record now has an owner and a next action.",
    },
    {
      type: "h2",
      content: "2. Decide whether the brief is ready to quote",
    },
    {
      type: "p",
      content: "Use [Afifa’s CRM lead qualification example](https://afifasulehri.com/desk/crm-lead-qualification-automation) to decide what a salesperson needs. For the bakery, record the requested deliverable, content owner, deadline and decision-maker. Assign the lead to the project lead with a due date for follow-up. If the menu has not arrived, keep the scope open.",
    },
    {
      type: "p",
      content: "Once the owner supplies the files, draft a quote describing the two language versions, the review round and the delivery date. Mark the quote accepted only after the authorised customer contact agrees to those terms. Save the acceptance with the quote reference.",
    },
    {
      type: "h2",
      content: "3. Distinguish an issued invoice from a received payment",
    },
    {
      type: "p",
      content: "Read [LuraFlow’s invoices and payments documentation](https://luraflow.com/docs/billing-finance/invoices-payments). On your practice sheet, give the sample invoice a reference, amount, currency, due date and balance. Assign a finance reviewer. A customer message saying “paid” is a prompt for the reviewer to check the receipt or provider record.",
    },
    {
      type: "ul",
      items: [
        "Enquiry received — support owner — next action: collect menu languages and files.",
        "Scope accepted — project lead — evidence: customer-approved quote and delivery date.",
        "Invoice issued — billing owner — evidence: sample document with an outstanding balance.",
        "Payment confirmed — finance reviewer — evidence: a matching settled payment reference and amount. A partial payment leaves a remaining balance.",
      ],
    },
    {
      type: "h2",
      content: "Check the handoff",
    },
    {
      type: "p",
      content: "Hand the sheet to someone who has not read the conversation. Ask them who owns the next action if the customer changes the deadline after accepting the quote, and what evidence would let finance mark the invoice paid. A complete answer routes the scope change back to the project lead and leaves the balance open until payment is verified.",
    },
    {
      type: "p",
      content: "Use fictional names and references throughout. Complete this exercise on paper without sending messages, issuing invoices or posting payments. For the design brief that comes before implementation, try the [generative AI roadmap](/insights/generative-ai-skills-roadmap-women-pakistan).",
    },
  ],
};
