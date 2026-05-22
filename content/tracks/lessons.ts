import type { Lesson } from "../../src/lib/types";
import { cloudNetworkingTelemetryLessons } from "./lessons/cloud-networking-telemetry.ts";
import { codingFoundationsLessons } from "./lessons/coding-foundations.ts";
import { computerVisionLessons } from "./lessons/computer-vision.ts";
import { dronesGisRemoteSensingLessons } from "./lessons/drones-gis-remote-sensing.ts";
import { electronicsAndCircuitsLessons } from "./lessons/electronics-and-circuits.ts";
import { machineLearningAndAiLessons } from "./lessons/machine-learning-and-ai.ts";
import { mathematicalFoundationsLessons } from "./lessons/mathematical-foundations.ts";
import { mechanicalEngineeringLessons } from "./lessons/mechanical-engineering.ts";
import { mechatronicsLessons } from "./lessons/mechatronics.ts";
import { numericalMethodsLessons } from "./lessons/numerical-methods.ts";
import { optimizationLessons } from "./lessons/optimization.ts";
import { researchMethodsLessons } from "./lessons/research-methods.ts";
import { roboticsLessons } from "./lessons/robotics.ts";
import { theoreticalPhysicsLessons } from "./lessons/theoretical-physics.ts";

const existingAvailableLessons: Lesson[] = [
  {
    slug: "python-functions-for-technical-tools",
    trackSlug: "coding-foundations",
    moduleSlug: "technical-python",
    title: "Python Functions for Technical Tools",
    summary: "Package formulas into reusable functions for calculators, simulations, and lab scripts.",
    kind: "lesson",
    status: "available",
    order: 1,
    estimatedMinutes: 30,
    mdxPath: "content/lessons/python-functions-for-technical-tools.mdx",
  },
  {
    slug: "ohms-law-and-basic-circuits",
    trackSlug: "electronics-and-circuits",
    moduleSlug: "circuit-laws",
    title: "Ohm's Law and Basic Circuits",
    summary: "Relate voltage, current, and resistance, then apply the relationship to practical circuits.",
    kind: "lesson",
    status: "available",
    order: 1,
    estimatedMinutes: 35,
    mdxPath: "content/lessons/ohms-law-and-basic-circuits.mdx",
  },
  {
    slug: "what-is-mechatronics",
    trackSlug: "mechatronics",
    moduleSlug: "systems-primer",
    title: "What Is Mechatronics?",
    summary: "Understand mechatronics as the integration of mechanics, electronics, code, and control.",
    kind: "lesson",
    status: "available",
    order: 1,
    estimatedMinutes: 25,
    mdxPath: "content/lessons/what-is-mechatronics.mdx",
  },
  {
    slug: "introduction-to-coordinate-systems",
    trackSlug: "drones-gis-remote-sensing",
    moduleSlug: "coordinate-systems",
    title: "Introduction to Coordinate Systems",
    summary: "Map points, frames, and bearings so robots and drones can reason about position.",
    kind: "lesson",
    status: "available",
    order: 1,
    estimatedMinutes: 35,
    mdxPath: "content/lessons/introduction-to-coordinate-systems.mdx",
  },
  {
    slug: "introduction-to-theoretical-physics",
    trackSlug: "theoretical-physics",
    moduleSlug: "mathematical-methods-for-physics",
    title: "Introduction to Theoretical Physics",
    summary: "Preview the physics path and the math/computation habits needed for later study.",
    kind: "lesson",
    status: "available",
    order: 1,
    estimatedMinutes: 30,
    mdxPath: "content/lessons/introduction-to-theoretical-physics.mdx",
  },
];

export const lessons: Lesson[] = [
  ...mathematicalFoundationsLessons,
  ...codingFoundationsLessons,
  ...electronicsAndCircuitsLessons,
  ...mechatronicsLessons,
  ...roboticsLessons,
  ...dronesGisRemoteSensingLessons,
  ...computerVisionLessons,
  ...cloudNetworkingTelemetryLessons,
  ...machineLearningAndAiLessons,
  ...optimizationLessons,
  ...numericalMethodsLessons,
  ...mechanicalEngineeringLessons,
  ...researchMethodsLessons,
  ...theoreticalPhysicsLessons,
  ...existingAvailableLessons,
];
