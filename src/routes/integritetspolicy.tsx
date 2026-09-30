import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading } from "@/components/Heading";
import { FORETAG } from "@/lib/foretag";

export const Route = createFileRoute("/integritetspolicy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy – ReMAB AB" },
      {
        name: "description",
        content:
          "Så behandlar ReMAB AB dina personuppgifter när du kontaktar oss eller begär offert.",
      },
      { property: "og:title", content: "Integritetspolicy – ReMAB AB" },
      { property: "og:url", content: "/integritetspolicy" },
    ],
    links: [{ rel: "canonical", href: "/integritetspolicy" }],
  }),
  component: Integritetspolicy,
});

function Sektion({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl">{titel}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Integritetspolicy() {
  return (
    <article className="container-page max-w-3xl pt-16 pb-8 sm:pt-24">
      <p className="eyebrow">Integritetspolicy</p>
      <Heading as="h1" className="mt-6 text-4xl sm:text-5xl">
        Så hanterar vi dina personuppgifter
      </Heading>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Här beskriver vi vilka personuppgifter vi samlar in via den här webbplatsen, varför, och
        vilka rättigheter du har enligt dataskyddsförordningen (GDPR).
      </p>

      <Sektion titel="Personuppgiftsansvarig">
        <p>
          {FORETAG.namn}, org.nr {FORETAG.orgnr}, {FORETAG.adress}, är personuppgiftsansvarig för
          behandlingen. Du når oss på{" "}
          <a className="underline" href={`mailto:${FORETAG.epost}`}>
            {FORETAG.epost}
          </a>{" "}
          eller {FORETAG.telefon}.
        </p>
      </Sektion>

      <Sektion titel="Vilka uppgifter vi samlar in">
        <p>Vi samlar bara in det du själv skriver i våra formulär:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className="font-medium text-foreground">Kontaktformuläret:</strong> namn,
            e-post, telefonnummer och ditt meddelande.
          </li>
          <li>
            <strong className="font-medium text-foreground">Offertförfrågan:</strong> namn,
            telefonnummer, e-post, adress till objektet, uppgifter om projektet (till exempel yta
            och önskat startdatum) och ditt meddelande.
          </li>
        </ul>
        <p>
          Om du ringer eller mejlar oss direkt behandlar vi de uppgifter du lämnar där på samma
          sätt.
        </p>
      </Sektion>

      <Sektion titel="Varför vi behandlar uppgifterna">
        <p>
          Vi använder uppgifterna för att svara på din fråga och ta fram en offert. Rättslig grund
          är att det behövs för att vidta åtgärder på din begäran innan ett avtal ingås, och
          därefter för att fullgöra avtalet. Om du blir kund sparar vi även underlag som vi är
          skyldiga att bevara enligt bokföringslagen.
        </p>
        <p>Vi säljer inte dina uppgifter och skickar inte nyhetsbrev utan att du bett om det.</p>
      </Sektion>

      <Sektion titel="Hur länge vi sparar dem">
        <p>
          Vi sparar en förfrågan så länge den är aktuell. Blir det ingen affär raderar vi den när vi
          inte längre har anledning att spara den. Uppgifter som ingår i bokföringen sparas i den
          tid lagen kräver.
        </p>
      </Sektion>

      <Sektion titel="Vem som får ta del av uppgifterna">
        <p>
          Formulären sparas hos en tjänsteleverantör som vi använder för att driva webbplatsen, som
          behandlar uppgifterna för vår räkning. Webbplatsen driftas hos en hostingleverantör som
          kan se teknisk trafikdata som IP-adress. Utöver det lämnar vi bara ut uppgifter om lag
          kräver det.
        </p>
      </Sektion>

      <Sektion titel="Cookies">
        <p>
          Webbplatsen använder i nuläget inga cookies för spårning, statistik eller marknadsföring.
          Ändrar vi det uppdaterar vi den här sidan.
        </p>
      </Sektion>

      <Sektion titel="Dina rättigheter">
        <p>Du har rätt att:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>få veta vilka uppgifter vi har om dig och få en kopia,</li>
          <li>få felaktiga uppgifter rättade,</li>
          <li>begära att uppgifterna raderas eller att behandlingen begränsas,</li>
          <li>invända mot behandling som grundas på berättigat intresse.</li>
        </ul>
        <p>
          Kontakta oss så hjälper vi dig. Du har också rätt att klaga hos{" "}
          <a
            className="underline"
            href="https://www.imy.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            Integritetsskyddsmyndigheten (IMY)
          </a>
          .
        </p>
      </Sektion>

      <p className="mt-14 text-sm text-muted-foreground">
        Har du frågor?{" "}
        <Link to="/kontakt" className="underline">
          Kontakta oss
        </Link>
        .
      </p>
    </article>
  );
}
