import type { DiagnosticPrompt, MasteryLevel, StudyPhase } from "../../src/lib/types";

export const masteryLevels: MasteryLevel[] = [
  {
    level: 0,
    title: "Re-entry",
    summary:
      "Rebuild school muscles without shame: arithmetic fluency, algebra basics, technical reading, and note-taking discipline.",
    proof: [
      "Can explain each new symbol in plain language.",
      "Can solve worked examples without copying the solution path.",
      "Can keep a build log with mistakes, fixes, and next questions.",
    ],
  },
  {
    level: 1,
    title: "Operator",
    summary:
      "Use core math, Python, circuits, and measurement tools to solve bounded technical problems reliably.",
    proof: [
      "Can build small calculators and validate outputs against hand calculations.",
      "Can read a basic circuit diagram and compute expected values.",
      "Can write reproducible notes for another person to follow.",
    ],
  },
  {
    level: 2,
    title: "Builder",
    summary:
      "Combine software, electronics, sensors, mechanics, and data into working prototypes with documented tradeoffs.",
    proof: [
      "Can design and test a small mechatronic subsystem.",
      "Can produce source code, diagrams, measurements, and failure analysis.",
      "Can explain why design choices were made and what evidence supports them.",
    ],
  },
  {
    level: 3,
    title: "Engineer",
    summary:
      "Work across robotics, drones, computer vision, telemetry, and controls with simulation and field validation.",
    proof: [
      "Can model, simulate, build, and test a system end to end.",
      "Can compare predictions against measured results.",
      "Can publish a technical project that is useful to other builders.",
    ],
  },
  {
    level: 4,
    title: "Researcher",
    summary:
      "Read advanced material, reproduce results, ask original questions, and publish serious technical or scientific work.",
    proof: [
      "Can read papers and extract assumptions, methods, and limitations.",
      "Can reproduce a result with code, math, or experiment.",
      "Can publish clear writeups, simulations, or experimental reports.",
    ],
  },
];

export const diagnosticPrompts: DiagnosticPrompt[] = [
  {
    slug: "math-reentry",
    area: "Math",
    title: "Algebra and Geometry Re-entry",
    prompt:
      "Solve for unknowns, work with units, compute distances, and explain each step without relying on memory shortcuts.",
    checks: [
      "Rearrange V = IR for each variable.",
      "Compute distance between two points.",
      "Convert a word problem into an equation.",
      "Explain what a graph slope means physically.",
    ],
  },
  {
    slug: "coding-reentry",
    area: "Coding",
    title: "Technical Programming Re-entry",
    prompt:
      "Write small functions for formulas, validate inputs, and produce outputs that can be checked by hand.",
    checks: [
      "Create a function with typed inputs.",
      "Handle an invalid input case.",
      "Print or return clear output.",
      "Write one test for a known answer.",
    ],
  },
  {
    slug: "electronics-reentry",
    area: "Electronics",
    title: "Circuit Reasoning Re-entry",
    prompt:
      "Read simple circuits, compute expected values, and describe what should be measured before touching hardware.",
    checks: [
      "Identify voltage, current, resistance, and power.",
      "Calculate current through a resistor.",
      "Explain why current limiting matters.",
      "List one safety check before powering a circuit.",
    ],
  },
  {
    slug: "research-reentry",
    area: "Research",
    title: "Technical Reading Re-entry",
    prompt:
      "Read a technical explanation and extract definitions, assumptions, claims, evidence, and open questions.",
    checks: [
      "Write a five-bullet summary.",
      "List unfamiliar terms.",
      "Identify what evidence was provided.",
      "Write the next question to investigate.",
    ],
  },
];

export const studyPhases: StudyPhase[] = [
  {
    slug: "phase-0-reentry",
    title: "Phase 0: Re-entry and Confidence",
    timeframe: "2 to 4 weeks",
    summary:
      "Rebuild math, coding, and technical reading habits from the ground up. No assumed school memory.",
    outcomes: [
      "Solve basic algebra and geometry problems with units.",
      "Write small calculator functions and explain them.",
      "Keep consistent build-log notes.",
      "Know exactly which foundations need repetition.",
    ],
    trackSlugs: ["mathematical-foundations", "coding-foundations"],
  },
  {
    slug: "phase-1-foundations",
    title: "Phase 1: Technical Foundations",
    timeframe: "3 to 6 months",
    summary:
      "Build durable fundamentals in math, programming, electronics, measurement, and engineering habits.",
    outcomes: [
      "Complete the Engineering Calculator Suite.",
      "Analyze basic circuits and sensor relationships.",
      "Create reusable tools and tests.",
      "Publish clean technical writeups.",
    ],
    trackSlugs: ["mathematical-foundations", "coding-foundations", "electronics-and-circuits"],
  },
  {
    slug: "phase-2-physical-systems",
    title: "Phase 2: Physical Systems",
    timeframe: "6 to 12 months",
    summary:
      "Move from formulas to integrated mechatronic, robotic, drone, and telemetry systems.",
    outcomes: [
      "Design a sensor-actuator subsystem.",
      "Model robot or drone coordinate frames.",
      "Build telemetry dashboards and field-test notes.",
      "Compare measured behavior against predictions.",
    ],
    trackSlugs: [
      "mechatronics",
      "robotics",
      "drones-gis-remote-sensing",
      "computer-vision",
      "cloud-networking-telemetry",
    ],
  },
  {
    slug: "phase-3-research-grade",
    title: "Phase 3: Research-Grade Work",
    timeframe: "12 months and beyond",
    summary:
      "Read advanced material, reproduce results, run simulations, and develop publishable technical questions.",
    outcomes: [
      "Reproduce a paper, simulation, or field method.",
      "Write long-form technical reports.",
      "Build capstones that demonstrate cross-domain mastery.",
      "Prepare for theoretical physics and original research problems.",
    ],
    trackSlugs: ["theoretical-physics", "capstone-studio"],
  },
];
