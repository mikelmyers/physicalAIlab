# Contributing

Physical AI Lab is built around clear technical learning artifacts. Contributions should keep the content portable, readable, and useful for self-directed study.

## Local Setup

```bash
npm install
npm run dev
```

Before submitting changes:

```bash
npm run lint
npm run build
```

## Content Guidelines

- Keep lessons practical and technically precise.
- Include objectives, examples, exercises, build tasks, quiz questions, and proof-of-completion expectations.
- Use KaTeX-compatible LaTeX for equations.
- Prefer small, auditable examples over broad summaries.
- Avoid fake AI tutor features until the core study loop is stable.

## Code Guidelines

- Keep data portable and easy to edit.
- Use the shared TypeScript types in `src/lib/types.ts`.
- Avoid adding paid services or required proprietary APIs.
- Do not introduce authentication or database requirements for the MVP.

## Pull Requests

Open a focused PR with:

- What changed
- Why it matters
- Screenshots for UI changes
- Any follow-up work
