import type { Lesson } from "../../../src/lib/types.ts";

const TRACK = "mechanical-engineering";

function future(
  moduleSlug: string,
  order: number,
  slug: string,
  title: string,
  summary: string,
  options: { estimatedMinutes?: number; prerequisites?: string[] } = {},
): Lesson {
  return {
    slug,
    trackSlug: TRACK,
    moduleSlug,
    title,
    summary,
    kind: "lesson",
    status: "future",
    order,
    estimatedMinutes: options.estimatedMinutes ?? 90,
    prerequisites: options.prerequisites,
    mdxPath: `content/lessons/${slug}.mdx`,
  };
}

const staticsAndMechanicsOfMaterials: Lesson[] = [
  future("statics-and-mechanics-of-materials", 1, "rigid-body-equilibrium-fundamentals", "Rigid Body Equilibrium Fundamentals", "Conditions for static equilibrium of rigid bodies under concurrent and non-concurrent force systems with worked examples."),
  future("statics-and-mechanics-of-materials", 2, "free-body-diagrams-and-support-reactions", "Free Body Diagrams and Support Reactions", "Drawing free body diagrams, classifying supports, and identifying reaction forces and moments for typical engineering structures."),
  future("statics-and-mechanics-of-materials", 3, "two-dimensional-equilibrium-problems", "Two-Dimensional Equilibrium Problems", "Solving planar equilibrium problems using force and moment equations to find unknown reactions and internal forces."),
  future("statics-and-mechanics-of-materials", 4, "three-dimensional-equilibrium-and-moments", "Three-Dimensional Equilibrium and Moments", "Extending equilibrium analysis to 3D with vector cross products, moment about an axis, and six scalar equations."),
  future("statics-and-mechanics-of-materials", 5, "trusses-method-of-joints", "Trusses: Method of Joints", "Analyzing pin-jointed trusses by considering equilibrium at each joint to find member forces in tension or compression."),
  future("statics-and-mechanics-of-materials", 6, "trusses-method-of-sections", "Trusses: Method of Sections", "Cutting trusses through members of interest and applying equilibrium to the section to find selected member forces directly."),
  future("statics-and-mechanics-of-materials", 7, "frames-and-machines-analysis", "Frames and Machines Analysis", "Analyzing multi-body structures with internal pin connections by separating components and applying equilibrium to each."),
  future("statics-and-mechanics-of-materials", 8, "internal-forces-shear-and-moment-diagrams", "Internal Forces: Shear and Moment Diagrams", "Constructing shear force and bending moment diagrams along beams to visualize internal loading distributions."),
  future("statics-and-mechanics-of-materials", 9, "centroids-and-moments-of-inertia", "Centroids and Moments of Inertia", "Computing centroids of composite areas and area moments of inertia using integration and the parallel axis theorem."),
  future("statics-and-mechanics-of-materials", 10, "normal-stress-and-strain-basics", "Normal Stress and Strain Basics", "Defining normal stress and strain, stress-strain diagrams, and the difference between engineering and true stress."),
  future("statics-and-mechanics-of-materials", 11, "hookes-law-and-elastic-modulus", "Hooke's Law and Elastic Modulus", "Linear elastic behavior, Young's modulus, Poisson's ratio, and generalized Hooke's law for isotropic materials."),
  future("statics-and-mechanics-of-materials", 12, "axial-loading-and-deformation", "Axial Loading and Deformation", "Computing elongation of axially loaded members, statically indeterminate axial problems, and superposition methods."),
  future("statics-and-mechanics-of-materials", 13, "thermal-stress-and-strain", "Thermal Stress and Strain", "Thermal expansion coefficients, thermal strain calculation, and stresses induced by constrained thermal deformation."),
  future("statics-and-mechanics-of-materials", 14, "torsion-of-circular-shafts", "Torsion of Circular Shafts", "Shear stress distribution, angle of twist, and power transmission analysis for solid and hollow circular shafts under torque."),
  future("statics-and-mechanics-of-materials", 15, "beam-bending-stress", "Beam Bending Stress", "Flexure formula sigma = Mc/I, neutral axis location, and computing maximum bending stress in symmetric beam cross sections."),
  future("statics-and-mechanics-of-materials", 16, "transverse-shear-in-beams", "Transverse Shear in Beams", "Shear stress distribution across beam cross sections using the formula tau = VQ/Ib for rectangular, I-beam, and other shapes."),
  future("statics-and-mechanics-of-materials", 17, "beam-deflection-methods", "Beam Deflection Methods", "Computing beam deflections by integration of the elastic curve equation, superposition, and using standard deflection tables."),
  future("statics-and-mechanics-of-materials", 18, "combined-loading-analysis", "Combined Loading Analysis", "Superposing axial, bending, torsional, and shear stresses to find resultant stress states at critical points in members."),
  future("statics-and-mechanics-of-materials", 19, "principal-stresses-and-mohrs-circle", "Principal Stresses and Mohr's Circle", "Transforming plane stress, finding principal stresses and maximum shear stress using Mohr's circle construction."),
  future("statics-and-mechanics-of-materials", 20, "buckling-failure-criteria-and-stress-concentration", "Buckling, Failure Criteria, and Stress Concentration", "Euler buckling of columns, ductile and brittle failure theories, and stress concentration factors at geometric discontinuities."),
];

