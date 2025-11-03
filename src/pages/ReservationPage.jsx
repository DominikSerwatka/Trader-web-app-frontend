import React from "react";
import { useEffect } from "react";

export default function ReservationPage() {
  useEffect(() => {
    // 1) Inicjalizacja (idempotentna)
    if (window.Cal) {
      window.Cal("init", {
        // opcjonalnie można jawnie podać origin:
        // origin: "http://localhost:3000",
      });

      // 2) Montaż embedu we wskazanym kontenerze
      window.Cal("inline", {
        elementOrSelector: ".calcom",
        calLink: "dominikserwatka/wizyta-w-salonie-kosmetycznym",
        config: { theme: "light" } // opcjonalnie
      });
    }

    // 3) (opcjonalnie) nasłuch sukcesu rezerwacji
    const onMsg = (e) => {
      if (e?.data?.name === "bookingSuccessful") {
        alert("Dzięki! Termin zarezerwowany ✅");
        console.log("✅ Rezerwacja:", e?.data?.data);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">Umów wizytę</h1>
      <p className="text-slate-600 mb-6">
        Wybierz dogodny termin poniżej. Rezerwacja zajmuje mniej niż minutę.
      </p>

      {/* Tu Cal zamontuje iframe z bookerem */}
      <div
        className="calcom rounded-2xl"
        // style={{ minHeight: 720 }}
      />

      <p className="mt-6 text-sm text-slate-500">
        Problem z widokiem?{" "}
        <a
          href="https://reviewer-cooper-tumor-prep.trycloudflare.com/dominikserwatka/wizyta-w-salonie-kosmetycznym"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Otwórz w nowej karcie
        </a>
        .
      </p>
    </main>
  );
}
