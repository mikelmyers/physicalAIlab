import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function uniqueBy(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item[key])) {
      errors.push(`Duplicate ${label} slug: ${item[key]}`);
    }
    seen.add(item[key]);
  }
}

const { tracks } = await import(pathToFileURL(path.join(root, "content/tracks/tracks.ts")));
const { modules } = await import(pathToFileURL(path.join(root, "content/tracks/modules.ts")));
const { lessons } = await import(pathToFileURL(path.join(root, "content/tracks/lessons.ts")));
const { projects } = await import(pathToFileURL(path.join(root, "content/projects/projects.ts")));

uniqueBy(tracks, "slug", "track");
uniqueBy(modules, "slug", "module");
uniqueBy(lessons, "slug", "lesson");
uniqueBy(projects, "slug", "project");

const trackSlugs = new Set(tracks.map((track) => track.slug));
const moduleSlugs = new Set(modules.map((moduleItem) => moduleItem.slug));
const lessonSlugs = new Set(lessons.map((lesson) => lesson.slug));

for (const moduleItem of modules) {
  if (!trackSlugs.has(moduleItem.trackSlug)) {
    errors.push(`Module ${moduleItem.slug} references missing track ${moduleItem.trackSlug}`);
  }
}

for (const lesson of lessons) {
  if (!trackSlugs.has(lesson.trackSlug)) {
    errors.push(`Lesson ${lesson.slug} references missing track ${lesson.trackSlug}`);
  }

  if (!moduleSlugs.has(lesson.moduleSlug)) {
    errors.push(`Lesson ${lesson.slug} references missing module ${lesson.moduleSlug}`);
  }

  const moduleItem = modules.find((candidate) => candidate.slug === lesson.moduleSlug);
  if (moduleItem && moduleItem.trackSlug !== lesson.trackSlug) {
    errors.push(`Lesson ${lesson.slug} track ${lesson.trackSlug} does not match module track ${moduleItem.trackSlug}`);
  }

  if (!exists(lesson.mdxPath)) {
    errors.push(`Lesson ${lesson.slug} missing MDX file ${lesson.mdxPath}`);
  }

  for (const prerequisite of lesson.prerequisites ?? []) {
    if (!lessonSlugs.has(prerequisite)) {
      errors.push(`Lesson ${lesson.slug} references missing prerequisite ${prerequisite}`);
    }
  }
}

for (const project of projects) {
  for (const trackSlug of project.trackSlugs) {
    if (!trackSlugs.has(trackSlug)) {
      errors.push(`Project ${project.slug} references missing track ${trackSlug}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Content integrity check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content integrity check passed: ${tracks.length} tracks, ${modules.length} modules, ${lessons.length} lessons, ${projects.length} projects.`);