const cadAnd3dModeling: Lesson[] = [
  future("cad-and-3d-modeling", 1, "cad-landscape-and-tool-choice", "CAD Landscape and Tool Choice", "Survey of major CAD platforms, their target users, file format ecosystems, and how to pick the right tool for a project."),
  future("cad-and-3d-modeling", 2, "fusion-360-interface-and-workflow", "Fusion 360 Interface and Workflow", "Navigating the Fusion 360 environment, browser tree, timeline, workspaces, and core feature ribbon for first models."),
  future("cad-and-3d-modeling", 3, "sketching-and-geometric-constraints", "Sketching and Geometric Constraints", "Creating fully constrained 2D sketches with dimensions and geometric relationships that drive parametric model behavior."),
  future("cad-and-3d-modeling", 4, "extrude-revolve-sweep-and-loft", "Extrude, Revolve, Sweep, and Loft", "Four core feature operations that turn 2D sketches into 3D solids, with guidelines on when to use each technique."),
  future("cad-and-3d-modeling", 5, "fillets-chamfers-and-edge-features", "Fillets, Chamfers, and Edge Features", "Applying fillets and chamfers to break sharp edges, manage stress concentrations, and improve manufacturability."),
  future("cad-and-3d-modeling", 6, "parametric-design-with-user-parameters", "Parametric Design with User Parameters", "Driving model geometry from named parameters and equations so design intent survives later dimensional changes."),
  future("cad-and-3d-modeling", 7, "assemblies-and-joints", "Assemblies and Joints", "Combining components into assemblies with rigid, revolute, slider, and ball joints to model real mechanical motion."),
  future("cad-and-3d-modeling", 8, "top-down-versus-bottom-up-design", "Top-Down versus Bottom-Up Design", "Comparing assembly-first and part-first modeling strategies and when each approach reduces rework in product design."),
  future("cad-and-3d-modeling", 9, "sheet-metal-modeling-in-cad", "Sheet Metal Modeling in CAD", "Flanges, bends, k-factor, relief cuts, and flat patterns for producing manufacturable sheet metal parts in CAD."),
  future("cad-and-3d-modeling", 10, "engineering-drawings-and-views", "Engineering Drawings and Views", "Generating orthographic projections, section views, detail views, and isometric views from 3D models for fabrication."),
  future("cad-and-3d-modeling", 11, "dimensioning-standards-and-practice", "Dimensioning Standards and Practice", "ASME Y14.5 dimensioning rules, baseline versus chain dimensions, and clear annotation that avoids machinist ambiguity."),
  future("cad-and-3d-modeling", 12, "exporting-to-stl-step-and-other-formats", "Exporting to STL, STEP, and Other Formats", "Choosing the right interchange format for 3D printing, machining, simulation, or downstream CAD with appropriate settings."),
  future("cad-and-3d-modeling", 13, "parametric-design-for-3d-printing", "Parametric Design for 3D Printing", "Designing parts with print orientation, wall thickness, overhang angles, and tolerances tuned for additive manufacturing."),
  future("cad-and-3d-modeling", 14, "onshape-fusion-solidworks-tradeoffs", "OnShape, Fusion, and SolidWorks Tradeoffs", "Comparing cloud-native, hybrid, and desktop CAD platforms on features, collaboration, cost, and ecosystem maturity."),
  future("cad-and-3d-modeling", 15, "version-control-for-cad-files", "Version Control for CAD Files", "Strategies for branching, tagging releases, and collaborating on CAD using cloud platforms and PDM systems."),
];

