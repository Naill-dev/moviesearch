import React from 'react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Kino adı axtarın (məs: Batman, Inception)..."
          className="search-input"
        />
      </div>
    </div>
  );
}
