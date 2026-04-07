import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, CheckCircle2, Globe, GraduationCap, UserCog, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [role, setRole] = useState('student');
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const defaultUsers = {
      'admin': { pass: 'admin123', role: 'admin', name: 'Tizim Admini' },
      'teacher': { pass: '123', role: 'teacher', name: 'Prof. Alisherov N.' },
      'student': { pass: '123', role: 'student', name: 'Sardor Karimov' },
      'uni': { pass: 'uni123', role: 'uni', name: 'Amity University' }
    };

    setTimeout(() => {
      const user = defaultUsers[username];
      if (user && user.pass === password) {
        login({ email: username, ...user });
        navigate(`/${user.role}`);
      } else {
        setError("Login yoki parol noto'g'ri!");
      }
      setLoading(false);
    }, 1000);
  };

  const roles = [
    { id: 'student', label: 'Talaba', icon: <GraduationCap size={18} /> },
    { id: 'teacher', label: 'Ustoz', icon: <UserCog size={18} /> },
    { id: 'admin', label: 'Admin', icon: <CheckCircle2 size={18} /> },
    { id: 'uni', label: 'OTM', icon: <Building2 size={18} /> },
  ];

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-container" 
        style={{ width: '100%', maxWidth: '500px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px' }}>
            {roles.find(r => r.id === role).label} Kirish
          </h1>
          <p style={{ color: 'var(--text-dim)' }}>
            EduGravity AI tizimiga xush kelibsiz
          </p>
        </div>

        <div className="role-selector" style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '5px', borderRadius: '15px', marginBottom: '30px', border: '1px solid var(--border)' }}>
          {roles.map(r => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: role === r.id ? 'var(--primary)' : 'transparent',
                color: role === r.id ? 'white' : 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                transition: '0.3s'
              }}
            >
              {r.icon} <span>{r.label}</span>
            </button>
          ))}
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '12px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', fontSize: '0.85rem' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-field" style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Login / Email" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white' }}
            />
          </div>

          <div className="input-field" style={{ position: 'relative' }}>
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="Parol" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white' }}
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="btn-premium" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Tekshirilmoqda...' : 'Tizimga Kirish'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Hisobingiz yo'qmi? <span onClick={() => navigate('/register')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}>Ro'yxatdan o'tish</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