const materialsScience: Lesson[] = [
  future("materials-science", 1, "atomic-structure-and-bonding", "Atomic Structure and Bonding", "Atomic structure, ionic, covalent, metallic, and van der Waals bonding, and how bonding type drives material properties."),
  future("materials-science", 2, "crystal-structures-of-metals", "Crystal Structures of Metals", "BCC, FCC, and HCP crystal structures, atomic packing factor, and how lattice geometry influences slip and ductility."),
  future("materials-science", 3, "dislocations-and-plastic-deformation", "Dislocations and Plastic Deformation", "Edge and screw dislocations, slip systems, and dislocation motion as the microscopic origin of plastic yielding in metals."),
  future("materials-science", 4, "phase-diagrams-and-the-lever-rule", "Phase Diagrams and the Lever Rule", "Reading binary phase diagrams, eutectic and peritectic reactions, and applying the lever rule to find phase fractions."),
  future("materials-science", 5, "steel-and-the-iron-carbon-diagram", "Steel and the Iron-Carbon Diagram", "The iron-carbon phase diagram, austenite, ferrite, pearlite, martensite, and heat treatments that produce each microstructure."),
  future("materials-science", 6, "aluminum-alloys-and-applications", "Aluminum Alloys and Applications", "Wrought and cast aluminum alloy series, precipitation hardening, and selection criteria for aerospace and structural use."),
  future("materials-science", 7, "titanium-and-superalloys", "Titanium and Superalloys", "Titanium grades, nickel-based superalloys, high-temperature creep resistance, and applications in jet engines and medical implants."),
  future("materials-science", 8, "polymers-and-viscoelastic-behavior", "Polymers and Viscoelastic Behavior", "Polymer chain structure, glass transition, viscoelasticity, and creep and stress relaxation responses unique to polymers."),
  future("materials-science", 9, "engineering-thermoplastics", "Engineering Thermoplastics", "Properties and processing of ABS, nylon, polycarbonate, PEEK, and other thermoplastics common in manufactured parts."),
  future("materials-science", 10, "thermosets-and-curing-systems", "Thermosets and Curing Systems", "Epoxy, polyester, and phenolic thermoset chemistry, cross-linking, and why thermosets cannot be remelted after curing."),
  future("materials-science", 11, "fiber-reinforced-composites", "Fiber-Reinforced Composites", "Carbon fiber, fiberglass, and aramid composites with epoxy matrices, rule of mixtures, and anisotropic strength behavior."),
  future("materials-science", 12, "ceramic-materials-and-properties", "Ceramic Materials and Properties", "Structural ceramics, glasses, and refractories with high hardness and brittleness, plus their roles in cutting tools and electronics."),
  future("materials-science", 13, "fatigue-and-s-n-curves", "Fatigue and S-N Curves", "Cyclic loading failure, endurance limits, S-N curves, mean stress effects, and design against fatigue failure in rotating machinery."),
  future("materials-science", 14, "creep-at-elevated-temperatures", "Creep at Elevated Temperatures", "Time-dependent deformation under load at high temperature, primary, secondary, tertiary creep stages, and creep rupture life."),
  future("materials-science", 15, "materials-selection-with-ashby-charts", "Materials Selection with Ashby Charts", "Using Ashby property charts and performance indices to systematically choose materials for stiffness, strength, and cost goals."),
];

