# Physical AI Lab

Physical AI Lab is an open-source personal learning platform for one builder who wants to master math, coding, engineering, mechatronics, robotics, drones, computer vision, telemetry, and eventually theoretical physics.

It is not a generic LMS. It is a self-directed technical college, progress tracker, build-log notebook, project gallery, and public proof-of-work archive.

## Why It Exists

The goal is to make study concrete. Lessons explain concepts, exercises force calculation, build tasks turn knowledge into artifacts, and projects create evidence that can be shared publicly.

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

- MVP curriculum engine with MDX lessons and local progress
- Quiz grading and richer problem-set attempts
- Supabase-backed public/private build logs
- Spaced repetition
- AI tutor after the core learning loop is stable
- Simulation notebooks
- GitHub integration
- Certificate-style progress summaries
- Portfolio export

## License

MIT. See `LICENSE`.
