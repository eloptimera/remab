import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heading, PaintSection, PaintUnderline } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/priser")({
  head: () => ({
    meta: [
      { title: "Priser & ROT-avdrag – RT Anderssons Måleri AB" },
      {
        name: "description",
        content:
          "Från-priser för målning i Sundsvall och en enkel ROT-kalkylator som visar din kostnad efter 30 % avdrag. Slutpriset sätts alltid efter kostnadsfritt hembesök.",
      },
      { property: "og:title", content: "Priser & ROT-avdrag – RT Anderssons Måleri AB" },
      {
        property: "og:description",
        content: "Från-priser per tjänst och ROT-kalkylator för måleri i Sundsvall.",
      },
      { property: "og:url", content: "/priser" },
    ],
    links: [{ rel: "canonical", href: "/priser" }],
  }),
  component: Priser,
});

const PRISER = [
  { tjanst: "Invändig målning, vägg och tak", pris: "från 180 kr/kvm" },
  { tjanst: "Tapetsering", pris: "från 220 kr/kvm" },
  { tjanst: "Spackling & underarbete", pris: "från 140 kr/kvm" },
  { tjanst: "Snickerimålning, dörr", pris: "från 1 200 kr/st" },
  { tjanst: "Fasadmålning trähus", pris: "från 290 kr/kvm" },
  { tjanst: "Löpande timpris", pris: "från 650 kr/tim" },
];

const nf = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });

function Priser() {
  const [arbetskostnad, setArbetskostnad] = useState(40000);
  const avdrag = Math.min(arbetskostnad * 0.3, 50000);
  const attBetala = arbetskostnad - avdrag;

  return (
    <>
      <section className="container-page pt-16 pb-14 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Priser</p>
          <Heading as="h1" className="mt-6 max-w-2xl text-4xl leading-[1.12] sm:text-5xl">
            Alltid tydliga priser
          </Heading>
          <p className="mt-6 text-lg font-medium text-foreground">
            Alla priser är inklusive moms och före ROT-avdrag.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Priserna nedan är platshållare och riktvärden inklusive material. Varje hem är olika,
            där ytans skick, takhöjd och underarbete avgör.
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-20">
        <Reveal>
          <ul className="overflow-hidden rounded-sm border border-line">
            {PRISER.map((p, i) => (
              <li
                key={p.tjanst}
                className={`flex items-baseline justify-between gap-4 px-5 py-5 sm:px-6 ${
                  i % 2 === 0 ? "bg-card" : "bg-background"
                }`}
              >
                <span className="min-w-0 text-sm">{p.tjanst}</span>
                <span className="shrink-0 font-display text-base whitespace-nowrap sm:text-lg">
                  {p.pris}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <PaintSection tone="tint" seed={43} className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">ROT-kalkylator</p>
            <h2 className="mt-4 text-3xl">Räkna ut din kostnad efter avdrag</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ROT-avdraget ger 30 % rabatt på arbetskostnaden, upp till 50 000 kr per person och år.
              Vi drar av det direkt på fakturan – du behöver inte göra något själv.
            </p>

            <label htmlFor="arbetskostnad" className="mt-10 block text-sm font-medium">
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
              className="mt-5 w-full max-w-md accent-primary"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-sm border border-line bg-card p-8">
              <dl className="space-y-5">
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-sm text-muted-foreground">Arbetskostnad</dt>
                  <dd className="font-display text-lg">{nf.format(arbetskostnad)} kr</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-sm text-muted-foreground">ROT-avdrag (30 %)</dt>
                  <dd className="font-display text-lg">−{nf.format(avdrag)} kr</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-sm font-medium">Att betala</dt>
                  <dd className="font-display text-3xl">
                    <PaintUnderline>{nf.format(attBetala)} kr</PaintUnderline>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Räkneexempel: en arbetskostnad på 40 000 kr ger 12 000 kr i ROT-avdrag – du betalar
                28 000 kr. Materialkostnad omfattas inte av avdraget.
              </p>
            </div>
          </Reveal>
        </div>
      </PaintSection>

      <section className="container-page py-20 sm:py-28">
        <Reveal className="flex justify-center">
          <Link
            to="/offert"
            className="btn-base btn-primary rounded-full px-10 py-5 text-lg shadow-lg shadow-black/10"
          >
            Begär kostnadsfri offert
          </Link>
        </Reveal>
      </section>
    </>
  );
}
