import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heading, Underline } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { skickaOffert } from "@/lib/formular";

export const Route = createFileRoute("/offert")({
  head: () => ({
    meta: [
      { title: "Begär gratis offert – ReMAB AB" },
      {
        name: "description",
        content:
          "Beskriv ditt måleriprojekt i Torslanda, på Hisingen eller i Göteborg och begär en gratis offert från ReMAB AB.",
      },
      { property: "og:title", content: "Begär gratis offert – ReMAB AB" },
      {
        property: "og:description",
        content: "Berätta om ditt måleriprojekt och få en gratis offert.",
      },
      { property: "og:url", content: "/offert" },
    ],
    links: [{ rel: "canonical", href: "/offert" }],
  }),
  component: Offert,
});

const UPPDRAGSTYPER = [
  "Invändigt måleri",
  "Utvändigt måleri",
  "Tapetsering",
  "Spackling & slipning",
  "Annat",
];

function Offert() {
  const [typer, setTyper] = useState<string[]>([]);
  const [filer, setFiler] = useState<File[]>([]);
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  const vaxla = (t: string) =>
    setTyper((v) => (v.includes(t) ? v.filter((x) => x !== t) : [...v, t]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);

    const fd = new FormData(e.currentTarget);
    try {
      const yta = fd.get("yta_kvm");
      const datum = fd.get("onskat_startdatum");

      await skickaOffert(
        {
          namn: String(fd.get("namn") ?? ""),
          telefon: String(fd.get("telefon") ?? ""),
          epost: String(fd.get("epost") ?? ""),
          adress: String(fd.get("adress") ?? ""),
          uppdragstyper: typer,
          yta_kvm: yta ? Number(yta) : null,
          onskat_startdatum: datum ? String(datum) : null,
          meddelande: String(fd.get("meddelande") ?? ""),
          gdpr_samtycke: true,
        },
        filer,
      );
      setKlart(true);
    } catch {
      setFel("Något gick fel när förfrågan skulle skickas. Försök igen eller ring oss direkt.");
    } finally {
      setSkickar(false);
    }
  }

  if (klart) {
    return (
      <section className="container-page py-28">
        <div className="mx-auto max-w-xl rounded-3xl border border-line bg-card p-10 text-center">
          <p className="eyebrow">Tack!</p>
          <h1 className="mt-5 text-3xl">Din förfrågan är mottagen</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Vi återkommer så snart vi kan. Är det brådskande går det bra att ringa {FORETAG.telefon}
            .
          </p>
          <Link to="/" className="btn-base btn-outline mt-8">
            Tillbaka till startsidan
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container-page pt-16 pb-12 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Offertförfrågan</p>
          <Heading as="h1" className="mt-6 max-w-2xl text-5xl sm:text-6xl">
            Berätta om ditt <Underline>projekt</Underline>
          </Heading>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Ju mer du berättar, desto bättre underlag får vi till din offert. Offerten är gratis.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="grid max-w-3xl gap-6 rounded-3xl border border-line bg-card p-8 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="namn" className="text-sm font-medium">
                  Namn
                </label>
                <input id="namn" name="namn" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="telefon" className="text-sm font-medium">
                  Telefon
                </label>
                <input id="telefon" name="telefon" type="tel" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="epost" className="text-sm font-medium">
                  E-post
                </label>
                <input id="epost" name="epost" type="email" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="adress" className="text-sm font-medium">
                  Adress och ort
                </label>
                <input id="adress" name="adress" required className="field mt-2" />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-medium">Typ av uppdrag</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {UPPDRAGSTYPER.map((t) => (
                  <label
                    key={t}
                    className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm transition-colors duration-300 ${
                      typer.includes(t)
                        ? "border-foreground bg-foreground text-background"
                        : "border-line hover:border-lime hover:bg-lime"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={typer.includes(t)}
                      onChange={() => vaxla(t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="yta_kvm" className="text-sm font-medium">
                  Ungefärlig yta (kvm)
                </label>
                <input id="yta_kvm" name="yta_kvm" type="number" min={0} className="field mt-2" />
              </div>
              <div>
                <label htmlFor="onskat_startdatum" className="text-sm font-medium">
                  Önskat startdatum
                </label>
                <input
                  id="onskat_startdatum"
                  name="onskat_startdatum"
                  type="date"
                  className="field mt-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="meddelande" className="text-sm font-medium">
                Beskriv uppdraget
              </label>
              <textarea
                id="meddelande"
                name="meddelande"
                rows={5}
                className="field mt-2"
                placeholder="Antal rum, takhöjd, nuvarande skick, kulörönskemål …"
              />
            </div>

            <div>
              <label htmlFor="bilder" className="text-sm font-medium">
                Ladda upp bilder (valfritt)
              </label>
              <input
                id="bilder"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiler(Array.from(e.target.files ?? []))}
                className="field mt-2 file:mr-4 file:rounded-md file:border-0 file:bg-lime file:px-3 file:py-1.5 file:text-sm"
              />
              {filer.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">{filer.length} bild(er) valda</p>
              )}
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-1 accent-foreground" />
              <span>
                Jag samtycker till att {FORETAG.namn} lagrar mina uppgifter för att kunna besvara
                min förfrågan. Läs mer i{" "}
                <Link to="/integritetspolicy" className="underline">
                  integritetspolicyn
                </Link>
                .
              </span>
            </label>

            {fel && <p className="text-sm text-destructive">{fel}</p>}

            <div>
              <button type="submit" disabled={skickar} className="btn-base btn-primary">
                {skickar ? "Skickar …" : "Skicka förfrågan"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
