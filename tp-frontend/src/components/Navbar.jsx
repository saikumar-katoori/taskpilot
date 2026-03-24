import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="tp-navbar">
      <div className="tp-navbar-left">
        <span className="tp-logo">TaskPilot</span>
      </div>
      <nav className="tp-navbar-right">
        {isAuthenticated && role === 'ADMIN' && (
          <Link to="/admin" className="tp-nav-link">Admin</Link>
        )}
        {isAuthenticated && role === 'EMPLOYEE' && (
          <Link to="/employee" className="tp-nav-link">My Tasks</Link>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="tp-nav-link">Login</Link>
            <Link to="/signup" className="tp-nav-link tp-nav-primary">Signup</Link>
          </>
        )}
        {isAuthenticated && (
          <button type="button" className="tp-btn tp-btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
