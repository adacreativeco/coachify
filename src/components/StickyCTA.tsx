import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Shield, ArrowRight, X } from 'lucide-react';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  const handleLaunch = () => {
    switchRole(UserRole.COACH);
    navigate('/dashboard');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-emerald-500/50 rounded-2xl p-4 shadow-2xl text-white flex items-center space-x-4 max-w-md">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black text-lg shrink-0">
          ⚽
        </div>
        <div className="flex-1 pr-2">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Ücretsiz Hemen Deneyin</div>
          <div className="text-xs font-semibold text-slate-200">Kulübünüz için taktik tahtası ve yoklamayı başlatın.</div>
        </div>
        <button
          onClick={handleLaunch}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/30 transition-all shrink-0 flex items-center"
        >
          Paneli Aç <ArrowRight className="w-3 h-3 ml-1" />
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
