import type { CourseCatalogueGroup } from "./types";

export interface CatalogueGroupMeta {
  id: CourseCatalogueGroup;
  title: string;
  description: string;
}

export const CATALOGUE_GROUPS: CatalogueGroupMeta[] = [
  {
    id: "technology-digital",
    title: "Technology & Digital Skills",
    description:
      "Core IT, AI, web, cloud, WordPress, and digital career programs.",
  },
  {
    id: "professional-skills",
    title: "Professional Skills",
    description:
      "Communication and career-facing programs that complement our technology courses.",
  },
];

export const DEFAULT_CATALOGUE_GROUP: CourseCatalogueGroup =
  "technology-digital";
