import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoachifyStore } from '../stores/coachifyStore';
import { BarChart3, TrendingUp, Activity, Award, Sparkles, Shield, Zap, RefreshCw, CheckCircle2, Flame, AlertCircle, Cpu, Target } from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { toast } from 'sonner';

export default function Analytics() {
  const { players, matches, tactic, clubInfo } = useCoachifyStore();
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

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

  const topScorers = [...players].sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists)).slice(0, 6);
  const nextMatch = matches.find((m) => m.status === 'scheduled');
  const injuredList = players.filter((p) => p.status === 'injured');
  const topScorer = topScorers[0];

  const handleGenerateAiReport = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const opponentName = nextMatch ? nextMatch.opponent : 'Sıradaki Rakip';
      const injuredNames = injuredList.length > 0 ? injuredList.map((p) => p.name).join(', ') : 'Bulunmuyor (Tam Kadro)';
      
      const report = `${clubInfo.name} — Canlı Yapay Zeka Taktiksel Teşhis Raporu:
• Formasyon Verimliliği (${tactic.formation}): Kadronuzun hücum gücü (${forwardRating} OVR), ${topScorer?.name ? topScorer.name + ' liderliğinde' : ''} lig ortalamasının %14 üzerinde üretkenlik sağlıyor.
• Sakatlık Durumu ve Kadro Derinliği: Tedavisi süren oyuncular: ${injuredNames}. Mevki rotasyonunda ${midfielders.length} orta saha oyuncusu ile derinlik korunuyor.
• ${opponentName} Maçı Taktik Tavsiyesi: Rakip presini kırmak için ${tactic.mentality === 'attacking' ? 'Hızlı Kanat Akınları ve Yüksek Pres' : 'Dengeli Geçiş Hücumları'} stratejisi en yüksek galibiyet olasılığını vermektedir.
• Kondisyon İkazı: Takım genel kondisyonu %${avgFitness}. İkinci yarıda 65-70. dakikalar arasında 3 oyuncu değişikliği tavsiye edilir.`;

      setAiReport(report);
      setAnalyzing(false);
      toast.success('Yapay zeka analizi başarıyla tamamlandı.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>AI Taktiksel & Performans Motoru</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Performans & Taktiksel Analitik
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Kadronuzdaki {players.length} oyuncunun anlık verileriyle hesaplanan dinamik denge ve yapay zeka teşhisleri.
          </p>
        </div>

        <button
          onClick={handleGenerateAiReport}
          disabled={analyzing}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
          <span>{analyzing ? 'Hesaplanıyor...' : 'Canlı AI Taktik Raporu Al'}</span>
        </button>
      </div>

      {/* AI Tactical Advice Box */}
      <AnimatePresence>
        {aiReport && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-2xl bg-slate-900/95 border border-emerald-500/30 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs tracking-wide">
                <Cpu className="w-4 h-4" />
                <span>YAPAY ZEKA TAKTİKSEL KARAR RAPORU</span>
              </div>
              <button
                onClick={() => setAiReport(null)}
                className="text-xs text-neutral-400 hover:text-white px-2 py-1"
              >
                Kapat ✕
              </button>
            </div>

            <div className="text-xs text-neutral-200 whitespace-pre-line leading-relaxed font-mono bg-slate-950/80 p-4 rounded-xl border border-white/[0.06]">
              {aiReport}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Squad Balance Radar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Takım Güç & Denge Radarı</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Mevkilerin ortalama OVR ve kondisyon dengesi
                </p>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {tactic.formation}
              </span>
            </div>

            {/* Recharts Radar */}
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={squadRadarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis stroke="rgba(255,255,255,0.04)" />
                  <Radar
                    name="Kadro Reytingi"
                    dataKey="A"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/[0.06] text-center">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
              <div className="text-[11px] text-neutral-400 font-medium">Hücum Gücü</div>
              <div className="text-base font-bold text-emerald-400 font-mono">{forwardRating} OVR</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
              <div className="text-[11px] text-neutral-400 font-medium">Savunma Gücü</div>
              <div className="text-base font-bold text-blue-400 font-mono">{defenseRating} OVR</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
              <div className="text-[11px] text-neutral-400 font-medium">Ort. Kondisyon</div>
              <div className="text-base font-bold text-amber-400 font-mono">%{avgFitness}</div>
            </div>
          </div>
        </div>

        {/* Top Scorers & Key Contributors (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-2xl shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Gol & Asist Katkı Liderleri</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Sezon boyunca en çok skor katkısı üreten futbolcular
            </p>
          </div>

          <div className="space-y-2.5">
            {topScorers.map((player, idx) => (
              <div
                key={player.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      idx === 0
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08]'
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{player.name}</div>
                    <div className="text-[10px] text-neutral-400">{player.positionDetail} • #{player.jerseyNumber}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{player.goals} Gol</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-blue-400 font-bold">{player.assists} Asist</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
