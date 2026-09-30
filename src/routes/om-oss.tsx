import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading, Underline } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import logo from "@/assets/remab-logo.png";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – ReMAB AB, måleri i Torslanda" },
      {
        name: "description",
        content:
          "ReMAB AB är ett målerifirma i Torslanda med erfarna målare. Aktiva sedan 2006 i Torslanda, på Hisingen och i Göteborg.",
      },
      { property: "og:title", content: "Om oss – ReMAB AB" },
      {
        property: "og:description",
        content: "Erfarna målare i Torslanda med precision och personligt engagemang.",
      },
      { property: "og:url", content: "/om-oss" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: OmOss,
});

const VARDERINGAR = [
  {
    titel: "Dina visioner i fokus",
    text: "Vi lyssnar först. Din bild av resultatet är utgångspunkten för hela arbetet.",
    stil: "bg-lime text-foreground",
  },
  {
    titel: "Varje detalj är viktig",
    text: "Precision i både underarbete och slutresultat, från första spackelstrykningen.",
    stil: "bg-foreground text-background",
  },
  {
    titel: "Varje kund värd det bästa",
    text: "Ett personligt engagemang i varje projekt, stort som smått.",
    stil: "border-2 border-foreground",
  },
] as const;

const FAKTA = [
  { rubrik: "Företag", varde: `${FORETAG.namn} (${FORETAG.undertitel})` },
  { rubrik: "Organisationsnummer", varde: FORETAG.orgnr },
  { rubrik: "Aktiva sedan", varde: String(FORETAG.aktivtSedan) },
  { rubrik: "VD", varde: FORETAG.vd },
  { rubrik: "Skatt", varde: "Registrerad för F-skatt, moms och arbetsgivaravgift" },
  { rubrik: "Arbetsområde", varde: FORETAG.omrade },
] as const;

function OmOss() {
  return (
    <>
      <section className="container-page pt-16 pb-16 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Om oss</p>
          <Heading as="h1" className="mt-6 max-w-3xl text-5xl sm:text-6xl">
            Erfarna målare som sätter dina <Underline>visioner</Underline> i fokus
          </Heading>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Vi är ett passionerat team av erfarna målare. Sedan {FORETAG.aktivtSedan} har{" "}
            {FORETAG.namn} levererat högkvalitativa måleriarbeten med stor precision och ett
            personligt engagemang i Torslanda och Göteborgsområdet.
          </p>
        </Reveal>
      </section>

      <section className="container-page grid gap-6 pb-20 md:grid-cols-3">
        {VARDERINGAR.map((v, i) => (
          <Reveal key={v.titel} delay={i * 100}>
            <article className={`h-full rounded-3xl p-8 ${v.stil}`}>
              <h2 className="text-2xl sm:text-3xl">{v.titel}</h2>
              <p className="mt-4 leading-relaxed opacity-85">{v.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-fade-tint py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <Reveal>
            <div className="rounded-3xl bg-white p-8">
              <img
                src={logo}
                alt={`${FORETAG.namn} – ${FORETAG.undertitel}`}
                width={766}
                height={261}
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Fakta om företaget</p>
            <dl className="mt-6 divide-y-2 divide-foreground/10">
              {FAKTA.map((f) => (
                <div key={f.rubrik} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm font-bold">{f.rubrik}</dt>
                  <dd className="text-muted-foreground">{f.varde}</dd>
                </div>
              ))}
            </dl>
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
