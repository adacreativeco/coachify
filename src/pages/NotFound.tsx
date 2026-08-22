import { Link } from 'react-router-dom';
import { Home, Shield, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full space-y-6">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-2xl">
          ⚽
        </div>
        
        <div className="space-y-2">
          <span className="text-emerald-400 font-black text-6xl tracking-tight">404</span>
          <h1 className="text-2xl font-black text-white">Top Taca Çıktı! Sayfa Bulunamadı</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center transition-all shadow-lg shadow-emerald-500/25"
          >
            <Home className="w-3.5 h-3.5 mr-1.5" /> Ana Sayfaya Dön
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center transition-colors"
          >
            <Shield className="w-3.5 h-3.5 mr-1.5" /> Yönetim Paneline Git
          </Link>
        </div>
      </div>
    </div>
  );
}
