import type { ElementType, ReactNode } from "react";
import bodyA from "@/assets/paint/body-a.webp";
import bodyB from "@/assets/paint/body-b.webp";
import bodyC from "@/assets/paint/body-c.webp";
import capA from "@/assets/paint/cap-a.webp";
import capB from "@/assets/paint/cap-b.webp";
import capC from "@/assets/paint/cap-c.webp";
import edgeBeigeA from "@/assets/paint/edge-beige-a.webp";
import edgeBeigeB from "@/assets/paint/edge-beige-b.webp";
import edgeBeigeC from "@/assets/paint/edge-beige-c.webp";
import edgeTintA from "@/assets/paint/edge-tint-a.webp";
import edgeTintB from "@/assets/paint/edge-tint-b.webp";
import edgeTintC from "@/assets/paint/edge-tint-c.webp";
import underA from "@/assets/paint/under-a.webp";
import underB from "@/assets/paint/under-b.webp";

/*
 * Målad stil: sektionsövergångar där färgen "rullats på" över föregående sektion,
 * och rubriker som står på ett penseldrag. Både kanter och penseldrag är genererade
 * bilder (scripts/generate-paint.py).
 */

type Tone = "beige" | "tint";

const TONE_CLASS: Record<Tone, string> = {
  beige: "bg-background",
  tint: "bg-tint",
};

/* ---------- Målad kant mellan sektioner ---------- */

// Genererade bilder (scripts/generate-paint.py): tjock färgkant med skugga mot sektionen ovanför.
const EDGES: Record<Tone, readonly string[]> = {
  beige: [edgeBeigeA, edgeBeigeB, edgeBeigeC],
  tint: [edgeTintA, edgeTintB, edgeTintC],
};

/** Färgkant som ligger ovanpå föregående sektion, som om den målats dit. */
export function PaintEdge({ tone, seed }: { tone: Tone; seed: number }) {
  const list = EDGES[tone];
  const src = list[Math.abs(seed) % list.length] ?? list[0];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] z-10 h-12 overflow-hidden sm:h-20 lg:h-24"
    >
      <div
        className="absolute bottom-0 left-1/2 aspect-[1600/110] h-full min-w-full -translate-x-1/2"
        style={{ backgroundImage: `url(${src})`, backgroundSize: "100% 100%" }}
      />
    </div>
  );
}

/** Sektion med bakgrundsfärg och en målad kant upptill. */
export function PaintSection({
  tone = "beige",
  seed,
  edge = true,
  className = "",
  children,
}: {
  tone?: Tone;
  seed: number;
  edge?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`relative ${TONE_CLASS[tone]} ${className}`}>
      {edge && <PaintEdge tone={tone} seed={seed} />}
      {children}
    </section>
  );
}

/* ---------- Penseldrag bakom rubriker ---------- */

// Bilderna genereras av scripts/generate-paint.py. "body" sträcks över rubrikens bredd,
// "cap" är slutet på draget (trasiga borstspetsar och stänk) och tonas in ovanpå.
const VARIANTS = [
  { body: bodyA, cap: capA },
  { body: bodyB, cap: capB },
  { body: bodyC, cap: capC },
] as const;

const CAP_MASK = "linear-gradient(to right, transparent, #000 24%)";

/**
 * Rubrik med vit text på ett penseldrag. Med `bleed` (standard) svepar draget in från
 * skärmens vänsterkant, utan börjar det strax före rubriken med trasig start.
 */
export function PaintHeading({
  as: Tag = "h2",
  seed = 0,
  bleed = true,
  className = "",
  children,
}: {
  as?: ElementType;
  seed?: number;
  bleed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const v = VARIANTS[Math.abs(seed) % VARIANTS.length] ?? VARIANTS[0];
  const capStyle = {
    backgroundImage: `url(${v.cap})`,
    backgroundSize: "100% 100%",
    maskImage: CAP_MASK,
    WebkitMaskImage: CAP_MASK,
  };
  return (
    <Tag
      className={`relative isolate inline-block max-w-full py-7 pr-8 text-primary-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] sm:py-8 sm:pr-10 ${bleed ? "" : "pl-8 sm:pl-10"} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`${bleed ? "paint-bleed-left" : "left-0"} pointer-events-none absolute inset-y-0 right-0 -z-10`}
        style={{ backgroundImage: `url(${v.body})`, backgroundSize: "100% 100%" }}
      />
      {!bleed && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 aspect-[4/1] -translate-x-[22%] -scale-x-100"
          style={capStyle}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 aspect-[4/1] translate-x-[40%]"
        style={capStyle}
      />
      {children}
    </Tag>
  );
}

/** Litet penseldrag som understryker det som står i den. */
export function PaintUnderline({
  seed = 0,
  className = "",
  children,
}: {
  seed?: number;
  className?: string;
  children: ReactNode;
}) {
  const src = seed % 2 === 0 ? underA : underB;
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -bottom-2 -left-2 h-4"
        style={{ backgroundImage: `url(${src})`, backgroundSize: "100% 100%" }}
      />
    </span>
  );
}

/** Vanlig rubrik i samma stil som PaintHeading, utan penseldrag. */
export function Heading({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`text-primary ${className}`}>{children}</Tag>;
}
