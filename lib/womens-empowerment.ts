import { GATHERING_INTEREST_CONTACT_PATH } from "@/lib/contact-subjects";

export const WOMENS_EMPOWERMENT_PATH = "/womens-empowerment";

export const FEE_SUPPORT_ADMISSION_PATH =
  "/admission?source=womens-empowerment&support=fee-support";

export const WOMENS_EMPOWERMENT_CONTENT = {
  metaTitle: "Women's Empowerment Through Digital Skills | Pakish Institute",
  metaDescription:
    "Gatherings, skills workshops, mentorship, and limited need-based fee support for eligible women pursuing digital careers at Pakish Institute.",
  h1: "Women's Empowerment Through Digital Skills",
  heroDescription:
    "A dedicated Pakish Institute initiative helping women build confidence, practical skills, professional networks, and pathways into digital work.",
  purpose:
    "Women's Empowerment brings together community gatherings, orientation sessions, skills workshops, mentorship, and career guidance — alongside a limited, eligibility-reviewed fee-support pathway for women who need financial assistance to join commercial courses.",
  activities: [
    {
      title: "Community gatherings",
      description:
        "Orientation sessions and peer meetups focused on confidence, career direction, and practical next steps in tech and digital work.",
    },
    {
      title: "Skills workshops",
      description:
        "Focused sessions on digital literacy, AI tools, portfolio building, and professional communication.",
    },
    {
      title: "Mentorship & guidance",
      description:
        "Access to mentors from the Pakish Group family for feedback, accountability, and realistic career planning.",
    },
    {
      title: "Need-based fee support",
      description:
        "Limited seats may be available for eligible women after individual review. Support depends on need, eligibility, and available resources.",
    },
  ],
  feeSupportEligibility: [
    "You are a woman seeking practical digital skills training through Pakish Institute courses.",
    "You understand that fee support is limited, need-based, and subject to review — not guaranteed.",
    "You can provide accurate information about your situation and consent to the review process described in our privacy notice.",
    "You agree that approved support covers course fees only as confirmed by the admissions team.",
  ],
  gatheringInterestPath: GATHERING_INTEREST_CONTACT_PATH,
} as const;
