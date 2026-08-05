import React from 'react';

export function Pagination({ currentPage, totalResults, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-page"
      >
        Əvvəlki
      </button>
      <span className="page-info">
        Səhifə <strong>{currentPage}</strong> / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-page"
      >
        Növbəti
      </button>
    </div>
  );
}
