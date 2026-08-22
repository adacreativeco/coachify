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
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl p-3.5 shadow-2xl text-white flex items-center space-x-3.5 max-w-md">
        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-emerald-400 shrink-0">
          <Shield className="w-4 h-4" />
        </div>
        <div className="flex-1 pr-2">
          <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">Ücretsiz Canlı Demo</div>
          <div className="text-xs text-neutral-300">Taktik tahtası ve canlı yoklamayı başlatın.</div>
        </div>
        <button
          onClick={handleLaunch}
          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all shrink-0 flex items-center space-x-1"
        >
          <span>Paneli Aç</span>
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-500 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
