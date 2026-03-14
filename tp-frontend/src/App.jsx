import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import EmployeeDashboard from './pages/dashboards/EmployeeDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="tp-app-root">
      <Navbar />
      <main className="tp-main">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
            <Route path="/employee" element={<EmployeeDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
