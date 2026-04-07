import React from 'react';
import Layout from '../components/Layout';
import { Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  return (
    <Layout role="student">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        {/* Left Part */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-container" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Kunlik Baholar</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                  <th style={{ padding: '12px' }}>FAN</th>
                  <th style={{ padding: '12px' }}>MAVZU</th>
                  <th style={{ padding: '12px' }}>BAHO</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '15px 12px' }}>Algoritmlar</td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>BFS & DFS</td>
                  <td><b style={{ color: 'var(--success)' }}>5</b></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '15px 12px' }}>Big Data</td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Spark Opt.</td>
                  <td><b style={{ color: 'var(--success)' }}>4+</b></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="glass-container" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>Bugungi Jadval</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--primary)', borderRadius: '0 12px 12px 0' }}>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>09:00 - 10:30</p>
                 <p style={{ fontWeight: 700 }}>Algoritmlar (Lab)</p>
               </div>
               <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--secondary)', borderRadius: '0 12px 12px 0' }}>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>11:00 - 12:30</p>
                 <p style={{ fontWeight: 700 }}>Data Engineering</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="passport-card"
            style={{ 
              background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
              borderRadius: '24px', 
              padding: '30px',
              border: '1px solid var(--border)',
              cursor: 'pointer'
            }}
          >
            <p style={{ fontSize: '0.5rem', letterSpacing: '2px', color: 'var(--primary)', marginBottom: '15px' }}>TALENT PASSPORT</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
               <div style={{ width: '50px', height: '50px', background: 'linear-gradient(var(--primary), var(--secondary))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>SK</div>
               <div>
                 <p style={{ fontWeight: 800, fontSize: '1rem' }}>SARDOR KARIMOV</p>
                 <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>ID: 80-245-092</p>
               </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <div>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>PROF INDEX</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>912 <Star size={16} fill="var(--primary)" color="var(--primary)" style={{ verticalAlign: 'middle' }} /></p>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>RANK</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>#3</p>
               </div>
            </div>
          </motion.div>

          <div className="glass-container" style={{ padding: '25px', border: '1px solid var(--secondary)' }}>
             <p style={{ fontWeight: 800, marginBottom: '10px' }}>Universitet Taklifi!</p>
             <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '15px' }}>Amity University: 100% GRANT taklif qildi.</p>
             <button className="btn-premium" style={{ fontSize: '0.75rem', padding: '10px' }}>Qabul qilish</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
