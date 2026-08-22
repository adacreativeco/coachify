import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Shield, Activity, Users, Trophy, BarChart3, ChevronRight, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleQuickLaunch = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-600 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
      </div>

      {/* Top Navbar */}
      <nav className="relative border-b border-white/10 backdrop-blur-xl bg-slate-950/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-black text-black text-xl">
              ⚽
            </div>
            <span className="text-xl font-black tracking-tight text-white">COACHIFY<span className="text-emerald-400">.OS</span></span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Giriş Yap
            </Link>
            <button
              onClick={() => handleQuickLaunch(UserRole.COACH)}
              className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center"
            >
              Canlı Demo Başlat <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold mb-8">
          <Zap className="w-3.5 h-3.5" />
          <span>Profesyonel Futbol Kulübü & Akademi Yönetim İşletim Sistemi</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Sahadaki Taktikten, Kulüp Finansına <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-200">Tek Platform.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
          Kulüp Başkanları, Teknik Direktörler ve Futbolcular için tasarlanmış reaktif taktik tahtası, canlı antrenman yoklaması, maç fikstürü ve yapay zeka destekli performans analitiği.
        </p>

        {/* 3 Quick Role Demo Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleQuickLaunch(UserRole.PRESIDENT)}
            className="group px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-left transition-all w-72"
          >
            <div className="text-2xl mb-2">👑</div>
            <div className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">Kulüp Başkanı Olarak Gir</div>
            <div className="text-xs text-slate-400 mt-1">Bütçe, sponsorluklar, transfer fonu ve finansal raporlar.</div>
          </button>

          <button
            onClick={() => handleQuickLaunch(UserRole.COACH)}
            className="group px-6 py-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all w-72 shadow-xl shadow-emerald-950/50"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">Teknik Direktör Olarak Gir</div>
            <div className="text-xs text-emerald-200/80 mt-1">Taktik tahtası, 4-3-3 ilk 11, antrenman yoklaması ve sakatlıklar.</div>
          </button>

          <button
            onClick={() => handleQuickLaunch(UserRole.PLAYER)}
            className="group px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 text-left transition-all w-72"
          >
            <div className="text-2xl mb-2">⚽</div>
            <div className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">Futbolcu Olarak Gir</div>
            <div className="text-xs text-slate-400 mt-1">Kişisel OVR puanı, maç karnesi, kondisyon radarı ve hoca notları.</div>
          </button>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="relative py-20 border-t border-white/10 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ⚽
            </div>
            <h3 className="text-xl font-bold text-white">İnteraktif Taktik Tahtası</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              4-3-3, 4-4-2, 4-2-3-1 formasyonlarında sahadaki 11'i sürükleyip bırakın, kaptan ve duran top kullanıcılarını saniyeler içinde belirleyin.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              📋
            </div>
            <h3 className="text-xl font-bold text-white">Canlı Antrenman & Yoklama</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Haftalık seansları planlayın, tek tıkla tüm kadronun katılım yoklamasını (Geldi, İzinli, Sakat) alın ve oyuncu yorgunluğunu takip edin.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              📊
            </div>
            <h3 className="text-xl font-bold text-white">Recharts Performans Analitiği</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Takım denge radarı, kondisyon trend grafikleri, gol/asist istatistikleri ve yapay zeka destekli rakip analiz önerileri.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-slate-500">
        Built with 🧠 by <a href="https://github.com/adacreativeco" className="text-emerald-400 font-bold hover:underline">ADA Creative Co.</a>
      </footer>
    </div>
  );
}
