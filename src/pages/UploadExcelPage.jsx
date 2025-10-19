import React from 'react';
import { useState } from "react";

function UploadExcelPage() {
//   const API = import.meta.env.VITE_API_URL; // np. https://twoj-backend.example.com
  const API = "http://localhost:8000";
  const base = API || "/api";

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // prosty guard rozmiaru (np. 10 MB)
    const maxBytes = 10 * 1024 * 1024;
    if (f.size > maxBytes) {
      setStatus("Plik zbyt duży (max 10 MB).");
      return;
    }
    setFile(f);
    setStatus("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Wybierz plik .xlsx / .xls");
      return;
    }

    try {
      setUploading(true);
      setStatus("Wysyłam...");

      const form = new FormData();
      form.append("file", file);

      const headers = {
        // JEŚLI używasz JWT w nagłówku:
        ...(localStorage.getItem("accessToken")
          ? { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
          : {}),
      };

      const res = await fetch(`${base}/alignment_ratio/upload-excel`, {
        method: "POST",
        headers,            // bez Content-Type, bo FormData samo ustawia boundary
        body: form,
        // JEŚLI refresh/cookie – odkomentuj:
        // credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Błąd uploadu (${res.status})`);
      }

      const data = await res.json();
      setStatus(`OK: zapisano jako ${data.stored_as}`);
      setFile(null);
      (e.target.reset?.()) // wyczyść input jeśli chcesz
    } catch (err) {
      setStatus(err.message || "Błąd wysyłki");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-2">Wyślij plik Excel</h1>
      <p className="text-sm text-gray-500 mb-4">
        Akceptowane: <code>.xlsx</code>, <code>.xls</code>
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="file"
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          onChange={onFileChange}
          className="block w-full rounded-xl border border-gray-300 p-2"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full rounded-xl bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50"
        >
          {uploading ? "Wysyłam…" : "Wyślij"}
        </button>
      </form>

      {status && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
          {status}
        </div>
      )}
    </div>
  );
}

export default UploadExcelPage;