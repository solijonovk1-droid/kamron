import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Layout = ({ children, role }) => {
  const { user } = useAuth();

  return (
    <div className="layout" style={{ display: 'flex' }}>
      <Sidebar role={role} />
      <main className="content" style={{ marginLeft: '280px', padding: '40px 60px', flex: 1, position: 'relative' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div className="breadcrumb" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {role} / <span>Dashboard</span>
          </div>
          <div className="user-chip" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '6px 15px', borderRadius: '30px' }}>
             <div className="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', border: '2px solid var(--primary)' }}>
               {user?.name?.charAt(0) || 'U'}
             </div>
             <div className="name" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user?.name || 'User'}</div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
