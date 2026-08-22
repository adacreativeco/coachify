import React from 'react';
import { useCoachifyStore } from '../../stores/coachifyStore';
import { Users, Calendar, Trophy, AlertTriangle, TrendingUp, ArrowUpRight, Activity, Shield, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CoachDashboard() {
  const { players, matches, trainings } = useCoachifyStore();

  const nextMatch = matches.find((m) => m.status === 'scheduled');
  const upcomingTrainings = trainings.filter((t) => t.status === 'scheduled');
  const injuredPlayers = players.filter((p) => p.status === 'injured');
  const avgFitness = Math.round(players.reduce((acc, p) => acc + p.fitness, 0) / players.length);
  const fitPlayers = players.filter((p) => p.status === 'fit');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/20 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Teknik Heyet Yönetim Paneli</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Teknik Direktör Paneli</h1>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Takımın genel kondisyon ortalaması <strong className="text-emerald-400 font-mono">%{avgFitness}</strong> seviyesinde. {fitPlayers.length} oyuncu ilk 11 seçimine hazır.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/matches"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              <span>İlk 11 & Taktik Tahtası</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Toplam Kadro</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{players.length} <span className="text-xs font-sans text-neutral-500 font-normal">Oyuncu</span></div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {fitPlayers.length} Maça Hazır
          </div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Sakatlık Durumu</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{injuredPlayers.length} <span className="text-xs font-sans text-neutral-500 font-normal">Oyuncu</span></div>
          <div className="text-[11px] text-rose-400 font-medium mt-1">Rehabilitasyon Sürüyor</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Planlanan Antrenman</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">{upcomingTrainings.length} <span className="text-xs font-sans text-neutral-500 font-normal">Seans</span></div>
          <div className="text-[11px] text-blue-400 font-medium mt-1">Haftalık Program</div>
        </div>

        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-white/[0.15]">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Kondisyon Ortalaması</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">%{avgFitness}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">Optimum Seviye</div>
        </div>
      </div>

      {/* Next Match & Injuries Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Match Card */}
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Sıradaki Karşılaşma</span>
            </h3>
            <Link to="/matches" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              <span>Fikstür</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {nextMatch ? (
            <div className="bg-slate-950/80 border border-white/[0.06] rounded-xl p-5 text-center space-y-3">
              <div className="text-xs text-neutral-500 font-mono">{nextMatch.venue} • {nextMatch.date} ({nextMatch.time})</div>
              <div className="text-xl font-bold text-white">
                Galatasaray SK <span className="text-emerald-400 font-normal">vs</span> {nextMatch.opponent}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
                <span>Diziliş: {nextMatch.formation}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-neutral-500 text-center py-8">Planlanmış resmi maç bulunmuyor.</div>
          )}
        </div>

        {/* Injured Players Radar */}
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Sakatlık & Tedavi Raporu</span>
            </h3>
            <span className="text-xs font-mono text-rose-400">{injuredPlayers.length} Oyuncu</span>
          </div>

          <div className="space-y-2">
            {injuredPlayers.length > 0 ? (
              injuredPlayers.map((player) => (
                <div key={player.id} className="p-3 bg-slate-950/60 border border-rose-500/20 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{player.name}</div>
                    <div className="text-neutral-400 text-[11px]">{player.positionDetail} • Kondisyon: %{player.fitness}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[10px]">
                    Tedavide
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-neutral-500 text-center py-8">Kadroda sakat futbolcu bulunmuyor.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
