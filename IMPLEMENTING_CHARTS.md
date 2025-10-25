# 📊 Implementing Charts in Sports Stats Hub

## 🎯 Goal
Add beautiful data visualizations to display statistics as charts alongside tables.

---

## 🚀 Quick Start (15 minutes)

### Step 1: Install Chart.js (2 minutes)

```bash
cd frontend
npm install chart.js react-chartjs-2
```

### Step 2: Add Chart Component to App.tsx (10 minutes)

Add this code to your `App.tsx` file:

#### A) Import Chart.js at the top:

```typescript
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
```

#### B) Add Chart View Toggle State in SportPage component:

```typescript
const SportPage = ({ sport, onBack }: { sport: string, onBack: () => void }) => {
  // ... existing state
  const [viewMode, setViewMode] = useState<'table' | 'chart' | 'both'>('both');
  
  // ... rest of component
```

#### C) Add View Toggle Buttons (after search button):

```typescript
{/* View Mode Toggle */}
{results && (
  <div style={{
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    marginTop: '1rem',
  }}>
    <button
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: viewMode === 'table' ? '2px solid #667eea' : '1px solid #e2e8f0',
        backgroundColor: viewMode === 'table' ? '#e0e7ff' : '#ffffff',
        cursor: 'pointer',
      }}
      onClick={() => setViewMode('table')}
    >
      📋 Table
    </button>
    <button
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: viewMode === 'chart' ? '2px solid #667eea' : '1px solid #e2e8f0',
        backgroundColor: viewMode === 'chart' ? '#e0e7ff' : '#ffffff',
        cursor: 'pointer',
      }}
      onClick={() => setViewMode('chart')}
    >
      📊 Chart
    </button>
    <button
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: viewMode === 'both' ? '2px solid #667eea' : '1px solid #e2e8f0',
        backgroundColor: viewMode === 'both' ? '#e0e7ff' : '#ffffff',
        cursor: 'pointer',
      }}
      onClick={() => setViewMode('both')}
    >
      📊📋 Both
    </button>
  </div>
)}
```

#### D) Add Chart Rendering Function (before return statement):

```typescript
// Function to prepare chart data from table results
const prepareChartData = () => {
  if (!results?.table || results.table.rows.length === 0) return null;

  const labels = results.table.rows.map(row => String(row[0]));
  const numericColumnIndex = results.table.rows[0].findIndex((cell, idx) => 
    idx > 0 && !isNaN(Number(cell))
  );
  
  if (numericColumnIndex === -1) return null;

  const data = results.table.rows.map(row => Number(row[numericColumnIndex]));

  return {
    labels,
    datasets: [
      {
        label: results.table.headers[numericColumnIndex],
        data,
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(245, 87, 108, 0.8)',
          'rgba(79, 172, 254, 0.8)',
        ],
        borderColor: [
          'rgb(102, 126, 234)',
          'rgb(118, 75, 162)',
          'rgb(240, 147, 251)',
          'rgb(245, 87, 108)',
          'rgb(79, 172, 254)',
        ],
        borderWidth: 2,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
```

#### E) Replace Results Section with Chart Support:

```typescript
{/* Results with Chart Support */}
{results && !isLoading && (
  <div style={styles.resultsContainer}>
    <p style={styles.summary}>📊 {results.summary}</p>
    
    {/* Chart View */}
    {(viewMode === 'chart' || viewMode === 'both') && prepareChartData() && (
      <div style={{
        marginBottom: viewMode === 'both' ? '2rem' : '0',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '1rem',
      }}>
        <Bar data={prepareChartData()!} options={chartOptions} />
      </div>
    )}
    
    {/* Table View */}
    {(viewMode === 'table' || viewMode === 'both') && 
     results.table && results.table.rows.length > 0 && (
      <table style={styles.table}>
        <thead>
          <tr>
            {results.table.headers.map((header, index) => (
              <th key={index} style={styles.th}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.table.rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              style={{ transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={styles.td}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
```

### Step 3: Test It! (3 minutes)

1. Restart your frontend:
```bash
npm run dev
```

2. Search for something like "Virat Kohli stats"
3. You'll now see toggle buttons: 📋 Table | 📊 Chart | 📊📋 Both
4. Click to switch between views!

---

## 🎨 Advanced Chart Types

### 1. Bar Chart (Default)
**Best for:** Player statistics, tournament comparisons
```typescript
<Bar data={chartData} options={chartOptions} />
```

### 2. Line Chart
**Best for:** Trends over time, season progression
```typescript
<Line data={chartData} options={chartOptions} />
```

### 3. Pie Chart
**Best for:** Percentage breakdowns, distribution
```typescript
<Pie data={chartData} options={chartOptions} />
```

---

## 🎯 Smart Chart Selection

You can auto-select the best chart type based on data:

```typescript
const getChartComponent = () => {
  if (!results?.table) return null;
  
  const hasTimeData = results.table.headers.some(h => 
    h.toLowerCase().includes('year') || 
    h.toLowerCase().includes('season')
  );
  
  const hasPercentage = results.table.headers.some(h => 
    h.toLowerCase().includes('%') || 
    h.toLowerCase().includes('percentage')
  );
  
  if (hasTimeData) return <Line data={chartData} options={chartOptions} />;
  if (hasPercentage) return <Pie data={chartData} options={chartOptions} />;
  return <Bar data={chartData} options={chartOptions} />;
};
```

---

## 🔥 Enhanced Features

### 1. Multiple Metrics in One Chart

