import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export function TopBannerCTA() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs font-bold py-2.5 px-4 text-center sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
        <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
          YENİ v2.0
        </span>
        <span>Yapay Zeka Taktiksel Karar Motoru ve Canlı Yoklama Takibi Yayında!</span>
        <Link
          to="/case-studies"
          className="inline-flex items-center underline hover:text-amber-200 ml-1 transition-colors"
        >
          Vaka Analizlerini Oku <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}
