export interface CampusNeed {
  item: string;
  quantity?: string;
}

export interface CampusData {
  slug: string;
  shortName: string;
  location: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  needs: CampusNeed[];
  donated: string[];
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  ogKey: string;
}

export const karachiCampus: CampusData = {
  slug: "gulshan-e-iqbal",
  shortName: "Karachi",
  location: "Gulshan-e-Iqbal, Main University Road, Karachi",
  streetAddress: "Main University Road, Gulshan-e-Iqbal",
  addressLocality: "Karachi",
  addressRegion: "Sindh",
  heroTitle: "AI & IT Courses for Women in Karachi",
  heroSubtitle:
    "Gulshan-e-Iqbal, Main University Road — professional IT & AI training for women and youth in Karachi",
  aboutTitle: "About the Karachi Campus",
  aboutParagraphs: [
    "Our Gulshan-e-Iqbal campus on Main University Road serves women and youth across Karachi with professional IT, Generative AI, and digital freelancing programs. Standard enrollment fees apply; limited free or subsidized seats are available for eligible learners under the Fi Sabilillah quota. Enrolled students learn in a supported workspace with mentorship from the Pakish Group family.",
    "This campus is a cornerstone of Pakish.ORG's Fi Sabilillah Initiative — turning decades of Pakish Group software experience into community empowerment for Pakistan's largest city.",
  ],
  needs: [
    { item: "Laptops", quantity: "20" },
    { item: "Tables" },
    { item: "Chairs" },
    { item: "Fans" },
    { item: "Solar system components" },
  ],
  donated: ["5kVA Generator — donated by Pakish Group"],
  metaTitle: "AI Courses in Karachi for Women | Pakish.ORG",
  metaDescription:
    "Join practical AI, IT, web development and freelancing courses for women at Pakish.ORG in Gulshan-e-Iqbal, Karachi. Fee-based; support may be available.",
  primaryKeyword: "AI courses in Karachi for women",
  ogKey: "campus-gulshan-e-iqbal",
};

export const lodhranCampus: CampusData = {
  slug: "lodhran",
  shortName: "Lodhran",
  location: "Chak No. 319, Dunyapur, Lodhran",
  streetAddress: "Chak No. 319, Dunyapur",
  addressLocality: "Lodhran",
  addressRegion: "Punjab",
  heroTitle: "IT & AI Courses for Women in Lodhran",
  heroSubtitle: "Chak No. 319, Dunyapur — bringing tech education to South Punjab",
  aboutTitle: "About the Lodhran Campus",
  aboutParagraphs: [
    "Our Lodhran campus at Chak No. 319, Dunyapur brings Pakish.ORG's mission to South Punjab — offering women and youth access to IT training, Generative AI skills, and work-from-home career pathways.",
    "As part of the Fi Sabilillah Initiative, this campus provides a safe, equipped learning environment where rural communities can bridge the tech gender gap with hands-on mentorship.",
  ],
  needs: [
    { item: "Laptops", quantity: "20" },
    { item: "Tables" },
    { item: "Chairs" },
    { item: "Fans" },
    { item: "Solar system components" },
  ],
  donated: ["5kVA Generator — donated by Pakish Group"],
  metaTitle: "IT Courses in Lodhran for Women | Pakish.ORG",
  metaDescription:
    "Join practical IT, AI and freelancing courses for women at Pakish.ORG in Dunyapur, Lodhran. Mentor-led training with fee-based and supported options.",
  primaryKeyword: "IT courses in Lodhran for women",
  ogKey: "campus-lodhran",
};
