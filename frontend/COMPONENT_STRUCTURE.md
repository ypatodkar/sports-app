# 📁 Component Structure Documentation

## 🎯 Overview

The Sports Stats Hub application has been refactored into a clean, modular component architecture. All inline styles have been moved to a separate styles file, and the application is now organized into reusable, maintainable components.

---

## 📂 Directory Structure

```
frontend/src/
├── components/
│   ├── Dashboard.tsx           # Main dashboard with sport cards
│   ├── SportPage.tsx           # Sport-specific search page
│   ├── SportCard.tsx           # Individual sport card component
│   ├── SearchBar.tsx           # Search input with suggestions & history
│   ├── SearchSuggestions.tsx   # Popular search chips
│   ├── SearchHistory.tsx       # Recent searches list
│   ├── ChartView.tsx           # 📊 NEW! Chart visualization component
│   ├── ResultsTable.tsx        # Statistics table component
│   ├── ViewToggle.tsx          # 📊 NEW! Toggle between chart/table views
│   ├── LoadingState.tsx        # Loading animation component
│   ├── ErrorState.tsx          # Error message component
│   └── FeatureBox.tsx          # Features showcase component
│
├── config/
│   └── sportConfig.ts          # Sport configurations & suggestions
│
├── styles/
│   └── appStyles.ts            # All CSS styles in one file
│
├── types/
│   └── index.ts                # TypeScript interfaces & types
│
├── App.tsx                     # Main app component (clean!)
├── main.tsx                    # Entry point
└── index.css                   # Global CSS & animations
```

---

## 🧩 Component Breakdown

### 1. **App.tsx** (Main Component)
**Purpose:** Entry point, manages routing between Dashboard and SportPage

**State:**
- `selectedSport`: Currently selected sport (null = dashboard)

**Props:** None

**Usage:**
```tsx
<App />
```

---

### 2. **Dashboard.tsx**
**Purpose:** Landing page showing all sports and features

**Props:**
```typescript
interface DashboardProps {
  onSelectSport: (sport: string) => void;
}
```

**Components Used:**
- `SportCard` (5 instances)
- `FeatureBox`

**Usage:**
```tsx
<Dashboard onSelectSport={handleSportSelect} />
```

---

### 3. **SportPage.tsx**
**Purpose:** Sport-specific page with search functionality

**State:**
- `query`: Search query string
- `results`: API response data
- `isLoading`: Loading state
- `error`: Error message
- `searchHistory`: Recent searches
- `viewMode`: 'table' | 'chart' | 'both' (NEW!)

**Props:**
```typescript
interface SportPageProps {
  sport: string;
  onBack: () => void;
}
```

**Components Used:**
- `SearchBar`
- `LoadingState`
- `ErrorState`
- `ViewToggle` (NEW!)
- `ChartView` (NEW!)
- `ResultsTable`

**Usage:**
```tsx
<SportPage sport="Cricket" onBack={handleBack} />
```

---

### 4. **SportCard.tsx**
**Purpose:** Individual sport card with gradient and icon

**Props:**
```typescript
interface SportCardProps {
  sport: string;
  config: SportConfig;  // { icon, gradient, suggestions }
  onSelect: (sport: string) => void;
}
```

**Features:**
- Hover animations
- Gradient backgrounds
- Sport icons

**Usage:**
```tsx
<SportCard 
  sport="Cricket" 
  config={sportConfig.Cricket}
  onSelect={handleSelect}
/>
```

---

### 5. **SearchBar.tsx**
**Purpose:** Search input with integrated suggestions and history

**Props:**
```typescript
interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query?: string) => void;
  isLoading: boolean;
  suggestions: string[];
  history: SearchHistory[];
  sport: string;
  showHistory?: boolean;
}
```

**Components Used:**
- `SearchSuggestions`
- `SearchHistory`

**Usage:**
```tsx
<SearchBar
  query={query}
  setQuery={setQuery}
  onSearch={handleSearch}
  isLoading={false}
  suggestions={['Query 1', 'Query 2']}
  history={searchHistory}
  sport="Cricket"
/>
```

---

### 6. **SearchSuggestions.tsx**
**Purpose:** Display clickable suggestion chips

**Props:**
```typescript
interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}
```

**Usage:**
```tsx
<SearchSuggestions
  suggestions={['Query 1', 'Query 2']}
  onSelect={handleSelect}
/>
```

---

### 7. **SearchHistory.tsx**
**Purpose:** Display recent searches from localStorage

**Props:**
```typescript
interface SearchHistoryProps {
  history: SearchHistory[];
  onSelect: (query: string) => void;
}
```

**Usage:**
```tsx
<SearchHistory
  history={searchHistory}
  onSelect={handleHistorySelect}
/>
```

---

### 8. **ChartView.tsx** ⭐ NEW!
**Purpose:** Visualize statistics as charts using Chart.js

**Props:**
```typescript
interface ChartViewProps {
  data: StatsData;
  chartType?: 'bar' | 'line' | 'pie';
}
```

**Features:**
- Automatic data preparation
- Multiple chart types (Bar, Line, Pie)
- Responsive design
- Custom tooltips
- Matches app theme

