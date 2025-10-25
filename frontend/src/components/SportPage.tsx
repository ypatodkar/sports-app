import React, { useState, useEffect } from 'react';
import { styles } from '../styles/appStyles';
import { sportConfig } from '../config/sportConfig';
import type { StatsData, SearchHistory, ViewMode } from '../types';
import SearchBar from './SearchBar';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import ViewToggle from './ViewToggle';
import MultiMetricChart from './MultiMetricChart';
import ResultsTable from './ResultsTable';
import InterestingFact from './InterestingFact';
import VideoClips from './VideoClips';

interface SportPageProps {
  sport: string;
  onBack: () => void;
}

const SportPage: React.FC<SportPageProps> = ({ sport, onBack }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  const config = sportConfig[sport as keyof typeof sportConfig];

  // Load search history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`searchHistory_${sport}`);
    if (stored) {
      setSearchHistory(JSON.parse(stored));
    }
  }, [sport]);

  const handleSearch = async (searchQuery?: string) => {
    const queryToSearch = searchQuery || query;
    if (!queryToSearch.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:5001/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryToSearch, sport }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: StatsData = await response.json();
      setResults(data);

      // Add to search history
      const newHistory: SearchHistory = {
        query: queryToSearch,
        sport,
        timestamp: Date.now(),
      };
      const updatedHistory = [
        newHistory,
        ...searchHistory.filter((h) => h.query !== queryToSearch),
      ].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem(`searchHistory_${sport}`, JSON.stringify(updatedHistory));
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Sorry, something went wrong while fetching the data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.sportPageContainer}>
      {/* Header */}
      <div style={styles.sportPageHeader}>
        <button
          style={styles.backButton}
          onClick={onBack}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc';
            e.currentTarget.style.borderColor = '#94a3b8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          ← Back
        </button>
        <div style={styles.sportTitleContainer}>
          <span style={styles.sportPageIcon}>{config.icon}</span>
          <h2 style={styles.sportTitle}>{sport}</h2>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
        suggestions={config.suggestions}
        history={searchHistory}
        sport={sport}
        showHistory={!isLoading && !results}
      />

      {/* Loading State */}
      {isLoading && <LoadingState sport={sport} />}

      {/* Error State */}
      {error && <ErrorState message={error} />}

      {/* Results */}
      {results && !isLoading && (
        <>
          <div style={styles.resultsContainer}>
            {/* Interesting Fact */}
            {results.interesting_fact && <InterestingFact fact={results.interesting_fact} />}
            
            <p style={styles.summary}>📊 {results.summary}</p>

            {/* View Toggle */}
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

            {/* Chart View */}
            {(viewMode === 'chart' || viewMode === 'all') && <MultiMetricChart data={results} sport={sport} />}

            {/* Table View */}
            {(viewMode === 'table' || viewMode === 'all') && <ResultsTable data={results} />}
          </div>

          {/* Video Clips Section */}
          {(viewMode === 'videos' || viewMode === 'all') && results.video_clips && results.video_clips.length > 0 && (
            <VideoClips clips={results.video_clips} />
          )}
        </>
      )}
    </div>
  );
};

export default SportPage;

