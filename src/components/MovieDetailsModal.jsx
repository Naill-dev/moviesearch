import React from 'react';
import { useFetchMovieDetails } from '../hooks/useFetchMovieDetails';
import './MovieDetailsModal.css'; // aşağıdaki CSS-i bu fayla əlavə edin

export default function MovieDetailsModal({ imdbID, onClose }) {
  const { movie, loading, error } = useFetchMovieDetails(imdbID);

  if (!imdbID) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading && (
          <div className="modal-status">
            <div className="spinner" />
            <p>Yüklənir...</p>
          </div>
        )}

        {error && (
          <div className="modal-status error">
            <p>❌ {error}</p>
          </div>
        )}

        {movie && (
          <div className="modal-movie">
            <div className="modal-poster">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                alt={movie.Title}
              />
            </div>
            <div className="modal-info">
              <h2>{movie.Title} <span>({movie.Year})</span></h2>
              <div className="modal-meta">
                <span>⭐ {movie.imdbRating || '?'}/10</span>
                <span>🎬 {movie.Runtime || '?'}</span>
                <span>📅 {movie.Released || '?'}</span>
              </div>
              <p className="modal-plot">{movie.Plot || 'Süjet məlumatı yoxdur.'}</p>
              <div className="modal-details">
                <p><strong>Rejissor:</strong> {movie.Director || '—'}</p>
                <p><strong>Aktyorlar:</strong> {movie.Actors || '—'}</p>
                <p><strong>Janr:</strong> {movie.Genre || '—'}</p>
                <p><strong>Ölkə:</strong> {movie.Country || '—'}</p>
                <p><strong>Dil:</strong> {movie.Language || '—'}</p>
                <p><strong>Mükafatlar:</strong> {movie.Awards || '—'}</p>
              </div>
              {movie.imdbID && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-imdb-link"
                >
                  IMDb səhifəsinə bax →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
