import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';
import { Pagination } from './components/Pagination';
import MovieDetailsModal from './components/MovieDetailsModal'; // <— Modal import
import { useDebounce } from './hooks/useDebounce';
import { useFetchMovies } from './hooks/useFetchMovies';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  // --- Yeni state-lər (modal üçün) ---
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Tema ---
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // --- Siçan parallaksı ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = (e.clientY / window.innerHeight) * 2 - 1;
      document.documentElement.style.setProperty('--mouse-x', xNorm.toFixed(2));
      document.documentElement.style.setProperty('--mouse-y', yNorm.toFixed(2));
      document.documentElement.style.setProperty('--mouse-x-px', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y-px', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Axtarış dəyişdikdə səhifə 1-ə qayıdır ---
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const { movies, totalResults, loading, error } = useFetchMovies(debouncedSearchTerm, page);

  // --- Film seçildikdə modalı aç ---
  const handleMovieSelect = (imdbID) => {
    setSelectedMovieId(imdbID);
    setIsModalOpen(true);
  };

  // --- Modalı bağla ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovieId(null);
  };

  return (
    <div className="app-container">
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="btn-theme" title={theme === 'dark' ? 'Açıq rejim' : 'Qaranlıq rejim'}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="bg-glow"></div>

      <div className="main-wrapper">
        <header className="header">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
            </div>
            <h1 className="logo-text">
              <span className="light">MOVIE</span>
              <span className="blue">SEARCH</span>
            </h1>
          </div>
          <p className="subtitle">Müasir kinomatoqrafiya axtarış platforması</p>
        </header>

        <main>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <ResultsList
            movies={movies}
            loading={loading}
            error={error}
            query={debouncedSearchTerm}
            onMovieClick={handleMovieSelect} // <— Yeni prop
          />

          {!loading && !error && movies.length > 0 && (
            <Pagination
              currentPage={page}
              totalResults={totalResults}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </main>
      </div>

      {/* Modal komponenti */}
      {isModalOpen && (
        <MovieDetailsModal
          imdbID={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
