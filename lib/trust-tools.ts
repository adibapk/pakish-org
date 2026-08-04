import type { icons } from "lucide-react";

export interface TrustTool {
  /** Display name of the tool or platform. */
  name: string;
  /** Lucide icon used as a generic visual cue (not a reproduction of the brand mark). */
  icon: keyof typeof icons;
}

/**
 * Technologies and platforms that appear across the Pakish.ORG curriculum.
 * These are tools students learn to use, not corporate sponsors or partners.
 */
export const trustTools: TrustTool[] = [
  { name: "WordPress", icon: "Globe" },
  { name: "GitHub", icon: "FolderGit2" },
  { name: "Next.js", icon: "Component" },
  { name: "React", icon: "Atom" },
  { name: "OpenAI", icon: "Bot" },
  { name: "Canva", icon: "Palette" },
  { name: "Figma", icon: "PenTool" },
  { name: "Cursor", icon: "MousePointer2" },
  { name: "Git", icon: "GitBranch" },
  { name: "cPanel", icon: "Server" },
];
