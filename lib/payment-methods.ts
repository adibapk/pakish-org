/**
 * Shared company payment channels (same as Pakish.NET).
 * Structured for future student portal / enrollment / payment tracking.
 */

export const PAYMENT_CONFIRMATION = {
  whatsappDisplay: "0300-8222456",
  whatsappE164: "923008222456",
  /** Preferred billing inbox for fee receipts */
  emailPreferred: "billing@pakish.org",
  emailAlternative: "help@pakish.org",
  prefillMessage:
    "Hello Pakish Institute, I have paid my course fee. Student name: ____. Course: ____. Campus/mode: ____. Amount: ____. Transaction ID / reference: ____.",
} as const;

export type PaymentField = {
  label: string;
  value: string;
  copyable?: boolean;
};

export type QrPaymentMethod = {
  id: string;
  kind: "qr";
  title: string;
  badge: string;
  description: string;
  fields: PaymentField[];
  note: string;
  qrImageSrc: string;
  qrImageAlt: string;
  qrDownloadName: string;
  qrDownloadAriaLabel: string;
  qrCaption: string;
};

/** Local bank + wallet QR methods (company accounts). */
export const QR_PAYMENT_METHODS: QrPaymentMethod[] = [
  {
    id: "meezan-bank",
    kind: "qr",
    title: "Meezan Bank Transfer",
    badge: "Bank Transfer",
    description:
      "Direct bank transfer — suitable for larger course fee payments.",
    fields: [
      { label: "Account Title", value: "Pakish Group" },
      { label: "Account No.", value: "0150-0101991-445" },
      { label: "IBAN", value: "PK34MEZN0001500101991445" },
    ],
    note: "Scan & pay to PAKISH GROUP-1445 via Meezan Mobile Banking.",
    qrImageSrc: "/images/bank-qr-codes/meezan-qr-code.png",
    qrImageAlt: "Meezan Bank QR code for Pakish Group course fee payment",
    qrDownloadName: "pakish-meezan-bank-qr-code.png",
    qrDownloadAriaLabel: "Download Meezan Bank QR code",
    qrCaption: "Scan to pay via Meezan Bank.",
  },
  {
    id: "jazzcash-raast",
    kind: "qr",
    title: "JazzCash / Raast",
    badge: "Mobile Wallet",
    description:
      "Pay instantly via the JazzCash app or by dialing *786*0# on any mobile.",
    fields: [
      { label: "Account Title", value: "Pakish Group" },
      { label: "TILL ID", value: "980805031" },
      { label: "Dial code", value: "*786*0#" },
    ],
    note: "Use JazzCash App → Send Money → Pay to TILL, or dial *786*0#.",
    qrImageSrc: "/images/bank-qr-codes/jazzcash-qr-code.png",
    qrImageAlt: "JazzCash and Raast QR code for Pakish Group course fee payment",
    qrDownloadName: "pakish-jazzcash-raast-qr-code.png",
    qrDownloadAriaLabel: "Download JazzCash Raast QR code",
    qrCaption: "Scan to pay via JazzCash / Raast or use TILL ID 980805031.",
  },
  {
    id: "paypal",
    kind: "qr",
    title: "PayPal Payment",
    badge: "International",
    description:
      "Pay securely with PayPal — useful for international or overseas fee payments in USD.",
    fields: [
      { label: "Payment Method", value: "PayPal", copyable: false },
      { label: "Best For", value: "International fee payments", copyable: false },
      {
        label: "After payment",
        value: "Send screenshot to WhatsApp or billing email",
        copyable: false,
      },
    ],
    note: "After paying via PayPal, share your receipt with student name and course so we can confirm your admission.",
    qrImageSrc: "/images/bank-qr-codes/paypal-qr-code.png",
    qrImageAlt: "PayPal QR code for Pakish course fee payment",
    qrDownloadName: "pakish-paypal-qr-code.png",
    qrDownloadAriaLabel: "Download PayPal QR code",
    qrCaption: "Scan to pay via PayPal.",
  },
];

/** Company Payoneer recipient (same as Pakish.NET). */
export const PAYONEER = {
  recipientEmail: "billing@pakish.net",
  paymentPath: "Pay → Pay to a recipient’s Payoneer account",
  referenceHint:
    "Enter your student name and course in the payment description",
  confirmationHint:
    "Send the Transaction ID and receipt on WhatsApp or email",
} as const;

export const STUDENT_PAYMENT_STEPS = [
  {
    step: "1",
    title: "Pay your course fee",
    body: "Pay your course fee using any available payment method.",
  },
  {
    step: "2",
    title: "Share payment proof",
    body: "Send your payment screenshot/receipt on WhatsApp or email.",
  },
  {
    step: "3",
    title: "Verification",
    body: "Our team will verify your payment and confirm your admission.",
  },
  {
    step: "4",
    title: "Next steps",
    body: "You will receive your class schedule and next steps.",
  },
] as const;

export function buildPaymentWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(
    message ?? PAYMENT_CONFIRMATION.prefillMessage
  );
  return `https://wa.me/${PAYMENT_CONFIRMATION.whatsappE164}?text=${text}`;
}
