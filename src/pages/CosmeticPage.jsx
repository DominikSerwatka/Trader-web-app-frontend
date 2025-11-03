import React from "react";
function PageCosmetic() {
const bgImage =
    "https://images.unsplash.com/photo-1556228453-efd1f2cbe0e5?q=80&w=2000&auto=format&fit=crop"; // <- PODMIEŃ

  const services = [
    {
      title: "Manicure / Pedicure",
      desc: "Kształt, skórki i kolor dopasowane do dłoni i stylu.",
      time: "60–90 min",
      price: "od 120 zł",
    },
    {
      title: "Stylizacja brwi i rzęs",
      desc: "Regulacja, laminacja, lifting rzęs — naturalny efekt bez makijażu.",
      time: "45–75 min",
      price: "od 140 zł",
    },
    {
      title: "Pielęgnacja twarzy",
      desc: "Indywidualnie dobrane zabiegi i masaże, bez pośpiechu.",
      time: "60–90 min",
      price: "od 200 zł",
    },
  ];

  return (
    <div className="bg-white text-black">
      {/* HERO z tłem (pełna szerokość) */}
      <section
        className="relative"
        aria-label="Salon — zdjęcie w tle"
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Czarnobiały filtr + czytelność tekstu */}
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
          <h1 className="font-serif text-4xl leading-tight text-white md:text-6xl">
            Salon kosmetyczny Dominika
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            Kameralnie, dokładnie i w Twoim tempie. Dbamy o detale i komfort,
            łącząc pielęgnację z chwilą prawdziwego odpoczynku.
          </p>

          {/* CTA — użyj swojego przycisku jeśli już masz */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/rezerwacja"
              className="inline-flex items-center justify-center rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-transparent hover:text-white"
            >
              Umów wizytę
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-white/90 underline underline-offset-4 hover:text-white"
            >
              Poznaj nas bliżej
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT — modny, prosty układ (duże nagłówki, kolumny) */}
      <section id="about" className="border-y border-black/10">
        <div className="mx-auto max-w-6xl grid gap-10 px-4 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl md:text-4xl">
              O miejscu, które powstało z miłości do detali
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-black/70">
            <p>
              Wierzymy w ponadczasową estetykę i spokojną atmosferę. Każdą
              usługę dobieramy do Ciebie — bez gotowych schematów. U nas masz
              czas, by zwolnić.
            </p>
            <p>
              Pracujemy na sprawdzonych produktach, a higiena i bezpieczeństwo
              są dla nas priorytetem. Jeśli nie wiesz, co wybrać — doradzimy.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-xs md:grid-cols-3">
              <div>
                <dt className="text-black">Godziny</dt>
                <dd className="text-black/60">pn–pt 10:00–18:00</dd>
              </div>
              <div>
                <dt className="text-black">Kontakt</dt>
                <dd className="text-black/60">+48 600 000 000</dd>
              </div>
              <div>
                <dt className="text-black">Adres</dt>
                <dd className="text-black/60">Warszawa, ul. Przykładowa 1</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* USŁUGI — karty w czerni i bieli */}
      <section id="uslugi" className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-8 flex items-end justify-between">
            <h3 className="font-serif text-3xl">Usługi</h3>
            <a href="/cennik" className="text-xs underline hover:no-underline">
              Zobacz pełny cennik
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group rounded-2xl border border-black/10 p-6 transition hover:-translate-y-0.5 hover:border-black"
              >
                <header className="mb-3">
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                </header>
                <p className="min-h-[60px] text-sm text-black/70">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-black/60">
                  <span>{s.time}</span>
                  <span className="font-medium text-black">{s.price}</span>
                </div>
                <div className="mt-6">
                  <a
                    href="/rezerwacja"
                    className="inline-flex items-center justify-center rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-wide transition group-hover:bg-black group-hover:text-white"
                  >
                    Rezerwuj
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROSTE CTA / stopka sekcyjna */}
      <section className="py-16 text-center">
        <p className="text-sm text-black/60">Masz pytania?</p>
        <h3 className="mt-2 font-serif text-2xl">Napisz do nas na Instagramie lub zadzwoń</h3>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4 hover:no-underline"
          >
            @salon_dominiki
          </a>
          <span className="text-black/30">•</span>
          <a href="tel:+48600000000" className="text-sm underline underline-offset-4 hover:no-underline">
            +48 600 000 000
          </a>
        </div>
      </section>
    </div>
  );
}

export default PageCosmetic;