const finiteElementAnalysis: Lesson[] = [
  future("finite-element-analysis", 1, "fea-conceptual-overview", "FEA Conceptual Overview", "What finite element analysis does, how it discretizes continuous problems, and where it fits in the engineering design loop."),
  future("finite-element-analysis", 2, "discretization-and-element-types", "Discretization and Element Types", "Splitting a domain into elements, common 1D, 2D, and 3D element families, and tradeoffs between element order and accuracy."),
  future("finite-element-analysis", 3, "shape-functions-and-interpolation", "Shape Functions and Interpolation", "How shape functions interpolate field variables within elements and how their order controls solution smoothness."),
  future("finite-element-analysis", 4, "stiffness-matrix-assembly", "Stiffness Matrix Assembly", "Building element stiffness matrices and assembling them into a global system through nodal connectivity mapping."),
  future("finite-element-analysis", 5, "applying-loads-and-boundary-conditions", "Applying Loads and Boundary Conditions", "Translating physical loads and supports into nodal forces and constraints that correctly represent the modeled scenario."),
  future("finite-element-analysis", 6, "linear-static-analysis-workflow", "Linear Static Analysis Workflow", "End-to-end workflow for running a linear static FEA study from geometry preparation through results interpretation."),
  future("finite-element-analysis", 7, "modal-analysis-and-natural-frequencies", "Modal Analysis and Natural Frequencies", "Computing natural frequencies and mode shapes of structures and using them to avoid resonance in operating conditions."),
  future("finite-element-analysis", 8, "frequency-response-analysis", "Frequency Response Analysis", "Steady-state response to harmonic loading, transfer functions, and predicting vibration amplitudes across forcing frequencies."),
  future("finite-element-analysis", 9, "introduction-to-nonlinear-fea", "Introduction to Nonlinear FEA", "Sources of nonlinearity (geometric, material, contact) and iterative Newton-Raphson solution strategies."),
  future("finite-element-analysis", 10, "contact-problems-in-fea", "Contact Problems in FEA", "Modeling contact between surfaces, friction, penetration penalties, and convergence challenges in contact simulations."),
  future("finite-element-analysis", 11, "mesh-convergence-studies", "Mesh Convergence Studies", "Systematically refining a mesh and tracking results to confirm that reported quantities have converged to mesh-independent values."),
  future("finite-element-analysis", 12, "mesh-quality-metrics", "Mesh Quality Metrics", "Aspect ratio, skewness, Jacobian, and other mesh quality measures that flag elements likely to degrade solution accuracy."),
  future("finite-element-analysis", 13, "common-fea-errors-and-pitfalls", "Common FEA Errors and Pitfalls", "Over-constraint, singular point loads, rigid body modes, and other recurring modeling mistakes and how to avoid them."),
  future("finite-element-analysis", 14, "interpreting-stress-results", "Interpreting Stress Results", "Von Mises stress, principal stresses, contour plots, and judging when high reported stresses are real versus numerical artifacts."),
  future("finite-element-analysis", 15, "fea-software-workflows", "FEA Software Workflows", "Comparing Fusion 360 Simulation, ANSYS, and COMSOL workflows for setup, solver options, and post-processing capabilities."),
];

