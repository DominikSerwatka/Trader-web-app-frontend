import { useAuth } from '../context/AuthContext';

export const stockLoader = async (ticker, number = 1, fetchWithAuth) => {

  const API = "http://localhost:8000";
  const base = API || '/api';

  if (!ticker || typeof ticker !== 'string') throw new Error('Brak tickera');
  const t = encodeURIComponent(ticker.trim().toUpperCase());
  const n = Number.isFinite(Number(number)) ? Number(number) : 1;

  const res = await fetchWithAuth(`${base}/alignment_ratio/${t}/${n}`, {}, {retry: true});

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const msg = text || `Błąd API (${res.status})`;
    throw new Error(msg);
  }

  const data = await res.json();
  console.log('Alignment data fetched:', data);
  return data;
};
