import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function TopBannerCTA() {
  return (
    <div className="bg-slate-950/90 border-b border-white/[0.06] text-neutral-300 text-xs py-2 px-4 text-center sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2.5">
        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide">
          <Sparkles className="w-3 h-3" /> v2.4 Release
        </span>
        <span className="text-neutral-300 font-medium">
          Yapay Zeka Taktik Motoru ve Canlı Yoklama Sistemi Yayında.
        </span>
        <Link
          to="/analytics"
          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors ml-1"
        >
          <span>AI Taktik Motorunu İncele</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}

