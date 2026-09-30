import { createFileRoute, Link } from "@tanstack/react-router";
import { BeforeAfterSlider, type ForeEfterPar } from "@/components/BeforeAfterSlider";
import { Heading, PaintHeading, PaintSection } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { ArrowUpRight, DoorOpen, Layers, Scroll, type LucideIcon } from "lucide-react";

import sundsvall from "@/assets/sundsvall.jpg";
import vardagsrumFore from "@/assets/vardagsrum-fore.jpg";
import vardagsrumEfter from "@/assets/vardagsrum-efter.jpg";
import fasadEfter from "@/assets/fasad-efter.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Målare i Sundsvall – RT Anderssons Måleri AB" },
      {
        name: "description",
        content:
          "Målare i Sundsvall sedan 1991. Invändig målning, fasadmålning och tapetsering i Sundsvall. Kostnadsfri offert, fast pris och 3 års garanti.",
      },
      { property: "og:title", content: "Målare i Sundsvall – RT Anderssons Måleri AB" },
      {
        property: "og:description",
        content:
          "Hantverksmässigt måleri i Sundsvall med omnejd. Kostnadsfritt hembesök och fast offert.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Start,
});

const PAR: ForeEfterPar[] = [
  {
    id: "vardagsrum",
    titel: "Vardagsrum",
    plats: "Platshållarbild – byt ut",
    fore: vardagsrumFore,
    efter: vardagsrumEfter,
    altFore: "Vardagsrumsvägg före målning, med sprickor och flagnande färg",
    altEfter: "Samma vardagsrumsvägg efter målning i varm off-white",
  },
];

type Tjanst = {
  nr: string;
  titel: string;
  text: string;
  bild?: string;
  bildAlt?: string;
  ikon?: LucideIcon;
};

const TJANSTER: Tjanst[] = [
  {
    nr: "01",
    titel: "Invändig målning",
    text: "Väggar, tak och lister med noggrant underarbete och dammfria ytor.",
    bild: vardagsrumEfter,
    bildAlt: "Nymålat vardagsrum i ljus kulör",
  },
  {
    nr: "02",
    titel: "Fasadmålning",
    text: "Tvätt, skrapning, grundning och täckmålning anpassad efter husets ålder.",
    bild: fasadEfter,
    bildAlt: "Nymålad trähusfasad i falurött",
  },
  {
    nr: "03",
    titel: "Tapetsering",
    text: "Från enkla rum till mönsterpassning i äldre hus med sneda väggar.",
    ikon: Scroll,
  },
  {
    nr: "04",
    titel: "Spackling & underarbete",
    text: "Det som avgör slutresultatet. Vi lägger tiden där den syns mest.",
    ikon: Layers,
  },
  {
    nr: "05",
    titel: "Snickerimålning",
    text: "Dörrar, foder, fönster och köksluckor med slitstarka ytskikt.",
    ikon: DoorOpen,
  },
];

const OMDOMEN = [
  {
    text: "De tog hand om hela trapphuset utan att en enda boende klagade. Noggrant, tyst och prickfritt.",
    namn: "Platshållare – kund",
    roll: "Brf i Sundsvall",
  },
  {
    text: "Fast pris som höll, och de var klara en dag före utsatt tid. Underarbetet syns i slutresultatet.",
    namn: "Platshållare – kund",
    roll: "Villaägare, Timrå",
  },
  {
    text: "Vi bad om hjälp med kulörval och fick ärliga råd i stället för säljsnack. Rekommenderas.",
    namn: "Platshållare – kund",
    roll: "Lägenhet, Stenstan",
  },
];

