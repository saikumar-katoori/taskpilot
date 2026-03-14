import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    surName: '',
    email: '',
    password: '',
    department: '',
    contact: '',
    role: 'EMPLOYEE',
  });
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
      await signup(form);
      window.localStorage.setItem('tp_role', form.role);
      navigate('/login', { replace: true });
    } catch (err) {
      const message = err?.response?.data || 'Signup failed';
      setError(typeof message === 'string' ? message : 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tp-auth-page">
      <div className="tp-auth-card">
        <h2>Create your TaskPilot account</h2>
        <p className="tp-auth-subtitle">Sign up to start managing tasks with your team.</p>
        {error && <div className="tp-alert tp-alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="tp-form tp-form-grid">
          <label className="tp-field">
            <span>First name</span>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="tp-field">
            <span>Surname</span>
            <input
              type="text"
              name="surName"
              value={form.surName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="tp-field tp-field-full">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="tp-field">
            <span>Department</span>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="e.g. Engineering"
              required
            />
          </label>
          <label className="tp-field">
            <span>Contact</span>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
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
            />
          </label>
          <label className="tp-field">
            <span>Role</span>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <button
            type="submit"
            className="tp-btn tp-btn-primary tp-btn-full tp-field-full"
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="tp-auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
