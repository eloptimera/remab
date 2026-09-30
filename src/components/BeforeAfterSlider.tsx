import { useCallback, useRef, useState } from "react";

export type ForeEfterPar = {
  id: string;
  titel: string;
  plats: string;
  fore: string;
  efter: string;
  altFore: string;
  altEfter: string;
};

export function BeforeAfterSlider({ par }: { par: ForeEfterPar[] }) {
  const [aktiv, setAktiv] = useState(0);
  const [position, setPosition] = useState(50);
  const [drar, setDrar] = useState(false);
  const ramRef = useRef<HTMLDivElement>(null);

  const bild = par[aktiv];

  const uppdateraFranX = useCallback((clientX: number) => {
    const ram = ramRef.current;
    if (!ram) return;
    const rect = ram.getBoundingClientRect();
    const andel = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, andel)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDrar(true);
    uppdateraFranX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drar) return;
    uppdateraFranX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const steg = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - steg));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + steg));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  if (!bild) return null;

  return (
    <div>
      <div
        ref={ramRef}
        className="relative aspect-4/3 w-full cursor-ew-resize overflow-hidden rounded-sm bg-muted select-none sm:aspect-16/10"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDrar(false)}
        onPointerCancel={() => setDrar(false)}
      >
        <img
          src={bild.efter}
          alt={bild.altEfter}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <img
          src={bild.fore}
          alt={bild.altFore}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        <span className="pointer-events-none absolute top-4 left-4 rounded-xs bg-foreground/75 px-3 py-1 text-[0.68rem] tracking-[0.18em] text-background uppercase">
          Före
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-xs bg-foreground/75 px-3 py-1 text-[0.68rem] tracking-[0.18em] text-background uppercase">
          Efter
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-background/90"
          style={{ left: `${position}%` }}
        />

        <button
          type="button"
          role="slider"
          aria-label={`Jämför före och efter: ${bild.titel}. Använd vänster- och högerpil för att flytta handtaget.`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} procent före`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground shadow-[0_2px_18px_rgba(31,31,31,0.28)] transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          style={{ left: `${position}%` }}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
            <path
              d="M7 1 1 7l6 6M15 1l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {par.length > 1 && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {par.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setAktiv(i);
                setPosition(50);
              }}
              aria-pressed={i === aktiv}
              className={`group flex items-center gap-3 rounded-xs border p-1.5 pr-3 transition-colors duration-300 ${
                i === aktiv ? "border-primary bg-sand" : "border-line hover:bg-sand"
              }`}
            >
              <img
                src={p.efter}
                alt=""
                loading="lazy"
                className="h-11 w-16 rounded-xs object-cover"
              />
              <span className="text-left text-xs leading-tight">
                <span className="block font-medium">{p.titel}</span>
                <span className="block text-muted-foreground">{p.plats}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
