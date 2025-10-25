import React from 'react';
import { styles } from '../styles/appStyles';

const FeatureBox: React.FC = () => {
  const features = [
    { icon: '🤖', title: 'AI-Powered', description: 'Advanced AI analysis' },
    { icon: '⚡', title: 'Real-Time', description: 'Instant results' },
    { icon: '📊', title: 'Detailed Stats', description: 'Comprehensive data' },
    { icon: '🌐', title: 'Multi-Sport', description: '5+ sports covered' },
  ];

  return (
    <div style={styles.infoBox}>
      <h3 style={styles.infoBoxTitle}>🚀 Features</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
        }}
      >
        {features.map((feature, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
            <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
              {feature.title}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBox;

