import type { Track } from "../../src/lib/types";

export const tracks: Track[] = [
  {
    slug: "mathematical-foundations",
    title: "Mathematical Foundations",
    summary: "Algebra, trigonometry, vectors, functions, and the math used by real engineering systems.",
    description:
      "Build the mathematical language needed for electronics, robotics, drones, computer vision, controls, and physics.",
    status: "available",
    level: "Foundations",
    order: 1,
    color: "cyan",
  },
  {
    slug: "coding-foundations",
    title: "Coding Foundations",
    summary: "Python, TypeScript, data structures, scripts, tooling, and technical software habits.",
    description:
      "Learn to write small, reliable tools that turn formulas, measurements, and experiments into useful systems.",
    status: "available",
    level: "Foundations",
    order: 2,
    color: "emerald",
  },
  {
    slug: "electronics-and-circuits",
    title: "Electronics and Circuits",
    summary: "Voltage, current, resistance, power, sensors, microcontrollers, and safe bench practice.",
    description:
      "Move from circuit laws to practical measurements and embedded systems used in mechatronics and robotics.",
    status: "available",
    level: "Foundations",
    order: 3,
    color: "amber",
  },
  {
    slug: "mechatronics",
    title: "Mechatronics",
    summary: "Mechanisms, sensors, actuators, control loops, and integrated physical systems.",
    description:
      "Connect code, electronics, mechanical motion, and measurement into buildable machines.",
    status: "available",
    level: "Intermediate",
    order: 4,
    color: "rose",
  },
  {
    slug: "robotics",
    title: "Robotics",
    summary: "Robot kinematics, perception, autonomy, controls, simulation, and field testing.",
    description:
      "Study robot bodies and behaviors from coordinate frames to practical autonomous task execution.",
    status: "draft",
    level: "Intermediate",
    order: 5,
    color: "violet",
  },
  {
    slug: "drones-gis-remote-sensing",
    title: "Drones, GIS, and Remote Sensing",
    summary: "Flight geometry, mapping, telemetry, geospatial data, sensors, and mission planning.",
    description:
      "Connect airframes, cameras, GPS, maps, and analytics into field-ready sensing workflows.",
    status: "available",
    level: "Intermediate",
    order: 6,
    color: "sky",
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    summary: "Image geometry, calibration, detection, measurement, and visual inspection systems.",
    description:
      "Use cameras as measurement instruments for robotics, drones, lab automation, and inspection tasks.",
    status: "draft",
    level: "Intermediate",
    order: 7,
    color: "lime",
  },
  {
    slug: "cloud-networking-telemetry",
    title: "Cloud, Networking, and Telemetry",
    summary: "APIs, devices, networks, message streams, dashboards, and remote system observability.",
    description:
      "Build the connective tissue for instruments, robots, drones, and deployed technical systems.",
    status: "draft",
    level: "Intermediate",
    order: 8,
    color: "indigo",
  },
  {
    slug: "machine-learning-and-ai",
    title: "Machine Learning and AI",
    summary: "Classical ML, deep learning, reinforcement learning, generative models, ML systems, and AI safety.",
    description:
      "The AI in Physical AI. From statistical learning foundations to modern deep learning, reinforcement learning for robotics, generative models, the systems engineering of training pipelines, and safety/alignment.",
    status: "future",
    level: "Intermediate",
    order: 9,
    color: "fuchsia",
  },
  {
    slug: "optimization",
    title: "Optimization",
    summary: "Convex, nonconvex, constrained, and discrete optimization for ML, control, and design.",
    description:
      "Gradient methods, convex optimization (Boyd & Vandenberghe), nonlinear and constrained programming, integer programming, and applied optimization for machine learning, robot motion planning, and engineering design.",
    status: "future",
    level: "Intermediate",
    order: 10,
    color: "teal",
  },
  {
    slug: "numerical-methods",
    title: "Numerical Methods and Scientific Computing",
    summary: "Numerical linear algebra, ODE/PDE solvers, FEM, automatic differentiation, and error analysis.",
    description:
      "The math of computing real numbers reliably: numerical linear algebra, quadrature, numerical ODEs and PDEs, finite element methods, automatic differentiation, and the error analysis underneath everything.",
    status: "future",
    level: "Advanced",
    order: 11,
    color: "orange",
  },
  {
    slug: "mechanical-engineering",
    title: "Mechanical Engineering and Manufacturing",
    summary: "CAD, mechanics of materials, FEA, manufacturing processes, and design for manufacturing.",
    description:
      "Designing and fabricating the hardware your AI controls. Statics, materials, CAD (Fusion 360, OnShape), finite element analysis, 3D printing, CNC, laser cutting, tolerancing, and design for manufacturing.",
    status: "future",
    level: "Intermediate",
    order: 12,
    color: "stone",
  },
  {
    slug: "research-methods",
    title: "Research Methods and Scientific Communication",
    summary: "Reading papers, literature reviews, LaTeX, reproducibility, and scientific writing.",
    description:
      "The non-technical skills of a researcher: how to read papers, write literature reviews, use LaTeX, structure reproducible computational research, write papers, and present technical work.",
    status: "future",
    level: "Advanced",
    order: 13,
    color: "rose",
  },
  {
    slug: "theoretical-physics",
    title: "Theoretical Physics",
    summary: "A future path from mathematical methods through relativity, quantum theory, and cosmology.",
    description:
      "Prepare for deep physics study while preserving links back to computation, simulation, and measurement.",
    status: "future",
    level: "Future",
    order: 14,
    color: "slate",
  },
  {
    slug: "capstone-studio",
    title: "Capstone Studio",
    summary: "Long-form public builds that combine math, code, electronics, mechanics, and field evidence.",
    description:
      "Turn the curriculum into proof-of-work projects with reproducible notes, demos, and lessons learned.",
    status: "draft",
    level: "Advanced",
    order: 15,
    color: "zinc",
  },
];
