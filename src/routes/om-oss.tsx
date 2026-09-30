import { createFileRoute } from "@tanstack/react-router";
import { PaintHeading, PaintSection } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { ImagePlus } from "lucide-react";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – RT Anderssons Måleri AB i Sundsvall" },
      {
        name: "description",
        content:
          "Historien bakom RT Anderssons Måleri AB i Sundsvall: hantverket och värderingarna som ligger bakom varje målat rum.",
      },
      { property: "og:title", content: "Om oss – RT Anderssons Måleri AB" },
      {
        property: "og:description",
        content: "Måleriföretaget i Sundsvall som lägger tiden på underarbetet.",
      },
      { property: "og:url", content: "/om-oss" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: OmOss,
});

const VARDERINGAR = [
  {
    titel: "Underarbetet först",
    text: "Ett måleri bedöms om tio år, inte om tio dagar. Därför lägger vi merparten av tiden på det som sedan göms under färgen.",
  },
  {
    titel: "Fast pris, inga tillägg",
    text: "Offerten vi lämnar är den du betalar. Dyker något oväntat upp hör vi av oss innan vi rör det.",
  },
  {
    titel: "Rena arbetsplatser",
    text: "Vi täcker, dammsuger och städar varje dag. Du ska kunna bo kvar medan vi arbetar.",
  },
];

// Lägg in sökvägen till en bild på grundaren här, t.ex. importera en fil från
// "@/assets/" och sätt GRUNDARE_BILD = grundarBild. Tills dess visas en tom ram.
const GRUNDARE_BILD: string | null = null;

function OmOss() {
  return (
    <>
      <section className="container-page pt-16 pb-16 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Om oss</p>
          <PaintHeading
            as="h1"
            seed={31}
            className="mt-6 max-w-2xl text-4xl leading-[1.12] sm:text-5xl"
          >
            Ett måleri byggt på tålamod, inte på tempo
          </PaintHeading>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {FORETAG.namn} är ett familjedrivet måleri i {FORETAG.ort}. Vi är tillräckligt små för
            att du alltid pratar med samma person, och tillräckligt erfarna för att klara både en
            enskild hall och ett helt trapphus.
          </p>
        </Reveal>
      </section>

      <section className="container-page grid gap-12 pb-20 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <Reveal>
          {GRUNDARE_BILD ? (
            <img
              src={GRUNDARE_BILD}
              alt="Grundaren av RT Anderssons Måleri AB"
              loading="lazy"
              className="aspect-4/5 w-full rounded-sm object-cover"
            />
          ) : (
            <div className="flex aspect-4/5 w-full flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-foreground/30 bg-sand text-muted-foreground">
              <ImagePlus size={32} strokeWidth={1.3} aria-hidden="true" />
              <span className="text-sm">Lägg in bild på grundaren</span>
            </div>
          )}
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Grundaren</p>
          <h2 className="mt-4 text-3xl">Från lärling till eget måleri</h2>
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Det började som lärling hos en äldre målare utanför {FORETAG.ort}, med en spackelspade
              i handen och order om att aldrig gå vidare till färgen förrän ytan var helt slät. Den
              regeln gäller fortfarande.
            </p>
            <p>
              Efter många år i andras företag startade vi eget för att kunna arbeta på vårt eget
              sätt: färre jobb samtidigt, mer tid på varje, och samma målare på plats från första
              dagen till besiktningen.
            </p>
            <p>
              Idag målar vi villor, lägenheter, trapphus och fasader åt privatpersoner,
              bostadsrättsföreningar och mindre företag i hela Sundsvallsområdet.
            </p>
          </div>
        </Reveal>
      </section>

      <PaintSection tone="tint" seed={33} className="py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Våra värderingar</p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {VARDERINGAR.map((v, i) => (
              <Reveal key={v.titel} delay={i * 100}>
                <article className="border-t border-foreground/20 pt-6">
                  <h3 className="text-xl">{v.titel}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </PaintSection>
    </>
  );
}
