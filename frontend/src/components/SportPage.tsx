import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styles } from '../styles/appStyles';
import { sportConfig } from '../config/sportConfig';
import { videoAssets } from '../config/assetConfig';
import type { StatsData, SearchHistory, ViewMode } from '../types';
import { BACKEND_URL } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import VideoBackground from './VideoBackground';
import SearchBar from './SearchBar';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import ViewToggle from './ViewToggle';
import MultiMetricChart from './MultiMetricChart';
import ResultsTable from './ResultsTable';
import InterestingFact from './InterestingFact';
import VideoClips from './VideoClips';
import UserProfile from './UserProfile';

const BackgroundStage = lazy(() => import('./background/BackgroundStage'));

const SportPage: React.FC = () => {
  const { sportName } = useParams<{ sportName: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const sport = sportName || 'Cricket';
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  const config = sportConfig[sport as keyof typeof sportConfig];

  // Load search history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`searchHistory_${sport}`);
    if (stored) {
      setSearchHistory(JSON.parse(stored));
    }
  }, [sport]);

  // Log search query to database (works for both authenticated and anonymous users)
  const logQuery = async (queryText: string, hasError: boolean = false) => {
    try {
      await fetch(`${BACKEND_URL}/api/queries/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user?.uid || null, // null for anonymous users
          sport,
          query: queryText,
          hasError
        }),
      });
    } catch (error) {
      console.error('Failed to log query:', error);
      // Don't throw - logging failures shouldn't break the app
    }
  };

  const handleSearch = async (searchQuery?: string) => {
    const queryToSearch = searchQuery || query;
    if (!queryToSearch.trim()) return;

    // Trigger 3D animation
    setSearchTrigger(true);
    setTimeout(() => setSearchTrigger(false), 100);

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/search`, {
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

      // Log successful query to database
      await logQuery(queryToSearch, false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Sorry, something went wrong while fetching the data. Please try again.');

      // Log failed query to database
      await logQuery(queryToSearch, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the video background URL based on sport
  const getVideoBackground = () => {
    if (sport === 'Cricket') return videoAssets.cricket;
    if (sport === 'Soccer') return videoAssets.soccer;
    return null;
  };

  const videoBackgroundUrl = getVideoBackground();

  return (
    <div style={{ ...styles.container, position: 'relative', zIndex: 1 }}>
      {/* Video Background for Cricket and Soccer */}
      {videoBackgroundUrl && (
        <VideoBackground videoSrc={videoBackgroundUrl} opacity={0.9} />
      )}
      
      {/* 3D Background */}
      <Suspense fallback={null}>
        <BackgroundStage 
          sportId={config.backgroundId} 
          onSearchTrigger={searchTrigger}
          isPaused={false}
        />
      </Suspense>

      {/* Header */}
      <header style={{ ...styles.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.backButtonHover);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, styles.backButton);
          }}
        >
          ← Back to Home
        </button>
        <div style={styles.sportPageTitle}>
          <span style={styles.sportPageIcon}>{config.icon}</span>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{sport}</h1>
        </div>
        <UserProfile />
      </header>

      {/* Main Content */}
      <main style={{ ...styles.mainContent, position: 'relative', zIndex: 2 }}>
        <div style={styles.pageContainer}>
          {/* Search Bar */}
          <div
            style={{
              animation: 'slideUp 0.4s ease',
            }}
          >
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
          </div>

          {/* Loading State */}
          {isLoading && (
            <div style={{ animation: 'slideUp 0.4s ease' }}>
              <LoadingState sport={sport} />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ animation: 'slideUp 0.4s ease' }}>
              <ErrorState message={error} />
            </div>
          )}

          {/* Results */}
          {results && !isLoading && (
            <>
              <div
                style={{
                  ...styles.resultsContainer,
                  animation: 'slideUp 0.4s ease',
                }}
              >
                {/* Interesting Fact */}
                {results.interesting_fact && (
                  <InterestingFact fact={results.interesting_fact} />
                )}

                <p style={styles.summary}>
                  <span style={{ marginRight: '0.5rem' }}>📊</span>
                  {results.summary}
                </p>

                {/* View Toggle */}
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

                {/* Chart View */}
                {(viewMode === 'chart' || viewMode === 'all') && (
                  <MultiMetricChart data={results} sport={sport} />
                )}

                {/* Table View */}
                {(viewMode === 'table' || viewMode === 'all') && (
                  <ResultsTable data={results} />
                )}
              </div>

              {/* Video Clips Section */}
              {(viewMode === 'videos' || viewMode === 'all') &&
                results.video_clips &&
                results.video_clips.length > 0 && (
                  <div style={{ animation: 'slideUp 0.4s ease 0.2s both' }}>
                    <VideoClips clips={results.video_clips} />
                  </div>
                )}
            </>
          )}

          {/* Empty State */}
          {!isLoading && !error && !results && (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                animation: 'slideUp 0.4s ease',
              }}
            >
              <p style={{ fontSize: '1.1rem', color: '#aaaaaa' }}>
                Search for {sport} statistics to get started
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SportPage;

