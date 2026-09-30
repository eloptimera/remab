import { Link } from "@tanstack/react-router";
import { FORETAG } from "@/lib/foretag";

const FOOTER_LANK =
  "underline decoration-transparent decoration-[0.2em] underline-offset-[0.4em] transition-colors duration-200 hover:decoration-lime";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-3xl">{FORETAG.kortnamn}</p>
          <p className="mt-1 text-sm font-bold text-lime">{FORETAG.undertitel}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/75">
            Måleri i {FORETAG.ort}, Hisingen och Göteborg. Aktiva sedan {FORETAG.aktivtSedan}.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-background/85">
            <li>
              <a href={`tel:${FORETAG.telefonLank}`} className={FOOTER_LANK}>
                {FORETAG.telefon}
              </a>
            </li>
            <li>
              <a href={`mailto:${FORETAG.epost}`} className={FOOTER_LANK}>
                {FORETAG.epost}
              </a>
            </li>
            <li>{FORETAG.adress}</li>
            <li>Org.nr {FORETAG.orgnr}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Sidor</p>
          <ul className="mt-4 space-y-2 text-sm text-background/85">
            <li>
              <Link to="/om-oss" className={FOOTER_LANK}>
                Om oss
              </Link>
            </li>
            <li>
              <Link to="/rot" className={FOOTER_LANK}>
                ROT-avdrag
              </Link>
            </li>
            <li>
              <Link to="/offert" className={FOOTER_LANK}>
                Begär offert
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className={FOOTER_LANK}>
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/integritetspolicy" className={FOOTER_LANK}>
                Integritetspolicy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="container-page flex flex-wrap justify-between gap-2 py-6 text-xs text-background/70">
          <span>
            © {new Date().getFullYear()} {FORETAG.namn}
          </span>
          <span>Godkänd för F-skatt</span>
        </div>
      </div>
    </footer>
  );
}
