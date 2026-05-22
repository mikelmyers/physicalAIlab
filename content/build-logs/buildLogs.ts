import type { BuildLog } from "../../src/lib/types";

export const seedBuildLogs: BuildLog[] = [
  {
    slug: "lab-initialized",
    title: "Physical AI Lab Initialized",
    date: "2026-05-22",
    summary:
      "The first version of the lab was scaffolded with curriculum tracks, MDX lessons, project pages, and local progress tracking.",
    tags: ["platform", "curriculum", "mvp"],
    visibility: "public",
  },
];
