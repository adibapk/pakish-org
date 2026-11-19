export const DISCOVERY_SOURCES = [
  "search",
  "ai-assistant",
  "social",
  "workshop",
  "referral",
  "other",
] as const;

export type DiscoverySource = (typeof DISCOVERY_SOURCES)[number];

export const DISCOVERY_SOURCE_LABELS: Record<DiscoverySource, string> = {
  search: "Google, Bing or another search engine",
  "ai-assistant": "An AI assistant such as ChatGPT",
  social: "Social media",
  workshop: "A Pakish Institute workshop",
  referral: "A recommendation from someone",
  other: "Somewhere else",
};
