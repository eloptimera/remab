import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heading } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { skickaKontakt } from "@/lib/formular";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – RT Anderssons Måleri AB i Sundsvall" },
      {
        name: "description",
        content:
          "Ring, mejla eller skicka ett meddelande till RT Anderssons Måleri AB i Sundsvall. Öppettider, adress och karta.",
      },
      { property: "og:title", content: "Kontakt – RT Anderssons Måleri AB" },
      {
        property: "og:description",
        content: "Telefon, e-post, adress och öppettider för måleriet i Sundsvall.",
      },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Kontakt,
});

function Kontakt() {
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    try {
      await skickaKontakt({
        namn: String(fd.get("namn") ?? ""),
        epost: String(fd.get("epost") ?? ""),
        telefon: String(fd.get("telefon") ?? ""),
        meddelande: String(fd.get("meddelande") ?? ""),
      });
      setKlart(true);
    } catch {
      setFel("Meddelandet kunde inte skickas. Försök igen eller ring oss.");
    } finally {
      setSkickar(false);
    }
  }

  return (
    <>
      <section className="container-page pt-16 pb-12 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Kontakt</p>
          <Heading
            as="h1"

            className="mt-6 max-w-2xl text-4xl leading-[1.12] sm:text-5xl"
          >
            Hör av dig, så svarar vi så fort vi kan
          </Heading>
        </Reveal>
      </section>

      <section className="container-page grid gap-14 pb-20 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="eyebrow">Telefon</dt>
              <dd className="mt-2">
                <a
                  href={`tel:${FORETAG.telefonLank}`}
                  className="font-display text-2xl hover:opacity-70"
                >
                  {FORETAG.telefon}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Mobil</dt>
              <dd className="mt-2">
                <a
                  href={`tel:${FORETAG.mobilLank}`}
                  className="font-display text-2xl hover:opacity-70"
                >
                  {FORETAG.mobil}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">E-post</dt>
              <dd className="mt-2">
                <a href={`mailto:${FORETAG.epost}`} className="hover:opacity-70">
                  {FORETAG.epost}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Adress</dt>
              <dd className="mt-2 text-muted-foreground">{FORETAG.adress}</dd>
            </div>
            <div>
              <dt className="eyebrow">Öppettider</dt>
              <dd className="mt-2 space-y-1 text-muted-foreground">
                {FORETAG.oppettider.map((o) => (
                  <p key={o.dag}>
                    {o.dag}: {o.tid}
                  </p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Organisationsnummer</dt>
              <dd className="mt-2 text-muted-foreground">{FORETAG.orgnr}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          {klart ? (
            <div className="rounded-sm border border-line bg-card p-8">
              <h2 className="text-2xl">Tack för ditt meddelande</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Vi återkommer så snart vi kan, oftast samma arbetsdag.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid gap-5 rounded-sm border border-line bg-card p-8"
            >
              <h2 className="text-2xl">Skicka ett meddelande</h2>
              <div>
                <label htmlFor="k-namn" className="text-sm font-medium">
                  Namn
                </label>
                <input id="k-namn" name="namn" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="k-epost" className="text-sm font-medium">
                  E-post
                </label>
                <input id="k-epost" name="epost" type="email" required className="field mt-2" />
              </div>
              <div>
                <label htmlFor="k-telefon" className="text-sm font-medium">
                  Telefon (valfritt)
                </label>
                <input id="k-telefon" name="telefon" type="tel" className="field mt-2" />
              </div>
              <div>
                <label htmlFor="k-meddelande" className="text-sm font-medium">
                  Meddelande
                </label>
                <textarea
                  id="k-meddelande"
                  name="meddelande"
                  rows={5}
                  required
                  className="field mt-2"
                />
              </div>
              {fel && <p className="text-sm text-destructive">{fel}</p>}
              <div>
                <button type="submit" disabled={skickar} className="btn-base btn-primary">
                  {skickar ? "Skickar …" : "Skicka meddelande"}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>

      <section className="container-page pb-20">
        <Reveal>
          <iframe
            title="Karta över vårt verksamhetsområde i Sundsvall"
            src="https://www.openstreetmap.org/export/embed.html?bbox=17.20%2C62.35%2C17.42%2C62.44&layer=mapnik"
            loading="lazy"
            className="h-[380px] w-full rounded-sm border border-line"
          />
        </Reveal>
      </section>
    </>
  );
}
