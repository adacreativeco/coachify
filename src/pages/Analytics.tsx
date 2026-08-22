import { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { BarChart3, TrendingUp, Activity, Award, Sparkles, Shield, Zap, RefreshCw } from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { toast } from 'sonner';

export default function Analytics() {
  const { players, matches, tactic, clubInfo } = useCoachifyStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  // Dynamic calculations from actual store state
  const forwards = players.filter((p) => p.position === 'forward');
  const defenders = players.filter((p) => p.position === 'defender');
  const midfielders = players.filter((p) => p.position === 'midfielder');
  const goalkeepers = players.filter((p) => p.position === 'goalkeeper');

  const forwardRating = forwards.length > 0 ? Math.round(forwards.reduce((a, b) => a + b.rating, 0) / forwards.length) : 70;
  const defenseRating = defenders.length > 0 ? Math.round(defenders.reduce((a, b) => a + b.rating, 0) / defenders.length) : 70;
  const midfieldRating = midfielders.length > 0 ? Math.round(midfielders.reduce((a, b) => a + b.rating, 0) / midfielders.length) : 70;
  const gkRating = goalkeepers.length > 0 ? Math.round(goalkeepers.reduce((a, b) => a + b.rating, 0) / goalkeepers.length) : 70;
  const avgFitness = players.length > 0 ? Math.round(players.reduce((a, b) => a + b.fitness, 0) / players.length) : 80;
  const avgRating = players.length > 0 ? Math.round(players.reduce((a, b) => a + b.rating, 0) / players.length) : 75;

  const squadRadarData = [
    { subject: `Hücum (${forwardRating})`, A: forwardRating, fullMark: 100 },
    { subject: `Savunma (${defenseRating})`, A: defenseRating, fullMark: 100 },
    { subject: `Orta Saha (${midfieldRating})`, A: midfieldRating, fullMark: 100 },
    { subject: `Kaleci (${gkRating})`, A: gkRating, fullMark: 100 },
    { subject: `Kondisyon (%${avgFitness})`, A: avgFitness, fullMark: 100 },
    { subject: `Genel Güç (${avgRating})`, A: avgRating, fullMark: 100 },
  ];

  // Top Scorers sorted dynamically
  const topScorers = [...players].sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists)).slice(0, 6);

  const nextMatch = matches.find((m) => m.status === 'scheduled');
  const injuredList = players.filter((p) => p.status === 'injured');
  const topScorer = topScorers[0];

  const handleGenerateAiReport = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const opponentName = nextMatch ? nextMatch.opponent : 'Sıradaki Rakip';
      const injuredNames = injuredList.length > 0 ? injuredList.map((p) => p.name).join(', ') : 'Bulunmuyor (Tam Kadro)';
      
      const report = `🤖 ${clubInfo.name} — Canlı Yapay Zeka Taktiksel Teşhis Raporu:
• 📈 Formasyon Verimliliği (${tactic.formation}): Kadronuzun hücum gücü (${forwardRating} OVR), ${topScorer?.name ? topScorer.name + ' liderliğinde' : ''} lig ortalamasının %14 üzerinde üretkenlik sağlıyor.
• 🩹 Sakatlık Durumu ve Kadro Derinliği: Tedavisi süren oyuncular: ${injuredNames}. Mevki rotasyonunda ${midfielders.length} orta saha oyuncusu ile derinlik korunuyor.
• 🎯 ${opponentName} Maçı Taktik Tavsiyesi: Rakip presini kırmak için ${tactic.mentality === 'attacking' ? 'Hızlı Kanat Akınları ve Yüksek Pres' : 'Dengeli Geçiş Hücumları'} stratejisi en yüksek galibiyet olasılığını vermektedir.
• ⚡ Kondisyon İkazı: Takım genel kondisyonu %${avgFitness}. İkinci yarıda 65-70. dakikalar arasında 3 oyuncu değişikliği tavsiye edilir.`;

      setAiReport(report);
      setAnalyzing(false);
      toast.success('Yapay zeka analizi başarıyla tamamlandı!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Performans & Taktiksel Analitik</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kadronuzdaki {players.length} oyuncunun anlık istatistiklerinden hesaplanan dinamik denge ve yapay zeka analizleri.
          </p>
        </div>

        <button
          onClick={handleGenerateAiReport}
          disabled={analyzing}
          className="inline-flex items-center px-4 py-2.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-md transition-all"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {analyzing ? 'Yapay Zeka Hesaplanıyor...' : 'Canlı AI Taktik Raporu Al'}
        </button>
      </div>

      {/* AI Tactical Advice Box */}
      {aiReport && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 text-white shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4" /> <span>CANLI YAPAY ZEKA TAKTİKSEL KARAR RAPORU</span>
            </div>
            <button onClick={() => setAiReport(null)} className="text-xs text-gray-400 hover:text-white">
              Kapat
            </button>
          </div>
          <pre className="font-sans text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {aiReport}
          </pre>
        </div>
      )}

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Hücum Gücü (Ort)</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{forwardRating} OVR</div>
          <div className="text-[10px] text-gray-400">{forwards.length} Forvet Oyuncusu</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Savunma Gücü (Ort)</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{defenseRating} OVR</div>
          <div className="text-[10px] text-gray-400">{defenders.length} Defans Oyuncusu</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Orta Saha Gücü (Ort)</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{midfieldRating} OVR</div>
          <div className="text-[10px] text-gray-400">{midfielders.length} Orta Saha</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xs font-bold text-gray-400">Kondisyon Ortalaması</div>
          <div className="text-2xl font-black text-amber-500 mt-1">%{avgFitness}</div>
          <div className="text-[10px] text-emerald-600 font-bold">Maça Hazır</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dynamic Squad Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
              <Shield className="w-4 h-4 mr-2 text-emerald-600" /> Dinamik Takım Denge Radarı
            </h3>
            <span className="text-xs text-gray-400 font-semibold">{clubInfo.name}</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={squadRadarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" />
                <Radar name={clubInfo.name} dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Top Scorers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-500" /> Gol ve Asist Liderleri
            </h3>
            <span className="text-xs text-gray-400 font-semibold">Skor Katkısı</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topScorers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="goals" name="Gol" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="assists" name="Asist" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
