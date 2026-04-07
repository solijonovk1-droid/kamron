import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, FileText, Calendar, Award, PenTool, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = {
    student: [
      { path: '/student', label: 'Dashboard', icon: <Home size={20} /> },
      { path: '/student/grades', label: 'Baholar', icon: <FileText size={20} /> },
      { path: '/student/schedule', label: 'Jadval', icon: <Calendar size={20} /> },
      { path: '/student/passport', label: 'Passport', icon: <Award size={20} /> },
      { path: '/student/test', label: 'Testlar', icon: <PenTool size={20} /> },
    ],
    teacher: [
       { path: '/teacher', label: 'Dashboard', icon: <Home size={20} /> },
       // Add teacher items
    ]
  };

  const currentMenu = menuItems[role] || [];

  return (
    <nav className="sidebar" style={{
      width: '280px',
      background: 'rgba(10, 10, 18, 0.95)',
      borderRight: '1px solid var(--border)',
      padding: '50px 25px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      zIndex: 100
    }}>
      <div className="logo" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px' }}>
        <span style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>EG</span>
        EduGravity
      </div>

      <div className="nav-group" style={{ flex: 1 }}>
        {currentMenu.map(item => (
          <div 
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            style={{
              padding: '14px 20px',
              borderRadius: '12px',
              marginBottom: '12px',
              cursor: 'pointer',
              color: location.pathname === item.path ? '#fff' : 'var(--text-dim)',
              fontWeight: location.pathname === item.path ? 700 : 500,
              background: location.pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              transition: '0.3s'
            }}
          >
            {item.icon} <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div 
        className="logout" 
        onClick={logout}
        style={{
          color: '#ff6b6b',
          padding: '15px',
          borderTop: '1px solid var(--border)',
          cursor: 'pointer',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          transition: '0.3s'
        }}
      >
        <LogOut size={20} /> <span>Chiqish</span>
      </div>
    </nav>
  );
};

export default Sidebar;
