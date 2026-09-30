import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useState } from "react";
import { FORETAG } from "@/lib/foretag";
import logo from "@/assets/remab-logo.png";

const LANKAR = [
  { to: "/", label: "Hem" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/rot", label: "ROT-avdrag" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

const LANK_KLASS =
  "text-sm font-bold whitespace-nowrap text-foreground underline decoration-transparent decoration-[0.2em] underline-offset-[0.55em] transition-colors duration-200 hover:decoration-lime";
const LANK_AKTIV = "decoration-lime";

export function Header() {
  const [oppen, setOppen] = useState(false);

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex h-16 items-center justify-between gap-6 rounded-full bg-white px-4 shadow-lg shadow-black/15 sm:px-6">
          <Link to="/" aria-label={`${FORETAG.namn} – startsida`} onClick={() => setOppen(false)}>
            <img
              src={logo}
              alt={`${FORETAG.namn} – ${FORETAG.undertitel}`}
              width={766}
              height={261}
              className="h-11 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Huvudmeny">
            {LANKAR.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={LANK_KLASS}
                activeProps={{ className: `${LANK_KLASS} ${LANK_AKTIV}` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${FORETAG.telefonLank}`}
              aria-label={`Ring ${FORETAG.telefon}`}
              className="flex items-center gap-2 text-sm font-bold whitespace-nowrap"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">{FORETAG.telefon}</span>
            </a>
            <Link to="/offert" className="btn-base btn-lime px-5 py-2.5 text-sm">
              Begär offert
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <a href={`tel:${FORETAG.telefonLank}`} aria-label={`Ring ${FORETAG.telefon}`}>
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label={oppen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={oppen}
              onClick={() => setOppen((o) => !o)}
              className="p-1"
            >
              <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
                <path
                  d={oppen ? "M3 2l20 12M3 14L23 2" : "M0 1h26M0 8h26M0 15h26"}
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
              </svg>
            </button>
          </div>
        </div>

        {oppen && (
          <nav
            className="absolute inset-x-0 top-full mt-2 flex flex-col rounded-3xl bg-white px-6 py-4 shadow-lg shadow-black/15 md:hidden"
            aria-label="Mobilmeny"
          >
            {LANKAR.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOppen(false)}
                className={`py-3 ${LANK_KLASS}`}
                activeProps={{ className: `py-3 ${LANK_KLASS} ${LANK_AKTIV}` }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/offert"
              onClick={() => setOppen(false)}
              className="btn-base btn-lime mt-3 text-sm"
            >
              Begär offert
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
