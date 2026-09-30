import type { ElementType, ReactNode } from "react";

/** Sidrubrik i sajtens display-typsnitt. */
export function Heading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={className}>{children}</Tag>;
}

/** Ord som understryks i ljusgrönt. */
export function Underline({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <span className={`ul-lime ${className}`}>{children}</span>;
}

/** Rullande textband (dekorativt – innehållet finns även i klartext på sidan). */
export function Marquee({ items }: { items: readonly string[] }) {
  const rad = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 whitespace-nowrap">
          <span>{t}</span>
          <span aria-hidden="true">✳</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-lime py-5 font-display text-2xl text-foreground sm:py-6 sm:text-4xl"
    >
      <div className="marquee-track">
        {rad}
        {rad}
      </div>
    </div>
  );
}
