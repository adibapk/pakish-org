export interface CampusNeed {
  item: string;
  quantity?: string;
}

export interface CampusData {
  slug: string;
  shortName: string;
  location: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  needs: CampusNeed[];
  donated: string[];
  metaTitle: string;
  metaDescription: string;
}

export const korangiCampus: CampusData = {
  slug: "korangi",
  shortName: "Karachi",
  location: "Korangi Zaman Town, Karachi",
  heroTitle: "Korangi Zaman Town Campus",
  heroSubtitle: "Karachi, Sindh — empowering women and youth through IT & AI training",
  aboutTitle: "About the Karachi Campus",
  aboutParagraphs: [
    "Our Korangi Zaman Town campus serves women and youth across Karachi with free and subsidized IT, Generative AI, and digital freelancing programs. Students learn in a dedicated workspace with mentorship from the Pakish Group family.",
    "This campus is a cornerstone of Pakish.ORG's Fi Sabilillah Initiative — transforming a 25-year software house legacy into community empowerment for Pakistan's largest city.",
  ],
  needs: [
    { item: "Laptops", quantity: "20" },
    { item: "Tables" },
    { item: "Chairs" },
    { item: "Fans" },
    { item: "Solar system components" },
  ],
  donated: ["5kVA Generator — donated by Pakish Group"],
  metaTitle: "Karachi Campus (Korangi) | Pakish.ORG",
  metaDescription:
    "Visit Pakish.ORG's Korangi Zaman Town campus in Karachi. Support our community with laptops, furniture, fans, and solar equipment for women's IT & AI training.",
};

export const lodhranCampus: CampusData = {
  slug: "lodhran",
  shortName: "Lodhran",
  location: "Chak No. 319, Dunyapur, Lodhran",
  heroTitle: "Lodhran Campus",
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
  metaTitle: "Lodhran Campus (Dunyapur) | Pakish.ORG",
  metaDescription:
    "Support Pakish.ORG's Lodhran campus at Chak No. 319, Dunyapur. Help equip our community training center with laptops, furniture, fans, and solar power for women's IT education.",
};
