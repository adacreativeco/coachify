import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, Users, Shield, ArrowRight, Award, CheckCircle2, ChevronRight, Sparkles, Check } from 'lucide-react';
import { TopBannerCTA } from '../components/TopBannerCTA';

export default function CaseStudies() {
  const cases = [
    {
      club: 'Galatasaray SK U21 & Akademi',
      badge: 'Süper Lig / UEFA Youth',
      metric: '+%34',
      metricLabel: 'Taktiksel Verimlilik Artışı',
      summary: 'Dinamik 4-3-3 taktik tahtası ve haftalık yoklama takip motoru ile sakatlık geri dönüş süresi %28 kısaltıldı.',
      results: [
        'Haftalık kondisyon takibi ile sakatlık sayısı 7\'den 2\'ye düştü.',
        'Yapay zeka derbi analizi ile geçiş hücumu gol oranı %40 arttı.',
        'Yönetim bütçe şeffaflığı sağlandı.',
      ],
    },
    {
      club: 'Sporting Lizbon Futbol Akademisi',
      badge: 'Portekiz Liga / Altyapı',
      metric: '€14.2M',
      metricLabel: 'Genç Yetenek Değerlemesi',
      summary: 'Oyuncu havuzu takip sistemi sayesinde 18-21 yaş arası futbolcuların OVR reyting ve piyasa değeri artışı optimize edildi.',
      results: [
        '24 genç yeteneğin bireysel maç karnesi dijitalleştirildi.',
        'Hoca-oyuncu içi mesajlaşma ile taktiksel adaptasyon hızlandı.',
        'Sezon içi antrenman devamlılığı %96 seviyesine ulaştı.',
      ],
    },
    {
      club: 'Anadolu Kartalları Spor Kulübü',
      badge: 'TFF 2. Lig / Gelişim',
      metric: '%98',
      metricLabel: 'Yoklama & Devamlılık Oranı',
      summary: 'Manuel evrak işlerini ortadan kaldıran tek tıkla dijital yoklama sistemi ile antrenman disiplini en üst seviyeye taşındı.',
      results: [
        'Antrenman yoklamaları tek tıkla buluta aktarıldı.',
        'Kulüp başkanı ve teknik heyet anlık finansal mutabakat sağladı.',
        'Maç olay çizelgesi ile maç sonu analiz süresi 4 saatten 15 dakikaya indi.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      
      <TopBannerCTA />

      {/* Top Navbar */}
      <nav className="border-b border-white/[0.08] backdrop-blur-2xl bg-black/70 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">COACHIFY<span className="text-emerald-400">.OS</span></span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xs font-medium text-neutral-400 hover:text-white px-3 py-2 transition-colors">
              Ana Sayfa
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl shadow-sm transition-all flex items-center space-x-1"
            >
              <span>Paneli Başlat</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Kullanıcı Başarı Hikayeleri</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Kulüpler COACHIFY ile Nasıl Zirveye Ulaştı?
          </h1>
          <p className="text-neutral-400 text-sm">
            Süper Lig akademilerinden yerel futbol kulüplerine kadar sahadaki ve yönetimdeki somut verimlilik kazanımları.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="bg-slate-900/80 border border-white/[0.08] rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:border-emerald-500/30 transition-all backdrop-blur-2xl shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{c.club}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{c.summary}</p>

                {/* Key Stat Box */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-white/[0.06] text-center">
                  <div className="text-2xl font-extrabold font-mono text-emerald-400">{c.metric}</div>
                  <div className="text-[11px] text-neutral-400 font-medium mt-0.5">{c.metricLabel}</div>
                </div>

                {/* Bullet Results */}
                <div className="space-y-2 pt-2">
                  {c.results.map((r, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/dashboard"
                className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500 hover:text-slate-950 font-semibold text-xs text-neutral-200 text-center transition-all flex items-center justify-center space-x-1"
              >
                <span>Kulübünüz İçin Başlatın</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
