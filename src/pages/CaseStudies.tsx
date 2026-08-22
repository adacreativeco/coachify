import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, Users, Shield, ArrowRight, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function CaseStudies() {
  const cases = [
    {
      club: 'Galatasaray U21 & Akademi',
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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-xl bg-slate-950/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center shadow-lg font-black text-black text-xl">
              ⚽
            </div>
            <span className="text-xl font-black tracking-tight text-white">COACHIFY<span className="text-emerald-400">.OS</span></span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-lg">
              Ana Sayfa
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-xl shadow-lg transition-all"
            >
              Paneli Başlat
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Kullanıcı Başarı Hikayeleri & Vaka Analizleri</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Profesyonel Kulüpler COACHIFY ile Nasıl <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Zirveye Ulaştı?</span>
          </h1>
          <p className="text-slate-400 text-base">
            Süper Lig akademilerinden yerel futbol kulüplerine kadar sahadaki ve yönetimdeki somut verimlilik kazanımları.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{c.club}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{c.summary}</p>

                {/* Key Stat Box */}
                <div className="bg-slate-900/80 rounded-xl p-4 border border-white/5 text-center">
                  <div className="text-3xl font-black text-emerald-400">{c.metric}</div>
                  <div className="text-[11px] text-slate-400 font-semibold mt-0.5">{c.metricLabel}</div>
                </div>

                {/* Bullet Results */}
                <div className="space-y-2 pt-2">
                  {c.results.map((r, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/dashboard"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black font-bold text-xs text-white text-center transition-all flex items-center justify-center"
              >
                Kulübünüz İçin Başlatın <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