const manufacturingProcesses: Lesson[] = [
  future("manufacturing-processes", 1, "fdm-3d-printing-principles", "FDM 3D Printing Principles", "Fused deposition modeling fundamentals, extruder mechanics, layer adhesion physics, and the geometry of deposited beads."),
  future("manufacturing-processes", 2, "fdm-print-settings-and-tuning", "FDM Print Settings and Tuning", "Layer height, infill, temperature, speed, and retraction settings and how each affects print quality and strength."),
  future("manufacturing-processes", 3, "supports-and-print-orientation", "Supports and Print Orientation", "Choosing print orientation for strength and surface finish, support generation strategies, and minimizing post-processing labor."),
  future("manufacturing-processes", 4, "sla-and-dlp-resin-printing", "SLA and DLP Resin Printing", "Vat photopolymerization processes, resin chemistry, layer cure dynamics, and producing high-resolution detailed parts."),
  future("manufacturing-processes", 5, "sls-and-mjf-powder-bed-printing", "SLS and MJF Powder Bed Printing", "Selective laser sintering and multi jet fusion for nylon and other powder polymers without dedicated support structures."),
  future("manufacturing-processes", 6, "metal-3d-printing-dmls", "Metal 3D Printing (DMLS)", "Direct metal laser sintering, powder bed fusion, post-process heat treatment, and design considerations for printed metal parts."),
  future("manufacturing-processes", 7, "cnc-milling-fundamentals", "CNC Milling Fundamentals", "Machine architecture, rotating cutting tools, feeds and speeds, and how subtractive milling shapes blocks of stock material."),
  future("manufacturing-processes", 8, "cnc-turning-on-lathes", "CNC Turning on Lathes", "Spinning the workpiece against fixed tooling to produce cylindrical features, threading, and high-volume rotational parts."),
  future("manufacturing-processes", 9, "three-axis-versus-five-axis-milling", "3-Axis versus 5-Axis Milling", "Capability differences, when extra rotational axes unlock complex geometry, and cost and programming implications."),
  future("manufacturing-processes", 10, "cam-workflow-from-model-to-toolpath", "CAM Workflow from Model to Toolpath", "Translating CAD geometry into machine instructions through stock setup, operations, simulation, and post-processed G-code."),
  future("manufacturing-processes", 11, "toolpath-strategies-for-milling", "Toolpath Strategies for Milling", "Roughing versus finishing, adaptive clearing, contour parallel paths, and choosing strategies that balance time and surface finish."),
  future("manufacturing-processes", 12, "work-holding-and-fixturing", "Work Holding and Fixturing", "Vises, clamps, soft jaws, vacuum tables, and custom fixtures that hold parts rigidly and accessibly during machining."),
  future("manufacturing-processes", 13, "laser-cutting-fundamentals", "Laser Cutting Fundamentals", "CO2 and fiber laser cutting of sheet materials, kerf width, edge quality, and cutting parameter selection by material."),
  future("manufacturing-processes", 14, "laser-engraving-and-marking", "Laser Engraving and Marking", "Surface marking and engraving on metals, plastics, and wood with raster and vector modes for product identification."),
  future("manufacturing-processes", 15, "waterjet-cutting", "Waterjet Cutting", "Abrasive and pure waterjet cutting, capability on thick metals and brittle materials, and comparison to laser and plasma."),
  future("manufacturing-processes", 16, "sheet-metal-bending-and-forming", "Sheet Metal Bending and Forming", "Press brake bending, bend allowance, k-factor, springback, and forming sheet stock into structural and enclosure parts."),
  future("manufacturing-processes", 17, "injection-molding-overview", "Injection Molding Overview", "Tooling, runners, gates, cooling, and the high-volume plastic process whose unit economics demand careful upfront design."),
  future("manufacturing-processes", 18, "vacuum-forming-and-thermoforming", "Vacuum Forming and Thermoforming", "Heating plastic sheets over a mold and drawing them to shape for packaging, enclosures, and short-run plastic parts."),
  future("manufacturing-processes", 19, "casting-processes-overview", "Casting Processes Overview", "Sand, investment, die, and centrifugal casting; pouring molten metal into molds to form complex near-net-shape parts."),
  future("manufacturing-processes", 20, "post-processing-and-finishing-operations", "Post-Processing and Finishing Operations", "Deburring, sanding, bead blasting, anodizing, painting, and coating operations that follow primary manufacturing."),
];

