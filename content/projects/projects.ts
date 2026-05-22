import type { Project } from "../../src/lib/types";

export const projects: Project[] = [
  {
    slug: "engineering-calculator-suite",
    title: "Engineering Calculator Suite",
    description:
      "A starter project where the learner builds small calculators for circuit, drone, motion, GPS, and unit-conversion problems.",
    status: "available",
    trackSlugs: [
      "mathematical-foundations",
      "coding-foundations",
      "electronics-and-circuits",
      "drones-gis-remote-sensing",
    ],
    skills: [
      "Formula translation",
      "Python or TypeScript functions",
      "Input validation",
      "Technical documentation",
      "Unit tests",
    ],
    requirements: [
      "Ohm's Law calculator for voltage, current, and resistance.",
      "Battery runtime calculator using capacity and current draw.",
      "Drone field-of-view calculator from altitude and camera angle.",
      "GPS distance and bearing calculator.",
      "Motor RPM to linear speed calculator.",
      "Unit conversion utilities for length, mass, speed, and energy.",
    ],
    stretchGoals: [
      "Add a small web UI.",
      "Export calculation sessions as JSON.",
      "Write automated tests for each calculator.",
      "Add plotting for battery runtime and speed curves.",
    ],
    proofOfCompletion: [
      "Publish the source code.",
      "Include a README with formulas and examples.",
      "Record screenshots or terminal output for each calculator.",
      "Write a build-log entry explaining what was learned.",
    ],
    githubUrl: "https://github.com/mikelmyers/physicalAIlab",
    demoUrl: "https://example.com/demo-placeholder",
  },
];
