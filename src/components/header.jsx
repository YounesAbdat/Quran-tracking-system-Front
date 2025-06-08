import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header style={{
      backgroundColor: '#800000',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <img 
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="مؤسسة النهضة بالقرآن الكريم" 
            style={{ height: '60px', marginRight: '16px' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div>
            <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              Quran Camp Tracking System
            </h1>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
              مؤسسة النهضة بالقرآن الكريم
            </p>
          </div>
        </Link>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {!user ? (
          <>
            <Link to="/visitor" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}>
              Gallery
            </Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.2s' }}>
              Login
            </Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: '16px' }}>Welcome, {user.name}</span>
            <button 
              onClick={onLogout}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
