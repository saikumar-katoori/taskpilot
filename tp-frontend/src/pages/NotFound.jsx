import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="tp-auth-page">
    <div className="tp-auth-card tp-not-found">
      <h2>Page not found</h2>
      <p className="tp-auth-subtitle">The page you are looking for does not exist.</p>
      <Link to="/" className="tp-btn tp-btn-primary tp-btn-full">
        Go home
      </Link>
    </div>
  </div>
);

export default NotFound;
