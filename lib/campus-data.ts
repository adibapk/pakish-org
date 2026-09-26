export type CampusStatus = "operational" | "planned";

export interface CampusNeed {
  item: string;
  quantity?: string;
}

export interface CampusData {
  slug: string;
  shortName: string;
  status: CampusStatus;
  location: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  needs?: CampusNeed[];
  donated?: string[];
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  ogKey: string;
  /** Planned-campus status bullets (no classes, admissions, etc.). */
  operationalStatus?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export const karachiCampus: CampusData = {
  slug: "gulshan-e-iqbal",
  shortName: "Karachi",
  status: "operational",
  location: "Gulshan-e-Iqbal, Main University Road, Karachi",
  streetAddress: "Main University Road, Gulshan-e-Iqbal",
  addressLocality: "Karachi",
  addressRegion: "Sindh",
  heroTitle: "IT & AI Courses in Gulshan-e-Iqbal, Karachi",
  heroSubtitle:
    "Professional technology training at our Gulshan-e-Iqbal campus on Main University Road — live cohorts when scheduled.",
  aboutTitle: "About the Karachi Campus",
  aboutParagraphs: [
    "Our Gulshan-e-Iqbal campus on Main University Road serves learners across Karachi with professional IT, AI, web development, cloud, and digital freelancing programs. Training is fee-based with transparent quotes; cohort schedules are confirmed during admission counseling.",
    "Backed by Pakish Group since 1999, this campus offers equipped workspaces, mentor support, and the same six-course catalogue available through live online and team training formats.",
  ],
  needs: [
    { item: "Laptops", quantity: "20" },
    { item: "Tables" },
    { item: "Chairs" },
    { item: "Fans" },
    { item: "Solar system components" },
  ],
  donated: ["5kVA Generator — contributed by Pakish Group"],
  metaTitle: "IT & AI Courses in Gulshan-e-Iqbal, Karachi | Pakish Institute",
  metaDescription:
    "Professional AI, IT, web development and freelancing courses at Pakish Institute in Gulshan-e-Iqbal, Karachi. Live cohorts when scheduled.",
  primaryKeyword: "IT and AI courses in Gulshan-e-Iqbal Karachi",
  ogKey: "campus-gulshan-e-iqbal",
};

export const lodhranCampus: CampusData = {
  slug: "lodhran",
  shortName: "Lodhran",
  status: "planned",
  location: "Chak No. 319, Dunyapur, Lodhran",
  streetAddress: "Chak No. 319, Dunyapur",
  addressLocality: "Lodhran",
  addressRegion: "Punjab",
  heroTitle: "Our Future Plan for a Lodhran Digital Skills Campus",
  heroSubtitle:
    "Pakish Institute has land available at Chak No. 319, Dunyapur, Lodhran and is assessing a future rural digital-skills campus to support underserved communities in South Punjab.",
  aboutTitle: "Future campus planning",
  aboutParagraphs: [
    "Pakish Institute is planning and assessing a future digital-skills campus at Chak No. 319, Dunyapur, Lodhran. The long-term intent is to expand practical IT and AI training access for rural learners and local communities when facilities and operations are ready.",
    "This page describes a future initiative only. Pakish Institute does not promise admissions, scholarships, jobs, or an opening date for Lodhran. Verified updates will be published when the campus is operational.",
  ],
  operationalStatus: [
    "No current classes or cohort schedules at Lodhran",
    "No admissions, campus visits, or opening date announced",
    "Live online courses and Karachi campus remain the current delivery options",
  ],
  primaryCta: { label: "Explore Live Online Courses", href: "/courses" },
  secondaryCta: {
    label: "Register Interest in the Future Plan",
    href: "/?subject=lodhran-future-plan#contact",
  },
  metaTitle: "Planned Lodhran Digital Skills Campus | Pakish Institute",
  metaDescription:
    "Pakish Institute is assessing a future digital-skills campus at Chak No. 319, Dunyapur, Lodhran. No classes or admissions are open yet.",
  primaryKeyword: "planned Lodhran digital skills campus",
  ogKey: "campus-lodhran",
};

export const operationalCampuses = [karachiCampus];
