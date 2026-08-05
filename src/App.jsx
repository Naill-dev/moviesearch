import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';
import { Pagination } from './components/Pagination';
import { useDebounce } from './hooks/useDebounce';
import { useFetchMovies } from './hooks/useFetchMovies';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const { movies, totalResults, loading, error } = useFetchMovies(debouncedSearchTerm, page);

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <header className="header">
          <h1 className="title">OMDb Film Axtarış</h1>
          <p className="subtitle">React, Custom Hooks və OMDb API inteqrasiyası ilə</p>
        </header>

        <main>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <ResultsList
            movies={movies}
            loading={loading}
            error={error}
            query={debouncedSearchTerm}
          />

          {!loading && !error && (
            <Pagination
              currentPage={page}
              totalResults={totalResults}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
