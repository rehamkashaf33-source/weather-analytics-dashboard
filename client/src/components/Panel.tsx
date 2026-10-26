import type { PropsWithChildren } from "react";

interface PanelProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

export function Panel({ title, className = "", children }: PanelProps) {
  return (
    <section className={`rounded-3xl border border-line bg-panel/80 p-5 ${className}`}>
      {title && <h2 className="mb-4 text-sm font-medium text-slate-400">{title}</h2>}
      {children}
    </section>
  );
}

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-3xl bg-panel ${className}`} aria-hidden />
);
