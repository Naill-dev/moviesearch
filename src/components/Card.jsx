import React from 'react';

export function Card({ movie, onClick }) { // <— onClick prop-u əlavə edildi
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=Şəkil+yoxdur';

  return (
    <div className="movie-card" onClick={onClick}> {/* <— onClick əlavə edildi */}
      <div className="card-image-wrapper">
        <img 
          src={posterUrl} 
          alt={movie.Title} 
          className="card-image"
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <span className="badge">{movie.Type || 'Film'}</span>
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
}
