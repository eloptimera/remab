import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heading, Underline } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/rot")({
  head: () => ({
    meta: [
      { title: "Privatkunder & ROT-avdrag – ReMAB AB" },
      {
        name: "description",
        content:
          "ReMAB AB har F-skatt, så du kan använda ROT-avdraget direkt på fakturan för måleriarbeten hemma. Räkna ut din kostnad efter 30 % avdrag.",
      },
      { property: "og:title", content: "Privatkunder & ROT-avdrag – ReMAB AB" },
      {
        property: "og:description",
        content: "ROT-avdrag direkt på fakturan och en enkel kalkylator.",
      },
      { property: "og:url", content: "/rot" },
    ],
    links: [{ rel: "canonical", href: "/rot" }],
  }),
  component: Rot,
});

const nf = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });

function Rot() {
  const [arbetskostnad, setArbetskostnad] = useState(40000);
  const avdrag = Math.min(arbetskostnad * 0.3, 50000);
  const attBetala = arbetskostnad - avdrag;

  return (
    <>
      <section className="container-page pt-16 pb-14 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Privatkunder</p>
          <Heading as="h1" className="mt-6 max-w-3xl text-[clamp(2rem,9vw,3rem)] sm:text-6xl">
            Sänk dina arbetskostnader med <Underline nowrap>ROT-avdrag</Underline>
          </Heading>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            ReMAB AB har F-skatt, vilket krävs för att du ska kunna använda ROT-avdraget direkt på
            fakturan för måleriarbeten i ditt hem.
          </p>
        </Reveal>
      </section>

      <section className="bg-fade-tint py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">ROT-kalkylator</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Räkna ut din kostnad efter avdrag</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              ROT-avdraget ger 30 % rabatt på arbetskostnaden, upp till 50 000 kr per person och år.
              Kalkylatorn är ett räkneexempel – vad ditt projekt kostar får du i en offert.
            </p>

            <label htmlFor="arbetskostnad" className="mt-10 block text-sm font-bold">
              Arbetskostnad (kr, exklusive material)
            </label>
            <input
              id="arbetskostnad"
              type="number"
              min={0}
              step={1000}
              value={arbetskostnad}
              onChange={(e) => setArbetskostnad(Math.max(0, Number(e.target.value) || 0))}
              className="field mt-3 max-w-xs"
            />
            <input
              type="range"
              min={0}
              max={200000}
              step={1000}
              value={arbetskostnad}
              aria-label="Justera arbetskostnad"
              onChange={(e) => setArbetskostnad(Number(e.target.value))}
              className="mt-5 w-full max-w-md accent-foreground"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl bg-white p-8 sm:p-10">
              <dl className="space-y-5">
                <div className="flex justify-between border-b-2 border-line pb-4">
                  <dt className="text-sm text-muted-foreground">Arbetskostnad</dt>
                  <dd className="font-display text-xl">{nf.format(arbetskostnad)} kr</dd>
                </div>
                <div className="flex justify-between border-b-2 border-line pb-4">
                  <dt className="text-sm text-muted-foreground">ROT-avdrag (30 %)</dt>
                  <dd className="font-display text-xl">−{nf.format(avdrag)} kr</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm font-bold">Att betala</dt>
                  <dd className="font-display text-4xl">
                    <Underline>{nf.format(attBetala)} kr</Underline>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Exempel: en arbetskostnad på 40 000 kr ger 12 000 kr i ROT-avdrag – du betalar 28
                000 kr. Materialkostnad omfattas inte av avdraget. Reglerna gäller 2026 enligt
                Skatteverket och kan ändras.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <Reveal className="flex justify-center">
          <Link to="/offert" className="btn-base btn-lime px-10 py-5 text-lg">
            Begär en gratis offert
          </Link>
        </Reveal>
      </section>
    </>
  );
}
