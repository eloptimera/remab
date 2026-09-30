import { Link } from "@tanstack/react-router";
import { FORETAG } from "@/lib/foretag";
import { PaintEdge } from "@/components/Paint";

export function Footer() {
  return (
    <footer className="relative mt-32 bg-tint">
      <PaintEdge tone="tint" seed={71} />
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg">{FORETAG.namn}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Måleri med omsorg om detaljerna, i {FORETAG.ort} med omnejd sedan 1991.
          </p>
        </div>

        <div>
          <p className="eyebrow">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`tel:${FORETAG.telefonLank}`} className="hover:text-foreground">
                {FORETAG.telefon}
              </a>
            </li>
            <li>
              <a href={`tel:${FORETAG.mobilLank}`} className="hover:text-foreground">
                {FORETAG.mobil}
              </a>
            </li>
            <li>
              <a href={`mailto:${FORETAG.epost}`} className="hover:text-foreground">
                {FORETAG.epost}
              </a>
            </li>
            <li>{FORETAG.adress}</li>
            <li>Org.nr {FORETAG.orgnr}</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Sidor</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/om-oss" className="hover:text-foreground">
                Om oss
              </Link>
            </li>
            <li>
              <Link to="/priser" className="hover:text-foreground">
                Priser & ROT
              </Link>
            </li>
            <li>
              <Link to="/offert" className="hover:text-foreground">
                Begär offert
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-foreground">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/integritetspolicy" className="hover:text-foreground">
                Integritetspolicy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-wrap justify-between gap-2 py-6 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {FORETAG.namn}
          </span>
          <span>F-skatt · Ansvarsförsäkrad · {FORETAG.garantiAr} års garanti</span>
        </div>
      </div>
    </footer>
  );
}
