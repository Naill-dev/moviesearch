import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export function useFetchMovies(query, page) {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error('Şəbəkə xətası baş verdi (HTTP ' + response.status + ')');
        }

        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults, 10) || 0);
          setError(null);
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(data.Error || 'Nəticə tapılmadı');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Gözlənilməz xəta baş verdi');
          setMovies([]);
          setTotalResults(0);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  return { movies, totalResults, loading, error };
}
