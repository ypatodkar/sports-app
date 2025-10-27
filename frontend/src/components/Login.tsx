import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #f8fafc, #e0e7ff, #fce7f3)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
        }}
      >
        {/* Logo/Icon */}
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
        
        {/* Title */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          Sports Stats Hub
        </h1>
        
        {/* Subtitle */}
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem', fontWeight: '400' }}>
          AI-powered sports statistics and analysis at your fingertips
        </p>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s',
            opacity: loading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Google Icon SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.8055 10.2292C19.8055 9.55056 19.7505 8.86708 19.6323 8.19727H10.2002V12.0455H15.6014C15.3773 13.2909 14.6571 14.3896 13.6025 15.0878V17.5866H16.825C18.7174 15.8449 19.8055 13.2728 19.8055 10.2292Z"
              fill="#4285F4"
            />
            <path
              d="M10.2002 20.0006C12.9524 20.0006 15.2733 19.1151 16.8286 17.5865L13.6061 15.0877C12.7101 15.6979 11.5477 16.0433 10.2038 16.0433C7.54244 16.0433 5.28661 14.2832 4.50091 11.9169H1.17871V14.4927C2.77953 17.8304 6.34192 20.0006 10.2002 20.0006Z"
              fill="#34A853"
            />
            <path
              d="M4.49729 11.9169C4.09474 10.6715 4.09474 9.33301 4.49729 8.08765V5.51184H1.17875C-0.240662 8.33801 -0.240662 11.6665 1.17875 14.4927L4.49729 11.9169Z"
              fill="#FBBC04"
            />
            <path
              d="M10.2002 3.95805C11.6251 3.936 13.0039 4.47247 14.0362 5.45722L16.8905 2.60278C15.1817 0.990569 12.9344 0.0772655 10.2002 0.10191C6.34192 0.10191 2.77953 2.27211 1.17871 5.51187L4.49725 8.08768C5.27929 5.71766 7.53878 3.95805 10.2002 3.95805Z"
              fill="#EA4335"
            />
          </svg>
          <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>

        {/* Footer Text */}
        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#94a3b8' }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;

