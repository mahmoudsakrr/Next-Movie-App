const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;

export interface FetcherOptions {
  params: Record<string, string | number | boolean>;
}

export async function fetcher<T = any>({ params }: FetcherOptions): Promise<T> {
  if (!OMDB_API_KEY || !OMDB_BASE_URL) {
    throw new Error('OMDb API key or base URL is not configured in .env.local');
  }

  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set('apikey', OMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`OMDb API error: ${res.status}`);
  }
  const data = await res.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Unknown OMDb error');
  }
  return data;
} 