**Chart.js Libraries Used:**
- `react-chartjs-2`
- `chart.js`

**Usage:**
```tsx
<ChartView data={statsData} chartType="bar" />
```

**Chart Selection Logic:**
```typescript
// Bar Chart: Default for most statistics
// Line Chart: Best for time-series data
// Pie Chart: Best for percentage/distribution data
```

---

### 9. **ResultsTable.tsx**
**Purpose:** Display statistics in a table format

**Props:**
```typescript
interface ResultsTableProps {
  data: StatsData;
}
```

**Features:**
- Hover effects on rows
- Styled headers
- Responsive

**Usage:**
```tsx
<ResultsTable data={statsData} />
```

---

### 10. **ViewToggle.tsx** ⭐ NEW!
**Purpose:** Toggle between chart, table, or both views

**Props:**
```typescript
interface ViewToggleProps {
  viewMode: ViewMode;  // 'table' | 'chart' | 'both'
  setViewMode: (mode: ViewMode) => void;
}
```

**Features:**
- Three toggle buttons
- Active state styling
- Icons for each mode

**Usage:**
```tsx
<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
```

---

### 11. **LoadingState.tsx**
**Purpose:** Show loading animation during API calls

**Props:**
```typescript
interface LoadingStateProps {
  sport: string;
}
```

**Usage:**
```tsx
<LoadingState sport="Cricket" />
```

---

### 12. **ErrorState.tsx**
**Purpose:** Display error messages

**Props:**
```typescript
interface ErrorStateProps {
  message: string;
}
```

**Usage:**
```tsx
<ErrorState message="Something went wrong!" />
```

---

### 13. **FeatureBox.tsx**
**Purpose:** Display app features on dashboard

**Props:** None (static content)

**Usage:**
```tsx
<FeatureBox />
```

---

## 📦 Configuration Files

### **config/sportConfig.ts**
Contains all sport-specific data:
```typescript
export const sportConfig = {
  Cricket: {
    icon: '🏏',
    gradient: 'linear-gradient(...)',
    suggestions: ['Query 1', 'Query 2', ...]
  },
  // ... other sports
};

export const sports = ['Cricket', 'Soccer', 'Tennis', 'F1', 'Basketball'];
```

---

## 🎨 Styles File

### **styles/appStyles.ts**
All CSS styles in one centralized location:
```typescript
export const styles: { [key: string]: CSSProperties } = {
  container: { /* ... */ },
  header: { /* ... */ },
  // ... all other styles
};
```

**Benefits:**
- ✅ Single source of truth
- ✅ Easy to maintain
- ✅ Consistent styling
- ✅ Type-safe with CSSProperties

---

## 📝 Types File

### **types/index.ts**
All TypeScript interfaces:
```typescript
export interface StatsData { /* ... */ }
export interface SearchHistory { /* ... */ }
export interface SportConfig { /* ... */ }
export type ViewMode = 'table' | 'chart' | 'both';
// ... more types
```

---

## 🔄 Data Flow

### Dashboard Flow
```
App.tsx
  ↓
Dashboard.tsx
  ↓
SportCard.tsx (×5)
  ↓ (user clicks)
onSelectSport callback
  ↓
App updates selectedSport
  ↓
SportPage renders
```

### Search Flow
```
SportPage.tsx
  ↓
SearchBar.tsx
  ↓
User types query
  ↓
handleSearch()
  ↓
Fetch API
  ↓
Update results state
  ↓
Render ViewToggle + ChartView/ResultsTable
```

### Chart/Table Toggle Flow
```
ViewToggle.tsx
  ↓
User clicks button
  ↓
setViewMode('chart'|'table'|'both')
  ↓
SportPage re-renders
  ↓
Shows appropriate components
```

---

## 📊 New Chart Features

### How Charts Work

1. **Data Preparation:**
   - Takes table data from API
   - Extracts labels (first column)
   - Finds numeric columns
   - Creates Chart.js dataset

2. **Chart Selection:**
   - Bar: Default for comparisons
   - Line: Time-series data
   - Pie: Percentage/distribution

3. **Customization:**
   - Colors match app theme
   - Custom tooltips with formatting
   - Responsive design
   - Inter font family

### Chart Examples

**Bar Chart:**
```tsx
<ChartView data={statsData} chartType="bar" />
```
Good for: Player comparisons, team standings

**Line Chart:**
```tsx
<ChartView data={statsData} chartType="line" />
```
Good for: Performance over time, trends

**Pie Chart:**
```tsx
<ChartView data={statsData} chartType="pie" />
```
Good for: Win/loss ratios, percentage breakdowns

---

## 🎯 Component Reusability

### High Reusability
- ✅ `SportCard` - Can add new sports easily
- ✅ `SearchSuggestions` - Reusable for any search
- ✅ `SearchHistory` - Works with any history data
- ✅ `ChartView` - Works with any table data
- ✅ `ResultsTable` - Generic table component
- ✅ `LoadingState` - Reusable loading indicator
- ✅ `ErrorState` - Generic error display

