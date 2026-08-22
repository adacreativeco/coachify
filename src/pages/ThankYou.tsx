import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Calendar, Users, Shield, Sparkles } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl space-y-6 relative z-10">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Kulüp Kaydı Tamamlandı</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">COACHIFY.OS'e Hoş Geldiniz</h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Tüm yönetim panelleriniz, ilk 11 taktik tahtanız ve oyuncu havuzunuz hazırlandı.
          </p>
        </div>

        {/* Quick Next Steps */}
        <div className="bg-slate-950/80 rounded-xl p-4 text-left text-xs space-y-2.5 border border-white/[0.06]">
          <div className="font-semibold text-neutral-200 text-xs">Sırada Ne Var?</div>
          <div className="flex items-center space-x-3 text-neutral-300">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">1</span>
            <span>İlk 11 taktik tahtanızı oluşturun ve dizilişinizi seçin.</span>
          </div>
          <div className="flex items-center space-x-3 text-neutral-300">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">2</span>
            <span>Haftalık antrenman programını planlayın ve yoklamayı başlatın.</span>
          </div>
          <div className="flex items-center space-x-3 text-neutral-300">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">3</span>
            <span>Yapay zeka analiz raporu ile rakip zayıf noktalarını keşfedin.</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all space-x-1.5"
          >
            <span>Yönetim Paneline Başla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 font-medium text-xs flex items-center justify-center border border-white/[0.08] transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
