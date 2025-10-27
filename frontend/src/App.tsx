import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { styles } from './styles/appStyles';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import SportPage from './components/SportPage';
import Login from './components/Login';

const App: React.FC = () => {
  const { loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <div style={{ fontSize: '1.2rem' }}>Loading...</div>
        </div>
      </div>
    );
  }

  // Allow access to app regardless of authentication status
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sport/:sportName" element={<SportPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
