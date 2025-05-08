import { useState } from 'react';
import { login } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(username, password);

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(data.User));
      localStorage.setItem('accessToken', data.Token);
      localStorage.setItem('refreshToken', data.RefreshToken);

      // Update context
      auth?.loginUser(data.User, data.Token, data.RefreshToken);

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center' }}>Login</h2>

        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
          }}
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            backgroundColor: loading ? '#93c5fd' : '#3b82f6',
            color: '#ffffff',
            fontWeight: 600,
            border: 'none',
            borderRadius: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