function Start() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden pt-24 pb-16">
        <img
          src={sundsvall}
          alt=""
          width={2400}
          height={1348}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/40 to-black/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-r from-black/45 via-black/15 to-transparent"
          aria-hidden="true"
        />
        <div className="container-page text-white">
          <h1 className="text-[min(4rem,calc((100vw_-_3.5rem)/19.2))] leading-[1.05] font-normal tracking-[0.01em] whitespace-nowrap uppercase">
            Målare i {FORETAG.ort} sedan 1991
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/85">
            Vi målar hem, trapphus och fasader i {FORETAG.ort} med omnejd. Lugnt tempo, noggrant
            underarbete och ett fast pris du kan lita på.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/offert"
              className="btn-base bg-primary-foreground text-primary hover:opacity-90"
            >
              Begär kostnadsfri offert
            </Link>
            <Link
              to="/priser"
              className="btn-base border border-white/60 text-white hover:bg-white/10"
            >
              Se våra priser
            </Link>
          </div>
        </div>
      </section>

      {/* Före/efter */}
      <PaintSection tone="tint" seed={3} className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Före och efter</p>
              <PaintHeading seed={5} className="mt-3 text-3xl sm:text-4xl">
                Dra i handtaget och se skillnaden
              </PaintHeading>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Samma yta, före och efter vårt arbete. Dra åt sidorna – eller använd piltangenterna
                när handtaget är markerat.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-8 w-[90%]">
            <BeforeAfterSlider par={PAR} />
          </Reveal>
        </div>
      </PaintSection>

      {/* Tjänster */}
      <PaintSection tone="beige" seed={7} className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Tjänster</p>
                <Heading className="mt-4 max-w-lg text-3xl sm:text-4xl">
                  Allt inom måleri – utfört av samma lag hela vägen
                </Heading>
              </div>
              <div className="max-w-sm md:text-right">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Från första skrapan till sista penseldraget. Ett lag, en kontaktperson och ett
                  fast pris.
                </p>
                <Link
                  to="/offert"
                  className="mt-4 inline-flex items-center gap-2 border-b border-foreground/40 pb-0.5 text-sm font-medium transition-colors duration-300 hover:border-foreground"
                >
                  Begär offert
                  <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-6">
            {TJANSTER.map((t, i) => {
              const Ikon = t.ikon;
              const stor = i === 0;
              const span = t.bild ? (stor ? "lg:col-span-4" : "lg:col-span-2") : "lg:col-span-2";

              if (t.bild) {
                return (
                  <Reveal key={t.titel} delay={i * 80} className={span}>
                    <article className="group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-sm text-white lg:min-h-[27rem]">
                      <img
                        src={t.bild}
                        alt={t.bildAlt ?? ""}
                        loading="lazy"
                        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/20 to-black/0"
                        aria-hidden="true"
                      />
                      <span className="absolute top-6 left-6 rounded-full border border-white/50 bg-black/30 px-3 py-1 text-[0.7rem] tracking-[0.18em] backdrop-blur-sm">
                        {t.nr}
                      </span>
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl sm:text-3xl">{t.titel}</h3>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
                          {t.text}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              }

              return (
                <Reveal key={t.titel} delay={i * 80} className={span}>
                  <article className="group flex h-full min-h-[16rem] flex-col justify-between rounded-sm border border-line bg-card p-6 transition-colors duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:p-8">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground">
                        {Ikon && <Ikon size={22} strokeWidth={1.5} aria-hidden="true" />}
                      </span>
                      <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/70">
                        {t.nr}
                      </span>
                    </div>
                    <div className="mt-10">
                      <h3 className="text-xl">{t.titel}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/80">
                        {t.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PaintSection>

      {/* Omdömen */}
      <PaintSection tone="tint" seed={19} className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <Heading className="text-3xl sm:text-4xl">Kundomdömen</Heading>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {OMDOMEN.map((o, i) => (
              <Reveal key={o.text} delay={i * 100}>
                <figure className="h-full">
                  <blockquote className="font-display text-lg leading-relaxed">
                    ”{o.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-muted-foreground">
                    {o.namn} · {o.roll}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </PaintSection>

      {/* Avslutande CTA */}
      <section className="container-page">
        <Reveal>
          <div className="rounded-sm bg-primary px-8 py-16 text-primary-foreground sm:px-16 sm:py-20">
            <h2 className="max-w-lg text-3xl sm:text-4xl">
              Berätta om ditt projekt så kommer vi ut och tittar
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">
              Hembesöket och offerten är kostnadsfria. Du binder dig inte till något.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/offert"
                className="btn-base bg-background text-foreground hover:opacity-90"
              >
                Begär kostnadsfri offert
              </Link>
              <a
                href={`tel:${FORETAG.telefonLank}`}
                className="btn-base border border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10"
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
