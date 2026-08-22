import { useState } from 'react';
import { useCoachifyStore } from '../stores/coachifyStore';
import { BarChart3, TrendingUp, Activity, Award, Sparkles, Shield, Zap } from 'lucide-react';
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
  LineChart,
  Line,
} from 'recharts';

export default function Analytics() {
  const { players, matches, tactic } = useCoachifyStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  // Radar chart data for squad balance
  const squadRadarData = [
    { subject: 'Hücum Gücü', A: 88, fullMark: 100 },
    { subject: 'Savunma Disiplini', A: 84, fullMark: 100 },
    { subject: 'Fizik & Pres', A: 92, fullMark: 100 },
    { subject: 'Pas & Yaratıcılık', A: 86, fullMark: 100 },
    { subject: 'Hız & Kontra', A: 89, fullMark: 100 },
    { subject: 'Duran Top', A: 82, fullMark: 100 },
  ];

  // Top Scorers
  const topScorers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 5);

  const handleGenerateAiReport = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAiReport(`🤖 Coachify AI Taktiksel Danışman Raporu:
• Mevcut Diziliş Analizi (${tactic.formation}): Hücum kanat organizasyonunda Barış Alper ve Sallai yüksek verimlilik sağlıyor.
• Rakip Savunma Açığı: Fenerbahçe U21 maçında stoperler arasındaki 22 metrelik boşluk, Osimhen'in derin koşuları için kilit fırsat alanı.
• Kondisyon Uyarısı: İkinci yarıda Torreira ve Sara'nın pres yoğunluğu %18 düşüyor; Batshuayi ve Berkan değişiklikleri 65. dakikada planlanmalı.`);
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Performans & Taktik Analitiği</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gelişmiş metrikler, takım denge radarı, oyuncu skor katkıları ve AI taktik önerileri.
          </p>
        </div>

        <button
          onClick={handleGenerateAiReport}
          disabled={analyzing}
          className="inline-flex items-center px-4 py-2.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-md transition-all"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {analyzing ? 'Yapay Zeka Analiz Ediyor...' : 'AI Taktik Raporu Üret'}
        </button>
      </div>

      {/* AI Tactical Advice Banner */}
      {aiReport && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 text-white shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-2">
            <Zap className="w-4 h-4" /> <span>CANLI YAPAY ZEKA DERBİ TAVSİYESİ</span>
          </div>
          <pre className="font-sans text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {aiReport}
          </pre>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Squad Balance Radar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
            <Shield className="w-4 h-4 mr-2 text-emerald-600" /> Takım Denge Radarı
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={squadRadarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" />
                <Radar name="Galatasaray" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Scorers Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center">
            <Award className="w-4 h-4 mr-2 text-amber-500" /> En Çok Gol Katkısı Verenler
          </h3>

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
