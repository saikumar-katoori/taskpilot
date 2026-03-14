import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { role } = await login(form.email, form.password);
      if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else if (role === 'EMPLOYEE') {
        navigate('/employee', { replace: true });
      } else {
        navigate('/employee', { replace: true });
      }
    } catch (err) {
      const message = err?.response?.data || 'Invalid credentials';
      setError(typeof message === 'string' ? message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tp-auth-page">
      <div className="tp-auth-card">
        <h2>Sign in to TaskPilot</h2>
        <p className="tp-auth-subtitle">Stay on top of your tasks with a simple dashboard.</p>
        {error && <div className="tp-alert tp-alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="tp-form">
          <label className="tp-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="tp-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="tp-btn tp-btn-primary tp-btn-full" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="tp-auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
