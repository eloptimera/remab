// Skickar formulären från webbplatsen till valfri mottagare (egen server, Formspree, n8n m.fl.).
// Ingen databas eller tredjepartstjänst är hårdkodad. Sätt VITE_FORM_ENDPOINT i .env
// (se .env.example). Saknas den kastas ett fel, så att besökaren får se felmeddelandet
// i stället för att tro att meddelandet gått iväg.

const ENDPOINT = import.meta.env["VITE_FORM_ENDPOINT"] as string | undefined;

async function skicka(typ: "kontakt" | "offert", fd: FormData): Promise<void> {
  if (!ENDPOINT) {
    throw new Error("VITE_FORM_ENDPOINT är inte konfigurerad");
  }
  fd.set("formular", typ);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    body: fd,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Formuläret avvisades (${res.status})`);
  }
}

export type KontaktData = {
  namn: string;
  epost: string;
  telefon: string;
  meddelande: string;
};

export async function skickaKontakt(data: KontaktData): Promise<void> {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.set(k, v);
  await skicka("kontakt", fd);
}

export type OffertData = {
  namn: string;
  telefon: string;
  epost: string;
  adress: string;
  uppdragstyper: string[];
  yta_kvm: number | null;
  onskat_startdatum: string | null;
  meddelande: string;
  gdpr_samtycke: true;
};

export async function skickaOffert(data: OffertData, bilder: File[]): Promise<void> {
  const fd = new FormData();
  fd.set("namn", data.namn);
  fd.set("telefon", data.telefon);
  fd.set("epost", data.epost);
  fd.set("adress", data.adress);
  fd.set("uppdragstyper", data.uppdragstyper.join(", "));
  fd.set("yta_kvm", data.yta_kvm === null ? "" : String(data.yta_kvm));
  fd.set("onskat_startdatum", data.onskat_startdatum ?? "");
  fd.set("meddelande", data.meddelande);
  fd.set("gdpr_samtycke", "ja");
  for (const bild of bilder) fd.append("bilder", bild, bild.name);
  await skicka("offert", fd);
}
