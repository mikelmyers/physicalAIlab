import Link from "next/link";
import { Atom, BookOpen, GraduationCap, Hammer, Map, NotebookTabs } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const navItems = [
  { href: "/learning-path", label: "Path", icon: GraduationCap },
  { href: "/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: Hammer },
  { href: "/build-log", label: "Build Log", icon: NotebookTabs },
  { href: "/portfolio", label: "Portfolio", icon: Atom },
  { href: "/roadmap", label: "Roadmap", icon: Map },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <Atom size={18} />
          </span>
          <span className="font-semibold tracking-tight">Physical AI Lab</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              href={item.href}
              key={item.href}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-zinc-200 px-4 py-2 dark:border-zinc-800 md:hidden">
        {navItems.map((item) => (
          <Link
            className="inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300"
            href={item.href}
            key={item.href}
          >
            <item.icon size={15} />
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
