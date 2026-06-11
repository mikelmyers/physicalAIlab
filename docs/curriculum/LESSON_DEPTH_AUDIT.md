# Lesson Depth Audit

Date: 2026-05-26

This audit checks whether current lessons meet the intended Physical AI Lab standard: not just structurally complete MDX files, but study chapters that rebuild ideas from first principles.

The main finding is simple: the curriculum has good scaffolding, but green validation does not prove teaching depth. A lesson can have objectives, practice, a quiz, and a build task while still being too formula-forward. We should treat recent lessons as "structure present, depth unproven" until they pass a human depth review.

## Audit Standard

A lesson should be considered deep enough only when a learner can answer these questions after studying it:

1. Why does this concept exist?
2. What problem did it solve historically, practically, physically, or computationally?
3. Where do the main formulas or methods come from?
4. What geometric, physical, or computational model makes the idea feel real?
5. How do the different representations connect?
6. What are the common wrong ideas, and why are they wrong?
7. What engineering, robotics, physics, or coding system uses the idea?
8. Does the build task prove understanding rather than passive reading?

## Summary

| Area | Current State | Risk | Recommendation |
| --- | --- | --- | --- |
| Lesson depth standard | Improved in PR #12 | Low | Keep using it as the acceptance bar. |
| Math Re-entry Toolkit | Many lessons are long and conceptually rich, but older heading patterns vary | Medium | Later normalization pass; not the first fire. |
| Equations, Units, and Graphs | Generally the strongest existing block | Low-Medium | Audit after Geometry/Trig/Vectors and Precalculus. |
| Geometry, Trig, and Vectors | Structurally complete; several lessons need more derivation and physical meaning | High | Depth pass in batches. |
| Precalculus lessons on main | Mixed; quadratics and factoring now hardened in PR #12 | High | Continue depth-hardening polynomial division and rational functions. |
| PR #11 exponential/log lessons | Structurally complete but not yet trusted for depth | High | Do not merge as final-quality until hardened. |
| Non-core seed lessons in other tracks | Some are short placeholders | Expected | Do not judge them by math-depth standard until promoted to active curriculum. |

## Priority Findings

### P0: PR #11 Needs Depth Review Before Merge

PR #11 adds exponential and logarithmic lessons. They appear structurally complete, but the audit found the same risk pattern that triggered this review: formulas and rules exist, but the explanatory spine needs hardening before these should be treated as study-chapter quality.

Required hardening:

- Exponential functions need a slower derivation from repeated multiplication to discrete growth factors to continuous growth.
- The natural base `e` needs to be explained from limiting compounding or proportional-change behavior, not only named as useful.
- Doubling time and half-life should be derived from the model.
- Logarithms need stronger inverse-function explanation, log rules derived from exponent laws, and a clearer reason logs turn multiplication into addition.
- Engineering examples should move from short references to worked systems: RC discharge, decibels, pH, sensor ranges, likelihood products, and semilog plots.

Recommendation: leave PR #11 as draft until exponential/log content receives a depth pass similar to PR #12.

### P1: Recently Added Geometry/Trig/Vectors Lessons Need Human Depth Passes

The Geometry, Trig, and Vectors sequence has good coverage and checks, but some lessons still read like structured lesson notes rather than full first-principles chapters.

Priority lessons:

| Lesson | Audit Result | Needed Depth Work |
| --- | --- | --- |
| `right-triangle-trigonometry` | Usable but compressed | Derive trig ratios from similar triangles; add more unit/angle convention intuition. |
| `trigonometry-for-drones-and-robotics` | Application-rich but heading structure is not as chapter-like | Add explicit worked-examples section, clearer derivation of component formulas, and stronger coordinate-frame warnings. |
| `the-unit-circle` | Good shape, but special angles can still feel memorized | Derive key values from 30-60-90 and 45-45-90 triangles; connect periodicity to rotation more deeply. |
| `trigonometric-identities` | Structurally good but formula dense | Derive angle-sum identities visually or from rotation matrices; explain identity proof strategy more slowly. |
| `vector-arithmetic-and-scaling` | Practical and coherent | Add explicit "core theory" and "engineering connections" sections or equivalent explanatory expansion. |
| `dot-product-and-projections` | Solid scaffold | Derive component formula from geometry or law of cosines; deepen projection as "shadow length." |
| `cross-product-and-right-hand-rule` | Solid scaffold | Derive determinant formula from area/orientation; explain why cross product is 3D-specific. |
| `bearings-and-headings-for-navigation` | Practical and useful | Add more map-frame convention explanation and navigation failure cases. |
| `coordinate-frames-and-robot-motion` | Useful but advanced | Slow down transform composition and explain active vs passive frame interpretation. |

Recommendation: make two or three focused depth PRs, not one huge rewrite.

### P1: Precalculus On Main Still Has Procedure-Heavy Lessons

PR #12 hardens:

- `quadratic-functions-and-the-quadratic-formula`
- `polynomial-factoring-techniques`

Remaining high-priority lessons:

| Lesson | Audit Result | Needed Depth Work |
| --- | --- | --- |
| `polynomial-division-and-factor-theorem` | Strong structure, but still procedural | Derive division algorithm more slowly; connect remainder theorem to evaluation; explain synthetic division as compressed long division. |
| `rational-functions-and-asymptotes` | Good coverage, but formula-rule heavy | Derive asymptote rules from limits/end behavior; explain holes vs vertical asymptotes via cancellation and domain memory. |
| `functions-review-and-piecewise` | Mostly adequate | Add more examples of regime changes, discontinuities, and physical domains. |
| `polynomial-functions-and-end-behavior` | Mostly adequate | Deepen root multiplicity, end behavior from leading term dominance, and physical approximation examples. |

Recommendation: after PR #12, do one focused PR for polynomial division plus rational functions.

### P2: Older Lessons Need Normalization, Not Emergency Rewrites

Several older lessons are conceptually richer than the newer scaffolded lessons but do not always use the exact current headings. Automated scans can falsely flag them as missing practice or worked examples because they use older naming conventions.

Examples:

- `graphing-functions-for-builders`
- `functions-definition-and-notation`
- `fractions-meaning-and-equivalence`
- `decimals-and-decimal-arithmetic`
- `parallel-and-perpendicular-lines`
- `algebra-for-engineering-systems`

Recommendation: do not rewrite these first. Later, normalize headings and lesson metadata so the structural checks better reflect the depth standard.

## Proposed Remediation Order

1. Finish PR #12 and merge once Vercel is green.
2. Depth-harden PR #11 before merging exponential/log lessons.
3. Create a precalculus hardening PR for `polynomial-division-and-factor-theorem` and `rational-functions-and-asymptotes`.
4. Create a trig hardening PR for right-triangle trig, drone trig, unit circle, and trig identities.
5. Create a vector/navigation hardening PR for vector arithmetic, dot product, cross product, bearings, and coordinate frames.
6. Add a lightweight lesson-depth audit script that flags shallow risk signals, while still requiring human review for final quality.
7. Later, normalize older lesson headings and section labels without flattening their richer content.

## Acceptance Bar Going Forward

For every future lesson PR, validation should include the existing gates plus a human depth note in the PR body:

- what formula or method was derived,
- what physical/geometric model was used,
- what common misconception was addressed,
- what engineering system was worked through,
- what build artifact proves understanding.

This keeps us from mistaking lesson-shaped files for actual learning chapters.
