import type { CSSProperties } from 'react';

// Application Styles
export const styles: { [key: string]: CSSProperties } = {
  // Container
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: 'linear-gradient(to bottom right, #f8fafc, #e0e7ff, #fce7f3)',
    color: '#0f172a',
    minHeight: '100vh',
    padding: '2rem',
  },

  // Dashboard Styles
  header: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },

  subheader: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#64748b',
    marginBottom: '3rem',
    fontWeight: '400',
  },

  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem',
  },

  // Sport Card Styles
  sportCard: {
    background: '#ffffff',
    border: 'none',
    borderRadius: '1.5rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },

  sportIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    display: 'block',
  },

  sportName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem',
  },

  sportSubtext: {
    fontSize: '0.9rem',
    color: '#64748b',
  },

  // Info Box Styles
  infoBox: {
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '1.5rem',
    padding: '2rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  infoBoxTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem',
  },

  // Sport Page Styles
  sportPageContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },

  sportPageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },

  backButton: {
    fontSize: '1rem',
    padding: '0.75rem 1.5rem',
    marginRight: '1.5rem',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '0.75rem',
    fontWeight: '600',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    transition: 'all 0.2s',
  },

  sportTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  sportPageIcon: {
    fontSize: '3rem',
  },

  sportTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
  },

  // Search Container Styles
  searchContainer: {
    marginBottom: '2rem',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },

  searchBar: {
    width: '100%',
    padding: '1rem 1.5rem',
    fontSize: '1.1rem',
    borderRadius: '0.75rem',
    border: '2px solid #e2e8f0',
    boxSizing: 'border-box',
    marginBottom: '1rem',
    transition: 'border-color 0.2s',
    outline: 'none',
  },

  searchButton: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px -1px rgb(102 126 234 / 0.5)',
  },

  // Suggestions Styles
  suggestionsContainer: {
    marginTop: '1.5rem',
  },

  suggestionsTitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '0.75rem',
    fontWeight: '600',
  },

  suggestionChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },

  suggestionChip: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '9999px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#475569',
  },

  // History Styles
  historyContainer: {
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e2e8f0',
  },

  historyTitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '0.75rem',
    fontWeight: '600',
  },

  historyItem: {
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  historyQuery: {
    color: '#475569',
    fontSize: '0.95rem',
  },

  // Results Styles
  resultsContainer: {
    marginTop: '2rem',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },

  summary: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '2px solid #e2e8f0',
    color: '#1e293b',
    lineHeight: '1.6',
  },

  // View Toggle Buttons
  viewToggleContainer: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },

  viewToggleButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    color: '#475569',
  },

  viewToggleButtonActive: {
    border: '2px solid #667eea',
    backgroundColor: '#e0e7ff',
    color: '#667eea',
  },

  // Table Styles
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },

  th: {
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0',
    fontWeight: '700',
    color: '#1e293b',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },

  td: {
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
  },

  // Chart Styles
  chartContainer: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '1rem',
  },

  chartTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },

  // Loading State
  loadingContainer: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#ffffff',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },

  // Error State
  errorMessage: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    borderRadius: '1rem',
    border: '2px solid #fecaca',
  },
};

