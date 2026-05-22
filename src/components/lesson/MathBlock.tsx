type MathBlockProps = {
  children: string;
};

export function MathBlock({ children }: MathBlockProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
      {children}
    </div>
  );
}
