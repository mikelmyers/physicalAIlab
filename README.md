# Physical AI Lab

Physical AI Lab is an open-source personal learning platform for one builder who wants to master math, coding, engineering, mechatronics, robotics, drones, computer vision, telemetry, and eventually theoretical physics.

It is not a generic LMS. It is a self-directed technical college, progress tracker, build-log notebook, project gallery, and public proof-of-work archive. The curriculum assumes a long gap from formal school and starts from first principles before building toward research-grade work.

## Why It Exists

The goal is to make study concrete. Lessons explain concepts, exercises force calculation, build tasks turn knowledge into artifacts, and projects create evidence that can be shared publicly.

The long-range standard is deliberately high: the learner should become capable of reading difficult material, building serious technical systems, reproducing results, publishing useful work, and asking original research questions. The site should not fake that with motivational copy. It should build toward it with diagnostics, prerequisites, lessons, projects, simulations, and proof.

The MVP stays local and portable:

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX lessons
- KaTeX math rendering
- Local JSON/TypeScript content registries
- LocalStorage progress and build-log drafts
- No database, auth system, paid services, or proprietary APIs

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
```

## Content Structure

```text
content/
  build-logs/
  lessons/
  projects/
  tracks/
src/
  app/
  components/
  lib/
```

Typed registries live in:

- `content/tracks/tracks.ts`
- `content/tracks/modules.ts`
- `content/tracks/lessons.ts`
- `content/projects/projects.ts`
- `content/build-logs/buildLogs.ts`

Shared types live in `src/lib/types.ts`.

## Learning Path

The `/learning-path` page defines the mastery spine:

- Level 0: Re-entry
- Level 1: Operator
- Level 2: Builder
- Level 3: Engineer
- Level 4: Researcher

It also includes diagnostic prompts for math, coding, electronics, and technical reading. These are not gatekeeping tests. They identify what needs rebuilding so the curriculum can stay honest and complete.

## Add A New Track

1. Add a `Track` object to `content/tracks/tracks.ts`.
2. Add one or more module records to `content/tracks/modules.ts`.
3. Add lessons to `content/tracks/lessons.ts` when the track has content.
4. Create matching `.mdx` files under `content/lessons`.

## Add A New Lesson

1. Create `content/lessons/my-lesson-slug.mdx`.
2. Use the lesson structure:
   - Objective
   - Why It Matters
   - Concept
   - Worked Example
   - Exercise
   - Build Task
   - Quiz
   - Proof of Completion
   - Next Lesson
3. Register the lesson in `content/tracks/lessons.ts`.
4. Include math using LaTeX syntax:

```mdx
$$V = IR$$
```

## Add A New Project

1. Add a `Project` object to `content/projects/projects.ts`.
2. Include requirements, stretch goals, skills practiced, and proof-of-completion items.
3. Link it to relevant tracks with `trackSlugs`.

## Progress Tracking

Lesson completion is stored in browser LocalStorage under:

```text
physical-ai-lab:completed-lessons
```

Build-log drafts are stored under:

```text
physical-ai-lab:build-logs
```

This is intentional for the MVP. Supabase/Postgres/Auth can be added later without changing the content model.

## Current Roadmap

- Research-backed curriculum expansion from first principles
- Full lessons for math, programming, circuits, mechatronics, robotics, drones, computer vision, telemetry, and physics
- Content integrity checks for broken references and missing prerequisites
- Quiz grading and richer problem-set attempts
- Supabase-backed public/private build logs
- Spaced repetition
- Simulation notebooks
- GitHub integration
- AI tutor after the core learning loop is stable
- Certificate-style progress summaries
- Portfolio export
- Publishable capstone and research archive

## License

MIT. See `LICENSE`.
