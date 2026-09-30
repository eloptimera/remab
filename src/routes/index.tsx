import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading, Marquee, Underline } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/hero-goteborg.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Målare i Torslanda & Göteborg – ReMAB AB" },
      {
        name: "description",
        content:
          "Professionellt måleri i Torslanda, på Hisingen och i Göteborg sedan 2006. Invändigt och utvändigt måleri, spackling, slipning och tapetsering. Begär en gratis offert.",
      },
      { property: "og:title", content: "Målare i Torslanda & Göteborg – ReMAB AB" },
      {
        property: "og:description",
        content: "Erfarna målare med precision och personligt engagemang. Begär en gratis offert.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Start,
});

const TJANSTER = [
  {
    nr: "01",
    titel: "Invändigt måleri",
    text: "Målning av väggar, tak, kök och snickerier.",
    stil: "bg-lime text-foreground",
  },
  {
    nr: "02",
    titel: "Spackling & slipning",
    text: "Noggrant underarbete för jämna och hållbara resultat.",
    stil: "bg-foreground text-background",
  },
  {
    nr: "03",
    titel: "Tapetsering",
    text: "Professionell uppsättning av mönstrade och enfärgade tapeter.",
    stil: "bg-foreground text-background",
  },
  {
    nr: "04",
    titel: "Utvändigt måleri",
    text: "Fasadmålning av villor och fastigheter anpassat efter väder och material.",
    stil: "bg-lime text-foreground",
  },
] as const;

const BANDTEXT = TJANSTER.map((t) => t.titel);

function Start() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden pt-28 pb-40 sm:pb-44">
        <img
          src={hero}
          alt=""
          width={1000}
          height={513}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/45 to-black/75"
          aria-hidden="true"
        />
        <div className="container-page text-white">
          <div className="flex flex-wrap gap-3" aria-hidden="true">
            <span className="-rotate-3 rounded-full bg-lime px-5 py-2 text-sm font-bold text-foreground">
              Sedan {FORETAG.aktivtSedan}
            </span>
            <span className="rotate-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-foreground">
              Torslanda · Hisingen · Göteborg
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[1]">
            Professionellt <Underline>måleri</Underline> i{"\u00a0"}
            {FORETAG.ort} &amp;{"\u00a0"}Göteborg
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/90">
            Vi är ett passionerat team av erfarna målare som sätter dina unika visioner i fokus.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/offert" className="btn-base btn-lime">
              Begär en gratis offert
            </Link>
            <a
              href={`tel:${FORETAG.telefonLank}`}
              className="btn-base border-2 border-white text-white hover:border-lime hover:bg-lime hover:text-foreground"
            >
              Ring {FORETAG.telefon}
            </a>
          </div>
        </div>
        <Marquee items={BANDTEXT} />
      </section>

      {/* Om företaget */}
      <section className="container-page grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">ReMAB AB</p>
          <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
            Varje projekt är en <Underline>prioritet</Underline>
          </Heading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Sedan {FORETAG.aktivtSedan} har ReMAB AB levererat högkvalitativa måleriarbeten med stor
            precision och ett personligt engagemang i Torslanda och Göteborgsområdet. För oss är
            varje projekt en prioritet, varje detalj viktig och varje kund värd det allra bästa.
          </p>
          <Link
            to="/om-oss"
            className="mt-8 inline-flex items-center gap-2 font-bold underline decoration-lime decoration-[0.18em] underline-offset-[0.4em] hover:decoration-foreground"
          >
            Läs mer om oss
            <ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-foreground p-6 text-background">
              <dt className="text-xs font-bold tracking-[0.14em] text-lime uppercase">
                Aktiva sedan
              </dt>
              <dd className="mt-3 font-display text-5xl">{FORETAG.aktivtSedan}</dd>
            </div>
            <div className="rounded-3xl bg-lime p-6">
              <dt className="text-xs font-bold tracking-[0.14em] uppercase">Arbetsområde</dt>
              <dd className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                {FORETAG.omrade}
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Tjänster */}
      <section className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Tjänster</p>
            <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
              Målning för hus, lägenheter och <Underline>fastigheter</Underline>
            </Heading>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {TJANSTER.map((t, i) => (
              <Reveal key={t.titel} delay={i * 80}>
                <article
                  className={`flex h-full min-h-[15rem] flex-col justify-between rounded-3xl p-8 sm:p-10 ${t.stil}`}
                >
                  <span className="text-sm font-bold tracking-[0.14em]">{t.nr}</span>
                  <div className="mt-12">
                    <h3 className="text-3xl sm:text-4xl">{t.titel}</h3>
                    <p className="mt-4 max-w-sm leading-relaxed opacity-85">{t.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROT */}
      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border-2 border-foreground p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Privatkunder</p>
              <Heading className="mt-4 max-w-xl text-3xl sm:text-4xl">
                ROT-avdrag direkt på <Underline>fakturan</Underline>
              </Heading>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                ReMAB AB har F-skatt, vilket krävs för att du ska kunna använda ROT-avdraget direkt
                på fakturan för måleriarbeten i ditt hem.
              </p>
            </div>
            <Link to="/rot" className="btn-base btn-primary">
              Räkna på ditt ROT-avdrag
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Avslutande CTA */}
      <section className="container-page pb-4">
        <Reveal>
          <div className="rounded-3xl bg-foreground px-8 py-16 text-background sm:px-16 sm:py-20">
            <h2 className="max-w-2xl text-4xl sm:text-5xl">
              Berätta om ditt projekt – vi ger dig en <Underline>gratis offert</Underline>
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/offert" className="btn-base btn-lime">
                Begär en gratis offert
              </Link>
              <a
                href={`tel:${FORETAG.telefonLank}`}
                className="btn-base border-2 border-background/60 text-background hover:border-lime hover:bg-lime hover:text-foreground"
              >
                Ring {FORETAG.telefon}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
