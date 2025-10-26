import React from 'react';

interface InterestingFactProps {
  fact: string;
}

const InterestingFact: React.FC<InterestingFactProps> = ({ fact }) => {
  return (
    <div
      className="interesting-fact"
      style={{
        backgroundColor: '#fffbeb',
        border: '2px solid #fbbf24',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 6px -1px rgb(251 191 36 / 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontSize: '2rem',
            flexShrink: 0,
          }}
        >
          💡
        </div>
        <div>
          <h4
            style={{
              fontSize: '1rem',
              fontWeight: '700',
              color: '#92400e',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Did You Know?
          </h4>
          <p
            style={{
              fontSize: '1rem',
              color: '#78350f',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            {fact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterestingFact;

