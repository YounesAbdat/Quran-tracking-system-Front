import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = ({ onLogin }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Server is running on port 5002
      console.log('Form data:', formData);
      
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });

      
      console.log('Login response:', response.data);
      
      if (response.data && response.data.token) {
        // Store user data and token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Call onLogin if provided (optional)
        if (typeof onLogin === 'function') {
          onLogin(response.data);
        }
        
        // Redirect based on user role
        if (response.data.role === 'admin') {
          router.push('/adminDashboard');
        } else if (response.data.role === 'supervisor') {
          router.push('/supervisorDashboard');
        } else {
          // Default fallback
          router.push('/dashboard');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error details:', err);
      
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Make sure backend is running on port 5002.');
      } else if (err.response) {
        // Better error handling - show the actual error message from server
        const errorMessage = err.response.data?.message || err.response.data?.error || `Server error: ${err.response.status}`;
        setError(errorMessage);
        
        // Log full error details for debugging
        console.error('Server response:', err.response.data);
        console.error('Status:', err.response.status);
      } else {
        setError('Network error. Check if backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '3rem 1.5rem'
    }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src={'/assets/logo.png'}
            alt="مؤسسة النهضة بالقرآن الكريم" 
            style={{ margin: '0 auto 1rem', height: '80px', width: 'auto' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Sign in to your Quran Camp account
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.5rem'
        }}>
          {error && (
            <div style={{
              marginBottom: '1.5rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '0.375rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '0.75rem' }}>
                  <svg style={{ height: '1.25rem', width: '1.25rem', color: '#f87171' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p style={{ fontSize: '0.875rem' }}>{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: loading ? '#9ca3af' : '#800000',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }} />
              </div>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '0.875rem' }}>
                <span style={{ padding: '0 0.5rem', backgroundColor: 'white', color: '#6b7280' }}>Demo Accounts</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <div style={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem' }}>
                <p style={{ fontWeight: '500', color: '#111827', margin: 0 }}>Admin Account:</p>
                <p style={{ margin: 0 }}>Email: admin@example.com</p>
                <p style={{ margin: 0 }}>Password: password123</p>
              </div>
              <div style={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.375rem' }}>
                <p style={{ fontWeight: '500', color: '#111827', margin: 0 }}>Supervisor Account:</p>
                <p style={{ margin: 0 }}>Email: supervisor@example.com</p>
                <p style={{ margin: 0 }}>Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          مؤسسة النهضة بالقرآن الكريم
        </p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
          Quran Memorization Camp Tracking System
        </p>
      </div>
    </div>
  );
};

export default LoginForm;