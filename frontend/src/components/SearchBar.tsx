import React from 'react';
import { styles } from '../styles/appStyles';
import SearchSuggestions from './SearchSuggestions';
import SearchHistory from './SearchHistory';
import type { SearchHistory as SearchHistoryType } from '../types';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query?: string) => void;
  isLoading: boolean;
  suggestions: string[];
  history: SearchHistoryType[];
  sport: string;
  showHistory?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  isLoading,
  suggestions,
  history,
  sport,
  showHistory = true,
}) => {
  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleHistorySelect = (historyQuery: string) => {
    setQuery(historyQuery);
    onSearch(historyQuery);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        style={styles.searchBar}
        placeholder={`Search ${sport} stats, players, matches...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
      />
      <button
        style={{
          ...styles.searchButton,
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        onClick={() => onSearch()}
        disabled={isLoading}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(102 126 234 / 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(102 126 234 / 0.5)';
        }}
      >
        {isLoading ? '🔍 Searching...' : '🔍 Search'}
      </button>

      <SearchSuggestions suggestions={suggestions} onSelect={handleSuggestionSelect} />
      
      {showHistory && <SearchHistory history={history} onSelect={handleHistorySelect} />}
    </div>
  );
};

export default SearchBar;