```typescript
const prepareMultiMetricChart = () => {
  const labels = results.table.rows.map(row => String(row[0]));
  
  // Find all numeric columns
  const numericColumns = results.table.headers
    .map((header, idx) => ({ header, idx }))
    .filter((col, idx) => idx > 0 && !isNaN(Number(results.table.rows[0][col.idx])));
  
  const datasets = numericColumns.map((col, i) => ({
    label: col.header,
    data: results.table.rows.map(row => Number(row[col.idx])),
    backgroundColor: `rgba(${100 + i * 30}, ${126 - i * 20}, 234, 0.8)`,
    borderColor: `rgb(${100 + i * 30}, ${126 - i * 20}, 234)`,
    borderWidth: 2,
  }));
  
  return { labels, datasets };
};
```

### 2. Comparison Charts

For queries like "Messi vs Ronaldo":

```typescript
const prepareComparisonChart = () => {
  // Group data by player
  const players = [...new Set(results.table.rows.map(row => row[0]))];
  const metrics = results.table.headers.slice(1);
  
  const datasets = players.map((player, i) => ({
    label: player,
    data: metrics.map((_, metricIdx) => {
      const row = results.table.rows.find(r => r[0] === player);
      return row ? Number(row[metricIdx + 1]) : 0;
    }),
    backgroundColor: `rgba(${100 + i * 80}, 126, 234, 0.8)`,
  }));
  
  return { labels: metrics, datasets };
};
```

### 3. Interactive Tooltips

```typescript
const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('en-US').format(context.parsed.y);
          }
          return label;
        }
      }
    }
  }
};
```

---

## 🎨 Chart Styling

### Match Your App Theme

```typescript
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          family: 'Inter',
          size: 12,
          weight: '600',
        },
        color: '#1e293b',
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: '#e2e8f0',
      },
      ticks: {
        font: {
          family: 'Inter',
        },
        color: '#64748b',
      },
    },
    y: {
      grid: {
        color: '#e2e8f0',
      },
      ticks: {
        font: {
          family: 'Inter',
        },
        color: '#64748b',
      },
    },
  },
};
```

---

## 📱 Responsive Charts

```typescript
const chartContainerStyle = {
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  maxWidth: '100%',
  height: 'auto',
  // Responsive height
  minHeight: window.innerWidth < 768 ? '250px' : '400px',
};
```

---

## 🚀 Complete Example Integration

Here's where to place the chart in your results section:

```typescript
{/* Results */}
{results && !isLoading && (
  <div style={styles.resultsContainer}>
    {/* Summary */}
    <p style={styles.summary}>📊 {results.summary}</p>
    
    {/* View Toggle Buttons */}
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
      <button onClick={() => setViewMode('both')}>📊📋 Both</button>
      <button onClick={() => setViewMode('chart')}>📊 Chart Only</button>
      <button onClick={() => setViewMode('table')}>📋 Table Only</button>
    </div>
    
    {/* Chart Section */}
    {(viewMode === 'chart' || viewMode === 'both') && prepareChartData() && (
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '1rem',
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
          Visual Analysis
        </h3>
        <Bar data={prepareChartData()!} options={chartOptions} />
      </div>
    )}
    
    {/* Table Section */}
    {(viewMode === 'table' || viewMode === 'both') && (
      <div>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
          Detailed Statistics
        </h3>
        <table style={styles.table}>
          {/* ... existing table code ... */}
        </table>
      </div>
    )}
  </div>
)}
```

---

## 🎯 Where Exactly in Your Current Code

**Location:** `frontend/src/App.tsx`

**Line ~563** (in the Results section of SportPage component)

Replace this section:
```typescript
{/* Results */}
{results && !isLoading && (
  <div style={styles.resultsContainer}>
    <p style={styles.summary}>📊 {results.summary}</p>
    {/* existing table code */}
  </div>
)}
```

With the new chart-enabled version shown above!

---

## 📊 Example Queries That Work Great with Charts

### Cricket 🏏
```
"Virat Kohli performance by year"
"Top run scorers IPL 2024"
"India vs Australia head to head wins"
```

### Soccer ⚽
```
"Messi goals by season"
"Premier League top scorers"
"Champions League winners by country"
```

### Basketball 🏀
```
"LeBron James points per season"
"NBA scoring leaders"
"Lakers vs Celtics finals history"
```

---

## 🐛 Troubleshooting

### Chart doesn't appear?
```typescript
// Add console log to debug
const chartData = prepareChartData();
console.log('Chart data:', chartData);
```

### Chart is too small?
```typescript
// Add to chart options
maintainAspectRatio: false,
// And set container height
<div style={{ height: '400px' }}>
  <Bar data={chartData} options={chartOptions} />
</div>
```

### Colors not showing?
```typescript
// Ensure you're using rgba format
backgroundColor: 'rgba(102, 126, 234, 0.8)',
```

---

## 🎨 Customization Ideas

1. **Match Sport Colors**
   - Use sport-specific gradients from sportConfig

2. **Animated Charts**
   - Add animation options to chartOptions

3. **Export Charts**
   - Add download button to save chart as image

4. **Multiple Chart Types**
   - Let users switch between bar, line, pie

---

## ✅ Testing Checklist

- [ ] Installed chart.js and react-chartjs-2
- [ ] Added imports to App.tsx
- [ ] Added viewMode state
- [ ] Added toggle buttons
- [ ] Added prepareChartData function
- [ ] Updated results section
- [ ] Tested with a search query
- [ ] Chart displays correctly
- [ ] Toggle buttons work
- [ ] Mobile responsive

---

## 🚀 Next Level Features

After basic charts work:

1. **Chart Export** - Download as PNG
2. **Multiple Metrics** - Compare multiple stats
3. **Time Series** - Trends over years
4. **Predictions** - Show forecast lines
5. **Comparisons** - Side-by-side player charts

All these are detailed in ROADMAP.md!

---

**Ready to visualize your data? Let's do it!** 📊✨

