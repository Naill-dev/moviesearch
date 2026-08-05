import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // .env faylındakı açar
const BASE_URL = 'https://www.omdbapi.com/';

export function useFetchMovieDetails(imdbID) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbID) {
      setMovie(null);
      setError(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (data.Response === 'False') throw new Error(data.Error || 'Film tapılmadı');
        setMovie(data);
      } catch (err) {
        setError(err.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  return { movie, loading, error };
}