const designForManufacturing: Lesson[] = [
  future("design-for-manufacturing", 1, "dimensional-tolerances-and-stack-up", "Dimensional Tolerances and Stack-Up", "Plus-minus tolerancing, worst-case and statistical stack-up analysis, and budgeting tolerance across assembled features."),
  future("design-for-manufacturing", 2, "gd-and-t-symbol-system", "GD&T Symbol System", "Geometric Dimensioning and Tolerancing symbols, feature control frames, and why GD&T is more expressive than plus-minus."),
  future("design-for-manufacturing", 3, "datums-and-datum-reference-frames", "Datums and Datum Reference Frames", "Selecting datum features, primary/secondary/tertiary datums, and constructing reference frames that mirror manufacturing setup."),
  future("design-for-manufacturing", 4, "position-and-runout-controls", "Position and Runout Controls", "True position tolerance for hole patterns, circular and total runout for rotating parts, and bonus tolerance at MMC."),
  future("design-for-manufacturing", 5, "geometric-form-and-orientation-controls", "Geometric Form and Orientation Controls", "Flatness, straightness, circularity, perpendicularity, parallelism, and angularity controls applied to manufactured features."),
  future("design-for-manufacturing", 6, "surface-roughness-specification", "Surface Roughness Specification", "Ra, Rz, and other surface texture metrics, surface finish symbols on drawings, and matching finish to process capability."),
  future("design-for-manufacturing", 7, "design-for-assembly-principles", "Design for Assembly Principles", "Reducing part count, poka-yoke features, self-aligning geometry, and other DFA techniques that lower assembly labor."),
  future("design-for-manufacturing", 8, "design-for-additive-manufacturing", "Design for Additive Manufacturing", "Self-supporting angles, wall thickness limits, internal channels, and lattice structures that exploit additive freedoms."),
  future("design-for-manufacturing", 9, "design-for-cnc-machining", "Design for CNC Machining", "Tool access, internal radii limits, deep pocket constraints, and feature choices that keep CNC machining fast and cheap."),
  future("design-for-manufacturing", 10, "design-for-sheet-metal", "Design for Sheet Metal", "Minimum bend radii, hole-to-edge and hole-to-bend distances, relief cuts, and forming-friendly sheet metal feature design."),
  future("design-for-manufacturing", 11, "design-for-injection-molding", "Design for Injection Molding", "Uniform wall thickness, draft angles, ribs and bosses, parting lines, gate locations, and avoiding sink marks and warpage."),
  future("design-for-manufacturing", 12, "cost-estimation-by-process", "Cost Estimation by Process", "Quick-look unit-cost models for machining, printing, molding, and sheet metal that guide process selection by volume."),
  future("design-for-manufacturing", 13, "design-review-process", "Design Review Process", "Structured peer review using checklists, FMEA, and cross-functional input to catch design issues before tooling commits."),
  future("design-for-manufacturing", 14, "prototyping-versus-production-tradeoffs", "Prototyping versus Production Tradeoffs", "When 3D-printed prototypes mislead, bridge tooling strategies, and design changes required to scale from one to many."),
  future("design-for-manufacturing", 15, "sustainability-and-material-choice", "Sustainability and Material Choice", "Embodied energy, recyclability, end-of-life considerations, and material decisions that reduce environmental impact."),
];

export const mechanicalEngineeringLessons: Lesson[] = [
  ...staticsAndMechanicsOfMaterials,
  ...cadAnd3dModeling,
  ...materialsScience,
  ...finiteElementAnalysis,
  ...manufacturingProcesses,
  ...designForManufacturing,
];
