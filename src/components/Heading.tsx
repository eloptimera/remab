import { Asterisk } from "lucide-react";
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
  nowrap = false,
  children,
}: {
  className?: string;
  /** Håll ihop texten på en rad (t.ex. ord med bindestreck). */
  nowrap?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={`ul-lime ${nowrap ? "whitespace-nowrap" : ""} ${className}`}>{children}</span>
  );
}

/** Rullande textband i vitt, ligger längst ner i hero (dekorativt – tjänsterna finns i klartext på sidan). */
export function Marquee({ items }: { items: readonly string[] }) {
  const rad = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 whitespace-nowrap">
          <span>{t}</span>
          <Asterisk className="size-8 shrink-0 sm:size-12" strokeWidth={2.5} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 overflow-hidden bg-linear-to-t from-black/55 to-transparent pt-10 pb-6 font-display text-3xl text-white sm:pb-8 sm:text-5xl"
    >
      <div className="marquee-track">
        {rad}
        {rad}
      </div>
    </div>
  );
}
