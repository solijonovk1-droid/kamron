import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import './index.css';

// Pages (Placeholder components for now, will create files soon)
const Home = () => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
    <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>EduGravity AI</h1>
    <p style={{ color: 'var(--text-dim)' }}>Kelajak ta'lim ekotizimiga xush kelibsiz.</p>
    <div style={{ display: 'flex', gap: '15px' }}>
      <button className="btn-premium" onClick={() => window.location.href='/login'}>Tizimga Kirish</button>
      <button className="btn-premium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>Batafsil</button>
    </div>
  </div>
);
const TeacherDashboard = () => <div>Teacher Dashboard</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const Register = () => <div>Register Page</div>;

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/student/*" element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/teacher/*" element={
            <PrivateRoute allowedRoles={['teacher', 'admin']}>
              <TeacherDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/admin/*" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
