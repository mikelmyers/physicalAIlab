import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { LessonCheck } from "@/components/lesson/LessonCheck";
import { MathBlock } from "@/components/lesson/MathBlock";

type LessonFrontmatter = {
  title?: string;
};

const mdxComponents = {
  MathBlock,
  CodeBlock,
  LessonCheck,
};

export async function renderLessonMdx(mdxPath: string) {
  const lessonDirectory = path.join(process.cwd(), "content", "lessons");
  const absolutePath = path.join(lessonDirectory, path.basename(mdxPath));
  const source = await fs.readFile(absolutePath, "utf8");

  return compileMDX<LessonFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight],
      },
    },
  });
}
