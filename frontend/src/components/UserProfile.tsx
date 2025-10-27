import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user, signOut, signInWithGoogle } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show login button if user is not authenticated
  if (!user) {
    return (
      <button
        onClick={async () => {
          try {
            setLoading(true);
            await signInWithGoogle();
          } catch (error) {
            console.error('Error signing in:', error);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          backgroundColor: 'white',
          border: '2px solid #667eea',
          borderRadius: '12px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#667eea',
          transition: 'all 0.2s',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#667eea';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = '#667eea';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span>🔐</span>
        <span>{loading ? 'Signing in...' : 'Sign In'}</span>
      </button>
    );
  }

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* User Avatar Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'white',
          border: '2px solid #e2e8f0',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#667eea';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <img
          src={user.photoURL || 'https://via.placeholder.com/40'}
          alt={user.displayName || 'User'}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1e293b' }}>
          {user.displayName || 'User'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
            }}
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              border: '1px solid #e2e8f0',
              minWidth: '220px',
              zIndex: 999,
              overflow: 'hidden',
            }}
          >
            {/* User Info */}
            <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                {user.displayName}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {user.email}
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#dc2626',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {loading ? 'Signing out...' : '🚪 Sign Out'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;

