import React from 'react';
import { Card } from './Card';

export function ResultsList({ movies, loading, error, query }) {
  if (loading) {
    return (
      <div className="status-container">
        <div className="spinner"></div>
        <p className="status-text">Filmlər yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-box">
        <p>{error}</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="status-container">
        <p className="status-text">Axtarış etmək üçün yuxarıdakı xanaya film adı daxil edin.</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="status-container">
        <p className="status-text">Nəticə tapılmadı.</p>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Card key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
