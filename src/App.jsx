import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Activity, Search, Clock, Palette, User, BookOpen, Briefcase, ChevronRight, LogOut, Star, TrendingUp, LifeBuoy, Users, Globe, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { locales } from './locales';

/* =========================================
   Custom Hooks & Utilities
   ========================================= */
const useCyberClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }) + '.' + String(d.getMilliseconds()).padStart(3, '0').substring(0,2);
  const formatDate = (d) => d.toISOString().split('T')[0];
  return { timeString: formatTime(time), dateString: formatDate(time) };
};

const LiveScrambler = ({ colorHex }) => {
  const [text, setText] = useState("0x8A9B... PARSING");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  useEffect(() => {
    const interval = setInterval(() => {
      let result = "0x";
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      result += " SYNCING";
      setText(result);
    }, 80);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ color: colorHex }} className="font-mono text-[10px] drop-shadow-md">{text}</span>;
};

/* =========================================
   Shared UI Components
   ========================================= */
const ParticleBackground = ({ explode, themeColor }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 180 });
  const katakana = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const numParticles = Math.min(canvas.width * canvas.height / 8000, 150);
      particlesRef.current = Array.from({ length: numParticles }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, baseX: Math.random() * canvas.width,
        density: (Math.random() * 30) + 1, char: katakana[Math.floor(Math.random() * katakana.length)]
      })).map(p => ({ ...p, baseX: p.x }));
    };

    const render = () => {
      if (explode) {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (!explode) {
        let maxDist = 120;
        for (let a = 0; a < particlesRef.current.length; a++) {
          for (let b = a; b < particlesRef.current.length; b++) {
            let dx = particlesRef.current[a].x - particlesRef.current[b].x;
            let dy = particlesRef.current[a].y - particlesRef.current[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - (dist / maxDist)) * 0.15})`;
              ctx.lineWidth = 1; ctx.beginPath();
              ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
              ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
              ctx.stroke();
            }
          }
        }
      }

      particlesRef.current.forEach(p => {
        if (explode) {
          p.y += p.size * 5; 
          if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; p.char = katakana[Math.floor(Math.random() * katakana.length)]; }
          if (Math.random() > 0.95) p.char = katakana[Math.floor(Math.random() * katakana.length)];
          ctx.fillStyle = themeColor; ctx.font = `${p.size * 8}px monospace`; ctx.fillText(p.char, p.x, p.y);
        } else {
          let dx = mouseRef.current.x - p.x; let dy = mouseRef.current.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (mouseRef.current.radius > 0) {
            let force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            if (distance < mouseRef.current.radius) {
              p.x -= (dx / distance) * force * p.density; p.y -= (dy / distance) * force * p.density;
            } else {
              p.y -= 0.5; if (p.x !== p.baseX) p.x -= (p.x - p.baseX) / 80;
            }
          } else {
            p.y -= 0.5; if (p.x !== p.baseX) p.x -= (p.x - p.baseX) / 80;
          }
          if(p.y < 0) p.y = canvas.height + 10;
          if(p.x < 0) p.x = canvas.width; if(p.x > canvas.width) p.x = 0;

          ctx.fillStyle = Math.random() > 0.2 ? themeColor : '#ffffff';
          ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.closePath(); ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const handleMouseOut = () => { mouseRef.current.x = null; mouseRef.current.y = null; };

    initCanvas(); window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseout', handleMouseOut);
    render();

    return () => {
      window.removeEventListener('resize', initCanvas); window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut); cancelAnimationFrame(animationFrameId);
    };
  }, [explode, themeColor]);

  return <canvas ref={canvasRef} id="particles-canvas" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};


const GlitchTitle = ({ text, themeHex }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if(index < iter) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if(iter >= text.length) clearInterval(interval);
      iter += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-4xl md:text-6xl font-black mb-2 text-transparent bg-clip-text drop-shadow-lg"
        style={{ backgroundImage: `linear-gradient(to right, ${themeHex}, #ffffff)` }}>
      {displayText}
    </h1>
  );
};

/* =========================================
   DASHBOARDS (3 Types)
   ========================================= */

// Shared User Profile Block for Dashboards
const UserProfileHeader = ({ name, roleDesc, currentHex, onLogout, t }) => {
  const { timeString, dateString } = useCyberClock();
  const [sosActive, setSosActive] = useState(false);

  const handleSos = () => {
    setSosActive(true);
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 mb-10 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
      <div className={`absolute left-0 top-0 w-1 h-full transition-all`} style={{ backgroundColor: currentHex }}></div>
      <div className="flex items-center gap-6">
        <button onClick={onLogout} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
           <ChevronRight size={20} className="rotate-180" />
        </button>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border transition-colors relative" style={{ borderColor: `${currentHex}50`, color: currentHex }}>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: currentHex }}></div>
          {name.charAt(0)}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, ${currentHex}, #ffffff)` }}>{name}</h2>
          <p className="text-gray-400 font-mono text-sm">{roleDesc}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-6 md:mt-0 flex-wrap justify-center">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
          <Clock size={18} style={{ color: currentHex }} />
          <div className="flex flex-col font-mono text-right">
            <span className="text-white font-bold text-sm tracking-widest leading-none">{timeString}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{dateString}</span>
          </div>
        </div>

        <button 
          onClick={handleSos}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all font-bold uppercase tracking-widest text-xs ${sosActive ? 'bg-red-500 text-white border-red-500' : 'bg-black/50 text-gray-300 border-white/10 hover:border-red-500/50 hover:text-red-400'}`}
        >
          <LifeBuoy size={16} /> {sosActive ? t('sos_sent') : t('sos')}
        </button>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <LogOut size={16} /> {t('logout')}
        </button>
      </div>
    </div>
  );
};


const LoginView = ({ setRole, currentHex, t }) => {
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const roles = [
    { id: 'teacher', title: t('role_teacher'), desc: t('role_teacher_desc'), icon: BookOpen, color: "#10b981", credentials: { u: "ustoz", p: "1234" } },
    { id: 'student', title: t('role_student'), desc: t('role_student_desc'), icon: User, color: "#3b82f6", credentials: { u: "talaba", p: "1234" } },
    { id: 'employer', title: t('role_employer'), desc: t('role_employer_desc'), icon: Briefcase, color: "#f59e0b", credentials: { u: "admin", p: "1234" } }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === selectedRoleData.credentials.u && password === selectedRoleData.credentials.p) {
      setErrorMsg('');
      setRole(selectedRoleData.id);
    } else {
      setErrorMsg(t('err_creds'));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[80vh] relative z-10 px-6">
      <AnimatePresence mode="wait">
        {!selectedRoleData ? (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="w-full flex flex-col items-center justify-center">
            <GlitchTitle text={t('login_title')} themeHex={currentHex} />
            <p className="text-gray-400 mb-12 max-w-lg text-center">{t('login_subtitle')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              {roles.map((r, i) => (
                <motion.div 
                  key={r.id}
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: [0, -15, 0] }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: i * 0.2 },
                    y: { repeat: Infinity, duration: 4.5, delay: i * 0.3, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setSelectedRoleData(r); setUsername(''); setPassword(''); setErrorMsg(''); }}
                  className="p-8 rounded-3xl bg-black/40 border backdrop-blur-xl flex flex-col items-center text-center cursor-pointer transition-all duration-500 group relative"
                  style={{ borderColor: `${r.color}40` }}
                >
                  <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} style={{ backgroundColor: r.color }}></div>
                  
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-black/60 border transition-colors duration-500 relative z-10" style={{ borderColor: `${r.color}80`, boxShadow: `0 0 20px ${r.color}30` }}>
                    <r.icon size={36} style={{ color: r.color }} className="group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_currentColor]" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3 relative z-10 drop-shadow-md" style={{ color: r.color }}>{r.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 relative z-10 tracking-wide leading-relaxed">{r.desc}</p>
                  
                  <div className="mt-auto px-6 py-2 rounded-full border text-white/70 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 relative z-10" style={{ borderColor: `${r.color}40` }}>
                    {t('enter')} <ChevronRight size={14} style={{ color: r.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="login-form" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md">
            <div className="p-10 rounded-3xl bg-black/60 border backdrop-blur-2xl relative overflow-hidden" style={{ borderColor: `${selectedRoleData.color}60`, boxShadow: `0 0 40px ${selectedRoleData.color}20` }}>
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: selectedRoleData.color }}></div>
              <button onClick={() => setSelectedRoleData(null)} className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              
                 <div className="flex flex-col items-center mt-4 mb-8">
                 <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-black/40 border" style={{ borderColor: `${selectedRoleData.color}80`, boxShadow: `0 0 15px ${selectedRoleData.color}40` }}>
                    <selectedRoleData.icon size={28} style={{ color: selectedRoleData.color }} />
                 </div>
                 <h2 className="text-2xl font-bold text-white text-center">{selectedRoleData.title}</h2>
                 <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-mono">{t('sec_proto')}</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                 <div>
                   <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">{t('login_lbl')}</label>
                   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus placeholder={t('login_ph')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors font-mono" />
                 </div>
                 <div>
                   <label className="text-xs text-gray-400 uppercase tracking-widest mb-1 block">{t('pass_lbl')}</label>
                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder={t('pass_ph')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors font-mono" />
                 </div>
                 
                 <AnimatePresence>
                   {errorMsg && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs text-center font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20 mt-2">
                       {errorMsg}
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <button type="submit" className="mt-4 w-full py-4 rounded-xl font-bold uppercase tracking-widest text-black transition-all hover:scale-[1.02]" style={{ backgroundColor: selectedRoleData.color, boxShadow: `0 0 20px ${selectedRoleData.color}50` }}>
                   {t('sys_login')}
                 </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const StudentPanel = ({ currentHex, onLogout, t }) => {
  const gpaData = [
    { month: 'Sep', gpa: 3.2 }, { month: 'Oct', gpa: 3.5 }, { month: 'Nov', gpa: 3.8 }, 
    { month: 'Dec', gpa: 4.2 }, { month: 'Jan', gpa: 4.5 }, { month: 'Feb', gpa: 5.0 }
  ];
  
  const subjects = [
    { name: "Ona tili va Nutq Madaniyati", level: 92, status: "Advanced" },
    { name: "O'zbekiston Tarixi", level: 86, status: "Upper-Intermediate" },
    { name: "Oliy Matematika", level: 95, status: "Advanced" },
    { name: "Web Dasturlash (Ixtisoslik)", level: 98, status: "Expert" }
  ];
  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 relative z-10">
      <UserProfileHeader name="Alisher K." roleDesc="ID-88X1 | Software Engineering | 4-Kurs" currentHex={currentHex} onLogout={onLogout} t={t} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp style={{ color: currentHex }} /> {t('std_gpa')}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaData} margin={{ left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={currentHex} stopOpacity={0.8}/><stop offset="95%" stopColor={currentHex} stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="month" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} domain={[0, 5]} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: currentHex, borderRadius: '10px' }} />
                <Area type="monotone" dataKey="gpa" stroke={currentHex} strokeWidth={3} fill="url(#colorGpa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
            <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-2">{t('std_cur_gpa')}</h4>
            <div className="text-6xl font-black drop-shadow-md" style={{ color: currentHex }}>5.0</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-sm text-white font-bold mb-4">{t('std_offers')}</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-emerald-500/30">
                <span className="font-bold text-emerald-400">Google</span><span className="text-xs px-2 py-1 bg-emerald-500/20 rounded text-emerald-300">Junior Dev</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-sky-500/30">
                <span className="font-bold text-sky-400">Uzum</span><span className="text-xs px-2 py-1 bg-sky-500/20 rounded text-sky-300">Backend</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fanlar va Karyera Maqsadi Bloklari */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Fanlar Darajasi */}
        <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <BookOpen style={{ color: currentHex }} /> {t('std_subj')}
           </h3>
           <div className="space-y-5">
              {subjects.map((sub, i) => (
                <div key={i} className="mb-2 group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium group-hover:text-emerald-400 transition-colors duration-300">{sub.name}</span>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded border border-white/10" style={{ color: currentHex, backgroundColor: `${currentHex}20` }}>
                      {sub.status} ({sub.level}%)
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${sub.level}%` }} 
                      transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                      className="h-2.5 rounded-full" 
                      style={{ backgroundColor: currentHex, boxShadow: `0 0 10px ${currentHex}` }} 
                    />
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Karyera Yo'riqnomasi */}
        <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" style={{ backgroundColor: currentHex }}></div>
           
           <div>
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
               <Briefcase style={{ color: currentHex }} /> {t('std_target')}
             </h3>
             <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
               {t('std_target_desc')}
             </p>
           </div>
           
           <div className="space-y-4 relative z-10">
             <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-amber-500/50 transition-colors group cursor-pointer">
               <div className="flex items-center justify-between mb-2">
                 <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">{t('target_1')}</h4>
                 <TrendingUp size={16} className="text-amber-400 group-hover:scale-125 transition-transform" />
               </div>
               <p className="text-xs text-gray-500 font-mono">{t('target_1_d')}</p>
             </div>
             
             <div className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-blue-500/50 transition-colors group cursor-pointer">
               <div className="flex items-center justify-between mb-2">
                 <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{t('target_2')}</h4>
                 <BookOpen size={16} className="text-blue-400 group-hover:scale-125 transition-transform" />
               </div>
               <p className="text-xs text-gray-500 font-mono">{t('target_2_d')}</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};


const TeacherPanel = ({ currentHex, onLogout, t }) => {
  const students = [
    { name: "Alisher K.", id: "ID-88X1", score: 5 },
    { name: "Malika R.", id: "ID-22N9", score: 4 },
    { name: "Timur S.", id: "ID-74M2", score: 3 },
    { name: "Zarina B.", id: "ID-11L8", score: 5 }
  ];

  const getGradeTier = (score) => {
    if (score === 5) return { label: 'Excellent', color: '#10b981' };
    if (score === 4) return { label: 'Good', color: '#3b82f6' };
    if (score === 3) return { label: 'Satisfactory', color: '#f59e0b' };
    return { label: 'Warning', color: '#ef4444' };
  };
  const schedule = [
    { time: "08:30 - 10:00", subject: "Web Dasturlash", group: "CSE-201", room: "302" },
    { time: "10:15 - 11:45", subject: "Ma'lumotlar Bazasi", group: "CSE-204", room: "405" },
    { time: "13:00 - 14:30", subject: "Algoritmlar", group: "CSE-102", room: "201" }
  ];

  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 relative z-10">
      <UserProfileHeader name={t('r_teach')} roleDesc={t('r_teach_desc')} currentHex={currentHex} onLogout={onLogout} t={t} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* O'quvchilar Diagrammasi */}
        <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users style={{ color: currentHex }} /> {t('tch_chart')}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={students} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#111', borderColor: currentHex, borderRadius: '10px' }} />
                <Bar dataKey="score" fill={currentHex} radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dars Jadvali */}
        <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock style={{ color: currentHex }} /> {t('tch_sched')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead>
                 <tr className="border-b border-white/10 text-gray-500 uppercase tracking-wider text-[10px]">
                   <th className="pb-3 px-2">{t('tch_time')}</th>
                   <th className="pb-3 px-2">{t('tch_subj')}</th>
                   <th className="pb-3 px-2">{t('tch_group')}</th>
                   <th className="pb-3 px-2">{t('tch_room')}</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {schedule.map((slot, idx) => (
                   <tr key={idx} className="group hover:bg-white/5 transition-colors">
                     <td className="py-4 px-2 font-mono text-emerald-400">{slot.time}</td>
                     <td className="py-4 px-2 text-white font-bold">{slot.subject}</td>
                     <td className="py-4 px-2 text-gray-400">{slot.group}</td>
                     <td className="py-4 px-2"><span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">{slot.room}</span></td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </div>
      </div>


      <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-white">{t('tch_jrnl')}</h3>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-bold transition-colors border border-white/20">{t('tch_save')}</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wider"><th className="pb-4 px-4">{t('tch_th_1')}</th><th className="pb-4 px-4">{t('tch_th_2')}</th><th className="pb-4 px-4">{t('tch_th_3')}</th><th className="pb-4 px-4">{t('tch_th_4')}</th><th className="pb-4 px-4">{t('tch_th_5')}</th></tr></thead>
          <tbody>
            {students.map((s, i) => {
              const tier = getGradeTier(s.score);
              return (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs" style={{ color: currentHex }}>{s.name[0]}</div>{s.name}</td>
                <td className="py-4 px-4 text-gray-400 font-mono text-sm">{s.id}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <input type="number" min="2" max="5" defaultValue={s.score} className="w-12 bg-black/50 border border-white/20 rounded p-1 text-center text-white outline-none focus:border-white/50" />
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${tier.color}20`, color: tier.color }}>{tier.label}</span>
                  </div>
                </td>
                <td className="py-4 px-4"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked={s.score >= 4} className="w-4 h-4 accent-emerald-500" /><span className="text-sm text-gray-400">{t('tch_prem')}</span></label></td>
                <td className="py-4 px-4"><button className="text-xs px-4 py-1 rounded-full border hover:bg-white hover:text-black transition-colors" style={{ borderColor: currentHex, color: currentHex }}>{t('tch_upd')}</button></td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const EmployerPanel = ({ currentHex, onLogout, t }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const students = [
    { id: "ID-88X1", name: "Alisher K.", gpa: "5.0", status: "Employed", skill: "Fullstack React/Node" },
    { id: "ID-22N9", name: "Malika R.", gpa: "4.9", status: "Available", skill: "Data Science, Python" },
    { id: "ID-74M2", name: "Timur S.", gpa: "4.8", status: "Available", skill: "UI/UX, 3D Design" },
    { id: "ID-11L8", name: "Zarina B.", gpa: "4.75", status: "Available", skill: "DevOps, AWS" }
  ];
  const filtered = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.skill.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto pt-32 pb-24 px-6 relative z-10">
      <UserProfileHeader name={t('r_hr')} roleDesc={t('r_emp_desc')} currentHex={currentHex} onLogout={onLogout} t={t} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
           <GlitchTitle text={t('emp_hr')} themeHex={currentHex} />
           <p className="text-gray-400 mt-2">{t('emp_hr_sub')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <Award style={{ color: currentHex }} /> {t('emp_top_title')}
           </h3>
           <div className="space-y-4">
              {students.sort((a,b) => b.gpa - a.gpa).slice(0, 3).map((s, idx) => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center font-black text-xl italic" style={{ color: idx === 0 ? '#fbbf24' : idx === 1 ? '#94a3b8' : '#92400e' }}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{s.name}</h4>
                        <p className="text-xs text-gray-500 font-mono">{s.skill}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-lg font-black text-white">{s.gpa}</div>
                      <div className="flex gap-1 justify-end mt-1">
                        {[...Array(5-idx)].map((_, i) => <Star key={i} size={10} fill="currentColor" className="text-yellow-400" />)}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl flex-1 flex flex-col justify-center">
              <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-2">{t('emp_tot')}</h4>
              <div className="text-5xl font-black text-white mb-6">1,492</div>
              <div className="space-y-3">
                 <div className="flex justify-between text-xs"><span className="text-gray-500 italic">Frontend</span><span className="text-white">412</span></div>
                 <div className="flex justify-between text-xs"><span className="text-gray-500 italic">Backend</span><span className="text-white">385</span></div>
                 <div className="flex justify-between text-xs"><span className="text-gray-500 italic">AI / Data</span><span className="text-white">215</span></div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('emp_search')} className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white outline-none focus:border-white/30 font-mono transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map(s => (
              <motion.div key={s.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{s.name}</h3>
                    <span className="px-2 py-0.5 text-[10px] rounded border uppercase font-bold tracking-widest" style={{ color: s.status === 'Available' ? currentHex : '#aaa', borderColor: s.status === 'Available' ? `${currentHex}50` : '#444' }}>{s.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm font-mono mb-1">{s.id} • GPA: <span className="text-white font-black">{s.gpa}</span></p>
                  <p className="text-xs text-emerald-400 p-1.5 bg-emerald-500/10 rounded inline-block border border-emerald-500/20">{s.skill}</p>
                </div>
                <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors" title="Taklif Yuborish">
                  <Star size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


const Footer = ({ t, currentHex }) => {
  const socialLinks = [
    { icon: Facebook, color: "#1877F2", label: "Facebook" },
    { icon: Instagram, color: "#E4405F", label: "Instagram" },
    { icon: Send, color: "#0088cc", label: "Telegram" },
    { icon: Youtube, color: "#FF0000", label: "YouTube" }
  ];

  const handleUnderConstruction = (item) => {
    alert(`${item} ${t('coming_soon') || 'tez kunda ishga tushadi!'}`);
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050505] pt-24 pb-12 px-6 mt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Column 1: Organization */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-xl tracking-tight mb-8">
            {t('f_about')}
          </h4>
          <ul className="space-y-4">
            {[t('f_about_1'), t('f_about_2'), t('f_about_3')].map((item, i) => (
              <li key={i} onClick={() => handleUnderConstruction(item)} className="text-gray-500 text-sm hover:text-white cursor-pointer transition-all duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-[1px] bg-current mr-0 group-hover:mr-2 transition-all"></span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-10">
            {socialLinks.map((soc, i) => (
              <div 
                key={i} 
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg relative group"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity" style={{ backgroundColor: soc.color }}></div>
                <soc.icon size={20} className="relative z-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Opportunities */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-xl tracking-tight mb-8">
            {t('f_opp')}
          </h4>
          <ul className="space-y-4">
            {[t('f_opp_1'), t('f_opp_3'), t('f_opp_4')].map((item, i) => (
              <li key={i} onClick={() => handleUnderConstruction(item)} className="text-gray-500 text-sm hover:text-white cursor-pointer transition-all duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-[1px] bg-current mr-0 group-hover:mr-2 transition-all"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Partners */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-xl tracking-tight mb-8">
            {t('f_part')}
          </h4>
          <ul className="space-y-4">
            {[t('f_part_1')].map((item, i) => (
              <li key={i} onClick={() => handleUnderConstruction(item)} className="text-gray-500 text-sm hover:text-white cursor-pointer transition-all duration-300 flex items-center group">
                <span className="w-0 group-hover:w-2 h-[1px] bg-current mr-0 group-hover:mr-2 transition-all"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="space-y-6">
          <h4 className="text-white font-black text-xl tracking-tight mb-8">
            {t('f_supp')}
          </h4>
          <p 
            onClick={() => handleUnderConstruction(t('f_supp_1'))}
            className="text-emerald-500 text-sm font-medium hover:text-emerald-400 cursor-pointer transition-colors mb-8 inline-block drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
          >
            {t('f_supp_1')}
          </p>
          <div className="pt-4">
            <button 
              onClick={() => handleUnderConstruction(t('f_btn'))}
              className="w-full group relative py-4 px-6 rounded-2xl border border-emerald-500/30 text-emerald-500 font-bold text-sm overflow-hidden transition-all hover:border-emerald-500/60"
            >
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t('f_btn')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-600 text-[12px] font-mono tracking-widest uppercase">{t('f_legal')}</p>
        <p className="text-gray-700 text-[10px] font-mono">© 2026 TALENT GRAVITY PLATFORM. ZERO-G SECURE TERMINAL.</p>
      </div>
    </footer>
  );
};

/* =========================================
   Main Application Layout Wrapper
   ========================================= */
const App = () => {
  const [role, setRole] = useState(null); // 'student' | 'teacher' | 'employer' | null
  const [theme, setTheme] = useState('emerald');
  const [lang, setLang] = useState('uz');
  const { timeString, dateString } = useCyberClock();

  const themeHexMap = { emerald: '#10b981', fuchsia: '#d946ef', cyan: '#06b6d4' };
  const currentHex = themeHexMap[theme];

  const t = (key) => locales[lang][key] || key;

  const handleLogout = () => { setRole(null); window.scrollTo(0, 0); };
  const toggleTheme = () => setTheme({ emerald: 'fuchsia', fuchsia: 'cyan', cyan: 'emerald' }[theme]);
  const toggleLang = () => setLang({ uz: 'ru', ru: 'en', en: 'uz' }[lang]);

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden selection:bg-white/20 text-white font-sans">
      <ParticleBackground explode={false} themeColor={currentHex} />
      
      {/* Dynamic Header System */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6">
        <div className="flex gap-4 items-center">
          <button title={t('sys_theme')} onClick={toggleTheme} className="p-3 bg-black/40 border border-white/10 rounded-full hover:border-white/30 backdrop-blur-md transition-all text-white/70 hover:text-white group">
            <Palette size={20} className="group-hover:rotate-12 transition-transform" style={{ color: currentHex }} />
          </button>
          
          <button onClick={toggleLang} className="px-4 py-3 bg-black/40 border border-white/10 rounded-full hover:border-white/30 backdrop-blur-md transition-all text-white font-bold text-xs flex items-center gap-2 group">
            <Globe size={16} className="group-hover:rotate-180 transition-transform duration-500" style={{ color: currentHex }} />
            {t('lang')}
          </button>
        </div>
          
        <div className="flex items-center gap-4 bg-black/40 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto transition-opacity">
          <Clock size={16} style={{ color: currentHex }} />
          <div className="flex flex-col font-mono text-right">
            <span className="text-white font-bold text-sm tracking-widest">{timeString}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-0.5">{dateString} / {role ? t('sys_ok') : t('no_conn')}</span>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      <AnimatePresence mode="wait">
        <motion.div key={role || 'login'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
          {!role && <LoginView setRole={setRole} currentHex={currentHex} t={t} />}
          {role === 'student' && <StudentPanel currentHex={currentHex} onLogout={handleLogout} t={t} />}
          {role === 'teacher' && <TeacherPanel currentHex={currentHex} onLogout={handleLogout} t={t} />}
          {role === 'employer' && <EmployerPanel currentHex={currentHex} onLogout={handleLogout} t={t} />}
        </motion.div>
      </AnimatePresence>

      <Footer t={t} currentHex={currentHex} />
    </div>
  );
};

export default App;
