import React from 'react';

export function Card({ movie }) {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Poster+Yoxdur';

  return (
    <div className="movie-card">
      <div className="card-image-wrapper">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="card-image"
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <span className="badge">{movie.Type.toUpperCase()}</span>
        <h3 className="movie-title" title={movie.Title}>
          {movie.Title}
        </h3>
        <p className="movie-year">İl: {movie.Year}</p>
      </div>
    </div>
  );
}