### Medium Reusability
- `SearchBar` - Sport-specific but flexible
- `ViewToggle` - Can be used for other toggles
- `FeatureBox` - Could be made more generic

### Low Reusability (Specific)
- `Dashboard` - App-specific
- `SportPage` - App-specific

---

## 🚀 Adding New Components

### Example: Adding a "FavoritesButton" component

1. **Create component:**
```tsx
// components/FavoritesButton.tsx
import React from 'react';
import { styles } from '../styles/appStyles';

interface FavoritesButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ 
  isFavorite, 
  onToggle 
}) => {
  return (
    <button 
      style={styles.favoriteButton}
      onClick={onToggle}
    >
      {isFavorite ? '⭐ Favorited' : '☆ Add to Favorites'}
    </button>
  );
};

export default FavoritesButton;
```

2. **Add styles to appStyles.ts:**
```typescript
favoriteButton: {
  padding: '0.5rem 1rem',
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  // ... more styles
},
```

3. **Use in parent component:**
```tsx
import FavoritesButton from './FavoritesButton';

<FavoritesButton 
  isFavorite={isFavorite}
  onToggle={handleToggleFavorite}
/>
```

---

## 🔧 Customization Guide

### Changing Colors
Edit `styles/appStyles.ts`:
```typescript
header: {
  background: 'linear-gradient(135deg, YOUR_COLOR_1, YOUR_COLOR_2)',
}
```

### Adding New Sport
Edit `config/sportConfig.ts`:
```typescript
NewSport: {
  icon: '🎮',
  gradient: 'linear-gradient(135deg, #abc123, #def456)',
  suggestions: ['Query 1', 'Query 2', ...]
}
```

### Changing Chart Colors
Edit `components/ChartView.tsx`:
```typescript
backgroundColor: [
  'rgba(YOUR_R, YOUR_G, YOUR_B, 0.8)',
  // ... more colors
]
```

---

## 📈 Performance Optimizations

### Current Optimizations
- ✅ Separate components reduce re-renders
- ✅ LocalStorage for history (no API calls)
- ✅ Conditional rendering (only show what's needed)
- ✅ CSS transitions (GPU accelerated)

### Future Optimizations
- [ ] React.memo for expensive components
- [ ] useMemo for chart data preparation
- [ ] useCallback for event handlers
- [ ] Code splitting with React.lazy
- [ ] Virtual scrolling for large tables

---

## 🧪 Testing Strategy

### Component Tests (Jest + React Testing Library)

```typescript
// Example: SportCard.test.tsx
describe('SportCard', () => {
  it('renders sport name and icon', () => {
    render(<SportCard sport="Cricket" config={...} />);
    expect(screen.getByText('Cricket')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn();
    render(<SportCard sport="Cricket" onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('Cricket'));
    expect(handleSelect).toHaveBeenCalledWith('Cricket');
  });
});
```

---

## 📚 Import Patterns

### Absolute vs Relative Imports

**Current Pattern (Relative):**
```typescript
import { styles } from '../styles/appStyles';
import { sportConfig } from '../config/sportConfig';
import SportCard from './SportCard';
```

**Optional: Configure Absolute Imports**
Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@styles/*": ["styles/*"],
      "@config/*": ["config/*"],
      "@types/*": ["types/*"]
    }
  }
}
```

Then import as:
```typescript
import { styles } from '@styles/appStyles';
import { sportConfig } from '@config/sportConfig';
import SportCard from '@components/SportCard';
```

---

## 🎓 Component Hierarchy

```
App
├── Dashboard
│   ├── SportCard (Cricket)
│   ├── SportCard (Soccer)
│   ├── SportCard (Tennis)
│   ├── SportCard (F1)
│   ├── SportCard (Basketball)
│   └── FeatureBox
│
└── SportPage
    ├── SearchBar
    │   ├── SearchSuggestions
    │   └── SearchHistory
    ├── LoadingState (conditional)
    ├── ErrorState (conditional)
    └── Results (conditional)
        ├── ViewToggle
        ├── ChartView
        └── ResultsTable
```

---

## ✅ Benefits of This Architecture

### Code Organization
- ✅ Easy to find components
- ✅ Clear separation of concerns
- ✅ Single responsibility principle

### Maintainability
- ✅ Easy to update individual components
- ✅ Centralized styles
- ✅ Type-safe with TypeScript

### Scalability
- ✅ Easy to add new features
- ✅ Reusable components
- ✅ Clean import structure

### Developer Experience
- ✅ No linter errors
- ✅ Clear component props
- ✅ Good TypeScript inference
- ✅ Easy to understand data flow

---

## 🚀 Next Steps

1. **Add Tests**
   - Unit tests for each component
   - Integration tests for flows

2. **Add Storybook**
   - Visual component documentation
   - Interactive component explorer

3. **Add More Chart Types**
   - Radar charts
   - Scatter plots
   - Mixed charts

4. **Optimize Performance**
   - React.memo
   - useMemo/useCallback
   - Code splitting

5. **Add More Features**
   - Favorites system
   - Dark mode
   - Export functionality
   - Share buttons

---

**Questions or suggestions? Add them to this document!**

*Last Updated: October 2025*

