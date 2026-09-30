import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useState } from "react";
import { FORETAG } from "@/lib/foretag";

const VANSTER = [
  { to: "/", label: "Hem" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/priser", label: "Priser" },
] as const;

const HOGER = [{ to: "/kontakt", label: "Kontakt" }] as const;

const ALLA = [...VANSTER, ...HOGER];

const LANK_KLASS =
  "text-sm font-medium whitespace-nowrap text-primary-foreground/70 transition-colors duration-300 hover:text-primary-foreground";
const LANK_AKTIV = "text-sm font-medium text-primary-foreground";

export function Header() {
  const [oppen, setOppen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex h-16 items-center justify-between gap-6 rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-black/10 md:grid md:grid-cols-[1fr_auto_1fr] md:px-6 lg:px-10">
          {/* Vänster */}
          <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Huvudmeny">
            {VANSTER.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={LANK_KLASS}
                activeProps={{ className: LANK_AKTIV }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logga i mitten */}
          <Link
            to="/"
            className="flex flex-col items-start leading-none md:items-center"
            onClick={() => setOppen(false)}
          >
            <span className="font-display text-lg font-medium tracking-tight">RT Anderssons</span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-primary-foreground/70">
              Måleri · {FORETAG.ort}
            </span>
          </Link>

          {/* Höger */}
          <nav
            className="hidden items-center justify-end gap-4 md:flex lg:gap-6"
            aria-label="Sekundär meny"
          >
            {HOGER.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={LANK_KLASS}
                activeProps={{ className: LANK_AKTIV }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${FORETAG.telefonLank}`}
              aria-label={`Ring ${FORETAG.telefon}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-primary-foreground"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">{FORETAG.telefon}</span>
            </a>
            <Link
              to="/offert"
              className="rounded-full bg-primary-foreground px-5 py-2.5 text-sm whitespace-nowrap font-medium text-primary transition-opacity duration-300 hover:opacity-90"
            >
              Begär offert
            </Link>
          </nav>

          <div className="flex items-center gap-5 md:hidden">
            <a
              href={`tel:${FORETAG.telefonLank}`}
              aria-label={`Ring ${FORETAG.telefon}`}
              className="text-primary-foreground"
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label={oppen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={oppen}
              onClick={() => setOppen((o) => !o)}
            >
              <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
                <path
                  d={oppen ? "M3 2l20 12M3 14L23 2" : "M0 1h26M0 8h26M0 15h26"}
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
          </div>
        </div>

        {oppen && (
          <nav
            className="absolute inset-x-0 top-full mt-2 flex flex-col rounded-3xl bg-primary px-6 py-4 text-primary-foreground shadow-lg shadow-black/10 md:hidden"
            aria-label="Mobilmeny"
          >
            {ALLA.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOppen(false)}
                className={`py-3 ${LANK_KLASS}`}
                activeProps={{ className: `py-3 ${LANK_AKTIV}` }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/offert"
              onClick={() => setOppen(false)}
              className="mt-3 rounded-full bg-primary-foreground px-5 py-3 text-center text-sm font-medium text-primary"
            >
              Begär offert
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
