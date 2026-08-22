import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Calendar, Users, Shield, Sparkles } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center font-sans">
      <div className="max-w-lg w-full bg-slate-900/60 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Tebrikler & Hoş Geldiniz</div>
          <h1 className="text-3xl font-black text-white">Kulüp Kaydınız Başarıyla Alındı!</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            COACHIFY.OS ekosistemine katıldığınız için teşekkür ederiz. Teknik heyetiniz ve sporcularınız için tüm paneller hazırlandı.
          </p>
        </div>

        {/* Quick Next Steps */}
        <div className="bg-white/5 rounded-2xl p-4 text-left text-xs space-y-3 border border-white/10">
          <div className="font-bold text-slate-200">Sırada Ne Var?</div>
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">1</span>
            <span>İlk 11 taktik tahtanızı oluşturun ve dizilişinizi seçin.</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">2</span>
            <span>Haftalık antrenman programını planlayın ve yoklamayı başlatın.</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">3</span>
            <span>Yapay zeka analiz raporu ile rakip zayıf noktalarını keşfedin.</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-all"
          >
            Yönetim Paneline Başla <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
