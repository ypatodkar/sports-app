import React from 'react';
import { styles } from '../styles/appStyles';
import { sportConfig, sports } from '../config/sportConfig';
import SportCard from './SportCard';
import FeatureBox from './FeatureBox';

interface DashboardProps {
  onSelectSport: (sport: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectSport }) => {
  return (
    <div>
      <h1 style={styles.header} className="app-header">⚡ Sports Stats Hub</h1>
      <p style={styles.subheader} className="app-subheader">AI-powered sports statistics and analysis at your fingertips</p>

      <div style={styles.dashboardGrid} className="dashboard-grid">
        {sports.map((sport) => (
          <SportCard
            key={sport}
            sport={sport}
            config={sportConfig[sport]}
            onSelect={onSelectSport}
          />
        ))}
      </div>

      <FeatureBox />
    </div>
  );
};

export default Dashboard;

