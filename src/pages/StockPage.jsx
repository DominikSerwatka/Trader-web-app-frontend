import React, { useState } from "react";
import { useAuth } from '../context/AuthContext.jsx';
import { stockLoader } from "../loaders/stockLoader";

function StockPage() {
  const { isLoggedIn, user, fetchWithAuth } = useAuth();
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setData(null);
    const t = ticker.trim().toUpperCase();
    const q = quantity.trim();
    if (!t) {
      setError("Podaj ticker spółki");
      return;
    }
    if (!q || isNaN(q) || Number(q) <= 0) {
      setError("Podaj poprawną ilość raportów");
      return;
    }
    try {
      setLoading(true);
      const resp = await stockLoader(t, q, fetchWithAuth);
      setData(resp);
    } catch (err) {
      setError(err.message || "Nie udało się pobrać danych");
    } finally {
      setLoading(false);
    }
  };  

  if (isLoggedIn) {
    return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-2xl font-bold">Alignment Ratio</h1>
      <p className="text-sm text-gray-500 mb-4">Podaj ticker i sprawdź wskaźnik dla C-level.</p>

     <form onSubmit={onSubmit} className="flex flex-col gap-3 mb-6">
  <input
    type="text"
    inputMode="text"
    autoCapitalize="characters"
    placeholder="np. AAPL"
    value={ticker}
    onChange={(e) => setTicker(e.target.value)}
    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
  />
  <input
    type="text"
    inputMode="numeric"
    placeholder="np. 2"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
  />
  <button
    type="submit"
    className="w-full rounded-xl bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
    disabled={loading}
  >
    {loading ? "Ładowanie…" : "Pobierz"}
  </button>
    </form>


      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {data && (
  <div className="rounded-2xl border border-gray-200 p-4 shadow-sm">
    <div className="mb-3">
      <h2 className="text-xl font-semibold">Wyniki (ReturnInfo)</h2>
      <p className="text-sm text-gray-500">
        Liczba dokumentów: {Array.isArray(data.all_xml) ? data.all_xml.length : 0}
      </p>
    </div>

    {!Array.isArray(data.all_xml) || data.all_xml.length === 0 ? (
      <div className="text-sm text-gray-500">Brak danych do wyświetlenia.</div>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        {data.all_xml.map((entry, i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-4">
            {/* Źródła */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="font-medium">Dokument #{i + 1}</div>
              <div className="flex gap-3 text-sm">
                {entry?.origins?.doc_url && (
                  <a
                    href={entry.origins.doc_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Otwórz plik
                  </a>
                )}
                {entry?.origins?.xml_url && (
                  <a
                    href={entry.origins.xml_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    XML
                  </a>
                )}
              </div>
            </div>

            {/* Owners */}
            <div className="mb-3">
              <div className="text-sm font-semibold mb-1">Owners</div>
              {Array.isArray(entry?.owners) && entry.owners.length > 0 ? (
                <ul className="text-sm grid gap-1">
                  {entry.owners.map((o, idx) => (
                    <li key={idx} className="flex items-baseline gap-2">
                      <span className="font-medium">{o.name}</span>
                      <span className="text-gray-500">
                        {o.officer_title ? `— ${o.officer_title}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500">Brak owners.</div>
              )}
            </div>

            {/* Transactions */}
            <div>
              <div className="text-sm font-semibold mb-2">
                Transactions ({Array.isArray(entry?.transactions) ? entry.transactions.length : 0})
              </div>

              {Array.isArray(entry?.transactions) && entry.transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-gray-500">
                      <tr>
                        <th className="py-2 pr-3">Date</th>
                        <th className="py-2 pr-3">Owner</th>
                        <th className="py-2 pr-3">Role</th>
                        <th className="py-2 pr-3">Security</th>
                        <th className="py-2 pr-3">Code</th>
                        <th className="py-2 pr-3">A/D</th>
                        <th className="py-2 pr-3">Shares</th>
                        <th className="py-2 pr-3">Price/Share</th>
                        <th className="py-2 pr-3">After</th>
                        <th className="py-2 pr-3">Before</th>
                        <th className="py-2">Side</th>
                      </tr>
                    </thead>
                    <tbody className="align-top">
                    {entry.transactions.map((t, k) => {
                      // klasa koloru zależna od typu transakcji
                      const colorClass =
                        t.side?.toUpperCase() === "SELL"
                          ? "text-red-600 font-semibold"
                          : "text-green-600 font-semibold";

                      return (
                        <tr key={k} className="border-t border-gray-200">
                          <td className="py-2 pr-3">{t.date}</td>
                          <td className="py-2 pr-3">{t.owner_name}</td>
                          <td className="py-2 pr-3">{t.role}</td>
                          <td className="py-2 pr-3">{t.security_title}</td>
                          <td className="py-2 pr-3">{t.code}</td>
                          <td className="py-2 pr-3">{t.acquired_disposed}</td>
                          <td className="py-2 pr-3 text-right">{t.shares}</td>
                          <td className="py-2 pr-3 text-right">{t.price_per_share}</td>
                          <td className="py-2 pr-3 text-right">{t.shares_after}</td>
                          <td className="py-2 pr-3 text-right">{t.shares_before}</td>
                          {/* strona transakcji kolorowana */}
                          <td className={`py-2 ${colorClass}`}>{t.side}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Brak transakcji.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
      )}


    </div>
  );

  } else {
    return (
      <section className="pt-10 bg-white px-4">
        <h2 className="text-xl font-bold text-center">Użytkownik nie jest zalogowany</h2>
      </section>
    );
  }
}

export default StockPage;